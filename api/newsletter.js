import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';
import { sendFormEmails } from './_email.js';

export default async function handler(req,res){
  if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});
  try{
    const body=jsonBody(req);
    if(body.topic){
      const name=cleanText(body.name,100),email=cleanText(body.email,180),topic=cleanText(body.topic,80),message=cleanText(body.message,3000);
      if(!name||!email||!topic||!message||!/^\S+@\S+\.\S+$/.test(email))return send(res,400,{error:'Please complete all fields with a valid email.'});
      const delivered=await sendFormEmails({type:'PTA contact inquiry — '+topic,email,name,details:[['Name',name],['Email',email],['Category',topic],['Message',message]]});
      if(!delivered)return send(res,503,{error:'Contact email service unavailable. Please email info@xeniavoigtpta.org directly.'});
      return send(res,201,{ok:true});
    }
    const email=cleanText(body.email,320).toLowerCase();
    if(!email||!email.includes('@')) return send(res,400,{error:'Enter a valid email address.'});
    const source=cleanText(body.source,160);
    const sql=db(); await ensureSchema(sql);
    await sql`INSERT INTO pta_newsletter (email,source) VALUES (${email},${source}) ON CONFLICT (email) DO UPDATE SET source=EXCLUDED.source`;
    await sendFormEmails({type:'newsletter signup',email,details:[['Email',email],['Source',source]]});
    return send(res,201,{ok:true});
  }catch(err){console.error(err);return send(res,500,{error:'Newsletter signup is not configured yet.'});}
}
