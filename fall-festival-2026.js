// Public Fall Festival page — verified family-facing information only
(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/fall-festival') return;
  const main=document.querySelector('main#main');
  if(!main) return;
  main.className='fall26-page';
  main.innerHTML=`
    <section class="fall26-hero">
      <div class="fall26-confetti" aria-hidden="true"><span>●</span><span>◆</span><span>★</span><span>●</span><span>◆</span><span>★</span></div>
      <div class="container fall26-hero-grid">
        <div class="fall26-copy">
          <span class="fall26-kicker">XENIA VOIGT ARTS INTEGRATION ACADEMY PTA PRESENTS</span>
          <h1>Viking Quest<br><strong>Fall Festival</strong></h1>
          <p class="fall26-lede">A free family fall night with rides, games, food, Trunk-or-Treat, art, community partners, student experiences, and the Viking Quest.</p>
          <div class="fall26-meta">
            <div><span>WHEN</span><b>Friday, October 23, 2026</b><small>5:30–7:30 PM</small></div>
            <div><span>WHERE</span><b>Xenia Voigt Arts Integration Academy</b><small>1201 Cushing Drive · Round Rock</small></div>
          </div>
          <div class="fall26-actions"><a class="btn primary" href="/event.ics" download>Add to calendar</a><a class="btn secondary" href="/volunteer">Volunteer at the festival</a></div>
        </div>
        <aside class="fall26-poster" aria-label="Festival highlights">
          <div class="fall26-poster-top">FRIDAY NIGHT AT VOIGT</div>
          <div class="fall26-bigtype">PLAY.<br>CREATE.<br>QUEST.</div>
          <div class="fall26-poster-strip">TRAIN · BOUNCE · FOOD · GAMES · ART · TRUNKS</div>
        </aside>
      </div>
    </section>

    <section class="fall26-countdown-band"><div class="container"><div><span>COUNTING DOWN TO</span><b>Festival night</b></div><div class="countdown" data-countdown><div class="countbox"><b data-d>—</b><span>Days</span></div><div class="countbox"><b data-h>—</b><span>Hours</span></div><div class="countbox"><b data-m>—</b><span>Min</span></div><div class="countbox"><b data-s>—</b><span>Sec</span></div></div></div></section>

    <section class="section fall26-attractions"><div class="container">
      <div class="fall26-section-head"><span>WHAT FAMILIES CAN LOOK FORWARD TO</span><h2>One night. A lot to explore.</h2><p>These are the confirmed experiences families can plan on for October 23.</p></div>
      <div class="fall26-grid fall26-adventure-grid">
        <article class="fall26-card hero-card"><div class="fall26-icon" aria-hidden="true">🚂</div><span>RIDES + GIANT GAMES</span><h3>Trackless Train, Combo Inflatable & More</h3><p>Enjoy the trackless train, Kids Rainbow Combo inflatable, Giant Connect Four, Giant Corn Hole, Giant Checkers, Giant Jenga, and bubbles.</p></article>
        <article class="fall26-card quest-card"><div class="fall26-icon" aria-hidden="true">🛡️</div><span>THE SIGNATURE ADVENTURE</span><h3>Viking Quest</h3><p>Children can take on five themed trials across the festival:</p><div class="fall26-chips"><b>The Trial of Skill</b><b>The Shield Wall</b><b>The Rune Maker’s Workshop</b><b>The Voigt Longship Builders</b><b>The Skald’s Stage</b></div></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🍂</div><span>FALL ACTIVITIES</span><h3>Create, Play & Explore</h3><p>Beyond Viking Quest, families can enjoy a separate lineup of fall activities throughout the festival.</p><div class="fall26-chips"><b>Pumpkin Bowling</b><b>Apple Scoop Challenge</b><b>Fall Sensory Mystery</b><b>Collaborative Autumn Mural</b><b>Gratitude Tree</b><b>Pumpkin Decorating</b><b>Face Painting</b><b>Photo Stop</b></div></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🍬</div><span>TRUNK-OR-TREAT</span><h3>Sensory-Friendly Start</h3><p>Sensory-friendly Trunk-or-Treat runs from 5:30–6:00 PM. General Trunk-or-Treat begins at 6:00 PM.</p></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🎂</div><span>FAMILY FAVORITE</span><h3>Cake Walk</h3><p>Take a turn in the Cake Walk for a chance to head home with a sweet prize.</p></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🎁</div><span>BID FOR FUN</span><h3>Silent Auction</h3><p>Family-friendly experiences and prizes will be available in the silent auction during festival night.</p></article>
        <article class="fall26-card calm-card"><div class="fall26-icon" aria-hidden="true">✨</div><span>QUIETER SPACE</span><h3>Sensory-Friendly Retreat</h3><p>A quieter reset space will be available in the Boys & Girls Club portable.</p></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">👓</div><span>FREE FAMILY SERVICE</span><h3>KidSight Screening</h3><p>Round Rock Noon Lions will provide KidSight screening during the festival.</p></article>
        <article class="fall26-card stage-card"><div class="fall26-icon" aria-hidden="true">🎸</div><span>STUDENT SPOTLIGHT</span><h3>Voigt Garage Band</h3><p>Watch for a short student Garage Band performance as the evening heads toward its finale.</p></article>
      </div>
    </div></section>

    <section class="section fall26-vendors-live" aria-labelledby="fall26-vendors-title"><div class="container">
      <div class="fall26-section-head"><span>FOOD + DRINKS</span><h2 id="fall26-vendors-title">Festival vendor lineup</h2><p>Families can purchase food and drinks from our three confirmed vendors.</p></div>
      <div class="fall26-partner-grid" role="list" aria-label="Confirmed Fall Festival vendors">
        <article class="fall26-partner-card" role="listitem"><div class="fall26-partner-copy"><span class="fall26-partner-type">FOOD VENDOR</span><h3>K&amp;K BBQ Mexican Food</h3><p>BBQ and Mexican favorites.</p></div></article>
        <article class="fall26-partner-card" role="listitem"><div class="fall26-partner-copy"><span class="fall26-partner-type">FOOD VENDOR</span><h3>Hearth &amp; Honey</h3><p>Southern/Mediterranean-inspired comfort food and lemonade.</p></div></article>
        <article class="fall26-partner-card" role="listitem"><div class="fall26-partner-copy"><span class="fall26-partner-type">BEVERAGE VENDOR</span><h3>Pour The Fun</h3><p>Family-friendly specialty drinks.</p></div></article>
      </div>
    </div></section>

    <section class="section fall26-partners"><div class="container">
      <div class="fall26-section-head"><span>COMMUNITY-POWERED</span><h2>Thank you to our attraction sponsors.</h2><p>Community support is helping keep major family attractions available without an admission charge.</p></div>
      <div class="fall26-partner-grid">
        <article class="fall26-partner-card"><div class="fall26-partner-copy"><span class="fall26-partner-type">TRAIN + GIANT GAMES SPONSOR</span><h3>AiRCO Mechanical</h3><p>Supporting the trackless train, giant games, and bubble-machine experience.</p></div></article>
        <article class="fall26-partner-card"><div class="fall26-partner-copy"><span class="fall26-partner-type">INFLATABLE SPONSOR</span><h3>Shine Pediatric Dental Co.</h3><p>Supporting the Kids Rainbow Combo inflatable for Voigt families.</p></div></article>
        <article class="fall26-partner-card"><div class="fall26-partner-copy"><span class="fall26-partner-type">TEACHER TRUNK CANDY SUPPORT</span><h3>A+ Federal Credit Union</h3><p>Helping stock the teacher Trunk-or-Treat vehicles with candy.</p></div></article>
      </div>
    </div></section>

    <section class="section alt"><div class="container">
      <div class="fall26-section-head"><span>FAMILIES CAN HELP</span><h2>Two easy ways to pitch in.</h2></div>
      <div class="fall26-grid">
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🍭</div><span>CANDY DRIVE</span><h3>Donate candy through October 23</h3><p>Families may bring candy donations to the Voigt front office through the day of the Fall Festival.</p></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🙋</div><span>VOLUNTEER</span><h3>Help make festival night happen</h3><p>Choose a volunteer opportunity that fits your schedule.</p><div class="fall26-actions"><a class="btn primary" href="/volunteer">See volunteer opportunities</a></div></article>
      </div>
    </div></section>

    <section class="fall26-final"><div class="container"><span>FRIDAY · OCTOBER 23 · 5:30–7:30 PM</span><h2>Meet us at Voigt.</h2><p>Free admission. Family fun. One big fall night together.</p><div class="fall26-actions center"><a class="btn primary" href="/event.ics" download>Add to calendar</a><a class="btn secondary" href="/volunteer">Volunteer</a></div></div></section>`;
})();