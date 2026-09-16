(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');

  if(p==='/events'){
    const container=document.querySelector('main#main .section .container');
    if(container && !document.getElementById('loteriaEvent')){
      container.insertAdjacentHTML('afterbegin',`
        <article id="loteriaEvent" class="community-feature loteria-feature">
          <div class="community-date"><span>SEP</span><b>24</b></div>
          <div class="community-feature-copy">
            <span class="mini-label">NEXT UP · VOIGT ELEMENTARY</span>
            <h2>Open House + Lotería Night</h2>
            <p class="community-time">Thursday, September 24 · 5:30–7:00 PM</p>
            <p>Meet your child’s teachers, learn about this year’s learning experiences and curriculum, hear how Title I funds support student learning, enjoy Lotería, and connect with the Voigt community.</p>
            <div class="modern-chiprow"><span>All families welcome</span><span>5th Grade Arts Integration Performance</span><span>Lotería</span><span>Open House</span></div>
          </div>
        </article>
        <div class="community-section-label"><span>COMING NEXT</span></div>`);
      const oldNext=[...container.querySelectorAll('.mini-label')].find(x=>x.textContent.trim()==='NEXT UP');
      if(oldNext) oldNext.textContent='OCTOBER 23';
    }
  }

  const readingCard=`<article class="reading-rrock-card">
      <div class="reading-rrock-badge">READING IN THE RROCK</div>
      <div><span class="mini-label">RRISD LITERACY PARTNERSHIP</span><h2>Help a kindergartener become a confident reader.</h2>
      <p>Round Rock ISD is looking for caring volunteers to work consistently with Kindergarten students who need extra literacy support. Training, videos, tip sheets, and literacy materials are provided.</p>
      <div class="reading-facts"><span>✓ Consistent time slot</span><span>✓ Training provided</span><span>✓ Materials ready to use</span><span>✓ Volunteer application required</span></div>
      <p class="reading-deadline"><strong>Sign up by end of day Friday, September 18.</strong></p>
      <div class="buttons left"><a class="btn primary" href="https://forms.gle/iuwPz15siCLtbwsH6" target="_blank" rel="noopener">Volunteer interest survey ↗</a><a class="btn secondary" href="https://ess.roundrockisd.org/ess/EmploymentOpportunities/JobDetail.aspx?req=16250&sreq=2&form=VOLS&desc=2026-2027%20RRISD%20VOLUNTEER/MENTOR" target="_blank" rel="noopener">RRISD background check ↗</a><a class="btn secondary" href="https://docs.google.com/presentation/d/151OxF8YTtFmNHNkStuCPHOeWQwFWgTtiZFshH6UsGUE/edit?usp=sharing" target="_blank" rel="noopener">Program overview ↗</a></div>
      <p class="reading-contact">Questions: <a href="mailto:jill_gumbs@roundrockisd.org">Dr. Jill Gumbs</a> · Background-check help: <a href="mailto:karen_geissinger@roundrockisd.org">Karen Geissinger</a></p></div>
    </article>`;

  if(p==='/resources'){
    const spot=document.querySelector('.resource-spotlight');
    if(spot && !document.querySelector('.reading-rrrock-card')) spot.insertAdjacentHTML('afterend',readingCard.replace('reading-rrrock-card','reading-rrrock-card reading-on-resources'));
  }

  if(p==='/volunteer'){
    const section=document.querySelector('.vol-form-section .container');
    if(section && !document.querySelector('.reading-rrrock-card')) section.insertAdjacentHTML('beforebegin',`<div class="container reading-volunteer-wrap">${readingCard}</div>`);
  }

  if(p==='/'){
    const firstSection=document.querySelector('.join-now-band,.fun-strip,.bento-section');
    if(firstSection && !document.querySelector('.reading-home-alert')){
      firstSection.insertAdjacentHTML('beforebegin',`<section class="reading-home-alert"><div class="container"><div><span class="mini-label">VOLUNTEER DEADLINE · SEPT 18</span><h2>Reading in the RRock needs Kindergarten literacy partners.</h2></div><a class="btn primary" href="/resources#reading-in-the-rrock">Learn more →</a></div></section>`);
    }
  }
})();
