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
        <article class="fall26-card quest-card"><div class="fall26-icon" aria-hidden="true">⚔️</div><span>YOUR ADVENTURE AWAITS</span><h3>Viking Quest</h3><p>Five fall challenges. One Viking Quest. Complete them all to become an official Voigt Viking.</p><div class="fall26-chips"><b>🎃 Test Your Viking Strength · Pumpkin Bowling</b><b>🍎 Gather the Viking Harvest · Apple Scoop</b><b>🍂 Brave the Harvest Mystery · Fall Sensory</b><b>🎨 Create the Viking Banner · Autumn Mural</b><b>🌳 Build the Viking Village · Gratitude Tree</b></div><p><strong>Apple Scoop ready:</strong> all 80 apples are covered for festival night.</p></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🍔</div><span>COME HUNGRY</span><h3>Food Truck Row</h3><p>Pick your favorites, then come back for dessert.</p></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🍬</div><span>COSTUMES + CANDY</span><h3>Trunk-or-Treat</h3><p>Decorated trunks, sweet treats, and Halloween fun.</p></article>
        <article class="fall26-card"><div class="fall26-icon" aria-hidden="true">🎨</div><span>MAKE SOMETHING AWESOME</span><h3>Art + Creativity</h3><p>Create, color, build, and leave your mark on festival night.</p></article>
        <article class="fall26-card stage-card"><div class="fall26-icon" aria-hidden="true">🎸</div><span>TURN IT UP</span><h3>Live Stage + DJ</h3><p>Student stars, live music, dancing, and festival energy.</p></article>
        <article class="fall26-card calm-card"><div class="fall26-icon" aria-hidden="true">✨</div><span>TAKE A BREATHER</span><h3>Sensory Retreat</h3><p>A quieter place to reset whenever you need it.</p></article>
      </div>
    </div></section>

    <section class="section fall26-vendors-live" aria-labelledby="fall26-vendors-title"><div class="container">
      <div class="fall26-section-head"><span>FOOD TRUCK ROW</span><h2 id="fall26-vendors-title">Meet the confirmed food lineup.</h2><p>Six vendors are currently confirmed for October 23. Menus may be refined as festival night gets closer.</p></div>
      <div class="fall26-partner-grid" role="list" aria-label="Confirmed Fall Festival food vendors">
        <article class="fall26-partner-card" role="listitem"><div class="fall26-partner-logo-wrap"><span style="font-size:32px;font-weight:900" aria-hidden="true">C</span></div><div class="fall26-partner-copy"><span class="fall26-partner-type">CONFIRMED FOOD & DESSERT VENDOR</span><h3>Coco's Eats &amp; Sweets</h3><p>Shaved ice, chamoy pickles, nachos and water.</p></div></article>
        <article class="fall26-partner-card" role="listitem"><a class="fall26-partner-logo-wrap" href="https://www.hearthandhoneyatx.com/order" target="_blank" rel="noopener noreferrer"><img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://www.hearthandhoneyatx.com&sz=256" alt="" loading="lazy" decoding="async"></a><div class="fall26-partner-copy"><span class="fall26-partner-type">CONFIRMED FOOD VENDOR</span><h3>Hearth &amp; Honey</h3><p>Honeyfire chicken bowls, Mediterranean turkey meatball bowls, a vegan Garden of Gold bowl, and honey-mint-lavender lemonade.</p><a class="fall26-partner-link" href="https://www.hearthandhoneyatx.com/order" target="_blank" rel="noopener noreferrer">Visit vendor <span aria-hidden="true">→</span></a></div></article>
        <article class="fall26-partner-card" role="listitem"><a class="fall26-partner-logo-wrap" href="http://kkbbqmexicanfoodroundrock.com/" target="_blank" rel="noopener noreferrer"><img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=http://kkbbqmexicanfoodroundrock.com&sz=256" alt="" loading="lazy" decoding="async"></a><div class="fall26-partner-copy"><span class="fall26-partner-type">CONFIRMED FOOD VENDOR</span><h3>K&amp;K BBQ Mexican Food</h3><p>BBQ and Mexican favorites for Food Truck Row.</p><a class="fall26-partner-link" href="http://kkbbqmexicanfoodroundrock.com/" target="_blank" rel="noopener noreferrer">Visit vendor <span aria-hidden="true">→</span></a></div></article>
        <article class="fall26-partner-card" role="listitem"><a class="fall26-partner-logo-wrap" href="https://www.kona-ice.com/local-site/kona-ice-of-greater-austin/" target="_blank" rel="noopener noreferrer"><img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://www.kona-ice.com&sz=256" alt="" loading="lazy" decoding="async"></a><div class="fall26-partner-copy"><span class="fall26-partner-type">CONFIRMED DESSERT VENDOR</span><h3>Kona Ice Greater Austin</h3><p>Shaved ice and toppings.</p><a class="fall26-partner-link" href="https://www.kona-ice.com/local-site/kona-ice-of-greater-austin/" target="_blank" rel="noopener noreferrer">Visit vendor <span aria-hidden="true">→</span></a></div></article>
        <article class="fall26-partner-card" role="listitem"><a class="fall26-partner-logo-wrap" href="https://pourthefun.com/" target="_blank" rel="noopener noreferrer"><img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://pourthefun.com&sz=256" alt="" loading="lazy" decoding="async"></a><div class="fall26-partner-copy"><span class="fall26-partner-type">CONFIRMED BEVERAGE + FOOD VENDOR</span><h3>Pour The Fun</h3><p>Non-alcoholic Halloween drinks and street corn.</p><a class="fall26-partner-link" href="https://pourthefun.com/" target="_blank" rel="noopener noreferrer">Visit vendor <span aria-hidden="true">→</span></a></div></article>
        <article class="fall26-partner-card" role="listitem"><a class="fall26-partner-logo-wrap" href="https://rockngrillusa.com/" target="_blank" rel="noopener noreferrer"><img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://rockngrillusa.com&sz=256" alt="" loading="lazy" decoding="async"></a><div class="fall26-partner-copy"><span class="fall26-partner-type">CONFIRMED FOOD VENDOR</span><h3>Roxk N Grill</h3><p>Indian snacks, food and drinks including samosas, veg lollipops, mango lassi and masala tea.</p><a class="fall26-partner-link" href="https://rockngrillusa.com/" target="_blank" rel="noopener noreferrer">Visit vendor <span aria-hidden="true">→</span></a></div></article>
      </div>
      <div class="fall26-actions center" style="margin-top:22px"><a class="btn secondary" href="/vendors">View vendor page / apply →</a></div>
    </div></section>

    <section class="section fall26-partners" aria-labelledby="fall26-partners-title"><div class="container">
      <div class="fall26-section-head"><span>COMMUNITY-POWERED</span><h2 id="fall26-partners-title">Meet our community partners.</h2><p>From exciting silent-auction finds to delicious festival favorites, our community partners are helping make Viking Quest an unforgettable night!</p></div>
      <div class="fall26-partner-grid" role="list" aria-label="Confirmed Fall Festival community partners">
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://roundtherocktx.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Round the Rock">
            <img class="fall26-partner-logo" src="/round-the-rock-logo.png" alt="Round the Rock logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">COMMUNITY MEDIA PARTNER</span>
            <h3>Round the Rock</h3>
            <p>Connecting Round Rock families to Viking Quest through local event coverage, The Weekly Rock, and community social sharing.</p>
            <a class="fall26-partner-link" href="https://roundtherocktx.com/" target="_blank" rel="noopener noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <article class="fall26-partner-card" role="listitem">
          <a class="fall26-partner-logo-wrap" href="https://aircomechanical.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit AiRCO Mechanical">
            <img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://aircomechanical.com&sz=256" alt="AiRCO Mechanical logo" loading="eager" decoding="async">
          </a>
          <div class="fall26-partner-copy">
            <span class="fall26-partner-type">TRACKLESS TRAIN SPONSOR</span>
            <h3>AiRCO Mechanical</h3>
            <p>All aboard! AiRCO Mechanical has pledged $1,095 to fully sponsor the Viking Quest trackless train for festival night.</p>
            <a class="fall26-partner-link" href="https://aircomechanical.com/" target="_blank" rel="noopener noreferrer">Visit sponsor <span aria-hidden="true">→</span></a>
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
