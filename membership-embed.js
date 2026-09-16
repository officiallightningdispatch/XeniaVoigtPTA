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
          <div class="membership-kicker">JOIN THE VOIGT PTA</div>
          <h1>One membership.<br><em>A whole year of impact.</em></h1>
          <p>Support student experiences, teacher appreciation, family events, arts enrichment, and the moments that make Voigt feel like home.</p>
          <div class="membership-chips"><span>✓ No volunteer requirement</span><span>✓ Families + staff + community welcome</span><span>✓ Official Texas PTA membership</span></div>
        </div>
        <div class="membership-note-card">
          <span class="note-label">WHEN THE TEXAS PTA FORM OPENS</span>
          <h2>Choose these two options</h2>
          <div class="selection-row"><b>1. School District</b><span>Round Rock ISD</span></div>
          <div class="selection-row"><b>2. PTA</b><span>Xenia Voigt PTA</span></div>
          <p><strong>First click Round Rock ISD, then click Xenia Voigt PTA.</strong> Continue through the Texas PTA application to complete your membership.</p>
        </div>
      </div>
    </section>

    <section class="membership-form-section">
      <div class="container">
        <div class="membership-form-head">
          <div>
            <span class="mini-label">OFFICIAL TEXAS PTA APPLICATION</span>
            <h2>Join Xenia Voigt PTA</h2>
            <p>In the official Texas PTA application below, select <strong>Round Rock ISD</strong> for the school district, then select <strong>Xenia Voigt PTA</strong>. Complete the remaining fields and submit your membership through Texas PTA.</p>
          </div>
          <a class="btn outline membership-fallback" href="${joinUrl}" target="_blank" rel="noopener">Open Texas PTA application ↗</a>
        </div>
        <div class="official-form-shell" id="officialFormShell">
          <div class="official-form-ribbon"><span>OFFICIAL</span> Texas PTA membership application</div>
          <iframe id="texasPtaFrame" title="Official Texas PTA membership application" src="${joinUrl}" loading="eager" referrerpolicy="strict-origin-when-cross-origin" allow="payment *"></iframe>
          <div class="iframe-help">
            <b>If the application doesn’t appear:</b> Texas PTA may block the embedded application on some devices or browsers. Tap “Open Texas PTA application” above, then choose <strong>Round Rock ISD</strong> and <strong>Xenia Voigt PTA</strong>.
          </div>
        </div>
      </div>
    </section>

    <section class="membership-reassurance">
      <div class="container reassurance-grid">
        <article><span>01</span><h3>Choose Round Rock ISD</h3><p>Select Round Rock ISD as your school district in the Texas PTA application.</p></article>
        <article><span>02</span><h3>Choose Xenia Voigt PTA</h3><p>Select Xenia Voigt PTA from the PTA list.</p></article>
        <article><span>03</span><h3>Complete your membership</h3><p>Finish the official Texas PTA application. Volunteering is never required to become a member.</p></article>
      </div>
    </section>`;
})();
