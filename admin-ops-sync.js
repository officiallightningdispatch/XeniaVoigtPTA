(()=> {
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/admin') return;

  const SESSION_KEY='voigt-pta-board-session';
  const VOLUNTEER_TARGET=55;
  const MASTER='https://docs.google.com/spreadsheets/d/18AZisrkN6lm9IP0npjKgPvoQ1ucLxbWN/edit';
  const NEEDS='https://docs.google.com/spreadsheets/d/1g9GJpTSXrL3aoRhd--KXvSf5AvP8iN4U/edit?usp=drivesdk';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

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
    const events=document.getElementById('panel-events');
    if(!events) return false;
    const data=await getLiveData();
    if(!data) return false;
    const volunteers=Array.isArray(data.volunteers)?data.volunteers:[];
    const remaining=Math.max(0,VOLUNTEER_TARGET-volunteers.length);

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
        <h2>Fall Festival — reconciled command board</h2>
        <p>Updated September 22, 2026. Gmail thread history is the outreach authority; only explicit commitments count as confirmed.</p>
      </div>

      <div class="admin-grid-3">
        <article class="admin-card" style="border-top:5px solid #1f8f4e">
          <span class="mini-label">CONFIRMED / COVERED</span>
          <h3>What is actually locked</h3>
          <div class="admin-role-list">
            <div class="admin-role-item"><span class="dot"></span><div><b>Food vendors:</b> 7 confirmed — Kona Ice, KK BBQ, Coco's Eats & Sweets / Vaughan's, Pour The Fun, Hearth & Honey, Rock N Grill and The Gelato Lab.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Bounce/combo:</b> Smile Doctors confirmed $195 sponsorship.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Rune Maker blanks:</b> 400 unfinished wooden circles personally sponsored by Brittani; $0 PTA spend.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>School equipment:</b> Coach Pettit confirmed cones/dome markers, about 5 buckets, tug ropes, sack-race sacks, 2 balance beams, wedge mats, gym rope obstacle equipment, some foam balls, 5–6 hippity hops and several plastic pools.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Cleanup support:</b> Express Commercial Cleaning committed; exact item quantities are still pending before individual lines are zeroed out.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Prizes/experiences:</b> Austin Aquarium, Austin Zoo, Round Rock Pumpkin Festival, Monster Mini Golf, Cookies & Crumbles and Toybrary are confirmed.</div></div>
          </div>
        </article>

        <article class="admin-card" style="border-top:5px solid #ed2c24">
          <span class="mini-label">ACTIVE GAPS</span>
          <h3>What still needs coverage</h3>
          <div class="admin-role-list">
            <div class="admin-role-item"><span class="dot"></span><div><b>Food vendors:</b> 7 confirmed; reach 10–15 with cuisine diversity. 05 Diaz stays backup only.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>DJ/MC:</b> Infinity Sound Lab has a $300 contract proposal; this is a quote, not sponsorship. Underwriting remains open.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Sensory retreat:</b> campus coordination + outside resource requests remain open; no full coverage yet.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Signage/printing:</b> FASTSIGNS, Ranger Print House, Berryful Creations and other print paths are being coordinated; do not count full coverage until scope is explicit.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Consumables / safety / cleanup:</b> wait for Express quantities before filling remaining gaps.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Student prizes/bag fillers:</b> continue direct-event coverage only; do not seek new silent-auction items.</div></div>
          </div>
        </article>

        <article class="admin-card" style="border-top:5px solid #e3a300">
          <span class="mini-label">CONTROLS</span>
          <h3>Duplicate-prevention rules</h3>
          <div class="admin-role-list">
            <div class="admin-role-item"><span class="dot"></span><div><b>Follow-up:</b> minimum 3 business days unless the recipient asks for immediate action.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Before every contact:</b> search the full Gmail thread first.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Confirmed means explicit:</b> quotes, applications, acknowledgements and pending reviews do not count.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Silent auction:</b> closed to new outreach. Track only existing commitments and fulfillment.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Face painting:</b> volunteer-run; no paid provider or staffing outreach.</div></div>
            <div class="admin-role-item"><span class="dot"></span><div><b>Source of truth:</b> Gmail → explicit commitment → master tracker → dashboard.</div></div>
          </div>
        </article>
      </div>

      <div class="admin-section-title" style="margin-top:20px"><h2>Coverage scoreboard</h2><p>Confirmed / target. Pending items are excluded.</p></div>
      <div class="admin-finance-grid">
        ${card('Food vendors','7 / 15','Stretch target; minimum target is 10')}
        ${card('Trunk-or-Treat spaces','9 / 20','11 open')}
        ${card('Volunteer staffing',volunteers.length+' / '+VOLUNTEER_TARGET,remaining+' remaining to current minimum plan')}
        ${card('Detailed needs fully covered','9 / 151','4 additional lines have committed support with quantities pending; 2 are partially covered')}
        ${card('Viking Quest stations','5 / 5','Station concepts planned')}
        ${card('Inflatables / major attractions','1 / 3','Smile Doctors covers the $195 bounce/combo; other attraction coverage remains open')}
        ${card('DJ / MC sponsored/locked','0 / 1','Infinity $300 proposal available; underwriting not yet confirmed')}
        ${card('Silent auction experiences','4 / 4','Closed to new outreach')}
        ${card('Sweet Finish giveaway','1 / 1','Cookies & Crumbles $65 gift certificate')}
        ${card('Preschool/family prize','1 / 1','Toybrary $60 Stay & Play punch card')}
        ${card('Sensory retreat coverage','0 / 1','Still open')}
        ${card('Cleanup supporter','1 / 1','Express committed; exact quantities pending')}
      </div>

      <div class="admin-callout" style="margin-top:14px"><strong>Current rule:</strong> preserve the $300 PTA allocation whenever possible. Do not duplicate outreach for a need already explicitly covered or currently inside the three-business-day follow-up window.</div>
      <div class="admin-grid-3" style="margin-top:14px">
        <a class="admin-resource-link" href="${MASTER}" target="_blank" rel="noopener"><span>Authoritative master tracker<small>Reconciled event-wide status</small></span><span>↗</span></a>
        <a class="admin-resource-link" href="${NEEDS}" target="_blank" rel="noopener"><span>Detailed needs tracker<small>Line-item quantities and remaining gaps</small></span><span>↗</span></a>
      </div>`;
    return true;
  }

  let attempts=0;
  const boot=setInterval(async()=>{attempts++; if(await render()||attempts>30) clearInterval(boot);},500);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden) render();});
  setInterval(render,60000);
})();