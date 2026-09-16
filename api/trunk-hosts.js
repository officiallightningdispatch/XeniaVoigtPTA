import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';

const allowedTypes=new Set(['Teacher','Parent','Faculty/Staff','Community Partner','Other']);

export default async function handler(req,res){
  if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});
  try{
    const body=jsonBody(req);
    const hostName=cleanText(body.hostName,180);
    const hostType=cleanText(body.hostType,80);
    const email=cleanText(body.email,320);
    if(!hostName||!email||!allowedTypes.has(hostType)) return send(res,400,{error:'Host name, host type, and email are required.'});
    if(body.rulesAccepted!==true) return send(res,400,{error:'Please accept the Trunk-or-Treat host rules.'});
    const sql=db(); await ensureSchema(sql);
    await sql`INSERT INTO pta_trunk_hosts (host_name,host_type,grade_org,email,phone,theme,vehicle_type,payload)
      VALUES (${hostName},${hostType},${cleanText(body.gradeOrg,180)},${email},${cleanText(body.phone,80)},${cleanText(body.theme,180)},${cleanText(body.vehicleType,120)},${JSON.stringify(body)}::jsonb)`;
    return send(res,201,{ok:true});
  }catch(err){console.error(err);return send(res,500,{error:'Trunk host submission service is not configured yet.'});}
}
