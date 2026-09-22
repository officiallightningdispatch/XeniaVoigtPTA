import { randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';
import { sendVendorConfirmation } from './_email.js';

const INITIAL_SALT='voigt-board-2026-bootstrap-v1';
const INITIAL_HASH='9ca194f999c2a0093a833692e44e3fd171906896f4a5cc7e2fe9fd49c9844675cbce6fe042aaeeae35d08e87c6e1da2fdaccccda89659d48a41b1f544ea50f37';
const BOARD = {
  nikki: { firstName: 'Nikki', fullName: 'Nikki Clark', role: 'President' },
  john: { firstName: 'John', fullName: 'John Clark', role: 'Vice President' },
  veronica: { firstName: 'Veronica', fullName: 'Veronica Fabian', role: 'Communications Chair & Secretary' },
  rudy: { firstName: 'Rudy', fullName: 'Rudy Martin Del Campo', role: 'Treasurer' },
  brittani: { firstName: 'Brittani', fullName: 'Brittani Simms', role: 'Vice President of Community Engagement & Special Events' }
};

const digestToken=t=>createHash('sha256').update(String(t||'')).digest('hex');
const hashPassword=(password,salt)=>scryptSync(password,salt,64).toString('hex');
function verifyPassword(password,salt,stored){
  try{
    const actual=Buffer.from(hashPassword(password,salt),'hex');
    const expected=Buffer.from(stored,'hex');
    return actual.length===expected.length && timingSafeEqual(actual,expected);
  }catch{return false;}
}
function newPasswordRecord(password){
  const salt=randomBytes(24).toString('hex');
  return {salt,hash:hashPassword(password,salt)};
}

async function ensureBoardUsers(sql){
  for(const [username,member] of Object.entries(BOARD)){
    await sql`INSERT INTO pta_board_users (username,full_name,role,password_salt,password_hash,must_change_password)
      VALUES (${username},${member.fullName},${member.role},${INITIAL_SALT},${INITIAL_HASH},TRUE)
      ON CONFLICT (username) DO UPDATE SET full_name=EXCLUDED.full_name,role=EXCLUDED.role`;
  }
  await sql`DELETE FROM pta_board_sessions WHERE expires_at<=NOW()`;
}

async function createSession(sql,username){
  const token=randomBytes(32).toString('hex');
  await sql`INSERT INTO pta_board_sessions (token_hash,username,expires_at)
    VALUES (${digestToken(token)},${username},NOW()+INTERVAL '8 hours')`;
  return token;
}

async function sessionMember(sql,req){
  const token=String(req.headers['x-admin-session']||'').trim();
  if(!token) return null;
  const rows=await sql`SELECT u.username,u.full_name,u.role,u.must_change_password
    FROM pta_board_sessions s JOIN pta_board_users u ON u.username=s.username
    WHERE s.token_hash=${digestToken(token)} AND s.expires_at>NOW() LIMIT 1`;
  if(!rows[0]) return null;
  const r=rows[0];
  return {username:r.username,firstName:r.full_name.split(' ')[0],fullName:r.full_name,role:r.role,mustChangePassword:r.must_change_password};
}

async function handleLogin(sql,body,res){
  const username=cleanText(body.username,80).toLowerCase();
  const password=String(body.password||'');
  if(!username||!password) return send(res,400,{error:'Username and password are required.'});
  const rows=await sql`SELECT username,full_name,role,password_salt,password_hash,must_change_password FROM pta_board_users WHERE username=${username} LIMIT 1`;
  const user=rows[0];
  if(!user || !verifyPassword(password,user.password_salt,user.password_hash)) return send(res,401,{error:'Invalid username or password.'});
  const session=await createSession(sql,username);
  return send(res,200,{ok:true,session,mustChangePassword:user.must_change_password,member:{username,firstName:user.full_name.split(' ')[0],fullName:user.full_name,role:user.role}});
}

async function handlePasswordChange(sql,req,body,res){
  const member=await sessionMember(sql,req);
  if(!member) return send(res,401,{error:'Your session has expired. Please sign in again.'});
  const newPassword=String(body.newPassword||'');
  if(newPassword.length<10) return send(res,400,{error:'Choose a password with at least 10 characters.'});
  if(verifyPassword(newPassword,INITIAL_SALT,INITIAL_HASH)) return send(res,400,{error:'Please choose a password different from the temporary password.'});
  const {salt,hash}=newPasswordRecord(newPassword);
  await sql`UPDATE pta_board_users SET password_salt=${salt},password_hash=${hash},must_change_password=FALSE,updated_at=NOW() WHERE username=${member.username}`;
  await sql`DELETE FROM pta_board_sessions WHERE username=${member.username}`;
  const session=await createSession(sql,member.username);
  return send(res,200,{ok:true,session,member:{...member,mustChangePassword:false}});
}

export default async function handler(req,res){
  try{
    const sql=db();
    await ensureSchema(sql);
    await ensureBoardUsers(sql);
    const body=req.method==='POST'||req.method==='PATCH'?jsonBody(req):{};

    if(req.method==='POST' && body.action==='login') return handleLogin(sql,body,res);
    if(req.method==='POST' && body.action==='change-password') return handlePasswordChange(sql,req,body,res);
    if(req.method==='POST' && body.action==='logout'){
      const token=String(req.headers['x-admin-session']||'').trim();
      if(token) await sql`DELETE FROM pta_board_sessions WHERE token_hash=${digestToken(token)}`;
      return send(res,200,{ok:true});
    }

    const member=await sessionMember(sql,req);
    if(!member) return send(res,401,{error:'Please sign in to the PTA board dashboard.'});
    if(member.mustChangePassword) return send(res,403,{error:'Password change required.',mustChangePassword:true});

    if(req.method==='GET'){
      const volunteers=await sql`SELECT id,created_at,status,first_name,last_name,email,phone,event,payload FROM pta_volunteers ORDER BY created_at DESC LIMIT 500`;
      const vendors=await sql`SELECT id,created_at,status,business_name,contact_name,email,phone,payload,confirmed_at,confirmed_by,confirmation_email_sent_at FROM pta_vendors ORDER BY created_at DESC LIMIT 500`;
      const trunkHosts=await sql`SELECT id,created_at,status,host_name,host_type,grade_org,email,phone,theme,vehicle_type,payload FROM pta_trunk_hosts ORDER BY created_at DESC LIMIT 500`;
      const newsletter=await sql`SELECT id,created_at,email,source FROM pta_newsletter ORDER BY created_at DESC LIMIT 1000`;
      const sponsorships=await sql`SELECT id,created_at,updated_at,need_id,need_title,amount::float,status,donor_name,organization,email,phone,recognition,notes,payment_reference,paid_at FROM pta_sponsorships ORDER BY created_at DESC LIMIT 500`;
      return send(res,200,{member,volunteers,vendors,trunkHosts,newsletter,sponsorships});
    }
    if(req.method==='PATCH'){
      const id=Number(body.id); const kind=cleanText(body.kind,40); const status=cleanText(body.status,40);
      const allowed=new Set(['new','reviewing','approved','contacted','closed','pending','pending_payment','pledged','confirmed','paid','declined']);
      if(!id||!allowed.has(status)) return send(res,400,{error:'Invalid update.'});
      if(kind==='volunteers') await sql`UPDATE pta_volunteers SET status=${status} WHERE id=${id}`;
      else if(kind==='vendors'){
        if(status==='confirmed'){
          const rows=await sql`SELECT id,status,business_name,contact_name,email,payload,confirmation_email_sent_at FROM pta_vendors WHERE id=${id} LIMIT 1`;
          const vendor=rows[0];
          if(!vendor) return send(res,404,{error:'Vendor application not found.'});
          if(vendor.status!=='confirmed'){
            await sendVendorConfirmation({email:vendor.email,contactName:vendor.contact_name,businessName:vendor.business_name,payload:vendor.payload||{}});
            await sql`UPDATE pta_vendors SET status='confirmed',confirmed_at=NOW(),confirmed_by=${member.username},confirmation_email_sent_at=NOW() WHERE id=${id}`;
          }
        } else {
          await sql`UPDATE pta_vendors SET status=${status} WHERE id=${id}`;
        }
      }
      else if(kind==='trunkHosts') await sql`UPDATE pta_trunk_hosts SET status=${status} WHERE id=${id}`;
      else if(kind==='sponsorships'){
        if(status==='paid') await sql`UPDATE pta_sponsorships SET status='paid',paid_at=COALESCE(paid_at,NOW()),updated_at=NOW() WHERE id=${id}`;
        else await sql`UPDATE pta_sponsorships SET status=${status},updated_at=NOW() WHERE id=${id}`;
      }
      else return send(res,400,{error:'Invalid record type.'});
      return send(res,200,{ok:true,member});
    }
    return send(res,405,{error:'Method not allowed'});
  }catch(err){console.error(err);return send(res,500,{error:'PTA data service is not connected yet.'});}
}
