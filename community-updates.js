(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');

  const readingCard=`<article id="reading-in-the-rrock" class="reading-rrock-card">
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
    if(spot && !document.querySelector('.reading-rrock-card')) spot.insertAdjacentHTML('afterend',readingCard.replace('reading-rrock-card','reading-rrock-card reading-on-resources'));
  }

  if(p==='/volunteer'){
    const section=document.querySelector('.vol-form-section .container');
    if(section && !document.querySelector('.reading-rrock-card')) section.insertAdjacentHTML('beforebegin',`<div class="container reading-volunteer-wrap">${readingCard}</div>`);
  }

  if(p==='/'){
    const firstSection=document.querySelector('.join-now-band,.fun-strip,.bento-section');
    if(firstSection && !document.querySelector('.reading-home-alert')){
      firstSection.insertAdjacentHTML('beforebegin',`<section class="reading-home-alert"><div class="container"><div><span class="mini-label">VOLUNTEER DEADLINE · SEPT 18</span><h2>Reading in the RRock needs Kindergarten literacy partners.</h2></div><a class="btn primary" href="/resources#reading-in-the-rrock">Learn more →</a></div></section>`);
    }
  }
})();
