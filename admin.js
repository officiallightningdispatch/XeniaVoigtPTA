(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/admin')return;
  const main=document.querySelector('main#main'); if(!main)return;
  document.querySelector('.modern-newsletter')?.remove();
  const sessionName='voigt-pta-board-session';

  function esc(s){return String(s??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));}
  function loginScreen(message=''){
    main.innerHTML=`<section class="admin-shell"><div class="container admin-login" id="adminRoot"><div class="admin-login-card"><span class="mini-label">PTA BOARD ACCESS</span><h1>Community dashboard</h1><p>Authorized board members only.</p><form id="adminLogin"><label>Username<input id="adminUsername" type="text" autocomplete="username" autocapitalize="none" required></label><label>Password<input id="adminPassword" type="password" autocomplete="current-password" required></label><button class="btn primary" type="submit">Sign in</button></form><div id="adminStatus" class="newsletter-status">${esc(message)}</div></div></div></section>`;
    const form=document.getElementById('adminLogin');
    const status=document.getElementById('adminStatus');
    form.addEventListener('submit',async e=>{
      e.preventDefault(); status.textContent='Signing in…';
      try{
        const r=await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'login',username:document.getElementById('adminUsername').value.trim(),password:document.getElementById('adminPassword').value})});
        const j=await r.json().catch(()=>({})); if(!r.ok) throw new Error(j.error||'Could not sign in.');
        sessionStorage.setItem(sessionName,j.session);
        if(j.mustChangePassword) return passwordChangeScreen(j.session,j.member);
        load(j.session);
      }catch(err){status.textContent=err.message;}
    });
  }

  function passwordChangeScreen(session,member={}){
    main.innerHTML=`<section class="admin-shell"><div class="container admin-login"><div class="admin-login-card"><span class="mini-label">FIRST SIGN-IN</span><h1>Create your password</h1><p>Welcome, ${esc(member.firstName||'Board Member')}. Choose a new private password before opening the dashboard.</p><form id="passwordChange"><label>New password<input id="newPassword" type="password" autocomplete="new-password" minlength="10" required></label><label>Confirm new password<input id="confirmPassword" type="password" autocomplete="new-password" minlength="10" required></label><button class="btn primary" type="submit">Save password</button></form><div id="changeStatus" class="newsletter-status"></div></div></div></section>`;
    const form=document.getElementById('passwordChange'),status=document.getElementById('changeStatus');
    form.addEventListener('submit',async e=>{
      e.preventDefault(); const a=document.getElementById('newPassword').value,b=document.getElementById('confirmPassword').value;
      if(a!==b){status.textContent='Passwords do not match.';return;}
      status.textContent='Saving…';
      try{
        const r=await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json','x-admin-session':session},body:JSON.stringify({action:'change-password',newPassword:a})});
        const j=await r.json().catch(()=>({})); if(!r.ok) throw new Error(j.error||'Could not change password.');
        sessionStorage.setItem(sessionName,j.session); load(j.session);
      }catch(err){status.textContent=err.message;}
    });
  }

  async function load(session){
    main.innerHTML=`<section class="admin-shell"><div class="container admin-login"><div class="admin-login-card"><p>Loading dashboard…</p></div></div></section>`;
    const r=await fetch('/api/admin',{headers:{'x-admin-session':session}}); const j=await r.json().catch(()=>({}));
    if(r.status===403&&j.mustChangePassword) return passwordChangeScreen(session,j.member||{});
    if(!r.ok){sessionStorage.removeItem(sessionName);return loginScreen(j.error||'Please sign in again.');}
    render(j,session);
  }

  function render(data,session){
    const member=data.member||{};
    main.innerHTML=`<section class="admin-shell"><div class="container admin-dashboard" id="adminRoot"><div class="admin-welcome"><span class="mini-label">PTA BOARD DASHBOARD</span><h1>Welcome, ${esc(member.firstName||'Board Member')}.</h1><p>${esc(member.role||'PTA Board')} · <b>${data.volunteers.length}</b> volunteers · <b>${data.vendors.length}</b> vendors · <b>${data.trunkHosts.length}</b> trunk hosts · <b>${data.newsletter.length}</b> subscribers</p><button class="btn secondary" id="adminLogout" type="button">Sign out</button></div><div class="admin-tabs"><button class="active" data-tab="volunteers">Volunteers</button><button data-tab="vendors">Vendors</button><button data-tab="trunkHosts">Trunk-or-Treat</button><button data-tab="newsletter">Newsletter</button></div><div id="adminTable"></div></div></section>`;
    const root=document.getElementById('adminRoot'),table=document.getElementById('adminTable');
    async function update(kind,id,status){const r=await fetch('/api/admin',{method:'PATCH',headers:{'Content-Type':'application/json','x-admin-session':session},body:JSON.stringify({kind,id,status})});if(!r.ok){const j=await r.json().catch(()=>({}));alert(j.error||'Could not update');}}
    function rows(kind){
      const arr=data[kind]||[];
      if(kind==='newsletter'){table.innerHTML=`<div class="admin-grid">${arr.map(x=>`<div class="admin-row"><div><strong>${esc(x.email)}</strong><small>${new Date(x.created_at).toLocaleString()}</small></div><div>${esc(x.source||'')}</div><div></div><div></div><div></div></div>`).join('')||'<p>No subscribers yet.</p>'}</div>`;return;}
      table.innerHTML=`<div class="admin-grid">${arr.map(x=>{
        const name=kind==='vendors'?x.business_name:kind==='trunkHosts'?x.host_name:[x.first_name,x.last_name].filter(Boolean).join(' ');
        const sub=kind==='vendors'?x.contact_name:kind==='trunkHosts'?[x.host_type,x.grade_org].filter(Boolean).join(' · '):x.event||'General availability';
        return `<div class="admin-row"><div><strong>${esc(name)}</strong><small>${esc(x.email)}${x.phone?' · '+esc(x.phone):''}</small></div><div>${esc(sub)}</div><div><small>Submitted</small>${new Date(x.created_at).toLocaleDateString()}</div><div><select data-id="${x.id}"><option ${x.status==='new'?'selected':''}>new</option><option ${x.status==='reviewing'?'selected':''}>reviewing</option><option ${x.status==='approved'?'selected':''}>approved</option><option ${x.status==='contacted'?'selected':''}>contacted</option><option ${x.status==='closed'?'selected':''}>closed</option></select></div><button class="btn secondary" data-view="${x.id}">View</button><details style="grid-column:1/-1" id="detail-${x.id}"><summary>Details</summary><pre style="white-space:pre-wrap;font:12px/1.5 ui-monospace,monospace">${esc(JSON.stringify(x.payload,null,2))}</pre></details></div>`}).join('')||'<p>No submissions yet.</p>'}</div>`;
      table.querySelectorAll('select[data-id]').forEach(sel=>sel.addEventListener('change',()=>{const id=Number(sel.dataset.id);const item=arr.find(v=>v.id===id);if(item)item.status=sel.value;update(kind,id,sel.value);}));
      table.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>document.getElementById(`detail-${b.dataset.view}`)?.toggleAttribute('open')));
    }
    rows('volunteers');
    root.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{root.querySelectorAll('[data-tab]').forEach(x=>x.classList.remove('active'));b.classList.add('active');rows(b.dataset.tab);}));
    document.getElementById('adminLogout')?.addEventListener('click',async()=>{try{await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json','x-admin-session':session},body:JSON.stringify({action:'logout'})});}catch(_){}sessionStorage.removeItem(sessionName);loginScreen();});
  }

  const saved=sessionStorage.getItem(sessionName); if(saved) load(saved); else loginScreen();
})();
