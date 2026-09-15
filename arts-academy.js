(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');

  // Viking Quest has its own home. Everywhere else, keep the site focused on the whole PTA.
  if(path!=='/viking-quest'){
    const announcement=document.querySelector('#announcement a');
    if(announcement){
      announcement.href='/resources';
      announcement.innerHTML='<span class="star">★</span> Xenia Voigt PTA · Resources, events, volunteering & ways to connect';
    }
    document.querySelector('.nav a[href="/viking-quest"]')?.classList.remove('featured');
  }

  if(path==='/viking-quest'){
    const main=document.querySelector('#main');
    if(!main) return;
    main.classList.add('viking-story-page');
    main.innerHTML=`
      <section class="vq-hero">
        <div class="vq-sky" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="container vq-hero-grid">
          <div class="vq-hero-copy">
            <span class="vq-kicker">ONE NIGHT. ONE SCHOOL. A WHOLE NEW WORLD.</span>
            <h1>Enter the<br><em>Viking Quest.</em></h1>
            <p class="vq-lede">On October 23, Xenia Voigt Arts Academy transforms into an evening of discovery — where Vikings can move, make, play, perform, explore, connect, and find a little magic around every corner.</p>
            <div class="vq-hero-actions">
              <a class="btn vq-gold" href="/event.ics" download>Add it to my calendar</a>
              <a class="btn vq-ghost" href="/volunteer">Help make the magic</a>
            </div>
            <div class="vq-date-line"><b>FRI · OCT 23</b><span>5:30–7:30 PM</span><span>Xenia Voigt Arts Academy</span></div>
          </div>
          <div class="vq-portal" aria-label="Viking Quest invitation">
            <div class="vq-portal-ring ring-one"></div><div class="vq-portal-ring ring-two"></div>
            <div class="vq-shield">V</div>
            <span>YOUR QUEST</span>
            <strong>BEGINS HERE</strong>
            <small>Adventure looks different for every Viking.</small>
          </div>
        </div>
        <div class="vq-wave" aria-hidden="true"></div>
      </section>

      <section class="vq-countdown-wrap">
        <div class="container">
          <div class="vq-countdown-card">
            <div><span class="mini-label">THE COUNTDOWN IS ON</span><h2>How long until the campus transforms?</h2></div>
            <div class="countdown compact vq-countdown" data-countdown>
              <div class="countbox"><b data-d>—</b><span>Days</span></div>
              <div class="countbox"><b data-h>—</b><span>Hours</span></div>
              <div class="countbox"><b data-m>—</b><span>Min</span></div>
              <div class="countbox"><b data-s>—</b><span>Sec</span></div>
            </div>
          </div>
        </div>
      </section>

      <section class="vq-story section">
        <div class="container">
          <div class="vq-story-head">
            <span class="eyebrow">THIS ISN’T JUST A FALL FESTIVAL</span>
            <h2>It’s the kind of school night kids talk about the next morning.</h2>
            <p>Viking Quest is designed to feel less like walking through a list of activities and more like stepping into an experience. Families choose their own path, discover what catches their eye, stay where they’re having fun, and make the night their own.</p>
          </div>
          <div class="vq-word-wall" aria-label="Viking Quest experiences">
            <span class="word-move">MOVE</span><span class="word-make">MAKE</span><span class="word-play">PLAY</span><span class="word-perform">PERFORM</span><span class="word-connect">CONNECT</span><span class="word-reset">RESET</span>
          </div>
        </div>
      </section>

      <section class="vq-imagine section">
        <div class="container">
          <div class="section-head"><div class="eyebrow">PICTURE THIS</div><h2>You arrive… and Voigt feels completely different.</h2></div>
          <div class="vq-moments">
            <article class="vq-moment moment-one"><span>01</span><h3>Something catches your eye.</h3><p>Music, movement, color, laughter, creativity — the campus feels alive before you even decide where to go first.</p></article>
            <article class="vq-moment moment-two"><span>02</span><h3>Your Viking chooses the adventure.</h3><p>Maybe they race toward a challenge. Maybe they make something. Maybe they stop to watch a performance. There is no “right” path through the night.</p></article>
            <article class="vq-moment moment-three"><span>03</span><h3>You find your people.</h3><p>Friends run into friends. Teachers see families outside the classroom. Neighbors connect. The school becomes a community space, not just a building.</p></article>
            <article class="vq-moment moment-four"><span>04</span><h3>And if the energy gets big…</h3><p>There will be room to reset, breathe, and rejoin when ready. A memorable night should make space for every kind of Viking.</p></article>
          </div>
        </div>
      </section>

      <section class="vq-heart section">
        <div class="container vq-heart-grid">
          <div>
            <span class="eyebrow">THE HEART OF THE QUEST</span>
            <h2>Big energy.<br>Small moments.<br><em>Everybody belongs.</em></h2>
          </div>
          <div class="vq-heart-copy">
            <p>The best part of Viking Quest isn’t one ride, one game, one performance, or one activity. It’s the feeling of watching the entire Voigt community show up for one another.</p>
            <p>We’re building an experience with high-energy fun, hands-on creativity, student expression, family connection, and a sensory-friendly place to step away when needed.</p>
            <div class="vq-beliefs"><span>✦ Come as you are</span><span>✦ Explore at your pace</span><span>✦ Every Viking belongs</span></div>
          </div>
        </div>
      </section>

      <section class="vq-tease section">
        <div class="container">
          <div class="vq-tease-card">
            <span class="mini-label">A LITTLE MYSTERY IS PART OF THE FUN</span>
            <h2>We’re keeping some surprises under the shield.</h2>
            <p>Expect a mix of adventure, games, creativity, fall fun, food, performances and unexpected moments throughout the campus. We’ll share important family details as the night gets closer — without spoiling the experience.</p>
            <div class="vq-tease-tags"><span>Adventure</span><span>Creativity</span><span>Games</span><span>Performances</span><span>Fall fun</span><span>Community</span><span>Sensory-friendly space</span></div>
          </div>
        </div>
      </section>

      <section class="vq-details section">
        <div class="container">
          <div class="vq-details-card">
            <div class="vq-detail-date"><span>OCT</span><b>23</b></div>
            <div><span class="mini-label">SAVE THE NIGHT</span><h2>Viking Quest Fall Festival</h2><p>Friday, October 23, 2026 · 5:30–7:30 PM<br>Xenia Voigt Arts Academy · 1201 Cushing Dr, Round Rock, TX</p><p class="vq-admission">Admission and children’s activities are planned to be free.</p></div>
            <div class="vq-detail-actions"><a class="btn primary" href="/event.ics" download>Add to calendar</a><a class="btn outline" href="/volunteer">Volunteer</a></div>
          </div>
        </div>
      </section>`;
  }

  if(path==='/'){
    const stage=document.querySelector('.hype-stage');
    if(stage && !stage.querySelector('.arts-stamp')){
      stage.insertAdjacentHTML('afterbegin','<div class="arts-stamp" aria-hidden="true">CREATE • CONNECT • CELEBRATE</div>');
    }
  }
})();
