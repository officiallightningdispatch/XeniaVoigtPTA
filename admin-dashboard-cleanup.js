(()=> {
  let path=location.pathname;
  if(path.endsWith('/index.html')) path=path.slice(0,-11);
  if(path.length>1&&path.endsWith('/')) path=path.slice(0,-1);
  path=path||'/';
  if(path!=='/admin') return;

  const SESSION_KEY='voigt-pta-board-session';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=n=>Number.isFinite(Number(n))?'$'+Number(n).toLocaleString(undefined,{maximumFractionDigits:2}):'$0';
  const titleCase=s=>String(s||'').replace(/[_-]+/g,' ').replace(/\b\w/g,m=>m.toUpperCase());

  const icons={
    home:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-7h5v7"/></svg>',
    heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    store:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16"/><path d="M5 10v10h14V10"/><path d="M3 6h18l-1 4H4L3 6Z"/><path d="M9 14h6v6H9z"/></svg>',
    users:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-4 2.2-7 6-7s6 3 6 7"/><path d="M14.5 14c3.3.2 5.5 2.1 5.5 6"/></svg>',
    megaphone:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 13-5v12L3 13z"/><path d="M16 10c3 0 5-1 5-1v6s-2-1-5-1"/><path d="m7 14 2 6h3l-2-7"/></svg>',
    map:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/></svg>',
    gift:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h18v12H3z"/><path d="M12 9v12M3 13h18"/><path d="M12 9H7.5A2.5 2.5 0 1 1 10 6.5L12 9Zm0 0h4.5A2.5 2.5 0 1 0 14 6.5L12 9Z"/></svg>',
    clock:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    check:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
    alert:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5M12 17h.01"/></svg>',
    logout:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4H4v16h6"/><path d="m14 8 4 4-4 4M8 12h10"/></svg>'
  };

  function navButton(id,label,icon){
    return `<button class="ff-side-link ${id==='dashboard'?'active':''}" type="button" data-board-view="${id}"><span class="ff-side-icon">${icons[icon]}</span><span>${esc(label)}</span></button>`;
  }

  function metricCard(item){
    const pct=Math.max(0,Math.min(100,Number(item.percent)||0));
    return `<article class="ff-metric-card">
      <div class="ff-metric-top">
        <span class="ff-metric-icon">${icons[item.icon]||icons.heart}</span>
        <div><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span></div>
      </div>
      <div class="ff-progress"><i style="width:${pct}%"></i></div>
      <small>${pct}%</small>
    </article>`;
  }

  function statusSection(kind,title,items){
    const map={confirmed:['check','green'],working:['clock','gold'],action:['alert','red'],complete:['check','gray']};
    const [icon,tone]=map[kind]||map.working;
    return `<section class="ff-status-card ff-${kind}">
      <div class="ff-status-head"><span class="ff-status-head-icon ${tone}">${icons[icon]}</span><h2>${esc(title)}</h2><span>${items.length} item${items.length===1?'':'s'}</span></div>
      <div class="ff-table-head"><span>Item</span><span>${kind==='confirmed'||kind==='complete'?'Date':'Due Date'}</span></div>
      <div class="ff-status-rows">
        ${items.map(item=>`<div class="ff-status-row"><div><b>${esc(item.item)}</b><span class="ff-pill ${esc(item.tone||kind)}">${esc(item.status||title)}</span></div><time>${esc(item.date||'—')}</time><span class="ff-chevron">›</span></div>`).join('')}
      </div>
    </section>`;
  }

  function fallbackDashboard(admin){
    const sponsors=(admin.sponsorships||[]).filter(x=>['pledged','confirmed','paid'].includes(x.status));
    const confirmedVendors=(admin.vendors||[]).filter(x=>x.status==='confirmed');
    const volunteerCount=(admin.volunteers||[]).filter(x=>!['closed','declined'].includes(x.status)).length;
    return {
      metrics:[
        {label:'Sponsors & Funding',value:`${Math.max(2,new Set(sponsors.map(x=>x.organization||x.donor_name).filter(Boolean)).size)} / 2`,percent:100,icon:'heart'},
        {label:'Vendors & Attractions',value:`${Math.max(3,confirmedVendors.length)+2} / 5`,percent:100,icon:'store'},
        {label:'Volunteers',value:`${Math.max(11,volunteerCount)} / 36`,percent:31,icon:'users'},
        {label:'Donations & Fulfillment',value:'3 / 7',percent:43,icon:'gift'},
        {label:'Family Communications',value:'2 / 3',percent:67,icon:'megaphone'}
      ],
      confirmed:[
        {item:'Train Quest package (trackless train + games)',status:'Confirmed',date:'Oct 1',tone:'confirmed'},
        {item:'H-E-B $125 Cake Walk support',status:'Approved',date:'Sep 30',tone:'confirmed'},
        {item:'Round Rock Sweethearts — 9 students',status:'Confirmed',date:'Sep 30',tone:'confirmed'},
        {item:'Nothing Bundt Cakes — 15 Bundtlets',status:'Confirmed',date:'Oct 22',tone:'confirmed'},
        {item:'Teacher trunks — Pre-K through 5',status:'Confirmed',date:'Sep 30',tone:'confirmed'}
      ],
      working:[
        {item:'H-E-B Cake Walk shopping',status:'Appointment pending',date:'Oct 22',tone:'working'},
        {item:'A+ candy handoff',status:'Scheduling',date:'Oct 22',tone:'working'},
        {item:'St. Richard’s — 86 pumpkins',status:'Quantity pending',date:'Oct 22',tone:'working'},
        {item:'Train Quest onsite walk-through',status:'Time pending',date:'Oct 16',tone:'working'}
      ],
      action:[
        {item:'Shine inflatable payment — INV0763',status:'Action Needed',date:'ASAP',tone:'action'},
        {item:'Confirm 12A outlet + audio operator',status:'Action Needed',date:'Oct 16',tone:'action'},
        {item:'Finalize volunteer adult leads',status:'Action Needed',date:'Oct 16',tone:'action'}
      ],
      complete:[
        {item:'AiRCO $1,095 Train Quest payment',status:'Completed',date:'Oct 1',tone:'complete'},
        {item:'Express supplies delivered to Voigt',status:'Completed',date:'Sep 25',tone:'complete'},
        {item:'Family candy drive live through Oct. 23',status:'Completed',date:'Oct 1',tone:'complete'}
      ],
      communications:[
        'Family candy drive is live through October 23.',
        'Volunteer recruitment is active.',
        'Public website stays family-facing only; no internal planning content.'
      ],
      layoutOps:[
        'Train: track route; batting area loading/unloading; queue along fence.',
        'Inflatable: covered-area/portable power zone; 110V, 12A, within 50 feet.',
        'Food vendors: back-drive spaces nearest gate.',
        'Trunk-or-Treat: back-drive spaces facing school; accessible spaces remain open.',
        'Indoor public use: gym, downstairs restrooms, main hallway, cafeteria only.',
        'Audio: school car-rider speaker + microphone; district operator still to be confirmed.'
      ]
    };
  }

  function renderListPanel(title,subtitle,rows){
    return `<section class="ff-view-panel"><div class="ff-panel-head"><div><h2>${esc(title)}</h2><p>${esc(subtitle)}</p></div></div><div class="ff-simple-list">${rows.length?rows.join(''):'<div class="ff-empty">Nothing to show.</div>'}</div></section>`;
  }

  function sponsorRows(data){
    return (data.sponsorships||[]).map(x=>`<div class="ff-simple-row"><div><b>${esc(x.organization||x.donor_name||x.need_title||'Sponsor')}</b><span>${esc(x.need_title||'')} · ${money(x.amount)}</span></div><span class="ff-pill ${x.status==='paid'?'complete':x.status==='confirmed'||x.status==='pledged'?'confirmed':'working'}">${esc(titleCase(x.status))}</span></div>`);
  }

  function vendorRows(data){
    return (data.vendors||[]).map(x=>`<div class="ff-simple-row"><div><b>${esc(x.business_name||'Vendor')}</b><span>${esc(x.contact_name||'')}${x.email?' · '+esc(x.email):''}</span></div><span class="ff-pill ${x.status==='confirmed'?'confirmed':x.status==='declined'||x.status==='closed'?'complete':'working'}">${esc(titleCase(x.status))}</span></div>`);
  }

  function volunteerRows(data){
    return (data.volunteers||[]).map(x=>`<div class="ff-simple-row"><div><b>${esc([x.first_name,x.last_name].filter(Boolean).join(' ')||'Volunteer')}</b><span>${esc(x.event||'General availability')}${x.email?' · '+esc(x.email):''}</span></div><span class="ff-pill ${x.status==='approved'?'confirmed':x.status==='closed'?'complete':'working'}">${esc(titleCase(x.status))}</span></div>`);
  }

  async function render(){
    const root=document.getElementById('adminRoot');
    if(!root) return false;
    const session=sessionStorage.getItem(SESSION_KEY);
    if(!session) return false;

    try{
      const [ar,fr]=await Promise.all([
        fetch('/api/admin',{headers:{'x-admin-session':session},cache:'no-store'}),
        fetch('/api/festival-status',{cache:'no-store'})
      ]);
      if(!ar.ok) return false;
      const admin=await ar.json();
      const festival=fr.ok?await fr.json():{};
      const board=festival.dashboard||fallbackDashboard(admin);
      const updated=festival.updatedAt||new Date().toISOString().slice(0,10);

      root.className='ff-board-dashboard';
      root.innerHTML=`
        <aside class="ff-board-sidebar">
          <div class="ff-brand"><strong>XENIA VOIGT</strong><span>ELEMENTARY</span><b>PTA</b><i></i></div>
          <nav>
            ${navButton('dashboard','Dashboard','home')}
            ${navButton('sponsors','Sponsors','heart')}
            ${navButton('vendors','Vendors','store')}
            ${navButton('volunteers','Volunteers','users')}
            ${navButton('communications','Communications','megaphone')}
            ${navButton('layout','Layout & Ops','map')}
          </nav>
          <button class="ff-logout" id="adminLogout" type="button"><span class="ff-side-icon">${icons.logout}</span><span>Sign out</span></button>
        </aside>
        <main class="ff-board-main">
          <header class="ff-board-header">
            <div><h1>Xenia Voigt Elementary PTA — <em>Fall Festival Board Dashboard</em></h1><p>Internal planning view</p></div>
            <span>Updated daily</span>
          </header>
          <div id="ffBoardView"></div>
        </main>
      `;

      const view=document.getElementById('ffBoardView');
      function showDashboard(){
        view.innerHTML=`
          <div class="ff-metric-grid">${(board.metrics||[]).map(metricCard).join('')}</div>
          <div class="ff-status-grid">
            ${statusSection('confirmed','Confirmed',board.confirmed||[])}
            ${statusSection('working','Working On / Pending',board.working||[])}
            ${statusSection('action','Action Needed',board.action||[])}
            ${statusSection('complete','Complete',board.complete||[])}
          </div>`;
      }
      function setActive(id){
        root.querySelectorAll('[data-board-view]').forEach(b=>b.classList.toggle('active',b.dataset.boardView===id));
      }

      root.querySelectorAll('[data-board-view]').forEach(btn=>btn.addEventListener('click',()=>{
        const id=btn.dataset.boardView; setActive(id);
        if(id==='dashboard') return showDashboard();
        if(id==='sponsors') return view.innerHTML=renderListPanel('Sponsors & Funding','Current internal sponsorship records.',sponsorRows(admin));
        if(id==='vendors') return view.innerHTML=renderListPanel('Vendors','Current vendor applications and confirmations.',vendorRows(admin));
        if(id==='volunteers') return view.innerHTML=renderListPanel('Volunteers','Website volunteer submissions. Group commitments are summarized on the dashboard.',volunteerRows(admin));
        if(id==='communications') return view.innerHTML=renderListPanel('Communications','Current family-facing communication work.',(board.communications||[]).map(x=>`<div class="ff-simple-row"><div><b>${esc(x)}</b></div><span class="ff-pill confirmed">Current</span></div>`));
        if(id==='layout') return view.innerHTML=renderListPanel('Layout & Operations','Working internal operating plan; not for the public website.',(board.layoutOps||[]).map(x=>`<div class="ff-simple-row"><div><b>${esc(x)}</b></div><span class="ff-pill working">Working Final</span></div>`));
      }));

      document.getElementById('adminLogout')?.addEventListener('click',async()=>{
        try{await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json','x-admin-session':session},body:JSON.stringify({action:'logout'})});}catch(_){}
        sessionStorage.removeItem(SESSION_KEY);
        location.reload();
      });

      showDashboard();
      document.documentElement.dataset.ffDashboardUpdated=updated;
      return true;
    }catch(_){return false;}
  }

  let tries=0;
  const timer=setInterval(async()=>{
    tries++;
    if(await render()||tries>80) clearInterval(timer);
  },250);

  document.addEventListener('visibilitychange',()=>{if(!document.hidden) render();});
})();