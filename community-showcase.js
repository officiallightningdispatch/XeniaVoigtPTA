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