(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/join') return;
  const main=document.querySelector('main#main');
  if(!main) return;
  const joinUrl='https://txpta.my.salesforce-sites.com/JoinPTA';
  main.innerHTML=`
    <section class="membership-hero">
      <div class="membership-art art-one" aria-hidden="true">✦</div>
      <div class="membership-art art-two" aria-hidden="true">◌</div>
      <div class="membership-art art-three" aria-hidden="true">✎</div>
      <div class="container membership-hero-grid">
        <div>
          <div class="membership-kicker">JOIN THE VIKING COMMUNITY</div>
          <h1>One membership.<br><em>A whole year of impact.</em></h1>
          <p>Support student experiences, teacher appreciation, family events, arts enrichment, and the moments that make Voigt feel like home.</p>
          <div class="membership-chips"><span>✓ No volunteer requirement</span><span>✓ Families + staff + community welcome</span><span>✓ Official Texas PTA membership</span></div>
        </div>
        <div class="membership-note-card">
          <span class="note-label">MAKE IT EASY</span>
          <h2>Your selections</h2>
          <div class="selection-row"><b>School District</b><span>Round Rock ISD</span></div>
          <div class="selection-row"><b>PTA</b><span>Xenia Voigt Elementary</span></div>
          <p>Texas PTA currently requires these two selections inside its secure form. We’ve placed the official form directly below so you can complete everything without hunting for the link.</p>
        </div>
      </div>
    </section>

    <section class="membership-form-section">
      <div class="container">
        <div class="membership-form-head">
          <div>
            <span class="mini-label">OFFICIAL TEXAS PTA FORM</span>
            <h2>Ready? Let’s make it official.</h2>
            <p>Select <strong>Round Rock ISD</strong>, then <strong>Xenia Voigt Elementary</strong>. The remainder of the membership form is handled securely by Texas PTA.</p>
          </div>
          <a class="btn outline membership-fallback" href="${joinUrl}" target="_blank" rel="noopener">Open form in a new tab ↗</a>
        </div>
        <div class="official-form-shell" id="officialFormShell">
          <div class="official-form-ribbon"><span>OFFICIAL</span> Texas PTA membership checkout</div>
          <iframe id="texasPtaFrame" title="Official Texas PTA membership form" src="${joinUrl}" loading="eager" referrerpolicy="strict-origin-when-cross-origin" allow="payment *"></iframe>
          <div class="iframe-help">
            <b>If the form doesn’t appear:</b> Texas PTA may block embedded checkout on some devices or browsers. Use the “Open form in a new tab” button above; your membership will still go through the official Texas PTA system.
          </div>
        </div>
      </div>
    </section>

    <section class="membership-reassurance">
      <div class="container reassurance-grid">
        <article><span>01</span><h3>Join</h3><p>Complete the official Texas PTA membership form.</p></article>
        <article><span>02</span><h3>Belong</h3><p>Stay connected to PTA news, events, and opportunities.</p></article>
        <article><span>03</span><h3>Choose your level</h3><p>Volunteer a lot, a little, or not at all. Membership still matters.</p></article>
      </div>
    </section>`;
})();
