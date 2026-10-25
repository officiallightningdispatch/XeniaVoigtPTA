import {createHash} from 'node:crypto';
import {db,ensureSchema,cleanText,jsonBody,send} from './_db.js';
const MAX=1400000;
async function reviewer(sql,req){
 const token=String(req.headers['x-admin-session']||'');
 if(!token)return '';
 const digest=createHash('sha256').update(token).digest('hex');
 const rows=await sql`SELECT u.username FROM pta_board_sessions s JOIN pta_board_users u ON u.username=s.username WHERE s.token_hash=${digest} AND s.expires_at>NOW() AND u.must_change_password=FALSE LIMIT 1`;
 return rows[0]?.username||'';
}
export default async function handler(req,res){
 try{
  const sql=db();await ensureSchema(sql);
  const action=String(req.query?.action||'');
  if(req.method==='POST'&&action==='submit'){
   const body=jsonBody(req);
   const name=cleanText(body.name,100),email=cleanText(body.email,180),caption=cleanText(body.caption,250);
   if(body.event!=='viking-quest-2026'||!name||!/^\S+@\S+\.\S+$/.test(email)||body.permission!==true)return send(res,400,{error:'Name, email, event, and photo permission are required.'});
   if(body.website)return send(res,200,{ok:true});
   const input=String(body.image||'');
   const match=/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(input);
   if(!match||match[2].length>MAX*1.5)return send(res,400,{error:'Please upload a JPEG, PNG, or WebP under 1.4 MB.'});
   const bytes=Buffer.from(match[2],'base64');
   if(!bytes.length||bytes.length>MAX)return send(res,400,{error:'Please select a smaller photo.'});
   const valid=match[1]==='jpeg'?bytes[0]===255&&bytes[1]===216:match[1]==='png'?bytes[0]===137&&bytes[1]===80:bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP';
   if(!valid)return send(res,400,{error:'Invalid image file.'});
   await sql`INSERT INTO pta_event_photos(event_slug,submitter_name,submitter_email,caption,image_data,mime_type) VALUES (${body.event},${name},${email},${caption},${bytes},${'image/'+match[1]})`;
   return send(res,201,{ok:true});
  }
  if(req.method==='GET'&&action==='approved'){
   const rows=await sql`SELECT id,caption FROM pta_event_photos WHERE event_slug='viking-quest-2026' AND status='approved' ORDER BY created_at DESC LIMIT 80`;
   return send(res,200,{photos:rows.map(r=>({id:r.id,caption:r.caption,url:'/api/event-photos?action=image&id='+r.id}))});
  }
  if(req.method==='GET'&&action==='image'){
   const id=Number(req.query.id);
   if(!Number.isSafeInteger(id)||id<1)return send(res,400,{error:'Invalid photo.'});
   const rows=await sql`SELECT mime_type,image_data,status FROM pta_event_photos WHERE id=${id} LIMIT 1`;
   const photo=rows[0];
   if(!photo)return send(res,404,{error:'Not found'});
   if(photo.status!=='approved'&&!await reviewer(sql,req))return send(res,404,{error:'Not found'});
   res.setHeader('Content-Type',photo.mime_type);
   res.setHeader('Cache-Control','private,no-store');
   res.setHeader('X-Content-Type-Options','nosniff');
   return res.status(200).end(photo.image_data);
  }
  const who=await reviewer(sql,req);
  if(!who)return send(res,401,{error:'Board sign-in required.'});
  if(req.method==='GET'&&action==='queue'){
   const rows=await sql`SELECT id,event_slug,submitter_name,submitter_email,caption,status,created_at FROM pta_event_photos ORDER BY created_at DESC LIMIT 200`;
   return send(res,200,{photos:rows});
  }
  if(req.method==='POST'&&action==='review'){
   const body=jsonBody(req),id=Number(body.id),status=String(body.status||'');
   if(!Number.isSafeInteger(id)||id<1||!['approved','rejected'].includes(status))return send(res,400,{error:'Invalid review.'});
   const changed=await sql`UPDATE pta_event_photos SET status=${status},reviewed_at=NOW(),reviewed_by=${who} WHERE id=${id} RETURNING id`;
   return send(res,changed.length?200:404,{ok:!!changed.length});
  }
  return send(res,405,{error:'Unsupported action'});
 }catch(error){return send(res,500,{error:'Photo service unavailable. Please try again.'});}
}
