(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/admin') return;

  const SESSION_KEY='voigt-pta-board-session';
  const VOLUNTEER_TARGET=42;
  const NEEDS_URL='https://docs.google.com/spreadsheets/d/18svZh4ynkP8a9A-98Zsir4l4wipvoCPuOZXyWiSSPzw/edit#gid=1262010234';
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
        <p>Private planning data. Volunteer counts below come directly from the website database and are not shown to public visitors.</p>
      </div>
      <div class="admin-finance-grid">
        ${card('Volunteer target',VOLUNTEER_TARGET,'38 event-time positions + 4 relief/no-show buffer')}
        ${card('General volunteer pledges',general,'All website volunteer submissions')}
        ${card('Fall Festival-tagged pledges',tagged,'Submissions explicitly tagged Viking/Fall Festival')}
        ${card('Remaining to target',remaining,'Counts general flexible pledges toward the 42-person pool')}
      </div>
      <div class="admin-grid-3" style="margin-top:14px">
        <a class="admin-resource-link" href="${NEEDS_URL}" target="_blank" rel="noopener"><span>Fall Festival Needs<small>Item quantities, benchmark pricing, coverage, sponsorship targets and staffing plan</small></span><span>↗</span></a>
        <a class="admin-resource-link" href="${MERCH_URL}" target="_blank" rel="noopener"><span>Merch Store Plan<small>PTA, staff, volunteer and spirit-wear product plan</small></span><span>↗</span></a>
        <a class="admin-resource-link" href="${PRINTIFY_URL}" target="_blank" rel="noopener"><span>Printify Setup<small>Create the free Pop-Up Store; publish only after PTA branding and store URL are approved</small></span><span>↗</span></a>
      </div>`;

    const priorityCard=events.querySelector('.admin-grid-2 .admin-card:not(.red)');
    if(priorityCard){
      priorityCard.innerHTML=`<h2>Current event priorities</h2><div class="admin-role-list">
        <div class="admin-role-item"><span class="dot"></span><div>Close major attraction and DJ/MC sponsorship gaps</div></div>
        <div class="admin-role-item"><span class="dot"></span><div>Recruit ${remaining} more volunteers toward the 42-person pool</div></div>
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
