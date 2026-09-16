import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';

const BOARD = {
  nikki: { firstName: 'Nikki', fullName: 'Nikki Clark', role: 'President' },
  john: { firstName: 'John', fullName: 'John Clark', role: 'Vice President' },
  veronica: { firstName: 'Veronica', fullName: 'Veronica Fabian', role: 'Communications Chair & Secretary' },
  rudy: { firstName: 'Rudy', fullName: 'Rudy Martin Del Campo', role: 'Treasurer' }
};

function boardMember(req){
  const key=String(req.headers['x-admin-key']||'').trim().toLowerCase();
  return BOARD[key]||null;
}

export default async function handler(req,res){
  const member=boardMember(req);
  if(!member) return send(res,401,{error:'Enter the first name of a current PTA board member.'});
  try{
    const sql=db(); await ensureSchema(sql);
    if(req.method==='GET'){
      const volunteers=await sql`SELECT id,created_at,status,first_name,last_name,email,phone,event,payload FROM pta_volunteers ORDER BY created_at DESC LIMIT 500`;
      const vendors=await sql`SELECT id,created_at,status,business_name,contact_name,email,phone,payload FROM pta_vendors ORDER BY created_at DESC LIMIT 500`;
      const trunkHosts=await sql`SELECT id,created_at,status,host_name,host_type,grade_org,email,phone,theme,vehicle_type,payload FROM pta_trunk_hosts ORDER BY created_at DESC LIMIT 500`;
      const newsletter=await sql`SELECT id,created_at,email,source FROM pta_newsletter ORDER BY created_at DESC LIMIT 1000`;
      return send(res,200,{member,volunteers,vendors,trunkHosts,newsletter});
    }
    if(req.method==='PATCH'){
      const body=jsonBody(req); const id=Number(body.id); const kind=cleanText(body.kind,40); const status=cleanText(body.status,40);
      const allowed=new Set(['new','reviewing','approved','contacted','closed']);
      if(!id||!allowed.has(status)) return send(res,400,{error:'Invalid update.'});
      if(kind==='volunteers') await sql`UPDATE pta_volunteers SET status=${status} WHERE id=${id}`;
      else if(kind==='vendors') await sql`UPDATE pta_vendors SET status=${status} WHERE id=${id}`;
      else if(kind==='trunkHosts') await sql`UPDATE pta_trunk_hosts SET status=${status} WHERE id=${id}`;
      else return send(res,400,{error:'Invalid record type.'});
      return send(res,200,{ok:true,member});
    }
    return send(res,405,{error:'Method not allowed'});
  }catch(err){console.error(err);return send(res,500,{error:'PTA data service is not connected yet.'});}
}
