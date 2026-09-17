const PTA_EMAIL='info@xeniavoigtpta.org';
const FROM='Voigt PTA Website <website@xeniavoigtpta.org>';

function esc(value=''){
  return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

export async function sendFormEmails({type,email,name='',details=[]}){
  const key=process.env.RESEND_API_KEY;
  if(!key){ console.warn('RESEND_API_KEY is not configured; skipping email notification.'); return false; }
  const rows=details.filter(([,v])=>v!==undefined&&v!==null&&String(v).trim()!=='');
  const summary=rows.map(([k,v])=>`${k}: ${v}`).join('\n');
  const htmlRows=rows.map(([k,v])=>`<tr><td style="padding:6px 10px;font-weight:700;vertical-align:top">${esc(k)}</td><td style="padding:6px 10px">${esc(v)}</td></tr>`).join('');
  const request=async(payload)=>{
    const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify(payload)});
    if(!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
  };
  try{
    await request({from:FROM,to:[PTA_EMAIL],reply_to:email?[email]:undefined,subject:`New website submission: ${type}`,text:`A new ${type} submission was received.\n\n${summary}`,html:`<!doctype html><html><body style="font-family:Arial,sans-serif;color:#222"><h2>New ${esc(type)} submission</h2><table>${htmlRows}</table><p>This submission is also saved in the Board Dashboard.</p></body></html>`});
    if(email){
      await request({from:FROM,to:[email],reply_to:[PTA_EMAIL],subject:`We received your ${type} submission`,text:`${name?`Hi ${name},\n\n`:''}Thank you. The Xenia Voigt Arts Academy PTA received your ${type} submission. We’ll follow up if anything else is needed.\n\nXenia Voigt Arts Academy PTA\n${PTA_EMAIL}`,html:`<!doctype html><html><body style="font-family:Arial,sans-serif;color:#222"><p>${name?`Hi ${esc(name)},`:''}</p><p>Thank you. The Xenia Voigt Arts Academy PTA received your ${esc(type)} submission. We’ll follow up if anything else is needed.</p><p>Xenia Voigt Arts Academy PTA<br>${PTA_EMAIL}</p></body></html>`});
    }
    return true;
  }catch(err){ console.error('Form email notification failed',err); return false; }
}
