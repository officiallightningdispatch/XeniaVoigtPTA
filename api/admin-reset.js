import { randomBytes, scryptSync, createHash } from 'node:crypto';
import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';

const INITIAL_SALT='voigt-board-2026-bootstrap-v1';
const INITIAL_HASH='9ca194f999c2a0093a833692e44e3fd171906896f4a5cc7e2fe9fd49c9844675cbce6fe042aaeeae35d08e87c6e1da2fdaccccda89659d48a41b1f544ea50f37';
const BOARD={
  nikki:{name:'Nikki Clark',role:'President',email:'voigtpta7@gmail.com'},
  john:{name:'John Clark',role:'Vice President',email:'john@5cconstruction.com'},
  veronica:{name:'Veronica Fabian',role:'Communications Chair & Secretary',email:'vmariefabian@gmail.com'},
  rudy:{name:'Rudy Martin Del Campo',role:'Treasurer',email:'r.delcampo13@gmail.com'},
  brittani:{name:'Brittani Simms',role:'Vice President of Community Engagement & Special Events',email:'brittanisimms203@gmail.com'}
};
const digest=value=>createHash('sha256').update(String(value||'')).digest('hex');
const hash=(password,salt)=>scryptSync(password,salt,64).toString('hex');
const generic={ok:true,message:'If the username is on the board access list, a secure reset link will be emailed to the address on file.'};

async function ensureResetSchema(sql){
  await ensureSchema(sql);
  for(const [username,member] of Object.entries(BOARD)){
    await sql`INSERT INTO pta_board_users (username,full_name,role,password_salt,password_hash,must_change_password)
      VALUES (${username},${member.name},${member.role},${INITIAL_SALT},${INITIAL_HASH},TRUE)
      ON CONFLICT (username) DO UPDATE SET full_name=EXCLUDED.full_name,role=EXCLUDED.role`;
  }
  await sql`CREATE TABLE IF NOT EXISTS pta_board_password_resets (
    token_hash TEXT PRIMARY KEY,
    username TEXT NOT NULL REFERENCES pta_board_users(username) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
  )`;
  await sql`DELETE FROM pta_board_password_resets WHERE expires_at<=NOW()`;
}
async function sendResetEmail(member,token){
  const key=process.env.RESEND_API_KEY;
  if(!key) throw new Error('Email service is not configured');
  const url='https://xeniavoigtpta.org/admin?reset='+encodeURIComponent(token);
  const text=`Hi ${member.name},

Use this secure link to create a new password for the Xenia Voigt PTA board dashboard:
${url}

The link expires in 30 minutes and can be used once. If you did not request it, ignore this email.

Xenia Voigt Arts Academy PTA`;
  const html=`<!doctype html><html><body style="font-family:Arial,sans-serif;line-height:1.5;color:#222"><p>Hi ${member.name},</p><p>Use this secure link to create a new password for the Xenia Voigt PTA board dashboard:</p><p><a href="${url}">Set your board dashboard password</a></p><p>The link expires in 30 minutes and can be used once. If you did not request it, ignore this email.</p><p>Xenia Voigt Arts Academy PTA</p></body></html>`;
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from:'Xenia Voigt Arts Academy PTA <info@xeniavoigtpta.org>',to:[member.email],subject:'Reset your Voigt PTA board dashboard password',text,html})});
  if(!response.ok) throw new Error(`Reset email delivery failed: ${response.status}`);
}
export default async function handler(req,res){
  try{
    if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});
    const sql=db(); await ensureResetSchema(sql);
    const body=jsonBody(req),action=cleanText(body.action,40);
    if(action==='request-reset'){
      const username=cleanText(body.username,80).toLowerCase();
      const member=BOARD[username];
      if(member){
        const rows=await sql`SELECT COUNT(*)::int AS n FROM pta_board_password_resets WHERE username=${username} AND created_at>NOW()-INTERVAL '10 minutes'`;
        if(Number(rows[0]?.n||0)<3){
          const token=randomBytes(32).toString('hex');
          await sql`DELETE FROM pta_board_password_resets WHERE username=${username}`;
          await sql`INSERT INTO pta_board_password_resets (token_hash,username,expires_at) VALUES (${digest(token)},${username},NOW()+INTERVAL '30 minutes')`;
          await sendResetEmail(member,token);
        }
      }
      return send(res,200,generic);
    }
    if(action==='reset-password'){
      const token=cleanText(body.token,200),password=String(body.newPassword||'');
      if(!token||password.length<12)return send(res,400,{error:'Use a reset link and choose a password with at least 12 characters.'});
      const rows=await sql`DELETE FROM pta_board_password_resets WHERE token_hash=${digest(token)} AND expires_at>NOW() RETURNING username`;
      if(!rows[0])return send(res,400,{error:'This reset link has expired or has already been used. Request a new link.'});
      const salt=randomBytes(24).toString('hex');
      await sql`UPDATE pta_board_users SET password_salt=${salt},password_hash=${hash(password,salt)},must_change_password=FALSE,updated_at=NOW() WHERE username=${rows[0].username}`;
      await sql`DELETE FROM pta_board_sessions WHERE username=${rows[0].username}`;
      const raw=randomBytes(32).toString('hex');
      await sql`INSERT INTO pta_board_sessions (token_hash,username,expires_at) VALUES (${digest(raw)},${rows[0].username},NOW()+INTERVAL '8 hours')`;
      const users=await sql`SELECT username,full_name,role FROM pta_board_users WHERE username=${rows[0].username} LIMIT 1`;
      const u=users[0];
      return send(res,200,{ok:true,session:raw,member:{username:u.username,firstName:u.full_name.split(' ')[0],fullName:u.full_name,role:u.role}});
    }
    return send(res,400,{error:'Invalid action.'});
  }catch(error){console.error('Board password reset failed:',error);return send(res,500,{error:'Unable to process this request right now. Please try again shortly.'});}
}
