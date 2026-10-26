(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/') return;
  const hero=document.querySelector('.premium-hero');
  if(!hero) return;
  hero.classList.add('hype-hero');
  hero.innerHTML=`
    
    
    <div class="container hype-grid">
      <div class="hype-copy reveal-now">
        <div class="hype-kicker"><span class="live-dot"></span> ARTS INTEGRATION · COMMUNITY · EXCELLENCE</div>
        <h1>A place to create.<br><em>A community to belong.</em></h1>
        <p class="hype-lede">The Xenia Voigt PTA champions imagination, exceptional learning experiences, and meaningful partnerships between families, educators, and our community.</p>
        <div class="hype-proof"><span>✓ Arts-integrated learning</span><span>✓ Every Viking belongs</span><span>✓ Stronger together</span></div>
        <div class="hype-actions">
          <a class="btn hype-primary" href="/join">Join the PTA <b>→</b></a>
          <a class="btn hype-secondary" href="/events">View the school calendar</a>
        </div>
        <p class="hype-small">Parents · Caregivers · Teachers · Staff · Grandparents · Community supporters</p>
      </div>
      <aside class="hype-stage reveal-now" aria-label="Explore Voigt PTA">
        <div class="academy-directory">
          <p class="academy-directory-kicker">EXPLORE OUR COMMUNITY</p>
          <h2>Discover what makes<br><em>Voigt extraordinary.</em></h2>
          <p class="academy-directory-intro">Arts integration. Family partnership. A school community with room for every voice.</p>
          <div class="academy-directory-links">
            <a href="/events"><span class="academy-directory-num">01</span><span><strong>School & PTA Calendar</strong><small>Important dates and community experiences</small></span><span aria-hidden="true">↗</span></a>
            <a href="/resources"><span class="academy-directory-num">02</span><span><strong>Family Resources</strong><small>Everything you need in one place</small></span><span aria-hidden="true">↗</span></a>
            <a href="/volunteer"><span class="academy-directory-num">03</span><span><strong>Get Involved</strong><small>Share your time, talent, or ideas</small></span><span aria-hidden="true">↗</span></a>
            <a href="/events#pta-photo-memories"><span class="academy-directory-num">04</span><span><strong>Our Community Stories</strong><small>Festival memories and event galleries</small></span><span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </aside>
    </div>
    <div class="hype-scroll">EXPLORE THE VOIGT COMMUNITY <span>↓</span></div>`;

  const strip=document.querySelector('.fun-strip');
  if(strip){
    strip.insertAdjacentHTML('beforebegin',`<section class="join-now-band reveal"><div class="container join-now-inner"><div><span class="mini-label">THE FASTEST WAY TO MAKE A DIFFERENCE</span><h2>Join once. Belong all year.</h2><p>Membership is support — not a promise to volunteer every week.</p></div><a href="/join" class="join-now-arrow" aria-label="Join the PTA">JOIN <span>→</span></a></div></section>`);
  }

  const concierge=document.querySelector('.hero-concierge');
  if(concierge) concierge.remove();

  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal,.bento-card,.fun-card,.pulse-card').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
})();
