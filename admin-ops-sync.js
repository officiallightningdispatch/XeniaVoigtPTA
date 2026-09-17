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
        <h2>Live Fall Festival operations</h2>
        <p>Private planning data. Volunteer and sponsorship-planning details below are for board operations and are not shown to public visitors.</p>
      </div>
      <div class="admin-finance-grid">
        ${card('Volunteer slots needed',VOLUNTEER_TARGET,'Current minimum event-day staffing plan across stations, traffic, check-in, activities, auction, setup and cleanup')}
        ${card('Volunteer pledges',general,'All website volunteer submissions currently on file')}
        ${card('Fall Festival-tagged pledges',tagged,'Submissions explicitly tagged Viking/Fall Festival')}
        ${card('Remaining volunteer gap',remaining,'Pending student groups are not counted until they commit')}
        ${card('Sponsor messages sent today',SPONSOR_OUTREACH_TODAY,'Sept. 17 targeted push: DJ/MC, inflatable, Arts Integration, sensory retreat and community sponsorships')}
        ${card('Needs still sponsor/loan first',NEEDS_SPONSOR_OR_LOAN,'Detailed 151-line budget; do not treat as approved PTA purchases')}
      </div>
      <div class="admin-card" style="margin-top:14px">
        <h3 style="margin-top:0">Sponsor push — Sept. 17</h3>
        <p style="margin-bottom:8px">LC Entertainment was asked to meet or beat the competing $300 DJ/MC option. New targeted asks went to Mathnasium, Board &amp; Brush, Kids 'R' Kids, The Point Wellness, Farr Orthodontics and Sabine McCalla Homes; Shine Pediatric received a specific bounce/combo follow-up.</p>
        <p style="margin:0"><strong>Next:</strong> log every reply, convert interest into a named attraction/zone/material commitment, and follow up after five business days if there is no response.</p>
      </div>
      <div class="admin-grid-3" style="margin-top:14px">
        <a class="admin-resource-link" href="${NEEDS_URL}" target="_blank" rel="noopener"><span>Fall Festival Needs<small>151 detailed line items with quantities, benchmark pricing, coverage, sponsorship strategy and a sponsor-outreach log</small></span><span>↗</span></a>
        <a class="admin-resource-link" href="${MERCH_URL}" target="_blank" rel="noopener"><span>Merch Store Plan<small>PTA, staff, volunteer and spirit-wear product plan</small></span><span>↗</span></a>
        <a class="admin-resource-link" href="${PRINTIFY_URL}" target="_blank" rel="noopener"><span>Printify Setup<small>Fulfillment setup; publish only after approved PTA/school branding is applied</small></span><span>↗</span></a>
      </div>`;

    const priorityCard=events.querySelector('.admin-grid-2 .admin-card:not(.red)');
    if(priorityCard){
      priorityCard.innerHTML=`<h2>Current event priorities</h2><div class="admin-role-list">
        <div class="admin-role-item"><span class="dot"></span><div>Close sponsor coverage for DJ/MC, bounce/combo inflatable, Arts Integration supplies and sensory-friendly retreat</div></div>
        <div class="admin-role-item"><span class="dot"></span><div>Compare Premier's $300 DJ/MC option with LC Entertainment's revised PTA quote as soon as LC responds</div></div>
        <div class="admin-role-item"><span class="dot"></span><div>Recruit ${remaining} more volunteers toward the ${VOLUNTEER_TARGET}-slot minimum plan</div></div>
        <div class="admin-role-item"><span class="dot"></span><div>Secure station supplies, prizes, candy, sensory supplies and signage in-kind</div></div>
        <div class="admin-role-item"><span class="dot"></span><div>Continue food-vendor confirmations toward the 10–15 vendor target</div></div>
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
