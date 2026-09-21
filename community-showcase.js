(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  const main=document.querySelector('main#main');
  if(!main)return;

  const data={
    communityPartners:[
      {name:'PHP Agency',type:'Community Partner · Educational Booth',desc:'PHP Agency will join the Fall Festival with a family-focused educational life-insurance booth and an optional consent-based raffle experience. This community partnership is not being counted as a financial sponsorship.',url:'https://phpagency.com/',domain:'phpagency.com'},
      {name:'Boys & Girls Club at Voigt',type:'Community Partner · Trunk-or-Treat Host',desc:'The Boys & Girls Club at Voigt is bringing community spirit to festival night with a family-friendly Trunk-or-Treat stop.',url:'https://www.bgcaustin.org/join-the-club/',domain:'bgcaustin.org'},
      {name:'Round Rock Public Library',type:'Community Partner · Information & Resources',desc:'A local community resource partner helping connect Voigt families with programs, learning opportunities, and information beyond the school day.',url:'https://www.roundrocktexas.gov/city-departments/library-home/',domain:'roundrocktexas.gov'},
      {name:'Volunteer Round Rock',type:'Community Partner · Volunteer Connection',desc:'Helping strengthen local volunteer connections and expand ways community members can support family events and school-centered service.',url:'https://www.roundrocktexas.gov/city-departments/parks-and-recreation/volunteer/',domain:'roundrocktexas.gov'}
    ],
    sponsors:[
      {name:'Austin Aquarium',type:'Silent Auction Donor',desc:'Donating a family annual membership for up to five for the Fall Festival silent auction.',url:'https://austinaquarium.com/',domain:'austinaquarium.com'},
      {name:'Austin Zoo',type:'Silent Auction Donor',desc:'Donating four admission tickets for the Fall Festival silent auction.',url:'https://austinzoo.org/',domain:'austinzoo.org'},
      {name:'Round Rock Pumpkin Festival',type:'Silent Auction Donor',desc:'Donating a family pass for six for the Fall Festival silent auction.',url:'https://roundrockpumpkinfestival.com/',domain:'roundrockpumpkinfestival.com'},
      {name:'Monster Mini Golf & Laser Tag',type:'Silent Auction Donor',desc:'Donating a family four-pack of mini-golf passes for the Fall Festival silent auction.',url:'https://monsterminigolf.com/locations/us/tx/round-rock/',domain:'monsterminigolf.com'},
      {name:'Cookies & Crumbles',type:'Sweet Finish Giveaway Donor',desc:'Providing a $65 gift certificate for the Viking Quest Sweet Finish Giveaway.',url:'https://www.cookiesandcrumblesbakeshop.com/',domain:'cookiesandcrumblesbakeshop.com'},
      {name:'FASTSIGNS Round Rock',type:'Event Signage Partner',desc:'Supporting Fall Festival printing and signage as final quantities and display details are completed.',url:'https://www.fastsigns.com/round-rock-tx/',domain:'fastsigns.com'}
    ],
    vendors:[
      {name:'Kona Ice Greater Austin',type:'Confirmed Dessert Vendor',desc:'Colorful shaved ice will be rolling into Food Truck Row for a refreshing festival treat.',url:'https://www.kona-ice.com/local-site/kona-ice-of-greater-austin/',domain:'kona-ice.com'},
      {name:'KK BBQ Mexican Food Truck',type:'Confirmed Food Vendor',desc:'Bringing Mexican-BBQ flavor to Food Truck Row. The 10% PTA event contribution has been accepted.',url:'https://www.facebook.com/p/KK-BBQ-Mexican-Food-100095578564767/',domain:'facebook.com'},
      {name:"Coco's Eats & Sweets / Vaughan's",type:'Confirmed Food & Dessert Vendor',desc:'Confirmed for October 23 with the 10% PTA event contribution accepted; final application and logistics are being completed.',url:'',domain:''},
      {name:'Pour The Fun',type:'Confirmed Beverage Vendor',desc:'Bringing a family-friendly specialty beverage experience. Vendor application received and the 10% PTA contribution agreement accepted.',url:'https://pourthefun.com/',domain:'pourthefun.com'}
    ]
  };

  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const logo=item=>item.domain
    ? `<img src="https://www.google.com/s2/favicons?domain_url=https://${esc(item.domain)}&sz=256" alt="" loading="lazy" decoding="async">`
    : `<span aria-hidden="true">${esc(item.name.slice(0,1))}</span>`;
  const cards=items=>`<div class="showcase-grid">${items.map(item=>`<article class="showcase-card">
      <div class="showcase-logo">${item.url?`<a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${logo(item)}</a>`:logo(item)}</div>
      <div class="showcase-copy"><span class="showcase-type">${esc(item.type)}</span><h3>${esc(item.name)}</h3><p>${esc(item.desc)}</p>${item.url?`<a class="showcase-link" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">Visit ${esc(item.name)} <span aria-hidden="true">→</span></a>`:''}</div>
    </article>`).join('')}</div>`;

  const hero=(kicker,title,copy)=>`<section class="showcase-hero"><div class="container"><span class="eyebrow">${kicker}</span><h1>${title}</h1><p>${copy}</p></div></section>`;
  const cta=(title,copy,label,href)=>`<section class="section showcase-cta"><div class="container"><div><span class="mini-label">JOIN THE COMMUNITY</span><h2>${title}</h2><p>${copy}</p></div><a class="btn primary" href="${href}">${label}</a></div></section>`;

  if(path==='/community-partners'){
    main.innerHTML=`${hero('COMMUNITY-POWERED','Meet the neighbors who show up for Voigt.','These organizations are giving their time, expertise, programs, and presence to strengthen the Xenia Voigt community. We proudly recognize confirmed community partners here as they join us.')}
      <section class="section"><div class="container"><div class="showcase-intro"><span class="showcase-count">${data.communityPartners.length}</span><div><h2>Confirmed community partners</h2><p>Partnership can mean a booth, a program, volunteer support, family resources, or another meaningful way of showing up.</p></div></div>${cards(data.communityPartners)}</div></section>
      ${cta('Want to partner with Voigt PTA?','We welcome organizations that can offer useful resources, educational experiences, volunteer support, or family-friendly community engagement.','Start a community partnership','mailto:info@xeniavoigtpta.org?subject=Community%20partnership%20interest')}`;
  }

  if(path==='/sponsors'){
    main.innerHTML=`${hero('THANK YOU, SPONSORS + DONORS','The support behind the experience.','Our sponsors and donors help the PTA create memorable experiences while protecting PTA resources for students. Only confirmed support is displayed here.')}
      <section class="section"><div class="container"><div class="showcase-intro"><span class="showcase-count">${data.sponsors.length}</span><div><h2>Confirmed sponsors & donors</h2><p>Financial support, donated goods, services, auction items, and in-kind contributions all help make the Fall Festival possible.</p></div></div>${cards(data.sponsors)}</div></section>
      ${cta('Help power the 2026 Fall Festival.','Current sponsorship needs include entertainment, attractions, accessibility resources, prizes, supplies, and event operations.','Become a sponsor','mailto:info@xeniavoigtpta.org?subject=Fall%20Festival%20sponsorship')}`;
  }

  if(path==='/vendors'){
    const formSection=main.querySelector('.section')?.outerHTML||'';
    main.innerHTML=`${hero('FALL FESTIVAL FOOD + VENDORS','Come hungry. Shop local. Meet the businesses joining us.','We proudly feature vendors after their participation is confirmed. New confirmations will be added here as the lineup grows.')}
      <section class="section showcase-vendors"><div class="container"><div class="showcase-intro"><span class="showcase-count">${data.vendors.length}</span><div><h2>Confirmed vendor lineup</h2><p>Friday, October 23, 2026 · 5:30–7:30 PM. Menus and final setup details may continue to be updated as the event gets closer.</p></div></div>${cards(data.vendors)}</div></section>
      ${formSection}`;
    const side=main.querySelector('.vendor-side');
    if(side){
      side.querySelector('.mini-label')?.replaceChildren(document.createTextNode('WANT TO JOIN THE LINEUP?'));
      const h=side.querySelector('h2'); if(h)h.textContent='Vendor applications are still open.';
    }
  }

  window.VoigtShowcaseData=data;
})();