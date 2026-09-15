(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/join') return;
  const main=document.querySelector('main#main');
  if(!main) return;
  const joinUrl='https://txpta.my.salesforce-sites.com/JoinPTA';
  main.innerHTML=`
    <section class="join-hero">
      <div class="join-art join-art-a" aria-hidden="true">✦</div><div class="join-art join-art-b" aria-hidden="true">●</div><div class="join-art join-art-c" aria-hidden="true">✎</div>
      <div class="container join-hero-grid">
        <div class="join-copy">
          <span class="join-kicker">BECOME PART OF THE VIKING COMMUNITY</span>
          <h1>Join the PTA.<br><em>Keep the magic moving.</em></h1>
          <p>Membership is one of the easiest ways to support students, teachers, family experiences, and the creative community around Xenia Voigt Arts Academy.</p>
          <div class="join-reassure"><span>✓ No volunteer requirement</span><span>✓ One official Texas PTA membership</span><span>✓ Parents, caregivers, staff & community welcome</span></div>
          <a class="join-launch" href="${joinUrl}" target="_blank" rel="noopener noreferrer">Start my official membership <span>↗</span></a>
          <p class="join-note">The Texas PTA form cannot be displayed inside our site because its security settings block embedding. It will open securely in a new tab, while this page stays open for your instructions.</p>
        </div>
        <aside class="join-steps" aria-label="Texas PTA setup instructions">
          <div class="join-steps-top"><span>2 selections</span><b>before the form</b></div>
          <div class="join-step"><div class="join-step-num">1</div><div><small>School District</small><strong>Round Rock ISD</strong><button class="copy-chip" data-copy="Round Rock ISD">Copy</button></div></div>
          <div class="join-step"><div class="join-step-num">2</div><div><small>PTA</small><strong>Xenia Voigt Elementary</strong><button class="copy-chip" data-copy="Xenia Voigt Elementary">Copy</button></div></div>
          <div class="join-tip">Then tap <b>Next</b> and complete the official Texas PTA member form.</div>
        </aside>
      </div>
    </section>
    <section class="join-why">
      <div class="container">
        <div class="join-section-head"><span>WHAT YOUR MEMBERSHIP SAYS</span><h2>“I’m part of this.”</h2><p>You can join without signing up for a single volunteer shift. Membership itself is support.</p></div>
        <div class="join-tiles">
          <article><b>🎨</b><h3>More creative moments</h3><p>Help strengthen the experiences that make an arts academy feel alive.</p></article>
          <article><b>💛</b><h3>More teacher support</h3><p>Build a stronger bridge between families, staff, and the people caring for our kids.</p></article>
          <article><b>🎉</b><h3>More community magic</h3><p>Family events, enrichment, connection, and memories that students carry with them.</p></article>
        </div>
      </div>
    </section>
    <section class="join-faq"><div class="container"><div class="join-section-head"><span>GOOD TO KNOW</span><h2>Membership without the pressure.</h2></div><div class="join-faq-grid"><article><h3>Do I have to volunteer?</h3><p>No. Joining and volunteering are separate.</p></article><article><h3>Who can join?</h3><p>Parents, caregivers, teachers, staff, grandparents, and community supporters.</p></article><article><h3>Why does the form open separately?</h3><p>Texas PTA protects its Salesforce membership form from being embedded on other websites. Your membership is still completed directly with Texas PTA.</p></article></div></div></section>`;

  document.querySelectorAll('.copy-chip').forEach(btn=>btn.addEventListener('click',async()=>{
    const text=btn.dataset.copy;
    try{await navigator.clipboard.writeText(text);const old=btn.textContent;btn.textContent='Copied ✓';setTimeout(()=>btn.textContent=old,1400);}catch{btn.textContent=text;}
  }));
})();
