import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';
import { sendFormEmails } from './_email.js';

export default async function handler(req,res){
  if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});
  try{
    const body=jsonBody(req);
    const email=cleanText(body.email,320).toLowerCase();
    if(!email||!email.includes('@')) return send(res,400,{error:'Enter a valid email address.'});
    const source=cleanText(body.source,160);
    const sql=db(); await ensureSchema(sql);
    await sql`INSERT INTO pta_newsletter (email,source) VALUES (${email},${source}) ON CONFLICT (email) DO UPDATE SET source=EXCLUDED.source`;
    await sendFormEmails({type:'newsletter signup',email,details:[['Email',email],['Source',source]]});
    return send(res,201,{ok:true});
  }catch(err){console.error(err);return send(res,500,{error:'Newsletter signup is not configured yet.'});}
}
