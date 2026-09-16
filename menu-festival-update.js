(()=>{
  const FESTIVAL_NAME='The 2026 Voigt PTA Fall Festival';

  function renameFestival(root=document){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    for(const n of nodes){
      if(!n.nodeValue) continue;
      n.nodeValue=n.nodeValue
        .replace(/Viking Quest Fall Festival/g,FESTIVAL_NAME)
        .replace(/Viking Quest announcements/g,'Fall Festival announcements')
        .replace(/Explore Viking Quest/g,'Explore the Fall Festival')
        .replace(/Feel the Viking Quest/g,'Explore the Fall Festival');
    }
    document.querySelectorAll('a[href="/viking-quest"]').forEach(a=>{
      const t=a.textContent.trim();
      if(t==='Viking Quest') a.textContent='2026 Fall Festival';
    });
  }

  function rebuildNav(){
    const nav=document.querySelector('#nav .nav-inner');
    if(!nav || nav.dataset.eventMenuUpdated==='1') return;
    nav.dataset.eventMenuUpdated='1';
    const current=location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/';
    const isEvents=['/events','/viking-quest','/volunteer','/vendors'].includes(current);
    nav.innerHTML=`
      <a href="/" class="${current==='/'?'active':''}">Home</a>
      <a href="/about" class="${current==='/about'?'active':''}">About</a>
      <a href="/join" class="${current==='/join'?'active':''}">Membership</a>
      <div class="nav-dropdown ${isEvents?'active':''}">
        <button class="nav-dropdown-toggle" type="button" aria-expanded="false">Events <span aria-hidden="true">▾</span></button>
        <div class="nav-dropdown-menu">
          <a href="/events" class="${current==='/events'?'active':''}">Calendar & Events</a>
          <a href="/viking-quest" class="${current==='/viking-quest'?'active':''}">${FESTIVAL_NAME}</a>
          <a href="/volunteer" class="${current==='/volunteer'?'active':''}">Volunteer</a>
          <a href="/vendors" class="${current==='/vendors'?'active':''}">Vendors</a>
        </div>
      </div>
      <a href="/fundraising" class="${current==='/fundraising'?'active':''}">Support</a>
      <a href="/resources" class="${current==='/resources'?'active':''}">Resources</a>
      <a href="/contact" class="${current==='/contact'?'active':''}">Contact</a>
      <a href="/access" class="member-access ${current==='/access'?'active':''}">Sign in</a>`;

    const dd=nav.querySelector('.nav-dropdown');
    const toggle=dd?.querySelector('.nav-dropdown-toggle');
    if(toggle){
      toggle.addEventListener('click',()=>{
        const open=dd.classList.toggle('open');
        toggle.setAttribute('aria-expanded',String(open));
      });
      document.addEventListener('click',e=>{
        if(!dd.contains(e.target)){
          dd.classList.remove('open');
          toggle.setAttribute('aria-expanded','false');
        }
      });
    }
  }

  function apply(){rebuildNav();renameFestival();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply);
  else apply();
  setTimeout(apply,250);
  setTimeout(apply,900);
})();
