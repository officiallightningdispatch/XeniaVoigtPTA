(()=>{
  const FESTIVAL_NAME='The 2026 Voigt PTA Fall Festival';
  const SHOP_URL='https://shop.xeniavoigtpta.org';

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
    document.querySelectorAll('a[href="/fall-festival"]').forEach(a=>{
      const t=a.textContent.trim();
      if(t==='Viking Quest') a.textContent='2026 Fall Festival';
    });
  }

  function removePublicAccess(){
    document.querySelectorAll('a[href="/access"]').forEach(a=>{
      const card=a.closest('.bento-access');
      if(card){card.remove();return;}
      const p=a.closest('p');
      if(p&&p.parentElement?.closest('.footer')){p.remove();return;}
      a.remove();
    });
    if((location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/')==='/access') location.replace('/');
  }

  function rebuildNav(){
    const nav=document.querySelector('#nav .nav-inner');
    if(!nav || nav.dataset.eventMenuUpdated==='1') return;
    nav.dataset.eventMenuUpdated='1';
    const current=location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/';
    const isEvents=['/events','/fall-festival','/volunteer','/vendors','/community-partners','/sponsors','/trunk-or-treat','/trunk-host.html'].includes(current);
    nav.innerHTML=`
      <a href="/" class="${current==='/'?'active':''}">Home</a>
      <a href="/about" class="${current==='/about'?'active':''}">About</a>
      <a href="/join" class="${current==='/join'?'active':''}">Membership</a>
      <div class="nav-dropdown ${isEvents?'active':''}">
        <button class="nav-dropdown-toggle" type="button" aria-expanded="false">Events <span aria-hidden="true">▾</span></button>
        <div class="nav-dropdown-menu">
          <a href="/events" class="${current==='/events'?'active':''}">Calendar & Events</a>
          <a href="/fall-festival" class="${current==='/fall-festival'?'active':''}">${FESTIVAL_NAME}</a>
          <a href="/trunk-or-treat" class="${current==='/trunk-or-treat'||current==='/trunk-host.html'?'active':''}">Trunk-or-Treat Application</a>
          <a href="/volunteer" class="${current==='/volunteer'?'active':''}">Volunteer</a>
          <a href="/vendors" class="${current==='/vendors'?'active':''}">Vendors</a>
          <a href="/community-partners" class="${current==='/community-partners'?'active':''}">Community Partners</a>
          <a href="/sponsors" class="${current==='/sponsors'?'active':''}">Sponsors & Donors</a>
        </div>
      </div>
      <a href="/fundraising" class="${current==='/fundraising'?'active':''}">Support</a>
      <a href="/resources" class="${current==='/resources'?'active':''}">Resources</a>
      <a href="/contact" class="${current==='/contact'?'active':''}">Contact</a>
      <a href="${SHOP_URL}" class="shop-nav-link">Shop</a>
      <a href="/admin" class="${current==='/admin'?'active':''}">Login</a>`;

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

  function connectShopLinks(){
    document.querySelectorAll('a').forEach(a=>{
      const label=(a.textContent||'').trim().toLowerCase();
      if(/^(shop|shop now|shop merchandise|shop merch|spirit wear|shop spirit wear|pta shop|pta store)$/.test(label)) a.href=SHOP_URL;
    });
    document.querySelectorAll('.footer-inner').forEach(footer=>{
      if(footer.querySelector(`a[href="${SHOP_URL}"]`)) return;
      const quick=Array.from(footer.querySelectorAll('div')).find(d=>d.querySelector('b')?.textContent.trim()==='Quick links');
      if(quick) quick.insertAdjacentHTML('beforeend',`<p><a href="${SHOP_URL}">Shop</a></p>`);
    });
  }

  function addTrunkCta(){
    const current=location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/';
    if(current!=='/fall-festival' || document.getElementById('trunkHostCta')) return;
    const main=document.querySelector('main#main'); if(!main) return;
    main.insertAdjacentHTML('beforeend',`<section id="trunkHostCta" class="section"><div class="container"><article class="modern-panel accent"><span class="mini-label">TRUNK-OR-TREAT · 20 SPOTS MAX</span><h2>Want to host a trunk?</h2><p><strong>20 total spaces.</strong> Applications are open for the remaining spaces while capacity lasts. All applications are reviewed in the order received and are subject to PTA and school approval.</p><a class="btn secondary" href="/trunk-or-treat">Apply to host a trunk →</a></article></div></section>`);
  }

  function apply(){rebuildNav();renameFestival();removePublicAccess();connectShopLinks();addTrunkCta();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply);
  else apply();
  setTimeout(apply,250);
  setTimeout(apply,900);
})();
