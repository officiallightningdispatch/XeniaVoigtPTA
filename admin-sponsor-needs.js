(()=> {
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/admin')return;
  const sessionKey='voigt-pta-board-session';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(n||0));

  async function fetchData(){
    const session=sessionStorage.getItem(sessionKey); if(!session)return null;
    const r=await fetch('/api/admin',{headers:{'x-admin-session':session},cache:'no-store'});
    if(!r.ok)return null;
    return r.json();
  }
  function badge(s){
    const labels={pledged:'Pledged / confirmed',pending_payment:'Pending payment',confirmed:'Confirmed',paid:'Paid / fulfilled',declined:'Declined'};
    return labels[s]||s;
  }
  async function render(){
    const root=document.getElementById('adminRoot'); if(!root)return false;
    const data=await fetchData(); if(!data)return false;
    const rows=data.sponsorships||[];
    let el=document.getElementById('specificNeedSponsorships');
    if(!el){el=document.createElement('section');el.id='specificNeedSponsorships';el.className='admin-card';root.appendChild(el);}
    const confirmed=rows.filter(x=>['pledged','confirmed','paid'].includes(x.status)).reduce((a,x)=>a+Number(x.amount||0),0);
    const pending=rows.filter(x=>x.status==='pending_payment').reduce((a,x)=>a+Number(x.amount||0),0);
    el.innerHTML=`<div class="admin-section-title"><h2>Specific-need sponsorships</h2><p>Website selections flow here automatically. Pledged, confirmed, and paid amounts count toward public fulfillment totals.</p></div>
      <div class="admin-finance-grid">
        <div class="admin-finance-card"><strong>${money(confirmed)}</strong><span>Pledged / confirmed / paid</span></div>
        <div class="admin-finance-card"><strong>${money(pending)}</strong><span>Pending payment</span></div>
        <div class="admin-finance-card"><strong>${rows.length}</strong><span>Total sponsorship records</span></div>
      </div>
      <div class="admin-table-card" style="overflow:auto;margin-top:14px"><table class="admin-table"><thead><tr><th>Need</th><th>Sponsor</th><th>Amount</th><th>Status</th><th>Recognition</th><th>Action</th></tr></thead><tbody>
      ${rows.length?rows.map(x=>`<tr><td><b>${esc(x.need_title)}</b><br><small>${new Date(x.created_at).toLocaleString()}</small></td><td>${esc(x.organization||x.donor_name)}<br><small>${esc(x.email)}</small></td><td><b>${money(x.amount)}</b></td><td>${esc(badge(x.status))}</td><td>${esc(x.recognition||'—')}</td><td><select data-sponsor-id="${x.id}" aria-label="Update sponsorship status"><option value="pledged" ${x.status==='pledged'?'selected':''}>Pledged / confirmed</option><option value="pending_payment" ${x.status==='pending_payment'?'selected':''}>Pending payment</option><option value="confirmed" ${x.status==='confirmed'?'selected':''}>Confirmed</option><option value="paid" ${x.status==='paid'?'selected':''}>Paid / fulfilled</option><option value="declined" ${x.status==='declined'?'selected':''}>Declined</option></select></td></tr>`).join(''):'<tr><td colspan="6">No specific-need sponsorship selections yet.</td></tr>'}
      </tbody></table></div>
      <div class="admin-callout" style="margin-top:12px"><strong>Drive sync:</strong> these records are the live website source. Pledged, confirmed, and paid totals sync to the dedicated Google Drive sponsorship tracker. A pledge counts as confirmed coverage; declined/cancelled support does not. <a href="https://docs.google.com/spreadsheets/d/1Uy_sdelXl_bGrhT38p-b_DjEJ2EQ1TDNMVfqHxDs3kw/edit" target="_blank" rel="noopener">Open live sponsorship sheet ↗</a></div>`;
    el.querySelectorAll('[data-sponsor-id]').forEach(sel=>sel.addEventListener('change',async e=>{
      const session=sessionStorage.getItem(sessionKey); const id=Number(e.target.dataset.sponsorId),status=e.target.value;
      e.target.disabled=true;
      try{
        const r=await fetch('/api/admin',{method:'PATCH',headers:{'Content-Type':'application/json','x-admin-session':session},body:JSON.stringify({kind:'sponsorships',id,status})});
        const j=await r.json().catch(()=>({})); if(!r.ok)throw new Error(j.error||'Update failed');
        await render();
      }catch(err){alert(err.message);e.target.disabled=false;}
    }));
    return true;
  }
  let attempts=0;
  const boot=setInterval(async()=>{attempts++; if(await render()||attempts>40)clearInterval(boot);},500);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
})();