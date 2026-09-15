(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/vendors') return;
  const main=document.querySelector('main#main'); if(!main)return;
  main.innerHTML=`
    <section class="vendor-hero"><div class="container"><span class="eyebrow">VEND WITH VOIGT</span><h1>Bring something great to the crowd.</h1><p>Food, treats, family-friendly products, services, and experiences are welcome to apply for PTA events.</p></div></section>
    <section class="section"><div class="container vendor-layout">
      <aside class="vendor-side"><span class="mini-label">HOW IT WORKS</span><h2>Simple application. Clear expectations.</h2><p>Vendor applications are reviewed by the PTA. Approved vendors will receive event-specific setup and arrival details.</p><div class="vendor-terms"><strong>PTA contribution</strong><p>All participating vendors agree to contribute <b>10% of their net profit earned from the event</b> to the Xenia Voigt Arts Academy PTA after the event.</p></div><p><small>“Net profit” means event sales revenue minus the vendor’s direct costs for the event. Vendors are responsible for accurately reporting their own event totals.</small></p></aside>
      <form class="vendor-form" id="vendorForm"><span class="mini-label">VENDOR APPLICATION</span><h2>Tell us about your business.</h2><div class="form-grid">
        <label>Business name *<input name="businessName" required></label>
        <label>Contact name *<input name="contactName" required></label>
        <label>Email *<input name="email" type="email" required></label>
        <label>Phone *<input name="phone" type="tel" required></label>
        <label>Business type *<select name="businessType" required><option value="">Choose one</option><option>Food truck / food vendor</option><option>Dessert / treats</option><option>Retail / merchandise</option><option>Arts / crafts</option><option>Service business</option><option>Entertainment / activity</option><option>Nonprofit / community organization</option><option>Other</option></select></label>
        <label>Event *<select name="event" required><option>Viking Quest Fall Festival — October 23, 2026</option><option>Future PTA event / general interest</option></select></label>
        <label class="full">Website or social media<input name="website" placeholder="Optional"></label>
        <label class="full">What will you sell or provide? *<textarea name="offering" rows="4" required></textarea></label>
        <label>Space / setup needs<input name="setupNeeds" placeholder="Table, tent, truck, power, etc."></label>
        <label>Electrical needs<select name="electricity"><option>No electricity needed</option><option>Standard outlet requested</option><option>Special power needs — explain below</option></select></label>
        <label class="full">Special notes or requirements<textarea name="notes" rows="3"></textarea></label>
      </div>
      <div class="vendor-terms"><label><input type="checkbox" name="profitShareAccepted" required> I agree that, if approved to vend, I will contribute 10% of my net profit from the event to Xenia Voigt Arts Academy PTA and provide the event sales/cost totals needed to calculate that amount. *</label></div>
      <label><input type="checkbox" name="accuracyAccepted" required> I confirm the information above is accurate and understand submission does not guarantee acceptance. *</label>
      <div style="margin-top:18px"><button class="vendor-submit" type="submit">Submit vendor application →</button></div><div id="vendorStatus" class="newsletter-status" role="status" aria-live="polite"></div>
      </form>
    </div></section>`;
  const form=document.getElementById('vendorForm'),status=document.getElementById('vendorStatus');
  form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const btn=form.querySelector('button[type="submit"]'),fd=new FormData(form),data=Object.fromEntries(fd.entries());data.profitShareAccepted=!!form.elements.profitShareAccepted.checked;data.accuracyAccepted=!!form.elements.accuracyAccepted.checked;btn.disabled=true;btn.textContent='Submitting…';status.textContent='';try{const r=await fetch('/api/vendors',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Could not submit');form.innerHTML=`<span class="mini-label">APPLICATION RECEIVED</span><h2>Thanks — we’ve got it.</h2><p>Your vendor application is now in the PTA dashboard for review. We’ll use the contact information you provided for next steps.</p><div class="buttons left"><a class="btn primary" href="/events">View events</a><a class="btn secondary" href="/">Back home</a></div>`;}catch(err){status.textContent=err.message||'Something went wrong. Please try again.';btn.disabled=false;btn.textContent='Submit vendor application →';}});
})();
