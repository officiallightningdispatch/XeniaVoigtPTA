import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';

const allowedTypes=new Set(['Teacher','Parent','Faculty/Staff','Community Partner','Other']);
const TOTAL_SPOTS=20;
const RESERVED_SPOTS=9; // 6 teacher trunks + Boys & Girls Club + 2 confirmed parents
const PUBLIC_CAPACITY=TOTAL_SPOTS-RESERVED_SPOTS;

async function availability(sql){
  const rows=await sql`SELECT COUNT(*)::int AS n FROM pta_trunk_hosts WHERE COALESCE(status,'new') NOT IN ('declined','cancelled')`;
  const applications=Number(rows[0]?.n||0);
  const remaining=Math.max(0,PUBLIC_CAPACITY-applications);
  return {totalSpots:TOTAL_SPOTS,reservedSpots:RESERVED_SPOTS,applicationCapacity:PUBLIC_CAPACITY,applications,remaining,full:remaining<=0};
}

export default async function handler(req,res){
  try{
    const sql=db(); await ensureSchema(sql);
    if(req.method==='GET') return send(res,200,{ok:true,...await availability(sql)});
    if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});

    const body=jsonBody(req);
    const hostName=cleanText(body.hostName,180);
    const hostType=cleanText(body.hostType,80);
    const email=cleanText(body.email,320).toLowerCase();
    if(!hostName||!email||!allowedTypes.has(hostType)) return send(res,400,{error:'Host name, host type, and email are required.'});
    if(body.rulesAccepted!==true) return send(res,400,{error:'Please accept the Trunk-or-Treat host rules.'});

    const current=await availability(sql);
    if(current.full) return send(res,409,{error:'All 20 Trunk-or-Treat spaces are currently claimed. Please contact the PTA about the waitlist.',...current});

    const duplicate=await sql`SELECT id FROM pta_trunk_hosts WHERE LOWER(email)=${email} AND COALESCE(status,'new') NOT IN ('declined','cancelled') LIMIT 1`;
    if(duplicate.length) return send(res,409,{error:'A Trunk-or-Treat request is already on file for this email address.'});

    await sql`INSERT INTO pta_trunk_hosts (host_name,host_type,grade_org,email,phone,theme,vehicle_type,payload)
      VALUES (${hostName},${hostType},${cleanText(body.gradeOrg,180)},${email},${cleanText(body.phone,80)},${cleanText(body.theme,180)},${cleanText(body.vehicleType,120)},${JSON.stringify(body)}::jsonb)`;
    const updated=await availability(sql);
    return send(res,201,{ok:true,...updated});
  }catch(err){console.error(err);return send(res,500,{error:'Trunk host submission service is not configured yet.'});}
}
