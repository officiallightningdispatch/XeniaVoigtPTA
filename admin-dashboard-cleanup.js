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
        ${items.map((item,index)=>{
          const next=item.next?'<div class="ff-detail-next"><strong>Next:</strong> '+esc(item.next)+'</div>':'';
          return '<article class="ff-status-item"><button class="ff-status-row" type="button" data-detail-toggle aria-expanded="false"><div><b>'+esc(item.item)+'</b><span class="ff-pill '+esc(item.tone||kind)+'">'+esc(item.status||title)+'</span></div><time>'+esc(item.date||'—')+'</time><span class="ff-chevron" aria-hidden="true">›</span></button><div class="ff-status-detail" hidden><p>'+esc(item.detail||'No additional details have been added yet.')+'</p>'+next+'</div></article>';
        }).join('')}
      </div>
    </section>`;
  }


  function renderListPanel(title,description,rows){
    const items=Array.isArray(rows)?rows:[];
    return `<section class="ff-view-panel">
      <div class="ff-panel-head"><h2>${esc(title)}</h2><p>${esc(description)}</p></div>
      <div class="ff-simple-list">${items.length?items.map(item=>`<article class="ff-simple-row">
        <div><b>${esc(item.item)}</b><span>${esc(item.detail||'')}</span></div>
        <span class="ff-pill ${esc(item.tone||'working')}">${esc(item.status||'Pending')}</span>
      </article>`).join(''):'<p class="ff-empty">No current items in this view.</p>'}</div>
    </section>`;
  }

  function fallbackDashboard(){
    return {
      metrics:[
        {label:'Festival Status',value:'Syncing',percent:0,icon:'heart'},
        {label:'Vendors',value:'Syncing',percent:0,icon:'store'},
        {label:'Volunteers',value:'Syncing',percent:0,icon:'users'},
        {label:'Materials',value:'Syncing',percent:0,icon:'gift'},
        {label:'Communications',value:'Syncing',percent:0,icon:'megaphone'}
      ],
      action:[{
        item:'Live planning status unavailable',
        status:'Refresh',
        date:'Now',
        tone:'action',
        detail:'The authenticated Fall Festival status could not be loaded.',
        next:'Refresh this private board page. If the issue continues, use the master tracker.'
      }],
      working:[],
      confirmed:[],
      complete:[]
    };
  }

  async function render(){
    const root=document.getElementById('adminRoot');
    if(!root) return false;
    const session=sessionStorage.getItem(SESSION_KEY);
    if(!session) return false;

    try{
      const [ar,fr]=await Promise.all([
        fetch('/api/admin',{headers:{'x-admin-session':session},cache:'no-store'}),
        fetch('/api/festival-status',{headers:{'x-admin-session':session},cache:'no-store'})
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
            ${navButton('dashboard','PTA Overview','home')}
            ${navButton('operations','Funding & PTA Records','heart')}
            ${navButton('photos','Photo Approvals','gift')}
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
            <div><h1>Xenia Voigt Elementary PTA — <em>PTA Board Operations Dashboard</em></h1><p>2026–27 operations · post-festival closeout and year-round stewardship</p></div>
            <span>Updated ${esc(updated)}</span>
          </header>
          <div id="ffBoardView"></div>
        </main>
      `;

      const view=document.getElementById('ffBoardView');
      const sourceSections=[
        {title:'Grants & funding',rows:[
          ['National PTA Healthy Minds / New York Life Foundation','$1,500 requested · submitted October 12, 2026 · outcome expected November','https://docs.google.com/spreadsheets/d/18svZh4ynkP8a9A-98Zsir4l4wipvoCPuOZXyWiSSPzw/edit#gid=1977816323'],
          ['Amazon Funding & Donations','Historical festival registry data; reconcile items received and purchased','https://docs.google.com/spreadsheets/d/18svZh4ynkP8a9A-98Zsir4l4wipvoCPuOZXyWiSSPzw/edit#gid=1503432159']
        ]},
        {title:'Sponsors, donors & partners',rows:[
          ['Sponsor List','Outreach, previous funders and sponsor contact notes; some historical statuses need verification','https://docs.google.com/spreadsheets/d/18svZh4ynkP8a9A-98Zsir4l4wipvoCPuOZXyWiSSPzw/edit#gid=0'],
          ['Live Sponsorship Fulfillment','Festival sponsorship commitments and needs; archive actual fulfillment after reconciliation','https://docs.google.com/spreadsheets/d/1Uy_sdelXl_bGrhT38p-b_DjEJ2EQ1TDNMVfqHxDs3kw/edit'],
          ['Community partnership follow-up','Round Rock Public Library reported 10 new library card registrations at Viking Quest. Preserve for impact reporting.','https://mail.google.com/mail/u/0/#all/1a173f3e8f9b4973']
        ]},
        {title:'Vendors & volunteers',rows:[
          ['Vendor records','Manage submitted vendors in the existing secured board database','/admin'],
          ['Current PTA volunteers','Use existing application records for future events; retain festival records as history','/admin'],
          ['Event outcomes & future planning','Use annual Events Calendar; the October 23 festival has ended','https://docs.google.com/spreadsheets/d/18svZh4ynkP8a9A-98Zsir4l4wipvoCPuOZXyWiSSPzw/edit#gid=82236447']
        ]},
        {title:'PTA operations & governance',rows:[
          ['2026–27 Master Workbook','Membership, contacts, budget, surveys, communications, events and inventory','https://docs.google.com/spreadsheets/d/18svZh4ynkP8a9A-98Zsir4l4wipvoCPuOZXyWiSSPzw/edit'],
          ['Budget','Current master sheet contains September balances; reconcile with actual bank records before reporting as current','https://docs.google.com/spreadsheets/d/18svZh4ynkP8a9A-98Zsir4l4wipvoCPuOZXyWiSSPzw/edit#gid=460085062'],
          ['Important dates','PTA grants, registrations and award deadlines','https://docs.google.com/spreadsheets/d/18svZh4ynkP8a9A-98Zsir4l4wipvoCPuOZXyWiSSPzw/edit#gid=1996290705']
        ]}
      ];
      function showOperations(){
       view.innerHTML='<div class="ff-view-panel"><div class="ff-panel-head"><h2>PTA operations · October 2026 onward</h2><p>Source-linked board hub. Recorded grant submissions and historic festival outreach are not proof of awards, payments, or completed fulfillment. Only accessible source records are included.</p></div>'+sourceSections.map(section=>'<section style="margin:18px 0;padding:18px;border:1px solid #ddd;border-radius:12px"><h3>'+esc(section.title)+'</h3>'+section.rows.map(row=>'<article style="padding:12px 0;border-bottom:1px solid #eee"><b>'+esc(row[0])+'</b><p>'+esc(row[1])+'</p><a href="'+esc(row[2])+'" target="_blank" rel="noopener noreferrer">Open source ↗</a></article>').join('')+'</section>').join('')+'</div>';
      }
      async function showPhotos(){
       view.innerHTML='<div class="ff-view-panel"><h2>Event photo moderation</h2><p>Only approved photos become public. Review each image and verify consent before publishing.</p><div id="photoQueue">Loading submissions…</div></div>';
       try{
        const r=await fetch('/api/event-photos?action=queue',{headers:{'x-admin-session':session},cache:'no-store'});
        if(!r.ok)throw Error('Could not access photo submissions');
        const data=await r.json(),list=view.querySelector('#photoQueue');
        list.innerHTML=data.photos.length?data.photos.map(p=>'<article class="modern-panel" style="margin:14px 0"><p><strong>'+esc(p.submitter_name)+'</strong> · '+esc(p.submitter_email)+'</p><p>'+esc(p.caption||'No caption')+'</p><p>Status: '+esc(p.status)+'</p><button type="button" data-preview-photo="'+Number(p.id)+'">Preview privately</button> '+(p.status==='pending'?'<button type="button" data-review-photo="'+Number(p.id)+'" data-status="approved">Approve</button> <button type="button" data-review-photo="'+Number(p.id)+'" data-status="rejected">Reject</button>':'')+'<div class="photo-review-preview"></div></article>').join(''):'<p>No photos submitted yet.</p>';
        list.querySelectorAll('[data-review-photo]').forEach(b=>b.onclick=async()=>{if(b.dataset.status==='approved'&&!confirm('Confirm permission and approve this photo for public display?'))return;const response=await fetch('/api/event-photos?action=review',{method:'POST',headers:{'Content-Type':'application/json','x-admin-session':session},body:JSON.stringify({id:Number(b.dataset.reviewPhoto),status:b.dataset.status})});if(response.ok)showPhotos();else alert('Review could not be saved.');});
        list.querySelectorAll('[data-preview-photo]').forEach(b=>b.onclick=async()=>{const response=await fetch('/api/event-photos?action=image&id='+Number(b.dataset.previewPhoto),{headers:{'x-admin-session':session},cache:'no-store'});if(!response.ok)return alert('Could not load private preview.');const blob=await response.blob(),url=URL.createObjectURL(blob),box=b.closest('article').querySelector('.photo-review-preview');box.innerHTML='';const img=document.createElement('img');img.alt='Private photo awaiting review';img.style.cssText='max-width:360px;width:100%;margin-top:12px;border-radius:8px';img.src=url;img.onload=()=>URL.revokeObjectURL(url);box.appendChild(img);});
       }catch(e){view.querySelector('#photoQueue').textContent=e.message;}
      }

      function showDashboard(){
        view.innerHTML=`
          <div class="ff-metric-grid">${(board.metrics||[]).map(metricCard).join('')}</div>
          <div class="ff-status-grid">
            ${statusSection('action','Action Needed',board.action||[])}
            ${statusSection('working','Working On / Pending',board.working||[])}
            ${statusSection('confirmed','Confirmed / Scheduled',board.confirmed||[])}
            ${statusSection('complete','Complete',board.complete||[])}
          </div>`;
        wireDetailToggles();
      }
      function wireDetailToggles(){
        view.querySelectorAll('[data-detail-toggle]').forEach(btn=>{
          btn.addEventListener('click',()=>{
            const item=btn.closest('.ff-status-item');
            const detail=item?.querySelector('.ff-status-detail');
            if(!detail) return;
            const open=btn.getAttribute('aria-expanded')==='true';
            btn.setAttribute('aria-expanded',String(!open));
            detail.hidden=open;
            item?.classList.toggle('open',!open);
          });
        });
      }
      function setActive(id){
        root.querySelectorAll('[data-board-view]').forEach(b=>b.classList.toggle('active',b.dataset.boardView===id));
      }

      root.querySelectorAll('[data-board-view]').forEach(btn=>btn.addEventListener('click',()=>{
        const id=btn.dataset.boardView; setActive(id);
        if(id==='dashboard') return showOperations();
        if(id==='operations') return showOperations();
        if(id==='photos') return showPhotos();
        const panel=(board.panels||{})[id];
        if(panel) return view.innerHTML=renderListPanel(panel.title,panel.description,panel.rows);
        view.innerHTML=renderListPanel('Current status','Open the live master tracker for the full record.',[]);
      }));

      document.getElementById('adminLogout')?.addEventListener('click',async()=>{
        try{await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json','x-admin-session':session},body:JSON.stringify({action:'logout'})});}catch(_){}
        sessionStorage.removeItem(SESSION_KEY);
        location.reload();
      });

      showOperations();
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