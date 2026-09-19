(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/admin') return;
  const SESSION_KEY='voigt-pta-board-session';
  const TRACKER_URL='https://docs.google.com/spreadsheets/d/1g9GJpTSXrL3aoRhd--KXvSf5AvP8iN4U/edit';

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  async function getLiveData(){
    const session=sessionStorage.getItem(SESSION_KEY);
    if(!session) return null;
    const r=await fetch('/api/admin',{headers:{'x-admin-session':session}});
    if(!r.ok) return null;
    return r.json();
  }
  async function render(){
    const events=document.getElementById('panel-events');
    if(!events) return false;
    const data=await getLiveData();
    if(!data) return false;
    let block=document.getElementById('sponsorPushStatus');
    if(!block){
      block=document.createElement('section');
      block.id='sponsorPushStatus';
      block.className='admin-card';
      const ops=document.getElementById('fallFestivalOpsSync');
      if(ops) ops.insertAdjacentElement('afterend',block); else events.prepend(block);
    }
    block.innerHTML=`
      <div class="admin-section-title">
        <h2>Outreach details & follow-ups</h2>
        <p>Supporting detail for the action board above. Pending outreach is not counted as confirmed.</p>
      </div>
      <div class="admin-finance-grid">
        <div class="admin-finance-card"><strong>15</strong><span>targeted sponsor emails sent</span><small>DJ/MC, inflatable, Arts Integration, sensory support, printing/signage, student activities and broader event costs</small></div>
        <div class="admin-finance-card"><strong>1</strong><span>formal sponsor form submitted</span><small>Wildflower Orthodontics received the $250 / in-kind Arts Integration request and sent confirmation</small></div>
        <div class="admin-finance-card"><strong>1</strong><span>human verification pending</span><small>Teapioca phone blocker is resolved; reCAPTCHA must be completed before submission</small></div>
        <div class="admin-finance-card"><strong>$300</strong><span>DJ/MC benchmark</span><small>Premier confirmed full 5:30–7:30 PM coverage; LC asked to meet or beat this all-in rate</small></div>
      </div>
      <div class="admin-role-list" style="margin-top:14px">
        <div class="admin-role-item"><span class="dot"></span><div><b>Wildflower Orthodontics:</b> formal $250 student activities / Arts Integration or equivalent in-kind sponsorship request submitted Sept. 17. Confirmation received from Dr. Giasi &amp; The Wildflower Ortho Team.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>Teapioca Lounge:</b> contact information corrected to Brittani Simms, 203-604-5305. Form is prepared; required human reCAPTCHA remains the only submission blocker.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>Newest outreach:</b> Evolve Human Optimization Labs — $250 sensory/wellness or in-kind support; CWS Corporate Housing — $300 entertainment or $250 community support; Pediatric Dentistry of Round Rock — $195 inflatable / $250 community follow-up; Kalahari Round Rock — zero-cost in-kind family experience or $250 community sponsorship.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>Food vendor:</b> Hearth &amp; Honey is interested and available; application pending. Electrical requirements requested; outlet/load/generator rules still need campus confirmation.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>Entertainment:</b> LC Entertainment follow-up sent Sept. 17; waiting on revised all-in PTA quote. Premier remains the confirmed $300 paid backup while the $0-spend goal is preserved.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>Follow-up rule:</b> re-contact nonresponders after five business days; do not duplicate same-day asks.</div></div>
      </div>
      <p style="margin-top:14px"><a class="admin-resource-link" href="${esc(TRACKER_URL)}" target="_blank" rel="noopener"><span>Open detailed sponsorship tracker<small>151-line needs budget + live sponsor outreach log</small></span><span>↗</span></a></p>`;
    return true;
  }
  let attempts=0;
  const boot=setInterval(async()=>{ attempts++; if(await render()||attempts>30) clearInterval(boot); },500);
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden) render(); });
  setInterval(render,60000);
})();
