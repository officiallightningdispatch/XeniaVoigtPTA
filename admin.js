(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/admin')return;
  const main=document.querySelector('main#main'); if(!main)return;
  document.querySelector('.modern-newsletter')?.remove();
  const sessionName='voigt-pta-board-session';
  const DRIVE_SHEET='https://docs.google.com/spreadsheets/d/18svZh4ynkP8a9A-98Zsir4l4wipvoCPuOZXyWiSSPzw/edit';
  const DRIVE={
    command:'https://docs.google.com/spreadsheets/d/18AZisrkN6lm9IP0npjKgPvoQ1ucLxbWN/edit',
    tracker:'https://docs.google.com/spreadsheets/d/18AZisrkN6lm9IP0npjKgPvoQ1ucLxbWN/edit',
    status:'https://drive.google.com/file/d/1jeHA5_AKHSPfjrnx3Ds1tIgf9U4rVA9x/view',
    plan:'https://drive.google.com/file/d/1izUZKULuLH-rxp04LEKHgNHyRLY7_QLj/view',
    volunteers:'https://drive.google.com/file/d/1K6vMrMJ_9IRL6XjDvmLulHZ1ntiGOHDQ/view',
    trunkRules:'https://docs.google.com/document/d/1EEM-X1XOgMZK8uHs2tb5YzgjwBK5agHWHTfiX-akvfk/edit',
    historicalDonors:'https://docs.google.com/spreadsheets/d/1Ep8vWkCpkeHNgy4De1LrXRBVC_cdsLgyHdKMNPkcVxc/edit',
    budget:DRIVE_SHEET+'#gid=460085062',
    sponsors:DRIVE_SHEET+'#gid=0',
    comms:DRIVE_SHEET+'#gid=1859064086',
    events:DRIVE_SHEET+'#gid=82236447',
    dates:DRIVE_SHEET+'#gid=1996290705',
    contacts:DRIVE_SHEET+'#gid=146789737',
    members:DRIVE_SHEET+'#gid=154569262',
    inventory:DRIVE_SHEET+'#gid=368953264',
    trunkSheet:DRIVE_SHEET+'#gid=1047695151'
  };
  const finance={annualBudget:'$9,917.48',bankBalance:'$3,494.20',income:'$9,973.00',netIncome:'$55.52',festivalBudget:'$300',festivalActual:'$0'};
  const roleData={
    'President':{
      headline:'Executive command center',
      intro:'Board visibility, approvals, priorities, finances, and cross-team accountability in one place.',
      tasks:['Review open board decisions and contracts','Confirm owners and deadlines for priority work','Monitor budget, bank position, and event commitments','Keep board members aligned on unresolved items'],
      links:[['PTA master workbook',DRIVE_SHEET,'Members, contacts, calendar, budget, sponsors, communications and reminders'],['2026 Festival archive',DRIVE.command,'Historical event records and closeout'],['Budget',DRIVE.budget,'Annual budget and actuals'],['Important dates',DRIVE.dates,'PTA deadlines and reminders']]
    },
    'Vice President':{
      headline:'Operations & board support',
      intro:'A cross-functional view for keeping projects moving and stepping into gaps across the board.',
      tasks:['Track cross-board action items','Back up president on approvals and follow-through','Watch event, volunteer and sponsor bottlenecks','Coordinate owners when work crosses roles'],
      links:[['PTA master workbook',DRIVE_SHEET,'Core operating workbook'],['Fall Festival Command Center',DRIVE.command,'Shared event operations'],['Contacts',DRIVE.contacts,'PTA and community contacts'],['Events calendar',DRIVE.events,'School-year PTA events']]
    },
    'Communications Chair & Secretary':{
      headline:'Communications & records studio',
      intro:'Messaging, newsletters, meeting records, reminders, and board communications organized around the official PTA files.',
      tasks:['Publish September and October communications','Prepare and track Fall Festival / Trunk-or-Treat promotion','Maintain meeting agenda, notes and follow-up records','Keep families informed across approved channels'],
      links:[['Communications plan',DRIVE.comms,'Newsletter and channel checklist'],['Events calendar',DRIVE.events,'Dates that drive messaging'],['PTA contacts',DRIVE.contacts,'Contact reference'],['PTA master workbook',DRIVE_SHEET,'Source workbook']]
    },
    'Treasurer':{
      headline:'Finance & controls center',
      intro:'Budget, actuals, bank position, sponsorship activity, and event spend controls at a glance.',
      tasks:['Reconcile actual expenses and income','Protect the $300 Fall Festival ceiling while pursuing $0 PTA spend','Review sponsor/donor activity for financial follow-up','Flag any contract or reimbursement that needs board approval'],
      links:[['Budget',DRIVE.budget,'Annual budget, bank balance and actuals'],['Sponsor list',DRIVE.sponsors,'Current and previous funders'],['Historical donor requests',DRIVE.historicalDonors,'Prior-year donor reference'],['Fall Festival tracker',DRIVE.tracker,'Event planning tracker']]
    },
    'Vice President of Community Engagement & Special Events':{
      headline:'Community engagement & events command center',
      intro:'Your event, partner, vendor, volunteer, donor, logistics and follow-up workspace.',
      tasks:['Finalize campus layout and traffic flow','Confirm the district sound operator and Garage Band details','Coordinate logistics for K&K BBQ, Hearth & Honey and Pour The Fun','Coordinate Trunk-or-Treat, volunteers, signage, auction and family experience','Keep the Fall Festival Command Center current'],
      links:[['Fall Festival Command Center',DRIVE.command,'Current planning status and action plan'],['Fall Festival master tracker',DRIVE.tracker,'Event-wide tracking workbook'],['Master plan & decisions',DRIVE.plan,'Approved event direction and decisions'],['Volunteer & student group plan',DRIVE.volunteers,'Volunteer and student support plan'],['Sponsor list',DRIVE.sponsors,'Sponsor outreach and ownership'],['Trunk-or-Treat rules',DRIVE.trunkRules,'Host registration and rules']]
    }
  };

  function esc(s){return String(s??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));}
  function humanKey(k){return String(k||'').replace(/([a-z])([A-Z])/g,'$1 $2').replace(/[_-]+/g,' ').replace(/\b\w/g,m=>m.toUpperCase());}
  function showValue(v){
    if(v===true)return 'Yes'; if(v===false)return 'No'; if(v===null||v===undefined||v==='')return '—';
    if(Array.isArray(v))return v.filter(Boolean).join(', ')||'—';
    if(typeof v==='object')return Object.entries(v).map(([k,val])=>`${humanKey(k)}: ${showValue(val)}`).join(' · ');
    return String(v);
  }
  function payloadFields(payload){
    const skip=new Set(['rulesAccepted']);
    return Object.entries(payload||{}).filter(([k,v])=>!skip.has(k)&&v!==''&&v!==null&&v!==undefined).map(([k,v])=>`<div class="admin-field"><span class="field-label">${esc(humanKey(k))}</span><span class="field-value">${esc(showValue(v))}</span></div>`).join('')||'<div class="admin-empty">No additional details were submitted.</div>';
  }
  function resourceLink(title,url,desc){return `<a class="admin-resource-link" href="${url}" target="_blank" rel="noopener"><span>${esc(title)}<small>${esc(desc)}</small></span><span>↗</span></a>`;}

  function loginScreen(message=''){
    main.innerHTML=`<section class="admin-shell"><div class="container admin-login"><div class="admin-login-card"><span class="mini-label">PTA BOARD ACCESS</span><h1>Board workspace</h1><p>Use your board username (nikki, john, veronica, or rudy) or the email address on file. To reset your password, enter your username and choose the reset link button.</p><form id="adminLogin"><label>Board username or email<input id="adminUsername" type="text" autocomplete="username" autocapitalize="none" placeholder="nikki or your board email" required></label><label>Password<input id="adminPassword" type="password" autocomplete="current-password" required></label><button class="btn primary" type="submit">Sign in</button></form><div id="adminStatus" class="newsletter-status">${esc(message)}</div></div></div></section>`;
    const form=document.getElementById('adminLogin'),status=document.getElementById('adminStatus');
    form.addEventListener('submit',async e=>{
      e.preventDefault(); status.textContent='Signing in…';
      try{
        const r=await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'login',username:document.getElementById('adminUsername').value.trim(),password:document.getElementById('adminPassword').value})});
        const j=await r.json().catch(()=>({})); if(!r.ok) throw new Error(j.error||'Could not sign in.');
        sessionStorage.setItem(sessionName,j.session);
        if(j.mustChangePassword)return passwordChangeScreen(j.session,j.member);
        load(j.session);
      }catch(err){status.textContent=err.message;}
    });
  }
  function passwordChangeScreen(session,member={}){
    main.innerHTML=`<section class="admin-shell"><div class="container admin-login"><div class="admin-login-card"><span class="mini-label">FIRST SIGN-IN</span><h1>Create your private password</h1><p>Welcome, ${esc(member.firstName||'Board Member')}. Choose a new password before entering the board workspace.</p><form id="passwordChange"><label>New password<input id="newPassword" type="password" autocomplete="new-password" minlength="10" required></label><label>Confirm new password<input id="confirmPassword" type="password" autocomplete="new-password" minlength="10" required></label><button class="btn primary" type="submit">Save password</button></form><div id="changeStatus" class="newsletter-status"></div></div></div></section>`;
    const form=document.getElementById('passwordChange'),status=document.getElementById('changeStatus');
    form.addEventListener('submit',async e=>{
      e.preventDefault(); const a=document.getElementById('newPassword').value,b=document.getElementById('confirmPassword').value;
      if(a!==b){status.textContent='Passwords do not match.';return;}
      try{
        status.textContent='Saving…';
        const r=await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json','x-admin-session':session},body:JSON.stringify({action:'change-password',newPassword:a})});
        const j=await r.json().catch(()=>({})); if(!r.ok)throw new Error(j.error||'Could not change password.');
        sessionStorage.setItem(sessionName,j.session); load(j.session);
      }catch(err){status.textContent=err.message;}
    });
  }
  async function load(session){
    main.innerHTML=`<section class="admin-shell"><div class="container admin-login"><div class="admin-login-card"><p>Loading your workspace…</p></div></div></section>`;
    const r=await fetch('/api/admin',{headers:{'x-admin-session':session},cache:'no-store'}); const j=await r.json().catch(()=>({}));
    if(r.status===403&&j.mustChangePassword)return passwordChangeScreen(session,j.member||{});
    if(!r.ok){sessionStorage.removeItem(sessionName);return loginScreen(j.error||'Please sign in again.');}
    render(j,session);
  }
  function render(data,session){
    const member=data.member||{};
    const role=roleData[member.role]||roleData['Vice President'];
    main.innerHTML=`<section class="admin-shell"><div class="container admin-dashboard" id="adminRoot">
      <header class="admin-suite-head"><div><span class="mini-label">VOIGT PTA BOARD SUITE</span><h1>Welcome, ${esc(member.firstName||'Board Member')}.</h1><p>${esc(member.role||'PTA Board')} · Your role-specific workspace + shared board command center.</p></div><div class="admin-suite-actions"><a class="btn secondary" href="${DRIVE_SHEET}" target="_blank" rel="noopener">Open PTA Drive hub ↗</a><button class="btn secondary" id="adminLogout" type="button">Sign out</button></div></header>
      <div class="admin-section-title"><h2>PTA operations overview</h2><p>School-year programs, family engagement, applications, partnerships and financial stewardship.</p></div>
      <div class="admin-kpis">
        <div class="admin-kpi"><div class="num">${(data.volunteers||[]).length}</div><div class="label">Volunteer applications in dashboard</div></div>
        <div class="admin-kpi"><div class="num">${(data.vendors||[]).length}</div><div class="label">Business inquiries in dashboard</div></div>
        <div class="admin-kpi"><div class="num">${(data.newsletter||[]).length}</div><div class="label">Newsletter signups in dashboard</div></div>
        <div class="admin-kpi"><div class="num">2026–27</div><div class="label">Current school year</div></div>
      </div>
      <div class="admin-section-title"><h2>Year-round priorities</h2><p>These workstreams are ongoing; completion and budget figures require verified board records.</p></div>
      <div class="admin-grid-3">
        <article class="admin-card"><h3>Family engagement</h3><p>Membership, communications, school-community programs and accessibility.</p><a href="/join">Membership page ↗</a></article>
        <article class="admin-card"><h3>Volunteer coordination</h3><p>Review new applications and coordinate school-year opportunities.</p><a href="/volunteer">Volunteer opportunities ↗</a></article>
        <article class="admin-card"><h3>Partners and funding</h3><p>Track sponsors, donors, community partners and future business interest.</p><a href="/our-community">Community recognition ↗</a></article>
      </div>
      <div class="admin-callout"><strong>Historical archive:</strong> The October 2026 Fall Festival and Trunk-or-Treat have concluded. Their submissions remain accessible in the application records, but they are not active programs.</div>
      <nav class="admin-suite-tabs"><button class="active" data-panel="role">My Role</button><button data-panel="submissions">Forms & Applications</button><button data-panel="events">Events</button><button data-panel="finance">Finance</button><button data-panel="communications">Communications</button><button data-panel="resources">Drive Hub</button></nav>
      <section class="admin-panel active" id="panel-role"><div class="admin-grid-2"><article class="admin-card accent"><span class="mini-label">YOUR WORKSPACE</span><h2>${esc(role.headline)}</h2><p>${esc(role.intro)}</p></article><article class="admin-card"><h2>What success looks like now</h2><div class="admin-role-list">${role.tasks.map(t=>`<div class="admin-role-item"><span class="dot"></span><div>${esc(t)}</div></div>`).join('')}</div></article></div><div class="admin-section-title"><h2>Role resources</h2><p>Linked directly to the PTA files in Google Drive.</p></div><div class="admin-grid-3">${role.links.map(([t,u,d])=>resourceLink(t,u,d)).join('')}</div></section>
      <section class="admin-panel" id="panel-submissions"><div class="admin-section-title"><h2>Forms & applications</h2><p>Clean, readable submissions — no raw code.</p></div><div class="admin-table-card"><div class="admin-subnav"><button class="active" data-kind="volunteers">Volunteers</button><button data-kind="vendors">Vendors</button><button data-kind="trunkHosts">Archived trunk hosts</button><button data-kind="newsletter">Newsletter</button></div><div id="submissionList"></div></div></section>
      <section class="admin-panel" id="panel-events"><div class="admin-grid-2"><article class="admin-card"><span class="mini-label">SCHOOL YEAR</span><h2>PTA programs and events</h2><p>Use the official school calendar for verified dates and the PTA master workbook for event planning and decisions.</p><a class="btn secondary" href="/events">View public calendar ↗</a></article><article class="admin-card"><h2>Past event archive</h2><p>The October 2026 Fall Festival is complete. Retain its records for reporting and future planning without treating old action items as open.</p><a class="btn secondary" href="${DRIVE.command}" target="_blank" rel="noopener">2026 festival archive ↗</a></article></div><div class="admin-grid-3" style="margin-top:14px">${resourceLink('School-year calendar',DRIVE.events,'PTA planning dates')}${resourceLink('PTA master workbook',DRIVE_SHEET,'Year-round operations and planning')}</div></section>
      <section class="admin-panel" id="panel-finance"><div class="admin-section-title"><h2>Finance snapshot</h2><p>Historical workbook snapshot; verify against the latest treasurer records before making decisions.</p></div><div class="admin-finance-grid"><div class="admin-finance-card"><strong>${finance.annualBudget}</strong><span>School-year budget</span></div><div class="admin-finance-card"><strong>${finance.bankBalance}</strong><span>Bank balance as of 9/14</span></div><div class="admin-finance-card"><strong>${finance.income}</strong><span>Income</span></div><div class="admin-finance-card"><strong>${finance.netIncome}</strong><span>Net income</span></div><div class="admin-finance-card"><strong>${finance.festivalBudget}</strong><span>Historical Fall Festival allocation</span></div><div class="admin-finance-card"><strong>${finance.festivalActual}</strong><span>Historical Fall Festival PTA cash spent (reconcile)</span></div></div><div class="admin-callout" style="margin-top:14px"><strong>Festival spending goal:</strong> The current cash goal is $0 PTA spend where possible. Vendor participation is approved with the 10% fee waived; school system audio is planned, with operator coordination pending.</div><div class="admin-grid-3" style="margin-top:14px">${resourceLink('Budget',DRIVE.budget,'Budget, actuals and notes')}${resourceLink('Sponsor list',DRIVE.sponsors,'Sponsor activity and leads')}${resourceLink('Historical donor requests',DRIVE.historicalDonors,'Previous donor reference')}</div></section>
      <section class="admin-panel" id="panel-communications"><div class="admin-grid-2"><article class="admin-card yellow"><span class="mini-label">COMMUNICATIONS PLAN</span><h2>Keep families informed before they have to ask.</h2><p>The current Drive plan shows August newsletter completed; September, October and Trunk-or-Treat communications still need tracking.</p></article><article class="admin-card"><h2>Communication workflow</h2><div class="admin-role-list"><div class="admin-role-item"><span class="dot"></span><div>Confirm event date / details from the calendar</div></div><div class="admin-role-item"><span class="dot"></span><div>Prepare message and flyer link</div></div><div class="admin-role-item"><span class="dot"></span><div>Track ClassDojo, printed flyers, class distribution, yard signs and Facebook</div></div><div class="admin-role-item"><span class="dot"></span><div>Archive final copy and decisions for the board</div></div></div></article></div><div class="admin-grid-3" style="margin-top:14px">${resourceLink('Communications plan',DRIVE.comms,'Newsletter and distribution checklist')}${resourceLink('Events calendar',DRIVE.events,'Dates for communications planning')}${resourceLink('Contacts',DRIVE.contacts,'PTA/community contacts')}</div></section>
      <section class="admin-panel" id="panel-resources"><div class="admin-section-title"><h2>PTA documents and archives</h2><p>Year-round governance resources first; completed event records preserved separately.</p></div><div class="admin-grid-3">${resourceLink('PTA 2026–2027 workbook',DRIVE_SHEET,'School-year operations')}${resourceLink('Budget',DRIVE.budget,'Budget and financial records')}${resourceLink('Membership records',DRIVE.members,'PTA membership')}${resourceLink('Events calendar',DRIVE.events,'Upcoming planning dates')}${resourceLink('Communications plan',DRIVE.comms,'Newsletters and family engagement')}${resourceLink('Sponsor list',DRIVE.sponsors,'Partners, sponsors and donors')}${resourceLink('Important dates',DRIVE.dates,'Board and school deadlines')}${resourceLink('Inventory',DRIVE.inventory,'PTA assets')}${resourceLink('Contacts',DRIVE.contacts,'Board and community contacts')}</div><details style="margin-top:24px"><summary><strong>Completed 2026 Fall Festival archive</strong></summary><div class="admin-grid-3">${resourceLink('Festival command center',DRIVE.command,'Historical status')}${resourceLink('Festival master tracker',DRIVE.tracker,'Historical event records')}${resourceLink('Trunk host records',DRIVE.trunkSheet,'Closed registrations')}${resourceLink('Volunteer plan',DRIVE.volunteers,'Completed event staffing')}</div></details></section>
    </div></section>`;

    const root=document.getElementById('adminRoot');
    root.querySelectorAll('[data-panel]').forEach(b=>b.addEventListener('click',()=>{root.querySelectorAll('[data-panel]').forEach(x=>x.classList.remove('active'));b.classList.add('active');root.querySelectorAll('.admin-panel').forEach(x=>x.classList.remove('active'));document.getElementById('panel-'+b.dataset.panel)?.classList.add('active');}));

    const list=document.getElementById('submissionList');
    async function update(kind,id,status){const r=await fetch('/api/admin',{method:'PATCH',headers:{'Content-Type':'application/json','x-admin-session':session},body:JSON.stringify({kind,id,status})});if(!r.ok){const j=await r.json().catch(()=>({}));alert(j.error||'Could not update');}}
    function renderSubmissions(kind){
      const arr=data[kind]||[];
      if(kind==='newsletter'){
        list.innerHTML=arr.length?arr.map(x=>`<div class="admin-entry"><div class="admin-entry-head"><div><div class="admin-entry-name">${esc(x.email)}</div><div class="admin-entry-meta">Signed up ${new Date(x.created_at).toLocaleString()}</div></div><div>${esc(x.source||'Website')}</div><span class="admin-status-pill good">Subscriber</span></div></div>`).join(''):'<div class="admin-empty">No newsletter subscribers yet.</div>';
        return;
      }
      list.innerHTML=arr.length?arr.map(x=>{
        const name=kind==='vendors'?x.business_name:kind==='trunkHosts'?x.host_name:[x.first_name,x.last_name].filter(Boolean).join(' ');
        const sub=kind==='vendors'?x.contact_name:kind==='trunkHosts'?[x.host_type,x.grade_org].filter(Boolean).join(' · '):x.event||'General availability';
        const vendorStatus=kind==='vendors'?(x.status==='confirmed'?'confirmed':x.status==='declined'||x.status==='closed'?'declined':'pending'):x.status;
        const statusClass=vendorStatus==='confirmed'||x.status==='approved'?'good':vendorStatus==='pending'||x.status==='reviewing'||x.status==='contacted'?'warn':vendorStatus==='declined'||x.status==='closed'?'':'hot';
        return `<article class="admin-entry" id="entry-${kind}-${x.id}"><div class="admin-entry-head"><div><div class="admin-entry-name">${esc(name||'Submission')}</div><div class="admin-entry-meta">${esc(x.email||'')}${x.phone?' · '+esc(x.phone):''}</div></div><div class="admin-entry-meta">${esc(sub||'')}</div>${kind==='vendors'?`<span class="admin-status-pill ${statusClass}">${esc(humanKey(vendorStatus))}</span>${vendorStatus==='pending'?`<button class="btn primary" data-confirm-vendor="${x.id}" type="button">Verify &amp; Confirm Vendor</button><button data-decline-vendor="${x.id}" type="button">Decline</button>`:''}`:`<select data-status-id="${x.id}"><option value="new" ${x.status==='new'?'selected':''}>New</option><option value="reviewing" ${x.status==='reviewing'?'selected':''}>Reviewing</option><option value="approved" ${x.status==='approved'?'selected':''}>Approved</option><option value="contacted" ${x.status==='contacted'?'selected':''}>Contacted</option><option value="closed" ${x.status==='closed'?'selected':''}>Closed</option></select>`}<button data-view-id="${x.id}">View details</button></div><div class="admin-entry-details"><div class="admin-field-grid"><div class="admin-field"><span class="field-label">Submitted</span><span class="field-value">${new Date(x.created_at).toLocaleString()}</span></div><div class="admin-field"><span class="field-label">Status</span><span class="field-value"><span class="admin-status-pill ${statusClass}">${esc(humanKey(vendorStatus))}</span></span></div>${x.confirmed_at?`<div class="admin-field"><span class="field-label">Confirmed</span><span class="field-value">${new Date(x.confirmed_at).toLocaleString()}</span></div>`:''}${payloadFields(x.payload)}</div></div></article>`;
      }).join(''):'<div class="admin-empty">No submissions yet.</div>';
      list.querySelectorAll('[data-status-id]').forEach(sel=>sel.addEventListener('change',()=>{const id=Number(sel.dataset.statusId);const item=arr.find(v=>v.id===id);if(item)item.status=sel.value;update(kind,id,sel.value);}));
      list.querySelectorAll('[data-confirm-vendor]').forEach(btn=>btn.addEventListener('click',async()=>{const id=Number(btn.dataset.confirmVendor);const item=arr.find(v=>v.id===id);if(!item)return;if(!confirm(`Verify and confirm ${item.business_name}? This will immediately email the vendor from info@xeniavoigtpta.org.`))return;btn.disabled=true;btn.textContent='Confirming…';const r=await fetch('/api/admin',{method:'PATCH',headers:{'Content-Type':'application/json','x-admin-session':session},body:JSON.stringify({kind:'vendors',id,status:'confirmed'})});const j=await r.json().catch(()=>({}));if(!r.ok){alert(j.error||'Could not confirm vendor');btn.disabled=false;btn.textContent='Verify & Confirm Vendor';return;}item.status='confirmed';await load(session);}));
      list.querySelectorAll('[data-decline-vendor]').forEach(btn=>btn.addEventListener('click',async()=>{const id=Number(btn.dataset.declineVendor);const item=arr.find(v=>v.id===id);if(!item||!confirm(`Decline ${item.business_name}?`))return;await update('vendors',id,'declined');item.status='declined';renderSubmissions('vendors');}));
      list.querySelectorAll('[data-view-id]').forEach(btn=>btn.addEventListener('click',()=>document.getElementById(`entry-${kind}-${btn.dataset.viewId}`)?.classList.toggle('open')));
    }
    renderSubmissions('volunteers');
    root.querySelectorAll('[data-kind]').forEach(b=>b.addEventListener('click',()=>{root.querySelectorAll('[data-kind]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderSubmissions(b.dataset.kind);}));
    document.getElementById('adminLogout')?.addEventListener('click',async()=>{try{await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json','x-admin-session':session},body:JSON.stringify({action:'logout'})});}catch(_){}sessionStorage.removeItem(sessionName);loginScreen();});
  }
  const saved=sessionStorage.getItem(sessionName);if(saved)load(saved);else loginScreen();
})();