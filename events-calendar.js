(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/events') return;

  const mount=document.getElementById('eventsCalendarMount');
  if(!mount) return;

  const districtUrl='https://www.roundrockisd.org/events';
  const voigtUrl='https://voigt.roundrockisd.org/events?view=list-month';
  let events=[];
  let cursor=new Date(); cursor=new Date(cursor.getFullYear(),cursor.getMonth(),1);
  const fmtMonth=new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric'});
  const fmtDay=new Intl.DateTimeFormat('en-US',{weekday:'short',month:'short',day:'numeric'});
  const ymd=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const hrefFor=e=>e.sourceUrl||'#';
  const classFor=e=>e.type==='PTA event'?'pta':e.type==='District event'?'district':'school';
  const formatTime=e=>{
    if(e.allDay) return 'All day';
    if(!e.start) return e.time||'';
    const start=new Date(e.start);
    if(Number.isNaN(start.getTime())) return e.time||'';
    const f=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/Chicago'});
    let out=f.format(start);
    if(e.end){const end=new Date(e.end);if(!Number.isNaN(end.getTime()))out+=`–${f.format(end)}`;}
    return out;
  };

  function render(){
    const year=cursor.getFullYear(), month=cursor.getMonth();
    const first=new Date(year,month,1);
    const start=new Date(year,month,1-first.getDay());
    const cells=[];
    for(let i=0;i<42;i++){
      const d=new Date(start); d.setDate(start.getDate()+i);
      const key=ymd(d);
      const todaysEvents=events.filter(e=>e.date===key);
      const muted=d.getMonth()!==month;
      cells.push(`<div class="pta-cal-day${muted?' is-muted':''}${todaysEvents.length?' has-event':''}">
        <div class="pta-cal-date">${d.getDate()}</div>
        ${todaysEvents.map(e=>`<a class="pta-cal-pill ${classFor(e)}" href="${esc(hrefFor(e))}" ${hrefFor(e).startsWith('http')?'target="_blank" rel="noopener"':''} title="${esc(e.title)}">${esc(e.title)}</a>`).join('')}
      </div>`);
    }

    const monthEvents=events.filter(e=>{
      const d=new Date(`${e.date}T12:00:00`);
      return d.getFullYear()===year && d.getMonth()===month;
    });

    mount.innerHTML=`
      <div class="pta-calendar-shell">
        <div class="pta-calendar-toolbar">
          <div><span class="mini-label">VOIGT + ROUND ROCK ISD + PTA</span><h2>${fmtMonth.format(cursor)}</h2></div>
          <div class="pta-calendar-nav"><button type="button" data-cal-prev aria-label="Previous month">←</button><button type="button" data-cal-today>Today</button><button type="button" data-cal-next aria-label="Next month">→</button></div>
        </div>
        <div class="pta-calendar-key"><span><i class="school-dot"></i>Voigt event</span><span><i class="district-dot"></i>RRISD event</span><span><i class="pta-dot"></i>PTA event</span></div>
        <div class="pta-calendar-weekdays"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>
        <div class="pta-calendar-grid">${cells.join('')}</div>
      </div>
      <div class="pta-events-list-wrap">
        <div class="pta-events-list-head"><div><span class="mini-label">THIS MONTH</span><h2>${monthEvents.length?`${monthEvents.length} ${monthEvents.length===1?'event':'events'}`:'No events listed'}</h2><p>Voigt and Round Rock ISD calendars are combined automatically. Matching events are shown only once, with Voigt listings taking priority when both calendars contain the same event.</p></div><div class="buttons left"><a class="btn secondary" href="${voigtUrl}" target="_blank" rel="noopener">Voigt calendar ↗</a><a class="btn secondary" href="${districtUrl}" target="_blank" rel="noopener">RRISD calendar ↗</a></div></div>
        <div class="pta-events-list">${monthEvents.length?monthEvents.map(e=>`<article class="pta-event-row"><div class="pta-event-datebox"><strong>${new Date(`${e.date}T12:00:00`).getDate()}</strong><span>${new Date(`${e.date}T12:00:00`).toLocaleDateString('en-US',{month:'short'}).toUpperCase()}</span></div><div><div class="pta-event-meta"><span>${esc(e.type)}</span><span>${fmtDay.format(new Date(`${e.date}T12:00:00`))}${formatTime(e)?` · ${esc(formatTime(e))}`:''}</span></div><h3>${esc(e.title)}</h3>${e.location?`<p><strong>Location:</strong> ${esc(e.location)}</p>`:''}${e.details?`<p>${esc(e.details)}</p>`:''}<a href="${esc(hrefFor(e))}" ${hrefFor(e).startsWith('http')?'target="_blank" rel="noopener"':''}>${e.type==='PTA event'?'Event details →':'View official calendar ↗'}</a></div></article>`).join(''):`<article class="pta-empty-month"><h3>No events are currently listed for ${fmtMonth.format(cursor)}.</h3><p>This calendar checks both official school sources plus PTA events.</p></article>`}</div>
      </div>`;

    mount.querySelector('[data-cal-prev]').onclick=()=>{cursor=new Date(year,month-1,1);render();};
    mount.querySelector('[data-cal-next]').onclick=()=>{cursor=new Date(year,month+1,1);render();};
    mount.querySelector('[data-cal-today]').onclick=()=>{const now=new Date();cursor=new Date(now.getFullYear(),now.getMonth(),1);render();};
  }

  mount.innerHTML='<div class="pta-calendar-loading"><span class="mini-label">SYNCING OFFICIAL CALENDARS</span><h2>Loading Voigt and Round Rock ISD events…</h2></div>';
  fetch('/api/school-calendar',{headers:{accept:'application/json'}})
    .then(r=>{if(!r.ok)throw new Error('calendar');return r.json();})
    .then(data=>{events=Array.isArray(data.events)?data.events:[];render();})
    .catch(()=>{events=[{id:'voigt-pta-fall-festival-2026',title:'The 2026 Voigt PTA Fall Festival',date:'2026-10-23',start:'2026-10-23T17:30:00-05:00',end:'2026-10-23T19:30:00-05:00',allDay:false,time:'5:30 PM',location:'Xenia Voigt Arts Integration Academy, 1201 Cushing Dr, Round Rock, TX 78664',details:'Voigt PTA family fall festival.',source:'Xenia Voigt PTA',sourceUrl:'/viking-quest',type:'PTA event'}];render();});
})();
