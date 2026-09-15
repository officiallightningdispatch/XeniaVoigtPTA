(()=>{
  const p=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(p!=='/volunteer') return;
  const form=document.getElementById('volunteerForm');
  if(!form) return;
  const fieldsets=[...form.querySelectorAll('fieldset')];
  const stepLabel=document.getElementById('volStepLabel');
  const dots=document.getElementById('volStepDots');
  const names=fieldsets.map(f=>f.dataset.stepTitle||'Step');
  const caption=document.createElement('div');
  caption.className='vol-step-caption';
  caption.textContent='Only this section is shown. Continue when you’re ready.';
  form.querySelector('.vol-wizard-progress')?.appendChild(caption);

  function activeIndex(){const i=fieldsets.findIndex(f=>!f.hidden);return i<0?0:i;}
  function sync(){
    const i=activeIndex();
    fieldsets.forEach((f,n)=>f.setAttribute('aria-hidden',String(n!==i)));
    if(stepLabel) stepLabel.setAttribute('aria-live','polite');
    if(dots){[...dots.children].forEach((d,n)=>{d.setAttribute('title',`${n+1}. ${names[n]}`);d.setAttribute('aria-label',`${n+1}. ${names[n]}`);});}
  }
  fieldsets.forEach(f=>new MutationObserver(sync).observe(f,{attributes:true,attributeFilter:['hidden']}));
  sync();
})();