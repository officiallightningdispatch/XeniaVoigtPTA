(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');

  if(path==='/viking-quest'){
    const sectionHeading=[...document.querySelectorAll('.section-head h2')].find(h=>h.textContent.trim()==='Festival Experiences');
    const section=sectionHeading?.closest('section');
    if(section){
      section.classList.add('viking-experience-section');
      const container=section.querySelector('.container');
      if(container){
        const zones=[
          ['INFLATABLES + RIDES','Inflatables & Ride Zone','🎈'],
          ['THE QUEST','Viking Quest Adventure Zone — Stations 1–5','🛡️'],
          ['PLAY','Games & Carnival Zone','🎯'],
          ['CREATE','Arts Academy Zone','🎨'],
          ['TASTE','Food Court / Food Trucks','🍽️'],
          ['FALL FUN','Trunk-or-Treat Zone','🎃'],
          ['START HERE','Main Entrance + Welcome HQ','✨'],
          ['PERFORM','Cafeteria + Stage','🎤'],
          ['RESET + RECHARGE','Gym — Sensory-Friendly Viking Retreat','☁️'],
          ['CARE','Nurse’s Office — First Aid','✚'],
          ['RECONNECT','Main Office — Lost Child Area','♥'],
          ['DISCOVER','Silent Auction / PTA Hub','🎁']
        ];
        container.innerHTML=`
          <div class="section-head">
            <div class="eyebrow">THE CAMPUS BECOMES A CANVAS</div>
            <h2>Festival Experiences</h2>
            <div class="squiggle" aria-hidden="true"><svg viewBox="0 0 100 20"><path d="M2 10 C12 1,22 19,34 10 S56 1,68 10 S88 1,98 10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></div>
          </div>
          <p class="viking-intro">Instead of one long festival row, Viking Quest is planned as a collection of distinct experiences across the campus — movement, creativity, games, food, performances, calm space, and community connection. Final activity details are still being confirmed.</p>
          <div class="art-ribbon" aria-label="Festival themes"><span>MOVE</span><span>MAKE</span><span>PLAY</span><span>PERFORM</span><span>CONNECT</span><span>RESET</span></div>
          <div class="zone-gallery">
            ${zones.map((z,i)=>`<article class="zone-art-card"><span class="zone-chip">${z[0]}</span><span class="zone-symbol" aria-hidden="true">${z[2]}</span><span class="zone-number">${String(i+1).padStart(2,'0')}</span><h3>${z[1]}</h3><p>Experience details are being finalized.</p></article>`).join('')}
          </div>`;
      }
    }
  }

  if(path==='/'){
    const stage=document.querySelector('.hype-stage');
    if(stage && !stage.querySelector('.arts-stamp')){
      stage.insertAdjacentHTML('afterbegin','<div class="arts-stamp" aria-hidden="true">CREATE • CONNECT • CELEBRATE</div>');
    }
  }
})();
