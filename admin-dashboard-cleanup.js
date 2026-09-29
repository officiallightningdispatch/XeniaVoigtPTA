(()=> {
  let path=location.pathname; if(path.endsWith('/index.html')) path=path.slice(0,-11); if(path.length>1&&path.endsWith('/')) path=path.slice(0,-1); path=path||'/';
  if(path!=='/admin') return;

  const MASTER='https://docs.google.com/spreadsheets/d/18AZisrkN6lm9IP0npjKgPvoQ1ucLxbWN/edit';
  const NEEDS='https://docs.google.com/spreadsheets/d/1g9GJpTSXrL3aoRhd--KXvSf5AvP8iN4U/edit';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shortDate=s=>{try{return new Date(s+'T12:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'});}catch(_){return s;}};

  function daysToEvent(){
    const now=new Date();
    const event=new Date(2026,9,23);
    const today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    return Math.max(0,Math.ceil((event-today)/86400000));
  }

  function metric(value,label,cls=''){
    return `<article class="${cls}"><strong>${esc(value)}</strong><span>${esc(label)}</span></article>`;
  }

  function list(items){
    return `<ul>${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  }

  function render(data){
    const root=document.getElementById('adminRoot');
    const head=root?.querySelector('.admin-suite-head');
    if(!root||!head) return false;

    document.getElementById('festivalSharedStatus')?.remove();

    const m=data.metrics||{};
    const budget=data.budget||{};
    const vendors=Array.isArray(m.approvedVendors)?m.approvedVendors:[];
    const trunks=Number(m.trunkSpacesClaimed)||0;
    const trunkTarget=Number(m.trunkSpacesTarget)||20;
    const trunksOpen=Math.max(0,trunkTarget-trunks);
    const attractions=Number(m.majorAttractionsSponsored)||2;
    const attractionTarget=Number(m.majorAttractionsTarget)||2;
    const auction=Number(m.silentAuctionPrizes)||7;
    const foodTarget=Number(m.foodPlanTarget)||3;
    const days=daysToEvent();

    const priorities=[
      'Finalize campus layout, safety, ADA, traffic, attraction placement and power approvals.',
      'Finish the PE/school + PTA inventory pull; source only the materials that are actually still missing.',
      'Secure additional donated Cake Walk prizes so PTA cash is preserved.',
      `Fill the remaining ${trunksOpen} Trunk-or-Treat spaces and confirm candy pickup/distribution.`,
      'Finalize volunteer assignments and the school audio/Garage Band event-night plan.'
    ];

    const locked=[
      'Trackless train and combo inflatable are sponsored; sponsors pay the attraction providers directly.',
      `Food plan is capped at ${vendors.length||3}/${foodTarget}: ${vendors.join(' + ')||'K&K BBQ + Hearth & Honey + Pour The Fun'}.`,
      `${auction} silent-auction prizes are confirmed.`,
      'Face painting is covered by volunteers; no paid face-painting vendor is needed.'
    ];

    const deadlines=[
      'Sep 30 evening — confirmation freeze: hosts, themes, donations, volunteers and required approvals locked.',
      'Oct 1 morning — promotion-only mode begins; no new planning unless a true exception is required.',
      'Oct 23 — Fall Festival, 5:30–7:30 PM.'
    ];

    const box=document.createElement('section');
    box.id='festivalSharedStatus';
    box.className='admin-compact-command';
    box.innerHTML=`
      <div class="admin-compact-top">
        <div>
          <span class="mini-label">FALL FESTIVAL · COMMAND CENTER</span>
          <h2>${days} days to go</h2>
          <p>Friday, October 23 · 5:30–7:30 PM · Updated ${esc(shortDate(data.updatedAt||'2026-09-28'))}</p>
        </div>
        <div class="admin-compact-actions">
          <a class="btn secondary" href="${MASTER}" target="_blank" rel="noopener">Master tracker ↗</a>
          <a class="btn secondary" href="${NEEDS}" target="_blank" rel="noopener">Needs tracker ↗</a>
        </div>
      </div>

      <div class="admin-compact-metrics">
        ${metric(`${budget.spent||'$0'} / ${budget.allocation||'$300'}`,'PTA spend / allocation','covered')}
        ${metric(`${attractions} / ${attractionTarget}`,'Major attractions sponsored','covered')}
        ${metric(`${vendors.length||3} / ${foodTarget}`,'Current food plan','covered')}
        ${metric(`${trunks} / ${trunkTarget}`,'Trunk-or-Treat spaces')}
        ${metric(String(auction),'Silent-auction prizes','covered')}
      </div>

      <div class="admin-focus-grid">
        <article class="admin-focus urgent">
          <div class="admin-focus-head"><span>NEEDS ACTION NOW</span><b>5</b></div>
          ${list(priorities)}
        </article>
        <article class="admin-focus confirmed">
          <div class="admin-focus-head"><span>LOCKED IN</span><b>4</b></div>
          ${list(locked)}
        </article>
        <article class="admin-focus open">
          <div class="admin-focus-head"><span>DEADLINES</span><b>3</b></div>
          ${list(deadlines)}
        </article>
      </div>
    `;

    head.insertAdjacentElement('afterend',box);

    const nav=root.querySelector('.admin-suite-tabs');
    root.querySelectorAll('.admin-suite-tabs [data-panel]').forEach(b=>{
      if(!['submissions','resources'].includes(b.dataset.panel)) b.remove();
    });
    ['panel-role','panel-events','panel-finance','panel-communications'].forEach(id=>document.getElementById(id)?.remove());

    let details=document.getElementById('boardToolsFold');
    if(!details){
      details=document.createElement('details');
      details.id='boardToolsFold';
      details.className='admin-full-workspace';
      details.innerHTML='<summary><span><b>Forms & board files</b><small>Open only when you need submissions or source documents.</small></span><b>＋</b></summary><div class="admin-full-workspace-body"></div>';
      root.appendChild(details);
    }
    const body=details.querySelector('.admin-full-workspace-body');
    if(nav && nav.parentElement!==body) body.appendChild(nav);

    ['panel-submissions','panel-resources'].forEach(id=>{
      const panel=document.getElementById(id);
      if(panel && panel.parentElement!==body) body.appendChild(panel);
    });

    [...root.children].forEach(node=>{
      if(node!==head && node!==box && node!==details) node.remove();
    });

    const firstTab=nav?.querySelector('[data-panel="submissions"]');
    if(firstTab){
      nav.querySelectorAll('[data-panel]').forEach(x=>x.classList.remove('active'));
      firstTab.classList.add('active');
      body.querySelectorAll('.admin-panel').forEach(x=>x.classList.remove('active'));
      body.querySelector('#panel-submissions')?.classList.add('active');
    }
    return true;
  }


  function wireActionButtons(){
    if(document.documentElement.dataset.adminActionFix==='1') return;
    document.documentElement.dataset.adminActionFix='1';

    document.addEventListener('click', async (e)=>{
      const btn=e.target.closest('button');
      if(!btn) return;

      const viewId=btn.dataset.viewId;
      const confirmId=btn.dataset.confirmVendor;
      const declineId=btn.dataset.declineVendor;

      if(viewId){
        e.preventDefault();
        e.stopImmediatePropagation();
        const entry=btn.closest('.admin-entry');
        entry?.classList.toggle('open');
        btn.textContent=entry?.classList.contains('open')?'Hide details':'View details';
        return;
      }

      if(confirmId){
        e.preventDefault();
        e.stopImmediatePropagation();
        const entry=btn.closest('.admin-entry');
        const name=entry?.querySelector('.admin-entry-name')?.textContent?.trim()||'this vendor';
        if(!window.confirm(`Verify and confirm ${name}? This will immediately email the vendor from info@xeniavoigtpta.org.`)) return;

        const session=sessionStorage.getItem('voigt-pta-board-session');
        if(!session){ alert('Your board session expired. Please sign in again.'); return; }

        const old=btn.textContent;
        btn.disabled=true;
        btn.textContent='Confirming…';
        try{
          const r=await fetch('/api/admin',{
            method:'PATCH',
            headers:{'Content-Type':'application/json','x-admin-session':session},
            body:JSON.stringify({kind:'vendors',id:Number(confirmId),status:'confirmed'})
          });
          const j=await r.json().catch(()=>({}));
          if(!r.ok) throw new Error(j.error||'Could not confirm vendor.');

          const pill=entry?.querySelector('.admin-status-pill');
          if(pill){
            pill.textContent='Confirmed';
            pill.classList.remove('warn','hot');
            pill.classList.add('good');
          }
          entry?.querySelector('[data-decline-vendor]')?.remove();
          btn.remove();
        }catch(err){
          btn.disabled=false;
          btn.textContent=old;
          alert(err.message||'Could not confirm vendor.');
        }
        return;
      }

      if(declineId){
        e.preventDefault();
        e.stopImmediatePropagation();
        const entry=btn.closest('.admin-entry');
        const name=entry?.querySelector('.admin-entry-name')?.textContent?.trim()||'this vendor';
        if(!window.confirm(`Decline ${name}?`)) return;

        const session=sessionStorage.getItem('voigt-pta-board-session');
        if(!session){ alert('Your board session expired. Please sign in again.'); return; }

        btn.disabled=true;
        const old=btn.textContent;
        btn.textContent='Declining…';
        try{
          const r=await fetch('/api/admin',{
            method:'PATCH',
            headers:{'Content-Type':'application/json','x-admin-session':session},
            body:JSON.stringify({kind:'vendors',id:Number(declineId),status:'declined'})
          });
          const j=await r.json().catch(()=>({}));
          if(!r.ok) throw new Error(j.error||'Could not decline vendor.');

          const pill=entry?.querySelector('.admin-status-pill');
          if(pill){
            pill.textContent='Declined';
            pill.classList.remove('warn','good');
          }
          entry?.querySelector('[data-confirm-vendor]')?.remove();
          btn.remove();
        }catch(err){
          btn.disabled=false;
          btn.textContent=old;
          alert(err.message||'Could not decline vendor.');
        }
      }
    },true);
  }

  async function install(){
    const root=document.getElementById('adminRoot');
    if(!root) return false;
    try{
      const r=await fetch('/api/festival-status',{cache:'no-store'});
      if(!r.ok) return false;
      const ok=render(await r.json()); wireActionButtons(); return ok;
    }catch(_){return false;}
  }

  let n=0;
  const timer=setInterval(async()=>{
    n++;
    if(await install()||n>60) clearInterval(timer);
  },500);

  document.addEventListener('visibilitychange',()=>{if(!document.hidden) install();});
})();
