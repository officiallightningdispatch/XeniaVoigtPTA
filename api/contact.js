import { cleanText, jsonBody, send } from './_db.js';
import { sendFormEmails } from './_email.js';
export default async function handler(req,res){
 if(req.method!=='POST')return send(res,405,{error:'Method not allowed'});
 try{
  const b=jsonBody(req);
  if(b.website)return send(res,200,{ok:true});
  const name=cleanText(b.name,100),email=cleanText(b.email,180),topic=cleanText(b.topic,80),message=cleanText(b.message,3000);
  if(!name||!email||!topic||!message||!/^\S+@\S+\.\S+$/.test(email))return send(res,400,{error:'Please complete all fields with a valid email.'});
  const ok=await sendFormEmails({type:'PTA contact inquiry — '+topic,email,name,details:[['Name',name],['Email',email],['Category',topic],['Message',message]]});
  if(!ok)return send(res,503,{error:'Message service is temporarily unavailable. Please email info@xeniavoigtpta.org directly.'});
  return send(res,201,{ok:true,message:'Inquiry delivered to the PTA email inbox. A confirmation email has been requested.'});
 }catch(err){console.error(err);return send(res,500,{error:'Unable to send your message right now.'});}
}
