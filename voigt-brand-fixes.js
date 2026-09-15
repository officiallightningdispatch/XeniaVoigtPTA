(()=>{
  const route=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');

  function run(){
    const brand=document.querySelector('.brand');
    if(brand && !brand.querySelector('.voigt-brand-tag')){
      brand.insertAdjacentHTML('afterend','<span class="voigt-brand-tag" aria-label="Voigt Vikings">Voigt Vikings</span>');
    }

    if(route==='/volunteer'){
      const hero=document.querySelector('.vol-hero p');
      if(hero) hero.textContent='Tell us how you’d like to help, what works for your schedule, and what you enjoy. We’ll take it from there.';
      document.querySelectorAll('.vol-form p,.vol-sidebar p').forEach(p=>{
        if(/one reusable volunteer form/i.test(p.textContent)) p.remove();
      });
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run);
  else run();
  setTimeout(run,0);
})();
