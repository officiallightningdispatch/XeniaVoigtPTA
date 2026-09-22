(()=> {
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/admin') return;
  const MASTER='https://docs.google.com/spreadsheets/d/18AZisrkN6lm9IP0npjKgPvoQ1ucLxbWN/edit';

  function render(){
    const events=document.getElementById('panel-events');
    if(!events) return false;
    let block=document.getElementById('sponsorPushStatus');
    if(!block){
      block=document.createElement('section');
      block.id='sponsorPushStatus';
      block.className='admin-card';
      const ops=document.getElementById('fallFestivalOpsSync');
      if(ops) ops.insertAdjacentElement('afterend',block); else events.appendChild(block);
    }
    block.innerHTML=`
      <div class="admin-section-title">
        <h2>Outreach controls</h2>
        <p>This replaces the old running outreach list so separate ChatGPT sessions cannot create duplicate follow-ups from stale dashboard data.</p>
      </div>
      <div class="admin-role-list">
        <div class="admin-role-item"><span class="dot"></span><div><b>Gmail first:</b> read the complete organization thread before every new email or reply.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>Three-business-day minimum:</b> no routine follow-up sooner unless the recipient explicitly asks for immediate action.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>Silent auction:</b> no new donor solicitation.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>05 Diaz:</b> backup only unless the primary food-vendor target requires activation.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>Face painting:</b> volunteer-run; no paid-provider outreach.</div></div>
        <div class="admin-role-item"><span class="dot"></span><div><b>Pending ≠ confirmed:</b> quotes, applications, acknowledgements and review queues stay uncovered until explicit commitment.</div></div>
      </div>
      <p style="margin-top:14px"><a class="admin-resource-link" href="${MASTER}" target="_blank" rel="noopener"><span>Open authoritative tracker<small>Use this instead of old dashboard outreach counts</small></span><span>↗</span></a></p>`;
    return true;
  }

  let attempts=0;
  const boot=setInterval(()=>{attempts++; if(render()||attempts>30) clearInterval(boot);},500);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden) render();});
})();