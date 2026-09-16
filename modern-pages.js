(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  const main=document.querySelector('main#main'); if(!main)return;
  const hero=(eyebrow,title,copy)=>`<section class="page-hero"><div class="container"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${copy}</p></div></section>`;
  const card=(title,copy,href,label)=>`<article class="modern-panel"><h3>${title}</h3><p>${copy}</p>${href?`<a class="btn secondary" href="${href}">${label||'Explore'} →</a>`:''}</article>`;

  if(p==='/about'){
    main.innerHTML=`${hero('ABOUT THE PTA','Built for real school life.','We connect families, educators, students, and community partners around the things that make Voigt feel supported, creative, welcoming, and fun.')}
    <section class="section"><div class="container"><div class="modern-page-grid"><article class="modern-panel accent"><span class="mini-label">OUR ENERGY</span><h2>Useful first. Memorable second. Never stuffy.</h2><p>We want families to know what is happening, teachers and staff to feel supported, students to feel seen, and volunteers to know exactly how they can help.</p></article><article class="modern-panel pop"><span class="modern-stat">ALL</span><h3>means all Vikings.</h3><p>Different schedules, different needs, different ways to participate — all welcome.</p></article></div><div class="grid three" style="margin-top:16px">${card('Students','Enrichment, creativity, events, belonging, and experiences worth remembering.','/resources','Student resources')}${card('Teachers + staff','Practical support, appreciation, volunteer coordination, and stronger school-community connection.','/contact','Ask PTA for support')}${card('Families + community','Clear information, flexible involvement, and meaningful ways to show up.','/join','Join the PTA')}</div></div></section>`;
  }

  if(p==='/join'){
    main.innerHTML=`${hero('PTA MEMBERSHIP','Join without signing your life away.','Membership is a simple way to support students and stay connected. There is no volunteer quota and no expectation that you attend every meeting.')}
    <section class="section"><div class="container"><div class="modern-page-grid"><article class="modern-panel pop"><span class="mini-label">THE SHORT VERSION</span><div class="modern-stat">YES</div><h2>You can just join.</h2><p>Membership alone helps strengthen the PTA. Volunteer only when it works for you.</p></article><article class="modern-panel"><span class="mini-label">WHY IT MATTERS</span><h2>Your membership helps build the kind of school community people want to be part of.</h2><div class="modern-chiprow"><span>Student experiences</span><span>Teacher support</span><span>Family events</span><span>Community voice</span><span>School connection</span></div></article></div><div class="grid three" style="margin-top:16px">${card('Stay connected','Know what is happening without hunting through five different places.','/resources','Open resource hub')}${card('Have a voice','Membership gives you a direct connection to PTA priorities and conversations.','/contact','Contact PTA')}${card('Help your way','One hour, one event, behind the scenes, or not at all — volunteering is flexible.','/volunteer','See volunteer options')}</div></div></section>`;
  }

  if(p==='/events'){
    main.innerHTML=`${hero('WHAT’S HAPPENING','One calendar for school life + PTA fun.','Use this page for the PTA’s confirmed events alongside important Voigt school dates. The official Voigt calendar remains the source of truth for campus schedule changes.')}
    <section class="section"><div class="container">
      <div class="pta-events-intro">
        <article class="modern-panel accent"><span class="mini-label">NEXT SCHOOL EVENT</span><h2>Open House + Lotería Night</h2><p>Thursday, September 24, 2026 · 5:30–7:00 PM</p><div class="modern-chiprow"><span style="background:#fff;color:#171717">All families welcome</span><span style="background:#fff;color:#171717">5th Grade performance</span><span style="background:#fff;color:#171717">Lotería</span></div></article>
        <article class="modern-panel"><span class="mini-label">NEXT PTA EVENT</span><h2>Viking Quest Fall Festival</h2><p>Friday, October 23, 2026 · 5:30–7:30 PM</p><a class="btn secondary" href="/viking-quest">Viking Quest details →</a></article>
      </div>
      <div id="eventsCalendarMount" aria-live="polite"></div>
      <div class="pta-calendar-source"><p><strong>School calendar source:</strong> Voigt Arts Integration Academy / Round Rock ISD. School dates may change.</p><a href="https://voigt.roundrockisd.org/events?view=list-month" target="_blank" rel="noopener">View official calendar ↗</a></div>
    </div></section>`;
  }

  if(p==='/fundraising'){
    main.innerHTML=`${hero('SUPPORT + PARTNERSHIPS','Help without making it weird.','Local businesses, families, and community partners can support Voigt through goods, services, sponsorships, volunteering, and event participation.')}
    <section class="section"><div class="container"><div class="grid two">${card('Become an event vendor','Apply to sell food, products, services, or experiences at eligible PTA events.','/vendors','Vendor application')}${card('Sponsor or donate','Support an event, donate an item, provide a service, or help make something possible.','/contact','Start a conversation')}${card('Give time or talent','Volunteer for an event, planning task, creative project, or behind-the-scenes need.','/volunteer','Volunteer')}${card('Offer a community resource','Have an idea, program, partnership, or resource that could help Voigt? We want to hear it.','/contact','Contact PTA')}</div></div></section>`;
  }

  if(p==='/contact'){
    main.innerHTML=`${hero('CONTACT PTA','Send it to the right place the first time.','Questions, ideas, support requests, partnership conversations, and “who do I ask about this?” messages are all welcome.')}
    <section class="section"><div class="container"><div class="modern-page-grid"><article class="modern-panel accent"><span class="mini-label">GENERAL PTA</span><h2>info@xeniavoigtpta.org</h2><p>Use this for membership, events, support requests, ideas, partnerships, or anything you are not sure how to route.</p><a class="btn secondary" href="mailto:info@xeniavoigtpta.org">Email PTA →</a></article><article class="modern-panel"><span class="mini-label">QUICK ROUTES</span><div class="concierge-links"><a href="/volunteer">Volunteer <span>→</span></a><a href="/vendors">Vendor application <span>→</span></a><a href="/resources">Resources <span>→</span></a><a href="/events">Events <span>→</span></a></div></article></div></div></section>`;
  }

  if(p==='/access'){
    main.innerHTML=`${hero('PTA ACCESS','One place for the work behind the scenes.','Public resources stay public. Volunteer, vendor, subscriber, and leadership tools live in the appropriate protected spaces.')}
    <section class="section"><div class="container"><div class="grid three">${card('Families','Public events, resources, forms, and updates stay easy to access — no login required.','/resources','Open resources')}${card('Volunteers + vendors','Submit once; the PTA can review and track your information without asking you to send a separate email.','/volunteer','Volunteer form')}${card('PTA leadership','Authorized leaders can review volunteer interest, vendor applications, and newsletter signups.','/admin','Open admin dashboard')}</div></div></section>`;
  }
})();
