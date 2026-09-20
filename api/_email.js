const PTA_EMAIL='info@xeniavoigtpta.org';
const FROM='Xenia Voigt Arts Academy PTA <info@xeniavoigtpta.org>';

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


export async function sendVendorConfirmation({email,contactName,businessName,payload={}}){
  const key=process.env.RESEND_API_KEY;
  if(!key) throw new Error('RESEND_API_KEY is not configured');
  const businessType=payload.businessType||'Vendor';
  const offering=payload.offering||'As submitted in your application';
  const electricity=payload.electricity||'No special electrical needs listed';
  const setupNeeds=payload.setupNeeds||'No special setup needs listed';
  const subject="You’re Confirmed! 🎉 Voigt Viking Quest Fall Festival — October 23";
  const text=`Hi ${contactName},

We’re excited to officially confirm ${businessName} as a vendor for the 2026 Xenia Voigt Arts Academy PTA Viking Quest Fall Festival!

EVENT DETAILS
Friday, October 23, 2026
5:30–7:30 PM
Xenia Voigt Arts Academy
1201 Cushing Drive
Round Rock, TX 78664

VENDOR ARRIVAL & SETUP
Vendor check-in and setup instructions, including your assigned location and arrival window, will be provided before the event. Please plan to have your setup fully ready before the festival opens at 5:30 PM.

YOUR APPROVED VENDOR INFORMATION
Business: ${businessName}
Vendor Type: ${businessType}
Offering: ${offering}
Electrical Needs: ${electricity}
Setup Needs: ${setupNeeds}

As agreed in your vendor application, participating vendors will contribute 10% of their total event sales to Xenia Voigt Arts Academy PTA following the festival. Instructions for reporting sales and submitting the PTA contribution will be provided with the final vendor information.

Please remember that vendors are responsible for maintaining any licenses, permits, insurance, food-safety documentation, inspections, or other requirements applicable to their operation and the event.

Closer to October 23, we’ll send your Vendor Event Packet with final arrival/check-in instructions, parking and unloading information, your vendor location, campus layout, day-of contact information, and any additional event-specific details.

We’re thrilled to have ${businessName} joining our Viking Quest and helping us create an incredible evening for our Voigt students, families, and community.

Welcome to the 2026 Viking Quest Fall Festival! ❤️🖤

Warmly,
Brittani Simms
Vice President of Community Engagement & Special Events
Xenia Voigt Arts Academy PTA
${PTA_EMAIL}`;
  const html=`<!doctype html><html><body style="font-family:Arial,sans-serif;color:#222;line-height:1.55"><p>Hi ${esc(contactName)},</p><p>We’re excited to officially confirm <strong>${esc(businessName)}</strong> as a vendor for the <strong>2026 Xenia Voigt Arts Academy PTA Viking Quest Fall Festival!</strong></p><h3>Event Details</h3><p>Friday, October 23, 2026<br>5:30–7:30 PM<br>Xenia Voigt Arts Academy<br>1201 Cushing Drive<br>Round Rock, TX 78664</p><h3>Vendor Arrival &amp; Setup</h3><p>Vendor check-in and setup instructions, including your assigned location and arrival window, will be provided before the event. Please plan to have your setup fully ready before the festival opens at 5:30 PM.</p><h3>Your Approved Vendor Information</h3><p><strong>Business:</strong> ${esc(businessName)}<br><strong>Vendor Type:</strong> ${esc(businessType)}<br><strong>Offering:</strong> ${esc(offering)}<br><strong>Electrical Needs:</strong> ${esc(electricity)}<br><strong>Setup Needs:</strong> ${esc(setupNeeds)}</p><p>As agreed in your vendor application, participating vendors will contribute <strong>10% of their total event sales</strong> to Xenia Voigt Arts Academy PTA following the festival. Instructions for reporting sales and submitting the PTA contribution will be provided with the final vendor information.</p><p>Please remember that vendors are responsible for maintaining any licenses, permits, insurance, food-safety documentation, inspections, or other requirements applicable to their operation and the event.</p><p>Closer to October 23, we’ll send your <strong>Vendor Event Packet</strong> with final arrival/check-in instructions, parking and unloading information, your vendor location, campus layout, day-of contact information, and any additional event-specific details.</p><p>We’re thrilled to have ${esc(businessName)} joining our Viking Quest and helping us create an incredible evening for our Voigt students, families, and community.</p><p><strong>Welcome to the 2026 Viking Quest Fall Festival! ❤️🖤</strong></p><p>Warmly,<br>Brittani Simms<br>Vice President of Community Engagement &amp; Special Events<br>Xenia Voigt Arts Academy PTA<br>${PTA_EMAIL}</p></body></html>`;
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from:FROM,to:[email],reply_to:[PTA_EMAIL],subject,text,html})});
  if(!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
  return true;
}
