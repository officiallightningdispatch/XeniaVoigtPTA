(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  const nav=document.querySelector('.nav-inner');
  if(nav && !nav.querySelector('a[href="/vendors"]')){
    const contact=nav.querySelector('a[href="/contact"]');
    const vendor=document.createElement('a'); vendor.href='/vendors'; vendor.textContent='Vendors';
    if(contact) nav.insertBefore(vendor,contact); else nav.appendChild(vendor);
  }

  if(p!=='/admin'){
    const footer=document.querySelector('.footer');
    if(footer && !document.querySelector('.modern-newsletter')){
      footer.insertAdjacentHTML('beforebegin',`<section class="modern-newsletter" aria-label="PTA newsletter signup"><div class="container"><div><span class="mini-label">VOIGT, IN YOUR INBOX</span><h2>Useful updates. Zero inbox chaos.</h2><p>Events, opportunities, school-community resources, and the things worth knowing.</p></div><div><form class="newsletter-form" id="newsletterForm"><input name="email" type="email" autocomplete="email" placeholder="Your email address" required aria-label="Email address"><button type="submit">Keep me posted →</button></form><div class="newsletter-status" id="newsletterStatus" role="status" aria-live="polite"></div></div></div></section>`);
      const form=document.getElementById('newsletterForm'),status=document.getElementById('newsletterStatus');
      form?.addEventListener('submit',async e=>{e.preventDefault();const btn=form.querySelector('button'),email=form.email.value.trim();if(!email)return;btn.disabled=true;btn.textContent='Joining…';status.textContent='';try{const r=await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,source:p})});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Could not subscribe');form.reset();status.textContent='You’re on the list ✓';}catch(err){status.textContent=err.message||'Something went wrong. Please try again.';}finally{btn.disabled=false;btn.textContent='Keep me posted →';}});
    }
  }

  document.querySelectorAll('a[href="/fundraising"]').forEach(a=>{if(a.textContent.trim()==='Support')a.textContent='Support'});

  // Direct volunteer submission: capture before the legacy mailto handler.
  if(p==='/volunteer'){
    const form=document.getElementById('volunteerForm');
    if(form){
      const note=document.getElementById('volSubmitNote');
      if(note) note.innerHTML='Submitting sends your information directly to the PTA volunteer dashboard. <strong>No email app required.</strong>';
      form.addEventListener('submit',async e=>{
        e.preventDefault();e.stopImmediatePropagation();
        if(!form.reportValidity())return;
        const status=document.getElementById('volStatus'),btn=document.getElementById('volSubmit');
        const fd=new FormData(form),data={};
        for(const [k,v] of fd.entries()) data[k]=data[k]?(Array.isArray(data[k])?[...data[k],v]:[data[k],v]):v;
        btn.disabled=true;btn.innerHTML='Sending…';status.textContent='';
        try{const r=await fetch('/api/volunteers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Could not submit');localStorage.removeItem('voigt-volunteer-draft-v1');form.innerHTML=`<div class="vol-form-head"><span>YOU’RE IN</span><h2>Volunteer interest received.</h2><p>Thank you! The PTA can now review your submission directly from the volunteer dashboard.</p><div class="buttons left"><a class="btn primary" href="/events">See upcoming events</a><a class="btn secondary" href="/">Back home</a></div></div>`;}catch(err){status.textContent=err.message||'Something went wrong. Please try again.';btn.disabled=false;btn.innerHTML='Send volunteer interest <span>→</span>';}
      },true);
    }
  }
})();
