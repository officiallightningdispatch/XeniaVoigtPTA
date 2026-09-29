(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/vendors') return;
  const main=document.querySelector('main#main'); if(!main)return;
  main.innerHTML=`
    <section class="vendor-hero"><div class="container"><span class="eyebrow">VEND WITH VOIGT</span><h1>Fall Festival vendor lineup is set.</h1><p>We are not accepting additional vendors for the October 23, 2026 Fall Festival. Businesses can still share interest for future PTA events.</p></div></section>
    <section class="section"><div class="container vendor-layout">
      <aside class="vendor-side"><span class="mini-label">2026 FALL FESTIVAL</span><h2>Vendor applications are closed for October 23.</h2><p>The selected lineup is K&amp;K BBQ Mexican Food, Hearth &amp; Honey, and Pour The Fun. We are not adding more Fall Festival vendors at this time.</p><div class="vendor-terms"><strong>Fall Festival fee waiver</strong><p>The PTA waived the previously proposed <b>10% event-sales contribution</b> for the selected 2026 Fall Festival vendors.</p></div><p><small>Future PTA events may have different terms. Any event-specific requirements will be shared before participation is confirmed.</small></p></aside>
      <form class="vendor-form" id="vendorForm"><span class="mini-label">FUTURE EVENT VENDOR INTEREST</span><h2>Tell us about your business for a future PTA event.</h2><p>This form does not add vendors to the October 23 Fall Festival lineup.</p><div class="form-grid">
        <label>Business name *<input name="businessName" required></label>
        <label>Contact name *<input name="contactName" required></label>
        <label>Email *<input name="email" type="email" required></label>
        <label>Phone *<input name="phone" type="tel" required></label>
        <label>Business type *<select name="businessType" required><option value="">Choose one</option><option>Food truck / food vendor</option><option>Dessert / treats</option><option>Retail / merchandise</option><option>Arts / crafts</option><option>Service business</option><option>Entertainment / activity</option><option>Nonprofit / community organization</option><option>Other</option></select></label>
        <label>Event *<select name="event" required><option>Future PTA event / general interest</option></select></label>
        <label class="full">Website or social media<input name="website" placeholder="Optional"></label>
        <label class="full">What will you sell or provide? *<textarea name="offering" rows="4" required></textarea></label>
        <label>Space / setup needs<input name="setupNeeds" placeholder="Table, tent, truck, power, etc."></label>
        <label>Electrical needs<select name="electricity"><option>No electricity needed</option><option>Standard outlet requested</option><option>Special power needs — explain below</option></select></label>
        <label class="full">Special notes or requirements<textarea name="notes" rows="3"></textarea></label>
      </div>
      <div class="vendor-terms"><label><input type="checkbox" name="futureInterestAccepted" required> I understand this is interest for a future PTA event and does not add my business to the October 23, 2026 Fall Festival lineup. *</label></div>
      <label><input type="checkbox" name="accuracyAccepted" required> I confirm the information above is accurate and understand submission does not guarantee acceptance for a future event. *</label>
      <div style="margin-top:18px"><button class="vendor-submit" type="submit">Submit future-event interest →</button></div><div id="vendorStatus" class="newsletter-status" role="status" aria-live="polite"></div>
      </form>
    </div></section>`;
  const form=document.getElementById('vendorForm'),status=document.getElementById('vendorStatus');
  form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const btn=form.querySelector('button[type="submit"]'),fd=new FormData(form),data=Object.fromEntries(fd.entries());data.futureInterestAccepted=!!form.elements.futureInterestAccepted.checked;data.accuracyAccepted=!!form.elements.accuracyAccepted.checked;btn.disabled=true;btn.textContent='Submitting…';status.textContent='';try{const r=await fetch('/api/vendors',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Could not submit');form.innerHTML=`<span class="mini-label">INTEREST RECEIVED</span><h2>Thanks — we’ve got it.</h2><p>Your information is saved for future PTA event consideration. This does not add your business to the October 23 Fall Festival lineup.</p><div class="buttons left"><a class="btn primary" href="/events">View events</a><a class="btn secondary" href="/">Back home</a></div>`;}catch(err){status.textContent=err.message||'Something went wrong. Please try again.';btn.disabled=false;btn.textContent='Submit future-event interest →';}});
})();
