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
      <div class="admin-section-title"><h2>Fall Festival — reconciled command board</h2><p>Updated October 5, 2026. Reconciled against the live Drive trackers and current communications. Explicit commitments only; applications, quotes, acknowledgements and unanswered notices are not confirmed.</p></div>
      <div class="admin-grid-3">
        <article class="admin-card" style="border-top:5px solid #1f8f4e"><span class="mini-label">CONFIRMED / COVERED</span><h3>Current plan</h3><div class="admin-role-list">
          <div class="admin-role-item"><span class="dot"></span><div><b>Vendor plan:</b> K&amp;K BBQ (savory), Hearth &amp; Honey (sweet), plus Pour The Fun. The 10% fee is waived; no contracts will be sent.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Attractions:</b> AiRCO’s $1,095 Train Quest package is paid, and Shine Pediatric Dental Co.’s $195 Kids Rainbow Combo is paid and secured. No extra inflatables.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Teacher trunks:</b> seven, one per grade Pre-K–5. A+ pledged 12 × 5.75-lb bags (69 lb); community hosts bring their own candy.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Cake Walk:</b> board plan is exactly one hour with a 40-prize target. H-E-B fulfillment is scheduled Oct. 22 at 10 AM; Nothing Bundt pickup is 9 AM.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Pumpkins:</b> Five Points Board of REALTORS® committed the full $50 for all 86 St. Richard’s pumpkins. All other pumpkin-sponsor asks are closed.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Photo stop:</b> Forest Creek donated the 12' utility trailer at $0 for 24 hours. Brittani will pick up Oct. 23 shortly after 9 AM and return it Oct. 24 morning.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Volunteer pool:</b> minimum 26 of 36 unique people are now committed, including at least 15 Austin Christian University adult volunteers age 18+ available 4:30–8:30 PM. Final ACU count of 15–20 is due Friday.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Sensory retreat:</b> Boys &amp; Girls Club portable confirmed; Tyla Delestre is the access/closeout point person. One BGC Trunk-or-Treat trunk is also confirmed.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Silent auction:</b> prizes on stage; school tables in front with bid sheets in 2–4 stacked rows per table.</div></div>
        </div></article>
        <article class="admin-card" style="border-top:5px solid #ed2c24"><span class="mini-label">ACTIVE GAPS</span><h3>What still needs action</h3><div class="admin-role-list">
          <div class="admin-role-item"><span class="dot"></span><div><b>Campus closeout:</b> the internal working plan is complete. Oct. 13 field verification must close power/audio, first-aid/lost-child, weather, custodial/security and exact placement details.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>PIE request:</b> Campus Request Form submitted Oct. 2; confirmation received. Do not resubmit or send a duplicate follow-up. Await PIE’s Tuesday/Wednesday pull and pickup-ready notice.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Pumpkin fulfillment:</b> sponsor is secured. Await St. Richard’s payment instructions + Oct. 22 pickup window, then send the payment details to Five Points.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Volunteers:</b> minimum committed pool is 26/36, with a raw gap of 10 that may fall to 5 if ACU confirms 20. ACU volunteers are adults age 18+, so adult-lead headcount is covered at a minimum 17 known adults for 15 lead positions; role assignments remain open. Receive ACU final headcount Friday + Sweethearts roster/chaperone.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Trailer logistics:</b> Brittani is the pickup/return driver. Confirm towing vehicle/proof of insurance and Forest Creek’s Saturday-return instructions.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Materials + print:</b> reconcile the 12 specialty material lines; release final FASTSIGNS scope only after the Oct. 13 field verification.</div></div>
        </div></article>
        <article class="admin-card" style="border-top:5px solid #e3a300"><span class="mini-label">CONTROLS</span><h3>Source-of-truth rules</h3><div class="admin-role-list">
          <div class="admin-role-item"><span class="dot"></span><div><b>Confirmed means explicit:</b> never count a quote, application, historical gift, acknowledgement or pending reply.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Before contact:</b> check the full Gmail thread and the tracker to prevent duplicate outreach.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Locked / removed:</b> food lineup is K&amp;K BBQ + Hearth &amp; Honey + Pour The Fun only. DJ/MC, extra inflatables, sensory-retreat materials, additional food vendors and new silent-auction outreach must not reappear.</div></div>
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
        ${card('Cake Walk','1 hr / 40-prize plan','H-E-B + bakery fulfillment scheduled; physical closeout pending')}
        ${card('Cake Walk floor spots','30 / 30','Provided by PE')}
        ${card('Sensory retreat','1 / 1','BGC portable confirmed; Tyla is access/closeout contact')}
        ${card('Specialty material lines','12 open','Each has an active source path; stop sourcing category-by-category as covered')}
        ${card('Volunteer pool','26 / 36 minimum','ACU final 15–20 count due Friday; potential committed pool 31')}
        ${card('Adult lead roles','15 positions / 17+ known adults','ACU university volunteers are age 18+; assignment remains to be finalized')}
        ${card('Pumpkin sponsorship','1 / 1 secured','Five Points covers the full $50; payment logistics pending')}
        ${card('Photo-stop trailer','1 / 1 secured','Brittani pickup Oct. 23 AM / return Oct. 24 AM')}
        ${card('DJ / MC','Removed','School sound system will be used')}
        ${card('Trunk-or-Treat spaces','9 / 20','11 open; BGC trunk confirmed')}
        ${card('Silent auction setup','Covered','Stage display + school tables')}
      </div>
      <div class="admin-section-title" style="margin-top:20px"><h2>Pickup schedule</h2><p>One place for every current pickup, handoff, digital fulfillment and return date. Open only when needed.</p></div>
      <details class="admin-card" style="margin-top:10px">
        <summary style="cursor:pointer;font-weight:900;font-size:18px">All pickups / handoffs / returns</summary>
        <div class="admin-role-list" style="margin-top:16px">
          <div class="admin-role-item"><span class="dot"></span><div><b>Oct. 6–7 — PIE materials:</b> Ruth’s pull is expected Tuesday/Wednesday. Pickup date is pending the pickup-ready notice. <b>Return:</b> loaned clipboards Oct. 26.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>By Oct. 16 — Melissa & Doug giraffe:</b> family handoff for silent-auction prize #7; exact handoff date still needs to be locked.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>By Oct. 16 — Board & Brush:</b> $50 digital gift certificate/link due. No physical pickup.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Date TBD — Austin Aquarium:</b> donation is ready for pickup during normal hours, 10 AM–6 PM. Envelope is labeled “Austin Aquarium Donation.”</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Date TBD — Toybrary Austin:</b> $60 Stay & Play punch card; pickup Tue–Sat, 10 AM–6 PM at 2001 Justin Lane, Austin.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Date TBD — Austin Zoo:</b> four admission tickets confirmed; fulfillment/pickup date has not yet been recorded.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Date TBD — Monster Mini Golf:</b> family 4-pack confirmed; fulfillment/pickup date has not yet been recorded.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Date TBD — Round Rock Pumpkin Festival:</b> family pass for six is tracked as QR/booking fulfillment; no physical pickup currently listed.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Oct. 22 · 9:00 AM — Nothing Bundt Cakes:</b> pick up 15 Bundtlet towers at 3021 S I-35 Frontage Rd Ste 130, Round Rock.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Oct. 22 · 10:00 AM — H-E-B:</b> Cake Walk bakery shop at the Business Center; suspend the order and have the $125 support applied there.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Oct. 22 · about 11:30 AM — A+ Federal Credit Union:</b> pick up 12 Costco candy bags / 69 lb at the Mays Street branch; count bags/pieces and capture recognition asset.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Oct. 22 · time TBD — St. Richard’s:</b> 86 pumpkins. Five Points has covered the full $50; exact pickup window and payment method are pending.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Oct. 23 · shortly after 9:00 AM — Forest Creek Mini Storage:</b> Brittani picks up the donated 12' utility trailer. Bring driver’s license, proof of insurance and card copy.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Oct. 23 · 4:00–5:00 PM — Paige’s Bakehouse:</b> pick up one dozen decorated cookies; keep together as one Cake Walk prize package.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Oct. 24 · morning — Forest Creek Mini Storage:</b> return the trailer; any special Saturday-return instructions are still pending.</div></div>
          <div class="admin-role-item"><span class="dot"></span><div><b>Oct. 26 — PIE:</b> return loaned clipboards.</div></div>
        </div>
      </details>
      <div class="admin-callout" style="margin-top:14px"><strong>Current rule:</strong> preserve the $300 PTA allocation where possible and buy only against the revised uncovered list after school inventory is pulled.</div>
      <div class="admin-grid-3" style="margin-top:14px">
        <a class="admin-resource-link" href="${MASTER}" target="_blank" rel="noopener"><span>Authoritative master tracker<small>Reconciled October 5</small></span><span>↗</span></a>
        <a class="admin-resource-link" href="${NEEDS}" target="_blank" rel="noopener"><span>Detailed needs tracker<small>Use current specialty-material reconciliation</small></span><span>↗</span></a>
      </div>`;
    return true;
  }
  let attempts=0; const boot=setInterval(async()=>{attempts++; if(await render()||attempts>30) clearInterval(boot);},500);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden) render();}); setInterval(render,60000);
})();
