(()=> {
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/donate')return;

  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(n||0));
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const style=document.createElement('style');
  style.textContent=`
    .need-shell{margin-top:24px}
    .need-head{display:flex;justify-content:space-between;gap:16px;align-items:end;margin-bottom:16px}
    .need-head p{max-width:760px}
    .need-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
    .need-card{background:#fff;border:2px solid #171717;border-radius:22px;padding:20px;box-shadow:6px 6px 0 #171717;display:flex;flex-direction:column;gap:12px}
    .need-card.fulfilled{opacity:.72}
    .need-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
    .need-category,.need-priority{font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
    .need-priority{background:#171717;color:#fff;border-radius:999px;padding:5px 8px;white-space:nowrap}
    .need-card h3{margin:0;font-size:23px}
    .need-status-line{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:4px}
    .need-stat{background:#f7f7f7;border-radius:12px;padding:10px 8px;text-align:center}
    .need-stat small{display:block;font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:#666;margin-bottom:3px}
    .need-stat strong{font-size:15px;line-height:1.15}
    .need-covered-note{font-size:13px;font-weight:800;background:#fff3f3;border:1px solid #d71920;border-radius:12px;padding:9px 11px}
    .need-outreach{font-size:12px;font-weight:900;letter-spacing:.03em;text-transform:uppercase;background:#f3f3f3;border-radius:10px;padding:8px 10px}
    .need-meter{height:12px;background:#ececec;border:1px solid #171717;border-radius:999px;overflow:hidden}
    .need-meter span{display:block;height:100%;background:#d71920}
    .need-numbers{display:flex;justify-content:space-between;gap:12px;font-size:13px;font-weight:800}
    .need-detail{background:#f7f7f7;border-radius:14px;padding:13px}
    .need-detail b{display:block;margin-bottom:4px}
    .need-card button{margin-top:auto}
    .need-modal{position:fixed;inset:0;background:rgba(0,0,0,.68);z-index:9999;display:none;padding:18px;overflow:auto}
    .need-modal.open{display:block}
    .need-dialog{max-width:760px;margin:30px auto;background:#fff;border-radius:26px;border:2px solid #171717;padding:24px;position:relative}
    .need-close{position:absolute;right:15px;top:12px;background:none;border:0;font-size:30px;cursor:pointer}
    .need-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px}
    .need-form-grid label{display:flex;flex-direction:column;gap:6px;font-weight:800;font-size:14px}
    .need-form-grid input,.need-form-grid select,.need-form-grid textarea{border:2px solid #171717;border-radius:12px;padding:12px;font:inherit}
    .need-form-grid .full{grid-column:1/-1}
    .need-form-grid textarea{min-height:100px}
    .need-summary{background:#171717;color:#fff;border-radius:18px;padding:18px;margin:14px 0}
    .need-summary p{color:#eee;margin:6px 0}
    @media(max-width:760px){.need-grid,.need-form-grid{grid-template-columns:1fr}.need-form-grid .full{grid-column:auto}.need-head{display:block}}
  `;
  document.head.appendChild(style);

  const main=document.querySelector('main#main');
  if(!main)return;
  const section=document.createElement('section');
  section.className='section need-shell';
  section.id='sponsor-current-need';
  section.innerHTML=`<div class="container"><div class="need-head"><div><span class="mini-label">SPONSOR A CURRENT NEED</span><h2>Choose exactly what you want to fund.</h2><p>Every open need below shows the current target and confirmed coverage. Pledges count immediately. In-kind support is shown separately when an exact dollar value is not yet available.</p></div></div><div id="needSummary" class="modern-panel" style="margin-bottom:16px"><p>Loading confirmed coverage…</p></div><div id="needGrid" class="need-grid"><p>Loading current needs…</p></div></div>`;
  const existing=main.querySelector('.section');
  if(existing) existing.insertAdjacentElement('afterend',section); else main.appendChild(section);

  const modal=document.createElement('div');
  modal.className='need-modal';
  modal.id='needModal';
  modal.innerHTML=`<div class="need-dialog" role="dialog" aria-modal="true" aria-labelledby="needModalTitle"><button class="need-close" type="button" aria-label="Close">×</button><span class="mini-label">SPECIFIC-NEED SPONSORSHIP</span><h2 id="needModalTitle">Sponsor this need</h2><div id="needModalSummary"></div><form id="needForm"><div class="need-form-grid">
      <label>Contribution amount *<input type="number" min="1" step="0.01" name="amount" required></label>
      <label>Recognition preference<select name="recognition"><option>Recognize me / our organization publicly</option><option>Anonymous</option><option>Contact me about recognition options</option></select></label>
      <label>Your name *<input name="donorName" autocomplete="name" required></label>
      <label>Business / organization<input name="organization" autocomplete="organization"></label>
      <label>Email *<input type="email" name="email" autocomplete="email" required></label>
      <label>Phone<input type="tel" name="phone" autocomplete="tel"></label>
      <label class="full">Notes / in-kind alternative<textarea name="notes" placeholder="Optional — include any in-kind equivalent, fulfillment questions, or timing notes."></textarea></label>
    </div><input type="hidden" name="needId"><button class="btn primary" type="submit" style="margin-top:16px">Continue with this sponsorship →</button><p id="needFormStatus" role="status" style="margin-top:12px"></p></form></div>`;
  document.body.appendChild(modal);

  let needs=[];
  const grid=document.getElementById('needGrid');
  async function load(){
    try{
      const r=await fetch('/api/sponsor-needs',{cache:'no-store'}),j=await r.json();
      if(!r.ok)throw new Error(j.error||'Could not load needs.');
      needs=j.needs||[];
      const summary=document.getElementById('needSummary');
      if(summary){
        const s=j.summary||{};
        const ink=(s.inKindConfirmed||[]);
        const covered=(s.confirmedCoverage||[]);
        summary.innerHTML=`<span class="mini-label">CURRENT COVERAGE</span><h3>${money(s.cashPledged||0)} pledged toward listed dollar targets</h3><p><strong>${money(s.openCashRemaining||0)}</strong> remains across needs with a confirmed dollar value.${ink.length?' '+ink.length+' additional need'+(ink.length===1?' has':'s have')+' confirmed in-kind support whose final quantity/value is still being reconciled.':''}</p>${covered.length?`<div class="modern-chiprow" style="margin-top:12px">${covered.map(x=>`<span title="${esc(x.detail)}"><strong>${esc(x.label)}</strong> · ${esc(x.detail)}</span>`).join('')}</div>`:''}`;
      }
      grid.innerHTML=needs.map(n=>{
        const pct=n.target>0?Math.min(100,Math.round((n.funded/n.target)*100)):0;
        return `<article class="need-card ${n.fulfilled?'fulfilled':''}">
          <div class="need-top"><div><span class="need-category">${esc(n.category)}</span><h3>${esc(n.title)}</h3></div><span class="need-priority">${esc(n.fulfilled?'Fulfilled':n.priority)}</span></div>
          <p>${esc(n.details)}</p>
          ${n.outreachStatus?`<div class="need-outreach">${esc(n.outreachStatus)}</div>`:''}
          ${n.inKindPendingValue
            ? `<div class="need-covered-note">${esc(n.coverageNote||'Confirmed in-kind support')}</div>
               <div class="need-status-line">
                 <div class="need-stat"><small>Target</small><strong>${n.quantityTarget ? esc(n.quantityTarget+' '+(n.quantityUnit||'')) : 'In-kind'}</strong></div>
                 <div class="need-stat"><small>Pledged</small><strong>${n.quantityConfirmedMin ? esc((n.quantityConfirmedMin===n.quantityConfirmedMax?n.quantityConfirmedMin:(n.quantityConfirmedMin+'–'+n.quantityConfirmedMax))+' '+(n.quantityUnit||'')) : 'Confirmed'}</strong></div>
                 <div class="need-stat"><small>Still needed</small><strong>${n.quantityRemainingMin ? esc((n.quantityRemainingMin===n.quantityRemainingMax?n.quantityRemainingMin:(n.quantityRemainingMin+'–'+n.quantityRemainingMax))+' '+(n.quantityUnit||'')) : 'Final count pending'}</strong></div>
               </div>`
            : `<div class="need-meter" aria-label="${pct}% funded"><span style="width:${pct}%"></span></div>
               <div class="need-status-line">
                 <div class="need-stat"><small>Target</small><strong>${money(n.target)}</strong></div>
                 <div class="need-stat"><small>Confirmed</small><strong>${money(n.funded)}</strong></div>
                 <div class="need-stat"><small>Remaining</small><strong>${n.fulfilled?'$0':money(n.remaining)}</strong></div>
               </div>`}
          ${n.inKindPendingValue&&!n.fulfilled
            ? `<a class="btn primary" href="mailto:info@xeniavoigtpta.org?subject=${encodeURIComponent('In-kind support — '+n.title)}">Offer in-kind support →</a>`
            : `<button class="btn ${n.fulfilled?'secondary':'primary'}" type="button" data-need="${esc(n.id)}" ${n.fulfilled?'disabled':''}>${n.fulfilled?'Covered ✓':'Sponsor this need →'}</button>`}
        </article>`;
      }).join('');
    }catch(err){grid.innerHTML=`<div class="modern-panel"><h3>Current needs are temporarily unavailable.</h3><p>${esc(err.message)}</p></div>`;}
  }
  load();

  const old=[...document.querySelectorAll('a')].find(a=>a.textContent.trim().toLowerCase().startsWith('sponsor a current need'));
  if(old){old.href='#sponsor-current-need';old.addEventListener('click',()=>setTimeout(()=>section.scrollIntoView({behavior:'smooth'}),10));}

  const close=()=>{modal.classList.remove('open');document.body.style.overflow='';};
  modal.querySelector('.need-close').addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});

  grid.addEventListener('click',e=>{
    const btn=e.target.closest('[data-need]'); if(!btn)return;
    const n=needs.find(x=>x.id===btn.dataset.need); if(!n||n.fulfilled)return;
    const form=document.getElementById('needForm');
    form.elements.needId.value=n.id;
    form.elements.amount.value=Math.max(1,Math.round(n.remaining*100)/100);
    form.elements.amount.max=Math.max(1,Math.round(n.remaining*100)/100);
    document.getElementById('needModalTitle').textContent=n.title;
    document.getElementById('needModalSummary').innerHTML=`<div class="need-summary"><p><strong>Need:</strong> ${esc(n.details)}</p><p><strong>Target:</strong> ${n.inKindPendingValue&&n.quantityTarget?esc(n.quantityTarget+' '+(n.quantityUnit||'')):money(n.target)}</p><p><strong>Confirmed:</strong> ${n.inKindPendingValue?(n.quantityConfirmedMin?esc((n.quantityConfirmedMin===n.quantityConfirmedMax?n.quantityConfirmedMin:(n.quantityConfirmedMin+'–'+n.quantityConfirmedMax))+' '+(n.quantityUnit||'')):'Confirmed in-kind support'):money(n.funded)}</p><p><strong>Remaining:</strong> ${n.inKindPendingValue?(n.quantityRemainingMin?esc((n.quantityRemainingMin===n.quantityRemainingMax?n.quantityRemainingMin:(n.quantityRemainingMin+'–'+n.quantityRemainingMax))+' '+(n.quantityUnit||'')):'Final count pending'):money(n.remaining)}</p></div>`;
    document.getElementById('needFormStatus').textContent='';
    modal.classList.add('open');document.body.style.overflow='hidden';
  });

  document.getElementById('needForm').addEventListener('submit',async e=>{
    e.preventDefault(); const form=e.currentTarget,btn=form.querySelector('button[type=submit]'),status=document.getElementById('needFormStatus');
    if(!form.reportValidity())return;
    btn.disabled=true;btn.textContent='Saving your sponsorship…';status.textContent='';
    try{
      const body=Object.fromEntries(new FormData(form).entries());
      body.amount=Number(body.amount);
      const r=await fetch('/api/sponsor-needs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const j=await r.json().catch(()=>({})); if(!r.ok)throw new Error(j.error||'Could not save sponsorship.');
      form.innerHTML=`<span class="mini-label">SPONSORSHIP RECORDED</span><h2>Thank you — this specific need is reserved for payment follow-through.</h2><p>Your selection is now visible to the PTA board. Your pledge now counts as confirmed coverage for this need. Payment status is tracked separately for the PTA treasurer.</p><div class="need-summary"><p><strong>Need:</strong> ${esc(j.need.title)}</p><p><strong>Contribution:</strong> ${money(body.amount)}</p><p><strong>Remaining after your pledge:</strong> ${money(j.need.remaining)}</p></div><p><strong>Payment checkout:</strong> the secure fee-free payment step will attach to this same sponsorship record as soon as the PTA bank/payment connection is activated.</p><button class="btn secondary" type="button" id="closeNeedThanks">Close</button>`;
      document.getElementById('closeNeedThanks').addEventListener('click',close);
      load();
    }catch(err){status.textContent=err.message;btn.disabled=false;btn.textContent='Continue with this sponsorship →';}
  });
})();