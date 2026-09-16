(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/events') return;

  const mount=document.getElementById('eventsCalendarMount');
  if(!mount) return;

  const officialUrl='https://voigt.roundrockisd.org/events?view=list-month';
  const events=[
    {
      date:'2026-09-24',
      title:'Open House + Lotería Night',
      time:'5:30–7:00 PM',
      type:'School event',
      source:'Voigt Arts Integration Academy',
      details:'Meet teachers, learn about classroom learning and curriculum, hear how Title I funds support students, enjoy Lotería, and see the 5th Grade Arts Integration Performance.',
      href:officialUrl
    },
    {
      date:'2026-10-23',
      title:'Viking Quest Fall Festival',
      time:'5:30–7:30 PM',
      type:'PTA event',
      source:'Xenia Voigt PTA',
      details:'A family fall festival with Viking Quest activities, arts, games, food, performances, Trunk-or-Treat, and community fun.',
      href:'/viking-quest'
    }
  ];

  let cursor=new Date(2026,8,1);
  const fmtMonth=new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric'});
  const fmtDay=new Intl.DateTimeFormat('en-US',{weekday:'short',month:'short',day:'numeric'});
  const ymd=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;

  function render(){
    const year=cursor.getFullYear(), month=cursor.getMonth();
    const first=new Date(year,month,1);
    const last=new Date(year,month+1,0);
    const start=new Date(year,month,1-first.getDay());
    const cells=[];
    for(let i=0;i<42;i++){
      const d=new Date(start); d.setDate(start.getDate()+i);
      const key=ymd(d);
      const todaysEvents=events.filter(e=>e.date===key);
      const muted=d.getMonth()!==month;
      cells.push(`<div class="pta-cal-day${muted?' is-muted':''}${todaysEvents.length?' has-event':''}">
        <div class="pta-cal-date">${d.getDate()}</div>
        ${todaysEvents.map(e=>`<a class="pta-cal-pill ${e.type==='PTA event'?'pta':'school'}" href="${e.href}" ${e.href.startsWith('http')?'target="_blank" rel="noopener"':''}>${e.title}</a>`).join('')}
      </div>`);
    }

    const monthEvents=events.filter(e=>{
      const d=new Date(`${e.date}T12:00:00`);
      return d.getFullYear()===year && d.getMonth()===month;
    });

    mount.innerHTML=`
      <div class="pta-calendar-shell">
        <div class="pta-calendar-toolbar">
          <div><span class="mini-label">FAMILY CALENDAR</span><h2>${fmtMonth.format(cursor)}</h2></div>
          <div class="pta-calendar-nav"><button type="button" data-cal-prev aria-label="Previous month">←</button><button type="button" data-cal-today>Today</button><button type="button" data-cal-next aria-label="Next month">→</button></div>
        </div>
        <div class="pta-calendar-key"><span><i class="school-dot"></i>School event</span><span><i class="pta-dot"></i>PTA event</span></div>
        <div class="pta-calendar-weekdays"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>
        <div class="pta-calendar-grid">${cells.join('')}</div>
      </div>
      <div class="pta-events-list-wrap">
        <div class="pta-events-list-head"><div><span class="mini-label">THIS MONTH</span><h2>${monthEvents.length?`${monthEvents.length} confirmed ${monthEvents.length===1?'event':'events'}`:'No PTA-posted events yet'}</h2></div><a class="btn secondary" href="${officialUrl}" target="_blank" rel="noopener">Open official Voigt calendar ↗</a></div>
        <div class="pta-events-list">${monthEvents.length?monthEvents.map(e=>`<article class="pta-event-row"><div class="pta-event-datebox"><strong>${new Date(`${e.date}T12:00:00`).getDate()}</strong><span>${new Date(`${e.date}T12:00:00`).toLocaleDateString('en-US',{month:'short'}).toUpperCase()}</span></div><div><div class="pta-event-meta"><span>${e.type}</span><span>${fmtDay.format(new Date(`${e.date}T12:00:00`))} · ${e.time}</span></div><h3>${e.title}</h3><p>${e.details}</p><a href="${e.href}" ${e.href.startsWith('http')?'target="_blank" rel="noopener"':''}>${e.href.startsWith('http')?'View official listing ↗':'Event details →'}</a></div></article>`).join(''):`<article class="pta-empty-month"><h3>No confirmed PTA-posted events for ${fmtMonth.format(cursor)}.</h3><p>Use the official Voigt calendar for the school’s full live schedule.</p></article>`}</div>
      </div>`;

    mount.querySelector('[data-cal-prev]').onclick=()=>{cursor=new Date(year,month-1,1);render();};
    mount.querySelector('[data-cal-next]').onclick=()=>{cursor=new Date(year,month+1,1);render();};
    mount.querySelector('[data-cal-today]').onclick=()=>{const now=new Date();cursor=new Date(now.getFullYear(),now.getMonth(),1);render();};
  }

  render();
})();
