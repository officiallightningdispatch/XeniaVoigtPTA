(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/volunteer') return;
  const main=document.querySelector('main#main');
  if(!main) return;

  const params=new URLSearchParams(location.search);
  const presetEvent=params.get('event')||'';
  main.innerHTML=`
    <section class="vol-hero">
      <div class="vol-blob b1"></div><div class="vol-blob b2"></div><div class="vol-mark m1">✦</div><div class="vol-mark m2">＋</div>
      <div class="container vol-hero-inner">
        <span class="vol-kicker">VOLUNTEER WITH VOIGT</span>
        <h1>Bring what you’ve got.<br><em>We’ll find where it fits.</em></h1>
        <p>One reusable volunteer form for every PTA event, project, and “we could really use an extra pair of hands” moment.</p>
        <div class="vol-pills"><span>No long-term commitment required</span><span>Choose your comfort zone</span><span>One-time + recurring options</span></div>
      </div>
    </section>

    <section class="section" id="current-volunteer-opportunities">
      <div class="container">
        <div class="section-head compact-head"><div class="eyebrow">CURRENT + ONGOING OPPORTUNITIES</div><h2>Want something specific? Start here.</h2><p>These opportunities come directly from current PTA and Round Rock ISD volunteer information.</p></div>
        <div class="grid three">
          <article class="modern-panel accent">
            <span class="mini-label">SEPTEMBER 24</span>
            <h3>Lotería Night</h3>
            <p>Help with concession stand, setup, cleanup, or another event-night role.</p>
            <a class="btn secondary" href="https://www.signupgenius.com/go/70A094AA5A622ABFA7-65971430-voigt" target="_blank" rel="noopener noreferrer">View open Lotería slots ↗</a>
          </article>
          <article class="modern-panel">
            <span class="mini-label">ONGOING · ON CAMPUS</span>
            <h3>Voigt Clothes Closet</h3>
            <p>Help the RRISD Council of PTAs provide gently used clothing plus new socks and underwear to district students in need.</p>
            <p><strong>Voigt hours:</strong> Wednesdays & Thursdays, 9:30–11:30 AM; first Saturday of each month, 10 AM–noon.</p>
            <div class="buttons left"><a class="btn secondary" href="https://evite.me/GdJucNqSxR" target="_blank" rel="noopener noreferrer">Volunteer ↗</a><a class="btn secondary" href="https://a.co/0gS8aMWI" target="_blank" rel="noopener noreferrer">Wishlist ↗</a></div>
          </article>
          <article class="modern-panel">
            <span class="mini-label">ONGOING · LITERACY</span>
            <h3>Reading in the RRock</h3>
            <p>Work with kindergarten students who need extra literacy practice. Volunteers commit to a consistent time, complete the RRISD volunteer application, receive training, and use provided materials.</p>
            <a class="btn secondary" href="https://docs.google.com/forms/d/e/1FAIpQLSfB1DK1VE39jXMiIMrnHmOrdWqqa9tIyzu2FwclmTqbcKnc6Q/viewform" target="_blank" rel="noopener noreferrer">Volunteer interest form ↗</a>
          </article>
          <article class="modern-panel">
            <span class="mini-label">ONGOING · TEACHER SUPPORT</span>
            <h3>Help teachers behind the scenes</h3>
            <p>Support practical campus needs such as copying, laminating, stapling, cutting, and similar preparation tasks.</p>
            <a class="btn secondary" href="#volunteerForm">Tell us your availability ↓</a>
          </article>
          <article class="modern-panel">
            <span class="mini-label">OCTOBER 23</span>
            <h3>Viking Quest Fall Festival</h3>
            <p>Setup, check-in, activity stations, Trunk-or-Treat, sensory support, cleanup, and more.</p>
            <a class="btn secondary" href="#volunteerForm">Volunteer for Viking Quest ↓</a>
          </article>
          <article class="modern-panel">
            <span class="mini-label">NOVEMBER 2</span>
            <h3>Fun Run</h3>
            <p>Pre-event planning and materials plus event-day setup, cleanup, and cheering support.</p>
            <a class="btn secondary" href="#volunteerForm">Volunteer for Fun Run ↓</a>
          </article>
        </div>
      </div>
    </section>

    <section class="vol-form-section">
      <div class="container vol-layout">
        <aside class="vol-sidebar">
          <span class="vol-mini">HOW IT WORKS</span>
          <h2>Tell us what works for you.</h2>
          <div class="vol-side-step"><b>01</b><p>Share your contact info and connection to Voigt.</p></div>
          <div class="vol-side-step"><b>02</b><p>Pick the event, roles, skills, and times that fit.</p></div>
          <div class="vol-side-step"><b>03</b><p>We match you with the right opportunity.</p></div>
          <div class="vol-sidebar-note">You can submit this form for a specific event or choose <strong>Any PTA event / general availability</strong> and we’ll keep your preferences in mind.</div>
        </aside>

        <form id="volunteerForm" class="vol-form vol-wizard" novalidate>
          <div class="vol-form-head"><span>VOLUNTEER PROFILE</span><h2>Let’s find your perfect fit.</h2><p>One quick section at a time. Fields marked * are required.</p></div>

          <div class="vol-wizard-progress" aria-label="Form progress">
            <div class="vol-progress-top"><span id="volStepLabel">Step 1 of 6</span><span id="volPercent">17%</span></div>
            <div class="vol-progress-track"><span id="volProgressBar"></span></div>
            <div class="vol-step-dots" id="volStepDots" aria-hidden="true"></div>
          </div>

          <fieldset data-step-title="About you">
            <legend><span>1</span> About you</legend>
            <p class="step-intro">First, tell us who you are and the easiest way to reach you.</p>
            <div class="vol-grid two">
              <label>First name *<input name="firstName" autocomplete="given-name" required></label>
              <label>Last name *<input name="lastName" autocomplete="family-name" required></label>
              <label>Email *<input name="email" type="email" autocomplete="email" required></label>
              <label>Mobile phone<input name="phone" type="tel" autocomplete="tel" inputmode="tel"></label>
            </div>
            <div class="vol-grid two">
              <label>Your connection to Voigt *<select name="relationship" required><option value="">Select one</option><option>Parent / caregiver</option><option>Grandparent / family member</option><option>Teacher / staff</option><option>PTA member</option><option>PTA leadership / committee lead</option><option>Community supporter</option><option>Student volunteer</option><option>Other</option></select></label>
              <label>Preferred contact method *<select name="contactMethod" required><option value="">Select one</option><option>Email</option><option>Text message</option><option>Phone call</option></select></label>
            </div>
          </fieldset>

          <fieldset data-step-title="Your event">
            <legend><span>2</span> What are you volunteering for?</legend>
            <p class="step-intro">Choose one event or tell us you’re open to being matched anywhere.</p>
            <div class="vol-grid two">
              <label>Event / project *<select name="event" id="volEvent" required><option value="">Select one</option><option>Any PTA event / general availability</option><option>Viking Quest Fall Festival — October 23, 2026</option><option>Teacher & staff appreciation</option><option>Family event / school activity</option><option>Fundraising / sponsorship support</option><option>PTA operations / behind-the-scenes help</option><option>Other event / project</option></select></label>
              <label>Other event / project<input name="otherEvent" placeholder="Optional"></label>
            </div>
            <div class="field-label">What would you enjoy helping with? <span>Select all that apply.</span></div>
            <div class="choice-grid roles">
              ${['Setup / decorating','Welcome / check-in','Games / activity stations','Arts / creative activities','Food court / concessions support','Sensory-friendly space support','Performances / stage support','Trunk-or-treat support','Silent auction / fundraising','Vendor / sponsor support','Photography / event memories','Cleanup / breakdown','Planning / project management','Administrative / remote help','Wherever I’m needed'].map(x=>`<label class="choice"><input type="checkbox" name="roles" value="${x}"><span>${x}</span></label>`).join('')}
            </div>
          </fieldset>

          <fieldset data-step-title="Availability">
            <legend><span>3</span> Your availability</legend>
            <p class="step-intro">No guilt, no pressure — just tell us what actually works for your schedule.</p>
            <div class="field-label">When are you usually available? <span>Select all that apply.</span></div>
            <div class="choice-grid compact">
              ${['Weekday mornings','School-day hours','Weekday afternoons','Weekday evenings','Saturday','Sunday','Event day only','Flexible / varies'].map(x=>`<label class="choice"><input type="checkbox" name="availability" value="${x}"><span>${x}</span></label>`).join('')}
            </div>
            <div class="vol-grid two">
              <label>Time commitment preference<select name="commitment"><option>One-time / event only</option><option>30–60 minutes</option><option>1–2 hours</option><option>3+ hours</option><option>Recurring opportunities</option><option>Flexible</option></select></label>
              <label>Specific date/time notes<input name="availabilityNotes" placeholder="Example: available after 5:30 PM"></label>
            </div>
          </fieldset>

          <fieldset data-step-title="Your strengths">
            <legend><span>4</span> Skills, interests & comfort</legend>
            <p class="step-intro">Pick what sounds fun, familiar, or comfortable. You do not need special experience.</p>
            <div class="choice-grid compact">
              ${['Arts / crafts','Working with children','Customer service / welcoming','Food service','Event planning','Decor / design','Music / performance','Photography / media','Technology','Organization / admin','Fundraising / outreach','Bilingual / translation','Heavy lifting / setup','Quiet / low-stimulation roles'].map(x=>`<label class="choice"><input type="checkbox" name="skills" value="${x}"><span>${x}</span></label>`).join('')}
            </div>
            <label class="full-label">Anything else you’re great at or genuinely enjoy doing?<textarea name="skillsNotes" rows="3" placeholder="Tell us what you’d love to contribute."></textarea></label>
            <label class="full-label">Anything that would help us make volunteering more comfortable or accessible for you?<textarea name="comfortNotes" rows="3" placeholder="Optional — no medical details needed."></textarea></label>
          </fieldset>

          <fieldset data-step-title="Student details">
            <legend><span>5</span> Student volunteer details</legend>
            <p class="fieldset-note">Complete only if this submission is for a student volunteer. Otherwise, simply continue.</p>
            <div class="vol-grid two">
              <label>Student grade level<select name="studentGrade"><option value="">Not applicable</option><option>Middle school</option><option>9th grade</option><option>10th grade</option><option>11th grade</option><option>12th grade</option><option>College / other</option></select></label>
              <label>School / organization<input name="studentOrg" placeholder="Optional"></label>
            </div>
            <label class="choice consent-choice"><input type="checkbox" name="studentSupervision" value="Yes"><span>I understand student volunteer roles may require school approval and/or adult supervision.</span></label>
          </fieldset>

          <fieldset data-step-title="Review & finish">
            <legend><span>6</span> Final notes</legend>
            <p class="step-intro">Last step. Add anything else you want us to know, then send it over.</p>
            <label class="full-label">Anything else we should know?<textarea name="notes" rows="4" placeholder="Questions, preferences, ideas, or anything that helps us match you well."></textarea></label>
            <label class="choice consent-choice"><input type="checkbox" name="consent" required><span>I agree that the PTA may contact me about volunteer opportunities based on the information I provided. *</span></label>
            <div class="vol-review" id="volReview"></div>
          </fieldset>

          <div class="vol-wizard-actions">
            <button type="button" class="vol-back" id="volBack">← Back</button>
            <div class="vol-wizard-right">
              <button type="button" class="vol-save" id="saveVolunteerDraft">Save draft</button>
              <button type="button" class="vol-next" id="volNext">Continue <span>→</span></button>
              <button type="submit" class="vol-submit" id="volSubmit">Send volunteer interest <span>→</span></button>
            </div>
          </div>
          <p class="vol-autosave-note">Your progress is saved automatically on this device as you go.</p>
          <p class="vol-submit-note" id="volSubmitNote">Submitting opens a pre-addressed email to <strong>info@xeniavoigtpta.org</strong> with your responses. A direct secure submission system can be connected later without redesigning this form.</p>
          <div id="volStatus" class="vol-status" role="status" aria-live="polite"></div>
        </form>
      </div>
    </section>`;

  const form=document.getElementById('volunteerForm');
  const eventSelect=document.getElementById('volEvent');
  const fieldsets=[...form.querySelectorAll('fieldset')];
  const nextBtn=document.getElementById('volNext');
  const backBtn=document.getElementById('volBack');
  const submitBtn=document.getElementById('volSubmit');
  const saveBtn=document.getElementById('saveVolunteerDraft');
  const stepLabel=document.getElementById('volStepLabel');
  const percent=document.getElementById('volPercent');
  const progressBar=document.getElementById('volProgressBar');
  const dots=document.getElementById('volStepDots');
  const review=document.getElementById('volReview');
  const submitNote=document.getElementById('volSubmitNote');
  let step=0;

  dots.innerHTML=fieldsets.map((f,i)=>`<span data-step-dot="${i}" title="${f.dataset.stepTitle}"></span>`).join('');

  if(presetEvent){const match=[...eventSelect.options].find(o=>o.textContent.toLowerCase().includes(presetEvent.toLowerCase()));if(match) eventSelect.value=match.value;else {eventSelect.value='Other event / project';form.elements.otherEvent.value=presetEvent;}}

  const key='voigt-volunteer-draft-v1';
  function values(){const fd=new FormData(form),obj={};for(const [k,v] of fd.entries()){if(obj[k])obj[k]=Array.isArray(obj[k])?[...obj[k],v]:[obj[k],v];else obj[k]=v;}return obj;}
  function saveDraft(showMessage=false){localStorage.setItem(key,JSON.stringify(values()));if(showMessage){const s=document.getElementById('volStatus');s.textContent='Draft saved on this device ✓';setTimeout(()=>s.textContent='',2200);}}
  try{const draft=JSON.parse(localStorage.getItem(key)||'null');if(draft){Object.entries(draft).forEach(([name,val])=>{const els=form.elements[name];if(!els)return;if(els instanceof RadioNodeList){[...els].forEach(el=>{if(el.type==='checkbox')el.checked=(val||[]).includes(el.value);});}else if(els.type==='checkbox'){els.checked=!!val;}else{els.value=val??'';}})}}catch{}

  function validateStep(index){
    const controls=[...fieldsets[index].querySelectorAll('input,select,textarea')].filter(el=>!el.disabled);
    for(const el of controls){if(!el.checkValidity()){el.reportValidity();el.focus({preventScroll:true});el.scrollIntoView({behavior:'smooth',block:'center'});return false;}}
    return true;
  }
  function list(x){return Array.isArray(x)?x.join(', '):(x||'None selected');}
  function buildReview(){
    const v=values();
    review.innerHTML=`<div class="vol-review-head"><span>QUICK REVIEW</span><b>Looks good?</b></div><div class="vol-review-grid">
      <div><small>Volunteer</small><strong>${v.firstName||'—'} ${v.lastName||''}</strong><span>${v.relationship||'—'}</span></div>
      <div><small>Event / project</small><strong>${v.event||'—'}</strong><span>${v.otherEvent||''}</span></div>
      <div><small>Preferred roles</small><strong>${list(v.roles)}</strong></div>
      <div><small>Availability</small><strong>${list(v.availability)}</strong><span>${v.commitment||''}</span></div>
    </div>`;
  }
  function renderStep(direction=1){
    fieldsets.forEach((fs,i)=>{fs.hidden=i!==step;fs.classList.remove('step-enter-forward','step-enter-back');if(i===step){requestAnimationFrame(()=>fs.classList.add(direction>=0?'step-enter-forward':'step-enter-back'));}});
    const done=Math.round(((step+1)/fieldsets.length)*100);
    stepLabel.textContent=`Step ${step+1} of ${fieldsets.length} · ${fieldsets[step].dataset.stepTitle}`;
    percent.textContent=`${done}%`;
    progressBar.style.width=`${done}%`;
    [...dots.children].forEach((d,i)=>{d.classList.toggle('active',i===step);d.classList.toggle('complete',i<step);});
    backBtn.hidden=step===0;
    nextBtn.hidden=step===fieldsets.length-1;
    submitBtn.hidden=step!==fieldsets.length-1;
    submitNote.hidden=step!==fieldsets.length-1;
    if(step===fieldsets.length-1) buildReview();
    fieldsets[step].querySelector('legend')?.focus?.();
    const top=form.getBoundingClientRect().top+window.scrollY-100;
    if(direction!==0 && window.scrollY>top+120) window.scrollTo({top,behavior:'smooth'});
  }

  nextBtn.addEventListener('click',()=>{if(!validateStep(step))return;saveDraft();step=Math.min(fieldsets.length-1,step+1);renderStep(1);});
  backBtn.addEventListener('click',()=>{saveDraft();step=Math.max(0,step-1);renderStep(-1);});
  saveBtn.addEventListener('click',()=>saveDraft(true));
  form.addEventListener('input',()=>saveDraft(false));
  form.addEventListener('change',()=>saveDraft(false));

  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!validateStep(step)||!form.reportValidity()) return;
    const v=values();
    const subject=`Volunteer Interest — ${v.event}${v.otherEvent?' — '+v.otherEvent:''}`;
    const body=[
      'VOIGT PTA VOLUNTEER INTEREST','',`Name: ${v.firstName} ${v.lastName}`,`Email: ${v.email}`,`Phone: ${v.phone||'Not provided'}`,`Connection to Voigt: ${v.relationship}`,`Preferred contact: ${v.contactMethod}`,'',`Event / project: ${v.event}`,`Other event/project: ${v.otherEvent||'—'}`,`Preferred roles: ${list(v.roles)}`,'',`Availability: ${list(v.availability)}`,`Time commitment: ${v.commitment}`,`Availability notes: ${v.availabilityNotes||'—'}`,'',`Skills / interests: ${list(v.skills)}`,`Skills notes: ${v.skillsNotes||'—'}`,`Comfort / accessibility notes: ${v.comfortNotes||'—'}`,'',`Student grade: ${v.studentGrade||'Not applicable'}`,`Student school/org: ${v.studentOrg||'—'}`,`Student supervision acknowledgement: ${v.studentSupervision||'No / not applicable'}`,'',`Additional notes: ${v.notes||'—'}`,'','Consent to PTA contact: Yes'
    ].join('\n');
    localStorage.removeItem(key);
    location.href=`mailto:info@xeniavoigtpta.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  renderStep(0);
})();
