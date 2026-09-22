import { createHash, randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';
import { db, ensureSchema, cleanText, jsonBody, send } from './_db.js';

const digestToken=t=>createHash('sha256').update(String(t||'')).digest('hex');
const key=()=>createHash('sha256').update(String(process.env.DATABASE_URL||'')+'|voigt-pta-bank-setup-v1').digest();

function encrypt(obj){
  const iv=randomBytes(12);
  const cipher=createCipheriv('aes-256-gcm',key(),iv);
  const data=Buffer.concat([cipher.update(JSON.stringify(obj),'utf8'),cipher.final()]);
  const tag=cipher.getAuthTag();
  return [iv.toString('base64'),tag.toString('base64'),data.toString('base64')].join('.');
}
function decrypt(blob){
  if(!blob)return {};
  const [ivB64,tagB64,dataB64]=String(blob).split('.');
  const decipher=createDecipheriv('aes-256-gcm',key(),Buffer.from(ivB64,'base64'));
  decipher.setAuthTag(Buffer.from(tagB64,'base64'));
  const out=Buffer.concat([decipher.update(Buffer.from(dataB64,'base64')),decipher.final()]).toString('utf8');
  return JSON.parse(out);
}
async function sessionMember(sql,req){
  const token=String(req.headers['x-admin-session']||'').trim();
  if(!token)return null;
  const rows=await sql`SELECT u.username,u.full_name,u.role,u.must_change_password
    FROM pta_board_sessions s JOIN pta_board_users u ON u.username=s.username
    WHERE s.token_hash=${digestToken(token)} AND s.expires_at>NOW() LIMIT 1`;
  if(!rows[0])return null;
  const r=rows[0];
  return {username:r.username,fullName:r.full_name,role:r.role,mustChangePassword:r.must_change_password};
}
const canManage=member=>member && ['President','Treasurer'].includes(member.role);
const last4=v=>String(v||'').replace(/\D/g,'').slice(-4);

export default async function handler(req,res){
  try{
    const sql=db(); await ensureSchema(sql);
    const member=await sessionMember(sql,req);
    if(!member)return send(res,401,{error:'Please sign in to the PTA board dashboard.'});
    if(member.mustChangePassword)return send(res,403,{error:'Password change required.'});

    const rows=await sql`SELECT encrypted_blob,status,updated_at,updated_by FROM pta_bank_setup WHERE id=1 LIMIT 1`;
    const current=rows[0];

    if(req.method==='GET'){
      if(!current)return send(res,200,{status:'not_started',authorized:canManage(member),member});
      let details={};
      try{details=decrypt(current.encrypted_blob);}catch{}
      const masked={
        bankName:details.bankName||'',
        accountHolder:details.accountHolder||'',
        accountType:details.accountType||'',
        accountLast4:last4(details.accountNumber),
        routingLast4:last4(details.routingNumber),
        authorizedSigner:details.authorizedSigner||'',
        signerTitle:details.signerTitle||'',
        signerEmail:details.signerEmail||'',
        signerPhone:details.signerPhone||'',
        legalName:details.legalName||'',
        einLast4:last4(details.ein)
      };
      return send(res,200,{status:current.status||'saved',authorized:canManage(member),member,updatedAt:current.updated_at,updatedBy:current.updated_by,details:canManage(member)?details:masked});
    }

    if(req.method==='POST'){
      if(!canManage(member))return send(res,403,{error:'Only the PTA President or Treasurer can enter or update banking details.'});
      const b=jsonBody(req);
      const details={
        legalName:cleanText(b.legalName,180),
        ein:cleanText(b.ein,30),
        bankName:cleanText(b.bankName,180),
        accountHolder:cleanText(b.accountHolder,180),
        routingNumber:cleanText(b.routingNumber,20),
        accountNumber:cleanText(b.accountNumber,40),
        accountType:cleanText(b.accountType,40),
        authorizedSigner:cleanText(b.authorizedSigner,180),
        signerTitle:cleanText(b.signerTitle,100),
        signerEmail:cleanText(b.signerEmail,180),
        signerPhone:cleanText(b.signerPhone,80),
        notes:cleanText(b.notes,1000)
      };
      if(!details.legalName||!details.bankName||!details.accountHolder||!details.routingNumber||!details.accountNumber||!details.accountType||!details.authorizedSigner||!details.signerEmail){
        return send(res,400,{error:'Please complete all required banking setup fields.'});
      }
      if(!/^\d{9}$/.test(details.routingNumber.replace(/\D/g,'')))return send(res,400,{error:'Routing number should be 9 digits.'});
      if(details.accountNumber.replace(/\D/g,'').length<4)return send(res,400,{error:'Please enter a valid account number.'});
      const blob=encrypt(details);
      await sql`INSERT INTO pta_bank_setup (id,encrypted_blob,status,updated_at,updated_by)
        VALUES (1,${blob},'details_saved',NOW(),${member.username})
        ON CONFLICT (id) DO UPDATE SET encrypted_blob=EXCLUDED.encrypted_blob,status='details_saved',updated_at=NOW(),updated_by=EXCLUDED.updated_by`;
      return send(res,200,{ok:true,status:'details_saved',message:'Banking details were saved securely for donation setup.'});
    }

    if(req.method==='DELETE'){
      if(!canManage(member))return send(res,403,{error:'Only the PTA President or Treasurer can clear banking details.'});
      await sql`DELETE FROM pta_bank_setup WHERE id=1`;
      return send(res,200,{ok:true,status:'not_started'});
    }

    return send(res,405,{error:'Method not allowed'});
  }catch(err){
    console.error(err);
    return send(res,500,{error:'Banking setup service is temporarily unavailable.'});
  }
}
