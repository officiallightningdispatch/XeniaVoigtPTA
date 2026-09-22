// deployment refresh: fall festival public-copy cleanup
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
      <div class="fall26-grid fall26-adventure-grid">
        <article class="fall26-card hero-card"><div class="fall26-icon" aria-hidden="true">🏰</div><span>BOUNCE · CLIMB · RACE</span><h3>Inflatable Zone</h3><p>Big bounce energy and obstacle-course fun.</p></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🎃</div><span>PLAY TO WIN</span><h3>Fall Carnival</h3><p>Toss it. Bowl it. Hit the target. Try them all.</p></article>
        <article class="fall26-card quest-card"><div class="fall26-icon" aria-hidden="true">⚔️</div><span>YOUR ADVENTURE AWAITS</span><h3>Viking Quest</h3><p>Five challenges. One epic quest. Can you conquer them all?</p><div class="fall26-chips"><b>🎯 Trial of Skill</b><b>🛡️ Shield Wall</b><b>ᚱ Rune Maker</b><b>🚢 Longship Builders</b><b>🎤 Skald’s Stage</b></div></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🍔</div><span>COME HUNGRY</span><h3>Food Truck Row</h3><p>Pick your favorites, then come back for dessert.</p></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🍬</div><span>COSTUMES + CANDY</span><h3>Trunk-or-Treat</h3><p>Decorated trunks, sweet treats, and Halloween fun.</p></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🎨</div><span>MAKE SOMETHING AWESOME</span><h3>Art + Creativity</h3><p>Create, color, build, and leave your mark on festival night.</p></article>
        <article class="fall26-card stage-card"><div class="fall26-icon" aria-hidden="true">🎸</div><span>TURN IT UP</span><h3>Live Stage + DJ</h3><p>Student stars, live music, dancing, and festival energy.</p></article>
        <article class="fall26-card calm-card"><div class="fall26-icon" aria-hidden="true">✨</div><span>TAKE A BREATHER</span><h3>Sensory Retreat</h3><p>A quieter place to reset whenever you need it.</p></article>
      </div>
    </div></section>

    <section class="section fall26-partners" aria-labelledby="fall26-partners-title"><div class="container">
      <div class="fall26-section-head"><span>COMMUNITY-POWERED</span><h2 id="fall26-partners-title">Meet our community partners.</h2><p>From exciting silent-auction finds to delicious festival favorites, our community partners are helping make Viking Quest an unforgettable night!</p></div>
      <div class="fall26-partner-grid" role="list" aria-label="Confirmed Fall Festival community partners">
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://roundtherocktx.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Round the Rock">
            <img class="fall26-partner-logo" src="data:image/png;base64,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" alt="Round the Rock logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">COMMUNITY MEDIA PARTNER</span>
            <h3>Round the Rock</h3>
            <p>Connecting Round Rock families to Viking Quest through local event coverage, The Weekly Rock, and community social sharing.</p>
            <a class="fall26-partner-link" href="https://roundtherocktx.com/" target="_blank" rel="noopener noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://austinaquarium.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Austin Aquarium">
            <img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://austinaquarium.com&sz=256" alt="Austin Aquarium logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">SILENT AUCTION DONOR</span>
            <h3>Austin Aquarium</h3>
            <p>Make a splash in the silent auction! Bid on a family annual membership for up to five and enjoy an entire year of underwater adventures together.</p>
            <a class="fall26-partner-link" href="https://austinaquarium.com/" target="_blank" rel="noopener noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://austinzoo.org/" target="_blank" rel="noopener noreferrer" aria-label="Visit Austin Zoo">
            <img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://austinzoo.org&sz=256" alt="Austin Zoo logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">SILENT AUCTION DONOR</span>
            <h3>Austin Zoo</h3>
            <p>Go wild in the silent auction! Four Austin Zoo admission tickets could send your family on an unforgettable animal adventure.</p>
            <a class="fall26-partner-link" href="https://austinzoo.org/" target="_blank" rel="noopener noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://roundrockpumpkinfestival.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Round Rock Pumpkin Festival">
            <img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://roundrockpumpkinfestival.com&sz=256" alt="Round Rock Pumpkin Festival logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">SILENT AUCTION DONOR</span>
            <h3>Round Rock Pumpkin Festival</h3>
            <p>Gather your whole fall crew! A family pass for six—packed with pumpkin-season fun—will be waiting in the silent auction.</p>
            <a class="fall26-partner-link" href="https://roundrockpumpkinfestival.com/" target="_blank" rel="noopener noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://monsterminigolf.com/locations/us/tx/round-rock/" target="_blank" rel="noopener noreferrer" aria-label="Visit Monster Mini Golf & Laser Tag">
            <img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://monsterminigolf.com&sz=256" alt="Monster Mini Golf & Laser Tag logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">SILENT AUCTION DONOR</span>
            <h3>Monster Mini Golf &amp; Laser Tag</h3>
            <p>Glow, putt and play! Bid on a family four-pack of mini-golf passes for a bright, action-packed adventure beyond festival night.</p>
            <a class="fall26-partner-link" href="https://monsterminigolf.com/locations/us/tx/round-rock/" target="_blank" rel="noopener noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://www.cookiesandcrumblesbakeshop.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Cookies & Crumbles">
            <img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://www.cookiesandcrumblesbakeshop.com&sz=256" alt="Cookies & Crumbles logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">CAKE WALK SUPPORTER</span>
            <h3>Cookies &amp; Crumbles</h3>
            <p>Something sweet is joining the celebration! Watch for a Cookies &amp; Crumbles gift certificate at the festival—final fulfillment details are being wrapped up.</p>
            <a class="fall26-partner-link" href="https://www.cookiesandcrumblesbakeshop.com/" target="_blank" rel="noopener noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://www.fastsigns.com/round-rock-tx/" target="_blank" rel="noopener noreferrer" aria-label="Visit FASTSIGNS Round Rock">
            <img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://www.fastsigns.com&sz=256" alt="FASTSIGNS Round Rock logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">EVENT SIGNAGE PARTNER</span>
            <h3>FASTSIGNS Round Rock</h3>
            <p>Helping Viking Quest look festival-ready from the moment families arrive! FASTSIGNS is supporting our event printing and signage, with final display details being completed.</p>
            <a class="fall26-partner-link" href="https://www.fastsigns.com/round-rock-tx/" target="_blank" rel="noopener noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://www.kona-ice.com/local-site/kona-ice-of-greater-austin/" target="_blank" rel="noopener noreferrer" aria-label="Visit Kona Ice Greater Austin">
            <img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://www.kona-ice.com&sz=256" alt="Kona Ice Greater Austin logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">CONFIRMED FOOD VENDOR</span>
            <h3>Kona Ice Greater Austin</h3>
            <p>Cool down between quests with Kona Ice! Their colorful shaved-ice experience is rolling into Food Truck Row for a refreshing festival treat.</p>
            <a class="fall26-partner-link" href="https://www.kona-ice.com/local-site/kona-ice-of-greater-austin/" target="_blank" rel="noopener noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://www.facebook.com/p/KK-BBQ-Mexican-Food-100095578564767/" target="_blank" rel="noopener noreferrer" aria-label="Visit KK BBQ Mexican Food Truck">
            <img class="fall26-partner-logo" src="https://graph.facebook.com/100095578564767/picture?type=large" alt="KK BBQ Mexican Food Truck logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">CONFIRMED FOOD VENDOR</span>
            <h3>KK BBQ Mexican Food Truck</h3>
            <p>Follow the smoky, savory aromas to Food Truck Row! KK BBQ is bringing its Mexican-BBQ flavor to Viking Quest, with the final event menu coming soon.</p>
            <a class="fall26-partner-link" href="https://www.facebook.com/p/KK-BBQ-Mexican-Food-100095578564767/" target="_blank" rel="noopener noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://pourthefun.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Pour The Fun">
            <img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://pourthefun.com&sz=256" alt="Pour The Fun logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">CONFIRMED BEVERAGE VENDOR</span>
            <h3>Pour The Fun</h3>
            <p>Raise a cup to festival fun! Pour The Fun is bringing a family-friendly specialty beverage experience, with its Viking Quest offerings coming soon.</p>
            <a class="fall26-partner-link" href="https://pourthefun.com/" target="_blank" rel="noopener noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://www.bgcaustin.org/join-the-club/" target="_blank" rel="noopener noreferrer" aria-label="Visit Boys & Girls Club at Voigt">
            <img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://www.bgcaustin.org&sz=256" alt="Boys & Girls Club at Voigt logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">TRUNK-OR-TREAT HOST</span>
            <h3>Boys &amp; Girls Club at Voigt</h3>
            <p>The Boys &amp; Girls Club at Voigt is bringing even more community spirit to the night with its own family-friendly Trunk-or-Treat stop!</p>
            <a class="fall26-partner-link" href="https://www.bgcaustin.org/join-the-club/" target="_blank" rel="noopener noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
      </div>
    </div></section>

    <section class="fall26-final"><div class="container"><span>FRIDAY · OCTOBER 23 · 5:30–7:30 PM</span><h2>Meet us at Voigt.</h2><p>Games on. Music up. Trunks open. Food trucks rolling. Fall night handled.</p><div class="fall26-actions center"><a class="btn primary" href="/event.ics" download>Add to calendar</a><a class="btn secondary" href="/volunteer">Volunteer</a></div></div></section>`;
})();
