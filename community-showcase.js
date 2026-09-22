(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  const main=document.querySelector('main#main');
  if(!main)return;

  const data={
    communityPartners:[
      {name:'Round the Rock',type:'Community Media Partner',desc:'Helping spread the word about Viking Quest through its Round Rock event calendar, The Weekly Rock, and community social channels.',url:'https://roundtherocktx.com/',domain:'roundtherocktx.com',logoData:'data:image/png;base64,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'},
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
  const logo=item=>item.logoData
    ? `<img src="${item.logoData}" alt="${esc(item.name)} logo" loading="lazy" decoding="async">`
    : item.domain
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
    const supporterTile=item=>`<a class="supporter-tile" href="${esc(item.url||'#')}" ${item.url?'target="_blank" rel="noopener noreferrer"':'aria-disabled="true"'} aria-label="${esc(item.name)}">
      <div class="supporter-logo">${logo(item)}</div>
      <strong>${esc(item.name)}</strong>
      <span>${esc(item.type)}</span>
    </a>`;
    const supporterRun=[...data.sponsors,...data.sponsors].map(supporterTile).join('');
    main.innerHTML=`${hero('THANK YOU, SPONSORS + DONORS','The support behind the experience.','Meet the businesses and community supporters already helping make Viking Quest possible — then join them below.')}
      <style>
        .supporter-marquee{overflow:hidden;position:relative;margin-top:24px;padding:8px 0 14px;mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
        .supporter-track{display:flex;gap:16px;width:max-content;animation:voigtSupporters 32s linear infinite}
        .supporter-marquee:hover .supporter-track,.supporter-marquee:focus-within .supporter-track{animation-play-state:paused}
        .supporter-tile{width:220px;min-height:190px;background:#fff;border:2px solid #171717;border-radius:22px;padding:22px 18px;text-align:center;text-decoration:none;color:#171717;box-shadow:6px 6px 0 #d71920;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px}
        .supporter-tile:hover{transform:translateY(-2px)}
        .supporter-logo{width:92px;height:72px;display:grid;place-items:center}
        .supporter-logo img{max-width:92px;max-height:72px;object-fit:contain}
        .supporter-logo span{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;background:#171717;color:#fff;font-size:28px;font-weight:900}
        .supporter-tile strong{font-size:18px;line-height:1.15}
        .supporter-tile>span{font-size:12px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#6b6b6b}
        @keyframes voigtSupporters{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 8px))}}
        .sponsor-app-shell{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:22px;align-items:start}
        .sponsor-app{background:#fff;border:2px solid #171717;border-radius:24px;padding:24px;box-shadow:8px 8px 0 #171717}
        .sponsor-app-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .sponsor-app label{display:flex;flex-direction:column;gap:7px;font-weight:800;font-size:14px}
        .sponsor-app input,.sponsor-app select,.sponsor-app textarea{width:100%;border:2px solid #171717;border-radius:12px;padding:12px 13px;font:inherit;background:#fff;color:#171717}
        .sponsor-app textarea{min-height:118px;resize:vertical}
        .sponsor-app .full{grid-column:1/-1}
        .sponsor-app small{font-weight:500;color:#555}
        .sponsor-side{background:#171717;color:#fff;border-radius:24px;padding:25px;position:sticky;top:24px}
        .sponsor-side h3{color:#fff;margin-top:8px}
        .sponsor-side p{color:#eee}
        .sponsor-side .mini-label{color:#fff}
        @media(max-width:760px){.sponsor-app-shell{grid-template-columns:1fr}.sponsor-app-grid{grid-template-columns:1fr}.sponsor-app .full{grid-column:auto}.sponsor-side{position:static}.supporter-tile{width:190px}.supporter-track{animation-duration:26s}}
        @media(prefers-reduced-motion:reduce){.supporter-track{animation:none;flex-wrap:wrap;width:auto}.supporter-marquee{mask-image:none;-webkit-mask-image:none}}
      </style>
      <section class="section"><div class="container">
        <div class="showcase-intro"><span class="showcase-count">${data.sponsors.length}</span><div><h2>Current sponsors & donors</h2><p>These confirmed supporters have contributed funding, donated goods, services, auction items, printing, or other in-kind support.</p></div></div>
        <div class="supporter-marquee" aria-label="Current sponsors and donors"><div class="supporter-track">${supporterRun}</div></div>
      </div></section>
      <section class="section" id="sponsor-application"><div class="container">
        <div class="sponsor-app-shell">
          <form class="sponsor-app" id="sponsorDonorForm">
            <span class="mini-label">SPONSOR + DONOR APPLICATION</span>
            <h2>Support the 2026 Viking Quest Fall Festival</h2>
            <p>Tell us how you would like to support the event. Submitting this form does not obligate you to contribute; the PTA will confirm details before anything is finalized.</p>
            <div class="sponsor-app-grid">
              <label>Business / organization name
                <input name="organization" autocomplete="organization" required>
              </label>
              <label>Contact name
                <input name="contact" autocomplete="name" required>
              </label>
              <label>Email
                <input type="email" name="email" autocomplete="email" required>
              </label>
              <label>Phone
                <input type="tel" name="phone" autocomplete="tel">
              </label>
              <label>Support type
                <select name="supportType" required>
                  <option value="">Select one</option>
                  <option>Financial donation</option>
                  <option>Event sponsorship</option>
                  <option>In-kind goods</option>
                  <option>Professional service</option>
                  <option>Prize / giveaway</option>
                  <option>Printing / signage</option>
                  <option>Attraction / entertainment</option>
                  <option>Other community support</option>
                </select>
              </label>
              <label>Donation / sponsorship value
                <input name="value" placeholder="Example: $250 or estimated retail value">
              </label>
              <label class="full">What would you like to contribute?
                <textarea name="contribution" required placeholder="Tell us what you are offering, quantity if applicable, and any important details."></textarea>
              </label>
              <label>Recognition preference
                <select name="recognition">
                  <option>Please recognize our support publicly</option>
                  <option>Anonymous / no public recognition</option>
                  <option>Please contact me about recognition options</option>
                </select>
              </label>
              <label>Website / social link
                <input type="url" name="website" placeholder="https://">
              </label>
              <label class="full">Anything else we should know?
                <textarea name="notes" placeholder="Fulfillment details, restrictions, deadlines, logo notes, questions, etc."></textarea>
              </label>
            </div>
            <button class="btn primary" type="submit" style="margin-top:18px">Submit sponsor / donor application</button>
            <p id="sponsorFormStatus" role="status" style="margin-top:12px"></p>
          </form>
          <aside class="sponsor-side">
            <span class="mini-label">WAYS TO HELP</span>
            <h3>Funding, goods, services — all of it matters.</h3>
            <p>Current Fall Festival support can include attractions, activity supplies, sensory-friendly resources, prizes, volunteer support, printing, entertainment, or another useful contribution.</p>
            <p><strong>Want to make a financial gift?</strong> The secure fee-free donation checkout is being prepared on the Donate page and will be activated once the PTA bank connection is completed.</p>
            <a class="btn secondary" href="/donate" style="margin-top:12px">Open donation page →</a>
          </aside>
        </div>
      </div></section>`;

    const sponsorForm=document.getElementById('sponsorDonorForm');
    sponsorForm?.addEventListener('submit',e=>{
      e.preventDefault();
      const fd=new FormData(sponsorForm);
      const subject='Viking Quest Sponsor / Donor Application — '+(fd.get('organization')||fd.get('contact')||'New application');
      const body=[
        '2026 VIKING QUEST SPONSOR / DONOR APPLICATION','',
        'Business / Organization: '+(fd.get('organization')||''),
        'Contact: '+(fd.get('contact')||''),
        'Email: '+(fd.get('email')||''),
        'Phone: '+(fd.get('phone')||''),
        'Support type: '+(fd.get('supportType')||''),
        'Donation / sponsorship value: '+(fd.get('value')||''),
        'Recognition preference: '+(fd.get('recognition')||''),
        'Website / social: '+(fd.get('website')||''),
        '',
        'Contribution details:',
        fd.get('contribution')||'',
        '',
        'Additional notes:',
        fd.get('notes')||''
      ].join('\n');
      const status=document.getElementById('sponsorFormStatus');
      if(status)status.textContent='Opening your email to send the completed application to the PTA…';
      location.href='mailto:community@xeniavoigtpta.org?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    });
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