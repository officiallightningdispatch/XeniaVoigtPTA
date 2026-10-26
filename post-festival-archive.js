(()=>{
  const route=location.pathname.replace(/\\/index\\.html$/,'').replace(/\\/$/,'')||'/';
  if(route!=='/fall-festival'&&route!=='/viking-quest')return;
  function render(){
    const main=document.querySelector('main#main');if(!main)return;
    main.className='festival-archive';
    main.innerHTML=`<section class="page-hero"><div class="container"><div class="eyebrow">OCTOBER 23, 2026 · COMMUNITY CELEBRATION</div><h1>Thank you for making Viking Quest memorable.</h1><p>Our 2026 Fall Festival brought Voigt families, educators, volunteers, and community partners together for an evening of creativity and connection.</p><div class="buttons"><a class="btn primary" href="/events#pta-photo-memories">Share your festival photos</a><a class="btn secondary" href="/events">View upcoming events</a></div></div></section><section class="section"><div class="container"><div class="section-head"><div class="eyebrow">WITH GRATITUDE</div><h2>Made possible by our community.</h2></div><div class="grid three"><article class="card"><h3>Our volunteers</h3><p>Thank you to the families, students, and community members who gave their time and energy.</p></article><article class="card"><h3>Our educators</h3><p>Thank you to Voigt teachers and staff for helping make the celebration welcoming for our Vikings.</p></article><article class="card"><h3>Our supporters</h3><p>Thank you to the sponsors, donors, vendors, and partners who contributed to the evening.</p></article></div><p style="margin-top:28px"><a href="/events#pta-photo-memories">Explore the community photo collection →</a></p></div></section>`;
    document.querySelectorAll('#trunkHostCta,.fall26-countdown-band,.vq-countdown-wrap').forEach(x=>x.remove());
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
  setTimeout(render,1100);
})();