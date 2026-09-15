import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';

export default async function handler(req,res){
  if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});
  try{
    const body=jsonBody(req);
    const email=cleanText(body.email,320).toLowerCase();
    if(!email||!email.includes('@')) return send(res,400,{error:'Enter a valid email address.'});
    const sql=db(); await ensureSchema(sql);
    await sql`INSERT INTO pta_newsletter (email,source) VALUES (${email},${cleanText(body.source,160)}) ON CONFLICT (email) DO UPDATE SET source=EXCLUDED.source`;
    return send(res,201,{ok:true});
  }catch(err){console.error(err);return send(res,500,{error:'Newsletter signup is not configured yet.'});}
}
