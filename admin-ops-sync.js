(()=> {
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/admin') return;
  const SESSION_KEY='voigt-pta-board-session';
  const MASTER='https://docs.google.com/spreadsheets/d/18AZisrkN6lm9IP0npjKgPvoQ1ucLxbWN/edit';
  const NEEDS='https://docs.google.com/spreadsheets/d/1g9GJpTSXrL3aoRhd--KXvSf5AvP8iN4U/edit';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const card=(label,value,sub='')=>`<div class="admin-finance-card"><strong>${esc(value)}</strong><span>${esc(label)}</span>${sub?`<small>${esc(sub)}</small>`:''}</div>`;
  async function getLiveData(){
    const session=sessionStorage.getItem(SESSION_KEY); if(!session) return null;
    const r=await fetch('/api/admin',{headers:{'x-admin-session':session}}); return r.ok?r.json():null;
  }
  async function render(){
    const events=document.getElementById('panel-events'); if(!events) return false;
    const data=await getLiveData(); if(!data) return false;
    const volunteers=Array.isArray(data.volunteers)?data.volunteers:[];
    let block=document.getElementById('fallFestivalOpsSync');
    if(!block){ block=document.createElement('section'); block.id='fallFestivalOpsSync'; block.className='admin-card'; const grid=events.querySelector('.admin-grid-2'); grid?grid.insertAdjacentElement('afterend',block):events.prepend(block); }
    block.innerHTML=`
      <div class="admin-section-title"><h2>Fall Festival — reconciled command board</h2><p>Updated September 26, 2026. Explicit commitments only; applications, quotes, acknowledgements and unanswered notices are not confirmed.</p></div>
      <div class="admin-grid-3">
        <article class="admin-card" style="border-top:5px solid #1f8f4e"><span class="mini-label">CONFIRMED / COVERED</span><h3>Current plan</h3><div class="admin-role-list">
          <div class="admin-role-item"><span class="dot"></span><div><b>Vendor plan:</b> K&amp;K BBQ (savory), Hearth &amp; Honey (sweet), plus Pour The Fun. The 10% fee is waived; no contracts will be sent.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Attractions:</b> one $195 bounce/combo from Shine Pediatric Dental Co. and one $1,095 trackless train from AiRCO Mechanical. No extra inflatables.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Teacher trunks:</b> seven, one per grade Pre-K–5. A+ pledged 12 × 5.75-lb bags (69 lb); community hosts bring their own candy.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Cake Walk:</b> 30 PE floor spots, Brittani's phone, school tables, 15 Bundtlets and one cookie bundle are covered.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Sensory retreat:</b> Boys &amp; Girls Club portable; no PTA materials needed.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Silent auction:</b> prizes on stage; school tables in front with bid sheets in 2–4 stacked rows per table.</div></div>
        </div></article>
        <article class="admin-card" style="border-top:5px solid #ed2c24"><span class="mini-label">ACTIVE GAPS</span><h3>What still needs action</h3><div class="admin-role-list">
          <div class="admin-role-item"><span class="dot"></span><div><b>Campus plan:</b> written layout, safety, traffic, ADA, train/inflatable, vendor and power approvals.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Activities:</b> finalize the PE/school pull list, then cover only remaining Viking-station, carnival, photo-stop, signage and operations items.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Audio:</b> confirm school-system operator, Garage Band inputs and event timeline. No DJ.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Fulfillment:</b> candy/prize pickup, actual candy piece count, volunteer assignments and donor recognition.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Vendor conflict:</b> Gelato Lab received an approval notice but has no located reply and is outside the capped plan; reconcile before publishing it.</div></div>
        </div></article>
        <article class="admin-card" style="border-top:5px solid #e3a300"><span class="mini-label">CONTROLS</span><h3>Source-of-truth rules</h3><div class="admin-role-list">
          <div class="admin-role-item"><span class="dot"></span><div><b>Confirmed means explicit:</b> never count a quote, application, historical gift, acknowledgement or pending reply.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Before contact:</b> check the full Gmail thread and the tracker to prevent duplicate outreach.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Removed:</b> DJ/MC, extra inflatables and sensory-retreat materials must not reappear as needs.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Parity:</b> Gmail commitment → master tracker → detailed tracker → command center/public site.</div></div>
        </div></article>
      </div>
      <div class="admin-section-title" style="margin-top:20px"><h2>Coverage scoreboard</h2><p>Confirmed / target. Pending items are excluded.</p></div>
      <div class="admin-finance-grid">
        ${card('Food plan','3 / 3','1 savory + 1 sweet + Pour The Fun')}
        ${card('Teacher trunks','7 / 7','One per grade, Pre-K through 5')}
        ${card('Teacher-trunk candy','12 / 12 bags','5.75 lb each; 69 lb total; verify pieces on receipt')}
        ${card('Viking Quest stations','5 / 5','Concepts planned; remaining line items are tracked below')}
        ${card('Major attractions','2 / 2','One combo inflatable + trackless train')}
        ${card('Cake Walk prizes','16 / 15','15 Bundtlets + one cookie bundle')}
        ${card('Cake Walk floor spots','30 / 30','Provided by PE')}
        ${card('Sensory retreat','1 / 1','Boys & Girls Club portable; no materials needed')}
        ${card('Detailed active lines covered','20 / 110','90 active lines remain open')}
        ${card('Volunteers recorded',String(volunteers.length),'Assignments and final target remain to be reconciled')}
        ${card('DJ / MC','Removed','School sound system will be used')}
        ${card('Silent auction setup','Covered','Stage display + school tables')}
      </div>
      <div class="admin-callout" style="margin-top:14px"><strong>Current rule:</strong> preserve the $300 PTA allocation where possible and buy only against the revised uncovered list after school inventory is pulled.</div>
      <div class="admin-grid-3" style="margin-top:14px">
        <a class="admin-resource-link" href="${MASTER}" target="_blank" rel="noopener"><span>Authoritative master tracker<small>Reconciled September 26</small></span><span>↗</span></a>
        <a class="admin-resource-link" href="${NEEDS}" target="_blank" rel="noopener"><span>Detailed needs tracker<small>110 active lines; 20 covered</small></span><span>↗</span></a>
      </div>`;
    return true;
  }
  let attempts=0; const boot=setInterval(async()=>{attempts++; if(await render()||attempts>30) clearInterval(boot);},500);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden) render();}); setInterval(render,60000);
})();
