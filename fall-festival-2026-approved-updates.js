(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/viking-quest') return;

  const main=document.querySelector('main#main');
  if(!main) return;

  const lede=main.querySelector('.fall26-lede');
  if(lede){
    lede.textContent='A full-campus fall night built for families: inflatables, carnival games, food trucks, performances, Trunk-or-Treat, art, the Arts Integration Viking Quest, a fall photo stop, and more.';
  }

  const posterStrip=main.querySelector('.fall26-poster-strip');
  if(posterStrip){
    posterStrip.textContent='FOOD · GAMES · ART · MUSIC · TRUNKS · QUEST · PHOTOS';
  }

  const cards=[...main.querySelectorAll('.fall26-card')];
  const inflatablesCard=cards.find(card=>card.querySelector('h3')?.textContent.trim()==='Inflatables + Rides');
  if(inflatablesCard){
    inflatablesCard.querySelector('h3').textContent='Inflatables';
    const p=inflatablesCard.querySelector('p');
    if(p) p.textContent='Obstacle course, bounce/combo attractions, and interactive inflatable games bring the big-energy fun without adding a moving ride route.';
  }

  const questCard=cards.find(card=>card.querySelector('h3')?.textContent.trim()==='Viking Quest');
  if(questCard){
    const p=questCard.querySelector('p');
    if(p) p.textContent='An Arts Integration adventure built around five creative trials: The Trial of Skill, The Shield Wall, The Rune Maker’s Workshop, The Voigt Longship Builders, and The Skald’s Stage finish line. Students collect a keepsake at each stop in their Quest pouch, then a completed Quest Card earns one Sweet Finish Giveaway entry.';
  }

  const grid=main.querySelector('.fall26-grid');
  if(grid && !grid.querySelector('[data-approved-addition="quest-station-1"]')){
    grid.insertAdjacentHTML('beforeend',`
      <article class="fall26-card" data-approved-addition="quest-station-1">
        <div class="fall26-num">Q1</div><span>SKILL + VISUAL ART</span><h3>The Trial of Skill</h3>
        <p>Three quick throws with lightweight foam or Velcro axes at a tree-ring target designed with student-created Norse-inspired and fall artwork. Quest keepsake: Hack-Silver Coin.</p>
      </article>
      <article class="fall26-card" data-approved-addition="quest-station-2">
        <div class="fall26-num">Q2</div><span>DESIGN + TEAMWORK</span><h3>The Shield Wall</h3>
        <p>Create a mini family or harvest shield, then join a small team behind the Shield Wall to block soft fall-fireball beanbags. Quest keepsake: Viking Arm Ring.</p>
      </article>
      <article class="fall26-card" data-approved-addition="quest-station-3">
        <div class="fall26-num">Q3</div><span>SYMBOL + MYSTERY</span><h3>The Rune Maker’s Workshop</h3>
        <p>Decorate a wooden rune token with metallic art markers and decode a giant visual riddle. The finished wooden token becomes the student’s Quest keepsake.</p>
      </article>
      <article class="fall26-card" data-approved-addition="quest-station-4">
        <div class="fall26-num">Q4</div><span>COLLABORATIVE ART + RHYTHM</span><h3>The Voigt Longship Builders</h3>
        <p>Add a piece to a giant communal Voigt Longship art installation, then join a short rowing rhythm with shakers, rhythm sticks, or drums. Quest keepsake: Dragon Crew Sticker or temporary tattoo.</p>
      </article>
      <article class="fall26-card" data-approved-addition="quest-station-5">
        <div class="fall26-num">Q5</div><span>PERFORMANCE + CELEBRATION</span><h3>The Skald’s Stage</h3>
        <p>Finish the Quest with a school-spirit chant, victory pose, sign, or instrument sound. Nonverbal participation is always welcome. Quest keepsake: red-and-white Quest Complete ticket, followed by finish-line verification.</p>
      </article>`);
  }

  if(grid && !grid.querySelector('[data-approved-addition="harvest-wagon"]')){
    grid.insertAdjacentHTML('beforeend',`
      <article class="fall26-card" data-approved-addition="harvest-wagon">
        <div class="fall26-num">09</div><span>PICTURE-PERFECT FALL</span><h3>Viking Harvest Wagon Photo Stop</h3>
        <p>Gather your crew for a festive photo moment with a stationary rustic wagon, pumpkins, mums, faux hay bales, and Viking Quest photo props. A ground-level photo position keeps the experience accessible for more families.</p>
      </article>
      <article class="fall26-card" data-approved-addition="sweet-finish">
        <div class="fall26-num">10</div><span>FINISH SWEET</span><h3>Sweet Finish Giveaway</h3>
        <p>Complete your Viking Quest activity card for one entry to win a Cookies &amp; Crumbles gift certificate. The drawing is planned for about 7:15 PM; the winner must be present and the prize will be released to the student's parent or guardian.</p>
      </article>`);
  }

  const partnerCards=[...main.querySelectorAll('.fall26-partner-card')];
  const cookies=partnerCards.find(card=>card.querySelector('h3')?.textContent.trim()==='Cookies & Crumbles');
  if(cookies){
    const type=cookies.querySelector('.fall26-partner-type');
    const p=cookies.querySelector('p');
    if(type) type.textContent='SWEET FINISH GIVEAWAY PARTNER';
    if(p) p.textContent='Finish the Viking Quest and you could end the night on a sweet note! One completed Quest Card earns one entry for a Cookies & Crumbles gift certificate, with the winner drawn around 7:15 PM. The winner must be present; the prize goes to the student’s parent or guardian.';
  }

  if(!main.querySelector('[data-approved-addition="sponsor-cta"]')){
    const partners=main.querySelector('.fall26-partners');
    const section=document.createElement('section');
    section.className='section fall26-sponsor-cta';
    section.dataset.approvedAddition='sponsor-cta';
    section.innerHTML=`<div class="container"><div class="fall26-section-head"><span>COMMUNITY PARTNERS WANTED</span><h2>Help power a free night for Voigt families.</h2><p>Local businesses and community organizations can help sponsor attractions, Arts Integration activities, accessibility resources, prizes, and other festival essentials. We’ll work with you to find a partnership that fits.</p><p><a class="btn primary" href="mailto:voigtpta7@gmail.com?subject=Voigt%20Fall%20Festival%20Sponsorship">Become a community sponsor</a></p></div></div>`;
    if(partners) partners.insertAdjacentElement('afterend',section); else main.appendChild(section);
  }
})();
