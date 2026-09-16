(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/viking-quest') return;
  const main=document.querySelector('main#main');
  if(!main) return;
  main.className='fall26-page';
  main.innerHTML=`
    <section class="fall26-hero">
      <div class="fall26-confetti" aria-hidden="true"><span>●</span><span>◆</span><span>★</span><span>●</span><span>◆</span><span>★</span></div>
      <div class="container fall26-hero-grid">
        <div class="fall26-copy">
          <span class="fall26-kicker">XENIA VOIGT ARTS ACADEMY PTA PRESENTS</span>
          <h1>The 2026<br><strong>Voigt PTA</strong><br>Fall Festival</h1>
          <p class="fall26-lede">A full-campus fall night built for families: rides, inflatables, carnival games, food trucks, performances, Trunk-or-Treat, art, the Viking Quest, and more.</p>
          <div class="fall26-meta">
            <div><span>WHEN</span><b>Friday, October 23</b><small>5:30–7:30 PM</small></div>
            <div><span>WHERE</span><b>Xenia Voigt Arts Academy</b><small>1201 Cushing Dr · Round Rock</small></div>
          </div>
          <div class="fall26-actions"><a class="btn primary" href="/event.ics" download>Add to calendar</a><a class="btn secondary" href="/volunteer">Volunteer at the festival</a></div>
        </div>
        <aside class="fall26-poster" aria-label="Festival highlights">
          <div class="fall26-poster-top">ONE BIG FALL NIGHT</div>
          <div class="fall26-bigtype">FUN<br>EVERY<br>WHERE.</div>
          <div class="fall26-poster-strip">RIDES · FOOD · GAMES · ART · MUSIC · TRUNKS</div>
        </aside>
      </div>
    </section>

    <section class="fall26-countdown-band"><div class="container"><div><span>COUNTING DOWN TO</span><b>Friday night at Voigt</b></div><div class="countdown" data-countdown><div class="countbox"><b data-d>—</b><span>Days</span></div><div class="countbox"><b data-h>—</b><span>Hours</span></div><div class="countbox"><b data-m>—</b><span>Min</span></div><div class="countbox"><b data-s>—</b><span>Sec</span></div></div></div></section>

    <section class="section fall26-attractions"><div class="container">
      <div class="fall26-section-head"><span>THE CAMPUS BECOMES THE FESTIVAL</span><h2>More than a school event.<br>A whole-night experience.</h2><p>Every part of the campus has a purpose, so families can move from high-energy attractions to food, performances, creative activities, and quieter spaces without missing the fun.</p></div>
      <div class="fall26-grid">
        <article class="fall26-card hero-card"><div class="fall26-num">01</div><span>BIG ENERGY</span><h3>Inflatables + Rides</h3><p>Obstacle course, bounce/combo attractions, interactive games, and additional ride experiences as confirmed.</p></article>
        <article class="fall26-card"><div class="fall26-num">02</div><span>FALL CLASSICS</span><h3>Games + Carnival</h3><p>Ring toss, beanbag games, pumpkin bowling, target games, and family-friendly carnival stations.</p></article>
        <article class="fall26-card"><div class="fall26-num">03</div><span>THE QUEST</span><h3>Viking Quest</h3><p>A run of themed activity stations with a finish-line moment — one experience inside the larger festival.</p></article>
        <article class="fall26-card"><div class="fall26-num">04</div><span>ROLL IN HUNGRY</span><h3>Food Truck Row</h3><p>A dedicated food-truck lane with multiple vendors serving dinner, snacks, drinks, and desserts.</p></article>
        <article class="fall26-card"><div class="fall26-num">05</div><span>LIGHTS + COSTUMES</span><h3>Trunk-or-Treat</h3><p>Decorated trunks hosted by teachers, families, staff, community groups, and partners.</p></article>
        <article class="fall26-card"><div class="fall26-num">06</div><span>VOIGT ARTS</span><h3>Art + Creativity</h3><p>Student art, collaborative creative activities, and Arts Academy moments woven throughout the night.</p></article>
        <article class="fall26-card"><div class="fall26-num">07</div><span>ON STAGE</span><h3>Performances + DJ</h3><p>Student performances, music, announcements, and an MC keeping the festival moving from start to finish.</p></article>
        <article class="fall26-card calm-card"><div class="fall26-num">08</div><span>A PLACE TO RESET</span><h3>Sensory-Friendly Retreat</h3><p>A lower-stimulation indoor space for students and families who need a quieter break from the festival.</p></article>
      </div>
    </div></section>

    <section class="fall26-black"><div class="container fall26-black-grid">
      <div><span class="fall26-kicker light">BUILT FOR THE WHOLE VOIGT COMMUNITY</span><h2>Come for an hour.<br>Stay for everything.</h2><p>This festival is designed to feel easy to enter and hard to leave: something exciting in every direction, multiple ways to participate, and room for every kind of family night.</p></div>
      <div class="fall26-stats"><div><b>10+</b><span>food vendors targeted</span></div><div><b>6</b><span>teacher trunk spots</span></div><div><b>320</b><span>expected guests</span></div><div><b>2 hrs</b><span>packed with activities</span></div></div>
    </div></section>

    <section class="section fall26-plan"><div class="container">
      <div class="fall26-section-head"><span>PLAN YOUR NIGHT</span><h2>Three easy ways to jump in.</h2></div>
      <div class="fall26-plan-grid">
        <a href="/events" class="fall26-plan-card"><span>01</span><h3>See the calendar</h3><p>Save the date and keep up with school and PTA events.</p><b>Open calendar →</b></a>
        <a href="/volunteer" class="fall26-plan-card"><span>02</span><h3>Help make it happen</h3><p>Choose a festival role that fits your time and comfort level.</p><b>Volunteer →</b></a>
        <a href="/vendors" class="fall26-plan-card"><span>03</span><h3>Join as a vendor</h3><p>Food and community vendors can apply through the PTA vendor form.</p><b>Vendor application →</b></a>
      </div>
    </div></section>

    <section class="fall26-final"><div class="container"><span>FRIDAY · OCTOBER 23 · 5:30–7:30 PM</span><h2>Meet us at Voigt.</h2><p>Games on. Music up. Trunks open. Food trucks rolling. Fall night handled.</p><div class="fall26-actions center"><a class="btn primary" href="/event.ics" download>Add to calendar</a><a class="btn secondary" href="/volunteer">Volunteer</a></div></div></section>`;
})();
