(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/admin') return;

  const SESSION_KEY='voigt-pta-board-session';
  const VOLUNTEER_TARGET=55;
  const SPONSOR_OUTREACH_TODAY=8;
  const NEEDS_SPONSOR_OR_LOAN=145;
  const NEEDS_URL='https://docs.google.com/spreadsheets/d/1g9GJpTSXrL3aoRhd--KXvSf5AvP8iN4U/edit?usp=drivesdk';
  const MERCH_URL='https://docs.google.com/spreadsheets/d/18svZh4ynkP8a9A-98Zsir4l4wipvoCPuOZXyWiSSPzw/edit#gid=739301024';
  const PRINTIFY_URL='https://printify.com/pop-up-store/';

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const festivalTagged=v=>/viking|fall\s*festival/i.test(String(v?.event||''));

  async function getLiveData(){
    const session=sessionStorage.getItem(SESSION_KEY);
    if(!session) return null;
    const r=await fetch('/api/admin',{headers:{'x-admin-session':session}});
    if(!r.ok) return null;
    return r.json();
  }

  function card(label,value,sub=''){
    return `<div class="admin-finance-card"><strong>${esc(value)}</strong><span>${esc(label)}</span>${sub?`<small>${esc(sub)}</small>`:''}</div>`;
  }

  async function render(){
    const root=document.getElementById('adminRoot');
    const events=document.getElementById('panel-events');
    if(!root||!events) return false;
    const data=await getLiveData();
    if(!data) return false;

    const volunteers=Array.isArray(data.volunteers)?data.volunteers:[];
    const general=volunteers.length;
    const tagged=volunteers.filter(festivalTagged).length;
    const remaining=Math.max(0,VOLUNTEER_TARGET-general);

    let block=document.getElementById('fallFestivalOpsSync');
    if(!block){
      block=document.createElement('section');
      block.id='fallFestivalOpsSync';
      block.className='admin-card';
      const firstGrid=events.querySelector('.admin-grid-2');
      if(firstGrid) firstGrid.insertAdjacentElement('afterend',block); else events.prepend(block);
    }
    block.innerHTML=`
      <div class="admin-section-title">
        <h2>Fall Festival action board</h2>
        <p>One board view: what is locked, what needs attention first, and what is still open. Private planning details are not shown publicly.</p>
      </div>

      <div class="admin-grid-3">
        <article class="admin-card" style="border-top:5px solid #1f8f4e">
          <span class="mini-label">✓ CONFIRMED / LOCKED</span>
          <h3>Already secured</h3>
          <div class="admin-role-list">
            <div class="admin-role-item"><span class="dot"></span><div><b>Event:</b> Friday, October 23 · 5:30–7:30 PM</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Venue:</b> Xenia Voigt Arts Academy campus</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Infrastructure:</b> stage, sound system/speakers and electrical access available</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Pour The Fun:</b> Briana confirmed participation (“count me in”)</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Cookies &amp; Crumbles:</b> gift certificate secured for giveaway use</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Wildflower Orthodontics:</b> formal sponsorship request submitted and confirmation received</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Rune Maker wooden blanks:</b> Brittani is personally sponsoring 400 unfinished 1.5-inch circles at $39.96 total; no outside sponsor needed</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>DJ/MC fallback:</b> Premier $300 full-event option documented while we pursue underwriting</div></div>
          </div>
        </article>

        <article class="admin-card" style="border-top:5px solid #ed2c24">
          <span class="mini-label">1 · URGENT — WORKING NOW</span>
          <h3>Close these first</h3>
          <div class="admin-role-list">
            <div class="admin-role-item"><span class="dot"></span><div><b>DJ/MC underwriting:</b> secure a sponsor for the $300 cost; LC Entertainment quote/follow-up remains in play</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Inflatable / major attraction:</b> convert active outreach into a confirmed in-kind or sponsored attraction</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Sensory-friendly retreat:</b> secure sensory resources/items and wellness support</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Viking Quest prizes + bag fillers:</b> prioritize free children’s products, toys, school supplies and sensory items</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Food vendors:</b> continue confirmations toward the 10–15 vendor goal; close electrical/setup questions</div></div>
          </div>
        </article>

        <article class="admin-card" style="border-top:5px solid #e3a300">
          <span class="mini-label">2 · STILL NEEDS WORK</span>
          <h3>Next after urgent gaps</h3>
          <div class="admin-role-list">
            <div class="admin-role-item"><span class="dot"></span><div>Signage not ultimately donated</div></div>
            <div class="admin-role-item"><span class="dot"></span><div>Remaining station consumables and activity supplies</div></div>
            <div class="admin-role-item"><span class="dot"></span><div>Safety, cleanup and event-day operational supplies</div></div>
            <div class="admin-role-item"><span class="dot"></span><div>Cake-walk donations, including remaining bakery outreach</div></div>
            <div class="admin-role-item"><span class="dot"></span><div>Volunteer assignments and remaining staffing gap</div></div>
            <div class="admin-role-item"><span class="dot"></span><div>Final campus layout, traffic flow, vendor placement and station map</div></div>
          </div>
        </article>
      </div>

      <div class="admin-section-title" style="margin-top:20px"><h2>Coverage scoreboard</h2><p>Confirmed quantity / event target. Pending outreach and applications are not counted until committed.</p></div>
      <div class="admin-finance-grid">
        ${card('Detailed needs covered','6 / 151','145 line items still require coverage, confirmation or fulfillment')}
        ${card('Food vendors confirmed','3 / 15','Kona Ice, KK BBQ and Pour The Fun confirmed; target uses the 15-vendor stretch goal')}
        ${card('Trunk-or-Treat spaces','9 / 20','11 spaces remain open based on the current command center')}
        ${card('Volunteer staffing',general+' / '+VOLUNTEER_TARGET,remaining+' more submissions needed to reach the current minimum staffing plan')}
        ${card('Viking Quest stations','5 / 5','All five station concepts are planned; individual supplies are tracked separately')}
        ${card('Quest participant capacity','0 / 300','Supply coverage is still being secured for the planned child capacity')}
        ${card('Inflatables / major attractions','0 / 3','Three inflatable units are in the current detailed needs plan')}
        ${card('DJ / MC','0 / 1','Premier is a paid backup; underwriting/zero-cost commitment is not yet locked')}
        ${card('Silent auction donations','4 / 4','Austin Aquarium, Austin Zoo, Round Rock Pumpkin Festival and Monster Mini Golf are confirmed')}
        ${card('Sweet Finish giveaway','1 / 1','Cookies & Crumbles gift certificate confirmed')}
        ${card('Cake-walk donations','12 / 320','12 decorated cookies confirmed from Paige’s Bakehouse; continue bakery/product outreach')}
        ${card('Family prize certificates','0 / 4','Amy’s Ice Creams request is submitted but pending review')}
        ${card('Sensory-friendly retreat','0 / 1','Resources/support still being secured')}
        ${card('Harvest Wagon photo stop','0 / 1','Station concept planned; donated/loaned build package still needs confirmation')}
        ${card('Main entrance banner','0 / 1','Included in signage sponsorship need')}
        ${card('Zone signs','0 / 12','Final donated/discounted signage package still needs fulfillment confirmation')}
        ${card('Parking / traffic signs','0 / 12','Final safety/traffic signage package still needs fulfillment confirmation')}
        ${card('Volunteer water','0 / 96','Four cases planned')}
        ${card('Volunteer snacks','0 / 60','Sealed grab-and-go servings planned')}
        ${card('Non-food treat reserve','0 / 600','Allergy/sensory-friendly alternatives still needed')}
      </div>

      <div class="admin-finance-grid" style="margin-top:14px">
        ${card('Volunteer slots needed',VOLUNTEER_TARGET,'Minimum event-day staffing plan')}
        ${card('Volunteer submissions',general,'All website volunteer submissions currently on file')}
        ${card('Fall Festival-tagged',tagged,'Explicit Viking/Fall Festival submissions')}
        ${card('Remaining volunteer gap',remaining,'Pending groups are not counted until committed')}
        ${card('Fall Festival PTA cash spent','$0','Rune Maker blanks are personally sponsored by Brittani and do not count as PTA spend')}
        ${card('Food vendor target','10–15','Continue outreach until the target is confirmed')}
      </div>

      <div class="admin-callout" style="margin-top:14px"><strong>Working rule:</strong> in-kind and financial sponsorship first. Do not treat an outreach request, pending application, quote, or interested vendor as confirmed until a commitment is actually received.</div>

      <div class="admin-grid-3" style="margin-top:14px">
        <a class="admin-resource-link" href="${NEEDS_URL}" target="_blank" rel="noopener"><span>Fall Festival Needs<small>Detailed needs, quantities, coverage and sponsorship strategy</small></span><span>↗</span></a>
        <a class="admin-resource-link" href="${MERCH_URL}" target="_blank" rel="noopener"><span>Merch Store Plan<small>PTA, staff, volunteer and spirit-wear product plan</small></span><span>↗</span></a>
        <a class="admin-resource-link" href="${PRINTIFY_URL}" target="_blank" rel="noopener"><span>Printify Setup<small>Fulfillment setup for approved branded products</small></span><span>↗</span></a>
      </div>`;

    const priorityCard=events.querySelector('.admin-grid-2 .admin-card:not(.red)');
    if(priorityCard){
      priorityCard.innerHTML=`<h2>At-a-glance status</h2><div class="admin-role-list">
        <div class="admin-role-item"><span class="dot"></span><div><b>Confirmed:</b> review the green “Confirmed / Locked” column below.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>Urgent:</b> close entertainment underwriting, major attraction, sensory support, prizes/bag fillers and food-vendor confirmations first.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>Next:</b> signage, consumables, safety/cleanup, cake walk, staffing and final site logistics.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>Budget goal:</b> preserve the $300 allocation and keep PTA cash spend at $0 through sponsorships and in-kind support.</div></div>
      </div>`;
    }
    return true;
  }

  let attempts=0;
  const boot=setInterval(async()=>{
    attempts++;
    if(await render()||attempts>30) clearInterval(boot);
  },500);

  document.addEventListener('visibilitychange',()=>{ if(!document.hidden) render(); });
  setInterval(render,60000);
})();
