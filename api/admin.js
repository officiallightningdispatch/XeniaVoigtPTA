import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';

function authorized(req){
  const expected=process.env.ADMIN_KEY;
  if(!expected) return false;
  return req.headers['x-admin-key']===expected;
}

export default async function handler(req,res){
  if(!authorized(req)) return send(res,401,{error:'Invalid admin access key.'});
  try{
    const sql=db(); await ensureSchema(sql);
    if(req.method==='GET'){
      const volunteers=await sql`SELECT id,created_at,status,first_name,last_name,email,phone,event,payload FROM pta_volunteers ORDER BY created_at DESC LIMIT 500`;
      const vendors=await sql`SELECT id,created_at,status,business_name,contact_name,email,phone,payload FROM pta_vendors ORDER BY created_at DESC LIMIT 500`;
      const newsletter=await sql`SELECT id,created_at,email,source FROM pta_newsletter ORDER BY created_at DESC LIMIT 1000`;
      return send(res,200,{volunteers,vendors,newsletter});
    }
    if(req.method==='PATCH'){
      const body=jsonBody(req); const id=Number(body.id); const kind=cleanText(body.kind,40); const status=cleanText(body.status,40);
      const allowed=new Set(['new','reviewing','approved','contacted','closed']);
      if(!id||!allowed.has(status)) return send(res,400,{error:'Invalid update.'});
      if(kind==='volunteers') await sql`UPDATE pta_volunteers SET status=${status} WHERE id=${id}`;
      else if(kind==='vendors') await sql`UPDATE pta_vendors SET status=${status} WHERE id=${id}`;
      else return send(res,400,{error:'Invalid record type.'});
      return send(res,200,{ok:true});
    }
    return send(res,405,{error:'Method not allowed'});
  }catch(err){console.error(err);return send(res,500,{error:'Admin data service is not configured yet.'});}
}
