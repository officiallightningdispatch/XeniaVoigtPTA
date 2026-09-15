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
      <aside class="hype-stage quick-desk reveal-now" aria-label="Quick access">
        <div class="stage-glow"></div>
        <div class="quick-desk-card">
          <span class="stage-tag">QUICK ACCESS</span>
          <h2>What do you need today?</h2>
          <p class="quick-desk-intro">The most-used Voigt and PTA links, all in one place.</p>
          <div class="quick-desk-links">
            <a href="/resources"><span>📚</span><div><b>Resource Hub</b><small>Parents, students, staff & community</small></div><i>→</i></a>
            <a href="/viking-quest"><span>🍂</span><div><b>Viking Quest</b><small>Oct. 23 · 5:30–7:30 PM</small></div><i>→</i></a>
            <a href="/volunteer"><span>🙋</span><div><b>Volunteer</b><small>Flexible ways to help</small></div><i>→</i></a>
            <a href="https://voigt.roundrockisd.org/staff" target="_blank" rel="noopener"><span>🏫</span><div><b>Voigt Staff Directory</b><small>Find a teacher or staff member</small></div><i>↗</i></a>
          </div>
          <div class="quick-desk-footer"><a href="/contact">Ask the PTA a question →</a></div>
        </div>
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
