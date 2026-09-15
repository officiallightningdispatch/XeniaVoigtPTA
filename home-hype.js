(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/') return;
  const hero=document.querySelector('.premium-hero');
  if(!hero) return;
  hero.classList.add('hype-hero');
  hero.innerHTML=`
    <div class="hype-confetti" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="hype-orbit hype-orbit-one">★</div><div class="hype-orbit hype-orbit-two">✦</div><div class="hype-orbit hype-orbit-three">V</div>
    <div class="container hype-grid">
      <div class="hype-copy reveal-now">
        <div class="hype-kicker"><span class="live-dot"></span> YOU'RE INVITED IN</div>
        <h1>Your kid gets one childhood.<br><em>Let’s make school unforgettable.</em></h1>
        <p class="hype-lede">Join the Xenia Voigt PTA and help create the moments kids remember, teachers feel, and families actually want to show up for.</p>
        <div class="hype-proof"><span>✓ No volunteer quota</span><span>✓ No pressure</span><span>✓ Real impact</span></div>
        <div class="hype-actions">
          <a class="btn hype-primary" href="/join">I’m in — Join the PTA <b>→</b></a>
          <a class="btn hype-secondary" href="/events">Show me what’s happening</a>
        </div>
        <p class="hype-small">Parents · Caregivers · Teachers · Staff · Grandparents · Community supporters</p>
      </div>
      <aside class="hype-stage reveal-now" aria-label="What PTA makes possible">
        <div class="stage-glow"></div>
        <div class="stage-card stage-main">
          <span class="stage-tag">NEXT BIG MOMENT</span>
          <div class="stage-date">OCT <b>23</b></div>
          <h2>Viking Quest Fall Festival</h2>
          <p>Games. Arts. Food. Trunk-or-treat. Performances. Sensory-friendly retreat. One unforgettable Viking night.</p>
          <div class="stage-buttons"><a href="/viking-quest">Explore Viking Quest →</a><a href="/event.ics" download>Add to calendar</a></div>
        </div>
        <div class="stage-float float-one">🎨 <b>Arts + creativity</b></div>
        <div class="stage-float float-two">💛 <b>Teacher love</b></div>
        <div class="stage-float float-three">🎉 <b>Family moments</b></div>
      </aside>
    </div>
    <div class="hype-scroll">SCROLL FOR THE GOOD STUFF <span>↓</span></div>`;

  const strip=document.querySelector('.fun-strip');
  if(strip){
    strip.insertAdjacentHTML('beforebegin',`<section class="join-now-band reveal"><div class="container join-now-inner"><div><span class="mini-label">THE FASTEST WAY TO MAKE A DIFFERENCE</span><h2>Join once. Belong all year.</h2><p>Membership is support — not a promise to volunteer every week.</p></div><a href="/join" class="join-now-arrow" aria-label="Join the PTA">JOIN <span>→</span></a></div></section>`);
  }

  const concierge=document.querySelector('.hero-concierge');
  if(concierge) concierge.remove();

  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal,.bento-card,.fun-card,.pulse-card').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
})();
