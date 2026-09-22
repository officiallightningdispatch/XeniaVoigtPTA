(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/admin')return;

  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(n||0));
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const MASTER='https://docs.google.com/spreadsheets/d/18AZisrkN6lm9IP0npjKgPvoQ1ucLxbWN/edit';
  const LIVE='https://docs.google.com/spreadsheets/d/1Uy_sdelXl_bGrhT38p-b_DjEJ2EQ1TDNMVfqHxDs3kw/edit';

  function legacyMetric(root,label,fallback){
    const cards=[...root.querySelectorAll('.admin-kpi,.admin-finance-card')];
    const card=cards.find(x=>x.textContent.toLowerCase().includes(label.toLowerCase()));
    if(!card)return fallback;
    const n=card.querySelector('.num,strong')?.textContent?.trim();
    return n||fallback;
  }

  function removeHeavyDuplicate(root,titleText){
    const title=[...root.querySelectorAll('.admin-section-title')].find(x=>x.querySelector('h2')?.textContent.trim().toLowerCase()===titleText.toLowerCase());
    if(!title)return;
    const next=title.nextElementSibling;
    title.remove();
    if(next)next.remove();
  }

  async function hydrate(root){
    const sponsorEl=root.querySelector('[data-open-sponsor]');
    const pledgedEl=root.querySelector('[data-pledged]');
    try{
      const r=await fetch('/api/sponsor-needs',{cache:'no-store'});
      const j=await r.json();
      if(r.ok){
        if(sponsorEl)sponsorEl.textContent=money(j.summary?.openCashRemaining||0);
        if(pledgedEl)pledgedEl.textContent=money(j.summary?.cashPledged||0);
      }
    }catch(_){}

    try{
      const r=await fetch('/api/trunk-hosts',{cache:'no-store'});
      const j=await r.json();
      if(r.ok){
        const claimed=j.claimed??j.summary?.claimed;
        const open=j.open??j.summary?.open;
        const el=root.querySelector('[data-trunks]');
        if(el && Number.isFinite(Number(claimed)) && Number.isFinite(Number(open))) el.textContent=`${claimed} / ${Number(claimed)+Number(open)}`;
      }
    }catch(_){}
  }

  function install(){
    const root=document.querySelector('#adminRoot');
    if(!root||root.dataset.compactDashboard==='1')return false;
    root.dataset.compactDashboard='1';

    const header=root.querySelector('.admin-suite-head');
    if(!header)return false;

    const vendorMetric=legacyMetric(root,'Food vendors','See tracker');
    const volunteerMetric=legacyMetric(root,'Volunteer staffing','See tracker');

    removeHeavyDuplicate(root,'Fall Festival coverage scoreboard');
    removeHeavyDuplicate(root,'Whole-event inventory');
    root.querySelector('.admin-kpis')?.remove();

    const compact=document.createElement('section');
    compact.className='admin-compact-command';
    compact.innerHTML=`
      <div class="admin-compact-top">
        <div>
          <span class="mini-label">FALL FESTIVAL COMMAND CENTER</span>
          <h2>What needs your attention now</h2>
          <p>Confirmed coverage, urgent work, and remaining gaps without the endless scroll.</p>
        </div>
        <div class="admin-compact-actions">
          <a class="btn primary" href="/donate#sponsor-current-need">Sponsor needs</a>
          <a class="btn secondary" href="${MASTER}" target="_blank" rel="noopener">Master tracker ↗</a>
          <a class="btn secondary" href="${LIVE}" target="_blank" rel="noopener">Live fulfillment ↗</a>
        </div>
      </div>

      <div class="admin-compact-metrics">
        <article><strong data-pledged>$1,290.00</strong><span>Pledged toward listed cash needs</span></article>
        <article><strong data-open-sponsor>Loading…</strong><span>Remaining listed cash needs</span></article>
        <article><strong>${esc(vendorMetric)}</strong><span>Food vendors</span></article>
        <article><strong data-trunks>9 / 20</strong><span>Trunk-or-Treat spaces</span></article>
        <article><strong>${esc(volunteerMetric)}</strong><span>Volunteer staffing</span></article>
        <article class="covered"><strong>80 / 80</strong><span>Apple Scoop apples · covered</span></article>
        <article><strong>1 / 15</strong><span>Cakewalk physical prizes</span></article>
      </div>

      <div class="admin-focus-grid">
        <section class="admin-focus confirmed">
          <div class="admin-focus-head"><span>CONFIRMED / LOCKED</span><b>✓</b></div>
          <ul>
            <li><strong>Trackless train:</strong> $1,095 pledged by AiRCO Mechanical.</li>
            <li><strong>Bounce/combo inflatable:</strong> $195 pledged by Shine Pediatric Dental Co.</li>
            <li><strong>Apple Scoop apples:</strong> 80/80 covered by Brittani; stop apple outreach.</li>
            <li><strong>Volunteer snacks:</strong> H-E-B repeat support confirmed.</li>
            <li><strong>Teacher trunk candy:</strong> A+ FCU covers approximately 6–7 of 12 large bags.</li>
            <li><strong>School stage/sound:</strong> existing cafeteria system confirmed; connection details pending.</li>
          </ul>
        </section>

        <section class="admin-focus urgent">
          <div class="admin-focus-head"><span>URGENT — WORKING NOW</span><b>!</b></div>
          <ul>
            <li><strong>DJ / MC:</strong> Infinity Sound Lab offered $300; waiting on cafeteria A/V connection details and underwriting.</li>
            <li><strong>Food vendors:</strong> build from current confirmations toward the 10–15 target; process replies before duplicate follow-up.</li>
            <li><strong>Cakewalk:</strong> 1/15 physical dessert prizes confirmed; 14 more rounds to cover.</li>
            <li><strong>Open attractions:</strong> obstacle course $365 + interactive inflatable/game $225.</li>
            <li><strong>Sensory Retreat:</strong> $449.16 target; campus and outside support pending.</li>
            <li><strong>Quest supplies:</strong> prizes $262.50 + pouches $105 remain open.</li>
            <li><strong>Harvest Wagon photo stop:</strong> $390 target remains open.</li>
          </ul>
        </section>

        <section class="admin-focus open">
          <div class="admin-focus-head"><span>STILL NEEDS WORK</span><b>→</b></div>
          <ul>
            <li><strong>Trunk-or-Treat:</strong> 11 host spaces remain open.</li>
            <li><strong>Apple Scoop smallwares:</strong> 4 food-safe tubs + 8 child-safe scoops/tongs; existing A-Tex/Lakeshore outreach active.</li>
            <li><strong>Non-food treat reserve:</strong> approximately 600 allergy/sensory-friendly alternatives; outreach not started.</li>
            <li><strong>Event operations:</strong> lanyards/badges, battery lighting, 4 power banks and 4 rolling carts/wagons; prefer donation/loan.</li>
            <li><strong>Printing/signage:</strong> keep FASTSIGNS/Ranger work consolidated; do not start duplicate print outreach.</li>
          </ul>
        </section>
      </div>

      <nav class="admin-quick-nav" aria-label="Fall Festival quick links">
        <a href="/vendors">Vendor page</a>
        <a href="/volunteer">Volunteer page</a>
        <a href="/trunk-or-treat">Trunk-or-Treat</a>
        <a href="/community-partners">Community partners</a>
        <a href="/sponsors">Sponsors & donors</a>
        <a href="/fall-festival">Public festival page</a>
      </nav>
    `;

    header.insertAdjacentElement('afterend',compact);

    // Collapse the remaining legacy board workspace instead of forcing a long page.
    const details=document.createElement('details');
    details.className='admin-full-workspace';
    details.innerHTML='<summary><span><strong>Full board workspace & records</strong><small>Applications, banking, member records, forms and detailed tables</small></span><b>Expand</b></summary><div class="admin-full-workspace-body"></div>';
    const body=details.querySelector('.admin-full-workspace-body');
    [...root.children].filter(n=>n!==header&&n!==compact).forEach(n=>body.appendChild(n));
    root.appendChild(details);

    details.addEventListener('toggle',()=>{details.querySelector('summary b').textContent=details.open?'Collapse':'Expand';});
    hydrate(root);
    return true;
  }

  if(!install()){
    const obs=new MutationObserver(()=>{if(install())obs.disconnect();});
    obs.observe(document.documentElement,{childList:true,subtree:true});
  }
})();