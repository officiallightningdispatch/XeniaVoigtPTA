import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';
import { sendFormEmails } from './_email.js';

export default async function handler(req,res){
  if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});
  try{
    const body=jsonBody(req);
    const email=cleanText(body.email,320);
    const firstName=cleanText(body.firstName,120);
    const lastName=cleanText(body.lastName,120);
    if(!email||!firstName||!lastName) return send(res,400,{error:'Name and email are required.'});
    const phone=cleanText(body.phone,80), event=cleanText(body.event,240);
    const sql=db(); await ensureSchema(sql);
    await sql`INSERT INTO pta_volunteers (first_name,last_name,email,phone,event,payload)
      VALUES (${firstName},${lastName},${email},${phone},${event},${JSON.stringify(body)}::jsonb)`;
    await sendFormEmails({type:'volunteer form',email,name:firstName,details:[['Name',`${firstName} ${lastName}`],['Email',email],['Phone',phone],['Event / interest',event]]});
    return send(res,201,{ok:true});
  }catch(err){console.error(err);return send(res,500,{error:'Volunteer submission service is not configured yet.'});}
}
