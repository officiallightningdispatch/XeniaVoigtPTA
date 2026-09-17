(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/viking-quest') return;
  const main=document.querySelector('main#main');
  if(!main || document.getElementById('fallFestivalSponsorCta')) return;

  const partners=main.querySelector('.fall26-partners');
  const section=document.createElement('section');
  section.id='fallFestivalSponsorCta';
  section.className='section fall26-black';
  section.innerHTML=`
    <div class="container fall26-black-grid">
      <div>
        <span class="fall26-kicker light">COMMUNITY SPONSORSHIPS OPEN</span>
        <h2>Help power a free night for Voigt families.</h2>
        <p>Local businesses and community partners can help keep admission and children’s activities free by sponsoring family attractions, Arts Integration and Viking Quest materials, sensory-friendly resources, prizes, printing and signage, DJ/MC support, or other event essentials.</p>
        <p>Current opportunities generally range from <strong>$195–$300</strong>, and in-kind donations are welcome too. Confirmed sponsors receive appropriate recognition on PTA event materials, the website, signage, and community communications.</p>
        <div class="fall26-actions">
          <a class="btn primary" href="mailto:brittanisimms203@gmail.com?subject=Voigt%20Fall%20Festival%20Sponsorship">Become a community sponsor</a>
        </div>
      </div>
      <div class="fall26-stats">
        <div><b>$195</b><span>family attraction opportunity</span></div>
        <div><b>$250</b><span>activity / supply sponsor</span></div>
        <div><b>$300</b><span>family entertainment support</span></div>
        <div><b>In-kind</b><span>supplies, prizes, printing & more</span></div>
      </div>
    </div>`;
  if(partners) partners.insertAdjacentElement('afterend',section); else main.appendChild(section);
})();
