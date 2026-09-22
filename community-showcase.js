(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  const main=document.querySelector('main#main');
  if(!main)return;

  const data={
    communityPartners:[
      {name:'Round the Rock',type:'Community Media Partner',desc:'Helping spread the word about Viking Quest through its Round Rock event calendar, The Weekly Rock, and community social channels.',url:'https://roundtherocktx.com/',domain:'roundtherocktx.com',logoUrl:'/round-the-rock-logo.png'},
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
      {name:'Cookies & Crumbles',type:'Sweet Finish Giveaway Donor',value:'$65 donated',desc:'Providing a $65 gift certificate for the Viking Quest Sweet Finish Giveaway.',url:'https://www.cookiesandcrumblesbakeshop.com/',domain:'cookiesandcrumblesbakeshop.com'},
      {name:"Paige's Bakehouse",type:'Cake Walk Donor',value:'$36 donated',desc:'Donating one dozen decorated cookies for the Fall Festival cake walk, with event-day pickup confirmed.',url:'https://paigesbakehouse.com/',domain:'paigesbakehouse.com'},
      {name:'FASTSIGNS Round Rock',type:'Event Signage Partner',desc:'Supporting Fall Festival printing and signage as final quantities and display details are completed.',url:'https://www.fastsigns.com/round-rock-tx/',domain:'fastsigns.com'},
      {name:'Kendra Scott',type:'Festival Donor',value:'Donated item confirmed',desc:'Repeat Fall Festival donor; a donated Kendra Scott item is being treated as confirmed for 2026 under the PTA repeat-support rule.',url:'https://www.kendrascott.com/',domain:'kendrascott.com'},
      {name:'A+ Federal Credit Union',type:'Trunk-or-Treat Candy Sponsor',value:'Confirmed in-kind',desc:'Repeat Fall Festival candy support is confirmed under the PTA repeat-support rule; final 2026 quantity is pending fulfillment.',url:'https://aplusfcu.org/',domain:'aplusfcu.org'},
      {name:'H-E-B',type:'Volunteer Support Sponsor',value:'$150 gift cards confirmed',desc:'Repeat Fall Festival support; the confirmed H-E-B gift-card support will cover volunteer snacks.',url:'https://www.heb.com/',domain:'heb.com'},
      {name:'Shine Pediatric Dental Co.',type:'Attraction Sponsor',value:'$195 pledged',desc:'Pledged $195 to fully cover the Fall Festival bounce/combo inflatable experience.',url:'https://shinepediatricdentalco.com/',domain:'shinepediatricdentalco.com'},
      {name:'Toybrary Austin',type:'Family Experience Donor',value:'$60 donated',desc:'Donated a $60 Stay & Play punch card for a young-family festival prize.',url:'https://toybraryaustin.com/',domain:'toybraryaustin.com'},
      {name:'Express Commercial Cleaning',type:'Safety & Cleanup Supporter',desc:'Pledged event safety and cleanup support; final donated quantities are being coordinated.',url:'',domain:''}
    ],
    vendors:[
      {name:'Kona Ice Greater Austin',type:'Confirmed Dessert Vendor',desc:'Colorful shaved ice will be rolling into Food Truck Row for a refreshing festival treat.',url:'https://www.kona-ice.com/local-site/kona-ice-of-greater-austin/',domain:'kona-ice.com'},
      {name:'KK BBQ Mexican Food Truck',type:'Confirmed Food Vendor',desc:'Bringing Mexican-BBQ flavor to Food Truck Row. The 10% PTA event contribution has been accepted.',url:'https://www.facebook.com/p/KK-BBQ-Mexican-Food-100095578564767/',domain:'facebook.com'},
      {name:"Coco's Eats & Sweets / Vaughan's",type:'Confirmed Food & Dessert Vendor',desc:'Confirmed for October 23 with the 10% PTA event contribution accepted; final application and logistics are being completed.',url:'',domain:''},
      {name:'Pour The Fun',type:'Confirmed Beverage Vendor',desc:'Bringing a family-friendly specialty beverage experience. Vendor application received and the 10% PTA contribution agreement accepted.',url:'https://pourthefun.com/',domain:'pourthefun.com'}
    ]
  };

  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const logo=item=>item.logoMark
    ? `<span class="partner-wordmark" aria-label="${esc(item.name)}">${esc(item.logoMark)}</span>`
    : item.logoUrl
      ? `<img src="${item.logoUrl}" alt="${esc(item.name)} logo" loading="lazy" decoding="async">`
      : item.logoData
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
    const partnerTile=item=>`<a class="supporter-tile" href="${esc(item.url||'#')}" ${item.url?'target="_blank" rel="noopener noreferrer"':'aria-disabled="true"'} aria-label="${esc(item.name)}">
      <div class="supporter-logo">${logo(item)}</div>
      <strong>${esc(item.name)}</strong>
      <span>${esc(item.type)}</span>
    </a>`;
    const partnerRun=[...data.communityPartners,...data.communityPartners].map(partnerTile).join('');
    main.innerHTML=`${hero('COMMUNITY-POWERED','Meet the neighbors who show up for Voigt.','These organizations contribute time, expertise, programs, resources, visibility, and community presence to strengthen Xenia Voigt Arts Academy.')}
      <style>
        .supporter-marquee{overflow:hidden;position:relative;margin-top:24px;padding:8px 0 14px;mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
        .supporter-track{display:flex;gap:16px;width:max-content;animation:voigtSupporters 32s linear infinite}
        .supporter-marquee:hover .supporter-track,.supporter-marquee:focus-within .supporter-track{animation-play-state:paused}
        .supporter-tile{width:220px;min-height:190px;background:#fff;border:2px solid #171717;border-radius:22px;padding:22px 18px;text-align:center;text-decoration:none;color:#171717;box-shadow:6px 6px 0 #d71920;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px}
        .supporter-tile:hover{transform:translateY(-2px)}
        .supporter-logo{width:150px;height:76px;display:grid;place-items:center}
        .supporter-logo img{max-width:150px;max-height:76px;object-fit:contain}
        .supporter-logo>span:not(.partner-wordmark){width:64px;height:64px;border-radius:50%;display:grid;place-items:center;background:#171717;color:#fff;font-size:28px;font-weight:900}
        .partner-wordmark{display:block;font-family:'Plus Jakarta Sans',sans-serif;font-weight:900;font-size:18px;line-height:1.05;color:#d71920;letter-spacing:-.04em;max-width:110px}
        .partner-wordmark::first-line{color:#d71920}
        .supporter-tile strong{font-size:18px;line-height:1.15}
        .supporter-tile>span{font-size:12px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#6b6b6b}
        .supporter-value{font-style:normal;font-size:13px;font-weight:900;color:#d71920;background:#fff3f3;border:1px solid #d71920;border-radius:999px;padding:5px 9px}
        @keyframes voigtSupporters{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 8px))}}
        .partner-app-shell{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:22px;align-items:start}
        .partner-app{background:#fff;border:2px solid #171717;border-radius:24px;padding:24px;box-shadow:8px 8px 0 #171717}
        .partner-app-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .partner-app label{display:flex;flex-direction:column;gap:7px;font-weight:800;font-size:14px}
        .partner-app input,.partner-app select,.partner-app textarea{width:100%;border:2px solid #171717;border-radius:12px;padding:12px 13px;font:inherit;background:#fff;color:#171717}
        .partner-app textarea{min-height:118px;resize:vertical}
        .partner-app .full{grid-column:1/-1}
        .partner-side{background:#171717;color:#fff;border-radius:24px;padding:25px;position:sticky;top:24px}
        .partner-side h3{color:#fff;margin-top:8px}.partner-side p{color:#eee}.partner-side .mini-label{color:#fff}
        @media(max-width:760px){.partner-app-shell{grid-template-columns:1fr}.partner-app-grid{grid-template-columns:1fr}.partner-app .full{grid-column:auto}.partner-side{position:static}.supporter-tile{width:190px}.supporter-track{animation-duration:26s}}
        @media(prefers-reduced-motion:reduce){.supporter-track{animation:none;flex-wrap:wrap;width:auto}.supporter-marquee{mask-image:none;-webkit-mask-image:none}}
      </style>
      <section class="section"><div class="container">
        <div class="showcase-intro"><span class="showcase-count">${data.communityPartners.length}</span><div><h2>Current community partners</h2><p>These confirmed partners support Voigt through resources, volunteer connections, educational programming, media support, family engagement, or another meaningful community contribution.</p></div></div>
        <div class="supporter-marquee" aria-label="Current community partners"><div class="supporter-track">${partnerRun}</div></div>
      </div></section>
      <section class="section" id="community-partner-application"><div class="container">
        <div class="partner-app-shell">
          <form class="partner-app" id="communityPartnerForm">
            <span class="mini-label">COMMUNITY PARTNER APPLICATION</span>
            <h2>Partner with Xenia Voigt PTA</h2>
            <p>Tell us how your organization would like to support Voigt families. Community partnerships are separate from paid sponsorships and may include resources, programs, volunteers, educational engagement, event participation, or community visibility.</p>
            <div class="partner-app-grid">
              <label>Organization / business name
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
              <label>Partnership type
                <select name="partnerType" required>
                  <option value="">Select one</option>
                  <option>Family resources / information</option>
                  <option>Educational program or activity</option>
                  <option>Volunteer support / recruitment</option>
                  <option>Community media / promotion</option>
                  <option>Event booth / family engagement</option>
                  <option>Student or youth programming</option>
                  <option>Professional expertise / service</option>
                  <option>Other community partnership</option>
                </select>
              </label>
              <label>Website / social link
                <input type="url" name="website" placeholder="https://">
              </label>
              <label class="full">How would you like to partner with Voigt?
                <textarea name="proposal" required placeholder="Describe the resource, activity, program, booth, volunteer support, promotion, or other contribution you would like to provide."></textarea>
              </label>
              <label class="full">Event or timing notes
                <textarea name="timing" placeholder="Specific event, preferred dates, setup needs, audience, restrictions, or other details."></textarea>
              </label>
            </div>
            <button class="btn primary" type="submit" style="margin-top:18px">Submit community partner application</button>
            <p id="communityPartnerStatus" role="status" style="margin-top:12px"></p>
          </form>
          <aside class="partner-side">
            <span class="mini-label">WHAT PARTNERSHIP CAN LOOK LIKE</span>
            <h3>Show up in a way that helps families.</h3>
            <p>Partnership can mean providing useful resources, hosting a family-friendly informational or educational experience, helping recruit volunteers, sharing an event with the community, supporting student programming, or bringing another practical resource to Voigt.</p>
            <p><strong>Want to fund an event need instead?</strong> Financial and in-kind sponsorship opportunities are handled separately so recognition and fulfillment stay clear.</p>
            <a class="btn secondary" href="/sponsors" style="margin-top:12px">View sponsors & donors →</a>
          </aside>
        </div>
      </div></section>`;

    const partnerForm=document.getElementById('communityPartnerForm');
    partnerForm?.addEventListener('submit',e=>{
      e.preventDefault();
      const fd=new FormData(partnerForm);
      const subject='Voigt PTA Community Partner Application — '+(fd.get('organization')||fd.get('contact')||'New partner');
      const body=[
        'VOIGT PTA COMMUNITY PARTNER APPLICATION','',
        'Organization / Business: '+(fd.get('organization')||''),
        'Contact: '+(fd.get('contact')||''),
        'Email: '+(fd.get('email')||''),
        'Phone: '+(fd.get('phone')||''),
        'Partnership type: '+(fd.get('partnerType')||''),
        'Website / social: '+(fd.get('website')||''),
        '',
        'Partnership proposal:',
        fd.get('proposal')||'',
        '',
        'Event / timing notes:',
        fd.get('timing')||''
      ].join('\n');
      const status=document.getElementById('communityPartnerStatus');
      if(status)status.textContent='Opening your email to send the completed application to the PTA…';
      location.href='mailto:community@xeniavoigtpta.org?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    });
  }

  if(path==='/sponsors'){
    const supporterTile=item=>`<a class="supporter-tile" href="${esc(item.url||'#')}" ${item.url?'target="_blank" rel="noopener noreferrer"':'aria-disabled="true"'} aria-label="${esc(item.name)}">
      <div class="supporter-logo">${logo(item)}</div>
      <strong>${esc(item.name)}</strong>
      <span>${esc(item.type)}</span>
      ${item.value?`<em class="supporter-value">${esc(item.value)}</em>`:''}
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
            <p>Current Fall Festival support can include attractions, activity supplies, sensory-friendly resources, prizes, volunteer support, entertainment, or another useful contribution.</p>
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