(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');



  const passCard=`<article id="pass-literacy-support" class="reading-rrock-card">
      <div class="reading-rrock-badge">TEXAS EDUCATION AGENCY · PASS</div>
      <div><span class="mini-label">FAMILY LITERACY SUPPORT</span><h2>Eligible families can receive a $400 literacy tutoring account.</h2>
      <p>The Texas Education Agency's Parent Access to Supplemental Supports (PASS) program is now accepting applications. Eligible students must be currently enrolled in a Texas public school and have scored <strong>Did Not Meet Grade Level</strong> in reading on the Grade 3 state assessment.</p>
      <div class="reading-facts"><span>✓ $400 tutoring account</span><span>✓ Approved in-person or virtual tutors</span><span>✓ Parent-selected literacy support</span><span>✓ Application now open</span></div>
      <div class="buttons left"><a class="btn primary" href="https://pass.tea.texas.gov/" target="_blank" rel="noopener">Learn more & apply through TEA ↗</a></div>
      <p class="reading-contact">This information is shared as a family resource. Eligibility and approval are determined by the Texas Education Agency.</p></div>
    </article>`;

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
    if(spot){
      if(!document.querySelector('#pass-literacy-support')) spot.insertAdjacentHTML('afterend',passCard.replace('reading-rrock-card','reading-rrock-card reading-on-resources'));
      if(!document.querySelector('#reading-in-the-rrock')) document.querySelector('#pass-literacy-support')?.insertAdjacentHTML('afterend',readingCard.replace('reading-rrock-card','reading-rrock-card reading-on-resources'));
    }
  }

  if(p==='/volunteer'){
    const section=document.querySelector('.vol-form-section .container');
    if(section && !document.querySelector('.reading-rrock-card')) section.insertAdjacentHTML('beforebegin',`<div class="container reading-volunteer-wrap">${readingCard}</div>`);
  }

  if(p==='/'){
    const firstSection=document.querySelector('.join-now-band,.fun-strip,.bento-section');
    if(firstSection && !document.querySelector('.pass-home-alert')){
      firstSection.insertAdjacentHTML('beforebegin',`<section class="reading-home-alert pass-home-alert"><div class="container"><div><span class="mini-label">NEW FAMILY RESOURCE · TEA PASS</span><h2>$400 literacy tutoring accounts are available for eligible Grade 3 readers.</h2></div><a class="btn primary" href="/resources#pass-literacy-support">Learn more →</a></div></section>`);
    }
  }
})();
