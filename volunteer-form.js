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

        <form id="volunteerForm" class="vol-form" novalidate>
          <div class="vol-form-head"><span>VOLUNTEER PROFILE</span><h2>Let’s find your perfect fit.</h2><p>Fields marked * are required.</p></div>

          <fieldset>
            <legend><span>1</span> About you</legend>
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

          <fieldset>
            <legend><span>2</span> What are you volunteering for?</legend>
            <div class="vol-grid two">
              <label>Event / project *<select name="event" id="volEvent" required><option value="">Select one</option><option>Any PTA event / general availability</option><option>Viking Quest Fall Festival — October 23, 2026</option><option>Teacher & staff appreciation</option><option>Family event / school activity</option><option>Fundraising / sponsorship support</option><option>PTA operations / behind-the-scenes help</option><option>Other event / project</option></select></label>
              <label>Other event / project<input name="otherEvent" placeholder="Optional"></label>
            </div>
            <div class="field-label">What would you enjoy helping with? <span>Select all that apply.</span></div>
            <div class="choice-grid roles">
              ${['Setup / decorating','Welcome / check-in','Games / activity stations','Arts / creative activities','Food court / concessions support','Sensory-friendly space support','Performances / stage support','Trunk-or-treat support','Silent auction / fundraising','Vendor / sponsor support','Photography / event memories','Cleanup / breakdown','Planning / project management','Administrative / remote help','Wherever I’m needed'].map(x=>`<label class="choice"><input type="checkbox" name="roles" value="${x}"><span>${x}</span></label>`).join('')}
            </div>
          </fieldset>

          <fieldset>
            <legend><span>3</span> Your availability</legend>
            <div class="field-label">When are you usually available? <span>Select all that apply.</span></div>
            <div class="choice-grid compact">
              ${['Weekday mornings','School-day hours','Weekday afternoons','Weekday evenings','Saturday','Sunday','Event day only','Flexible / varies'].map(x=>`<label class="choice"><input type="checkbox" name="availability" value="${x}"><span>${x}</span></label>`).join('')}
            </div>
            <div class="vol-grid two">
              <label>Time commitment preference<select name="commitment"><option>One-time / event only</option><option>30–60 minutes</option><option>1–2 hours</option><option>3+ hours</option><option>Recurring opportunities</option><option>Flexible</option></select></label>
              <label>Specific date/time notes<input name="availabilityNotes" placeholder="Example: available after 5:30 PM"></label>
            </div>
          </fieldset>

          <fieldset>
            <legend><span>4</span> Skills, interests & comfort</legend>
            <div class="choice-grid compact">
              ${['Arts / crafts','Working with children','Customer service / welcoming','Food service','Event planning','Decor / design','Music / performance','Photography / media','Technology','Organization / admin','Fundraising / outreach','Bilingual / translation','Heavy lifting / setup','Quiet / low-stimulation roles'].map(x=>`<label class="choice"><input type="checkbox" name="skills" value="${x}"><span>${x}</span></label>`).join('')}
            </div>
            <label class="full-label">Anything else you’re great at or genuinely enjoy doing?<textarea name="skillsNotes" rows="3" placeholder="Tell us what you’d love to contribute."></textarea></label>
            <label class="full-label">Anything that would help us make volunteering more comfortable or accessible for you?<textarea name="comfortNotes" rows="3" placeholder="Optional — no medical details needed."></textarea></label>
          </fieldset>

          <fieldset>
            <legend><span>5</span> Student volunteer details</legend>
            <p class="fieldset-note">Complete only if this submission is for a student volunteer. Please do not enter sensitive student information.</p>
            <div class="vol-grid two">
              <label>Student grade level<select name="studentGrade"><option value="">Not applicable</option><option>Middle school</option><option>9th grade</option><option>10th grade</option><option>11th grade</option><option>12th grade</option><option>College / other</option></select></label>
              <label>School / organization<input name="studentOrg" placeholder="Optional"></label>
            </div>
            <label class="choice consent-choice"><input type="checkbox" name="studentSupervision" value="Yes"><span>I understand student volunteer roles may require school approval and/or adult supervision.</span></label>
          </fieldset>

          <fieldset>
            <legend><span>6</span> Final notes</legend>
            <label class="full-label">Anything else we should know?<textarea name="notes" rows="4" placeholder="Questions, preferences, ideas, or anything that helps us match you well."></textarea></label>
            <label class="choice consent-choice"><input type="checkbox" name="consent" required><span>I agree that the PTA may contact me about volunteer opportunities based on the information I provided. *</span></label>
          </fieldset>

          <div class="vol-actions">
            <button type="button" class="vol-save" id="saveVolunteerDraft">Save draft on this device</button>
            <button type="submit" class="vol-submit">Send volunteer interest <span>→</span></button>
          </div>
          <p class="vol-submit-note">For this first version, submitting opens a pre-addressed email to <strong>info@xeniavoigtpta.org</strong> with your form responses. A direct secure submission system can be connected later without redesigning this form.</p>
          <div id="volStatus" class="vol-status" role="status" aria-live="polite"></div>
        </form>
      </div>
    </section>`;

  const form=document.getElementById('volunteerForm');
  const eventSelect=document.getElementById('volEvent');
  if(presetEvent){const match=[...eventSelect.options].find(o=>o.textContent.toLowerCase().includes(presetEvent.toLowerCase()));if(match) eventSelect.value=match.value;else {eventSelect.value='Other event / project';form.elements.otherEvent.value=presetEvent;}}

  const key='voigt-volunteer-draft-v1';
  try{const draft=JSON.parse(localStorage.getItem(key)||'null');if(draft){Object.entries(draft).forEach(([name,val])=>{const els=form.elements[name];if(!els)return;if(els instanceof RadioNodeList){[...els].forEach(el=>{if(el.type==='checkbox')el.checked=(val||[]).includes(el.value);});}else if(els.type==='checkbox'){els.checked=!!val;}else{els.value=val??'';}})}}catch{}

  function values(){const fd=new FormData(form),obj={};for(const [k,v] of fd.entries()){if(obj[k])obj[k]=Array.isArray(obj[k])?[...obj[k],v]:[obj[k],v];else obj[k]=v;}return obj;}
  document.getElementById('saveVolunteerDraft')?.addEventListener('click',()=>{localStorage.setItem(key,JSON.stringify(values()));const s=document.getElementById('volStatus');s.textContent='Draft saved on this device ✓';setTimeout(()=>s.textContent='',2200);});

  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity()) return;
    const v=values();
    const list=(x)=>Array.isArray(x)?x.join(', '):(x||'None selected');
    const subject=`Volunteer Interest — ${v.event}${v.otherEvent?' — '+v.otherEvent:''}`;
    const body=[
      'VOIGT PTA VOLUNTEER INTEREST',
      '',
      `Name: ${v.firstName} ${v.lastName}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone||'Not provided'}`,
      `Connection to Voigt: ${v.relationship}`,
      `Preferred contact: ${v.contactMethod}`,
      '',
      `Event / project: ${v.event}`,
      `Other event/project: ${v.otherEvent||'—'}`,
      `Preferred roles: ${list(v.roles)}`,
      '',
      `Availability: ${list(v.availability)}`,
      `Time commitment: ${v.commitment}`,
      `Availability notes: ${v.availabilityNotes||'—'}`,
      '',
      `Skills / interests: ${list(v.skills)}`,
      `Skills notes: ${v.skillsNotes||'—'}`,
      `Comfort / accessibility notes: ${v.comfortNotes||'—'}`,
      '',
      `Student grade: ${v.studentGrade||'Not applicable'}`,
      `Student school/org: ${v.studentOrg||'—'}`,
      `Student supervision acknowledgement: ${v.studentSupervision||'No / not applicable'}`,
      '',
      `Additional notes: ${v.notes||'—'}`,
      '',
      'Consent to PTA contact: Yes'
    ].join('\n');
    localStorage.removeItem(key);
    location.href=`mailto:info@xeniavoigtpta.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
