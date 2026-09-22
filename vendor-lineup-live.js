(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/fall-festival')return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function domain(url){try{return new URL(url).hostname.replace(/^www\./,'');}catch{return '';}}
  async function load(){
    try{
      const r=await fetch('/api/vendors',{cache:'no-store'});
      const j=await r.json();
      if(!r.ok||!Array.isArray(j.vendors)||!j.vendors.length)return;
      const target=document.querySelector('.fall26-partners');
      if(!target)return;
      document.querySelector('.fall26-vendors-live')?.remove();
      const section=document.createElement('section');
      section.className='section fall26-vendors-live';
      section.innerHTML=`<div class="container">
        <div class="fall26-section-head"><span>FOOD TRUCK ROW</span><h2>Meet the confirmed food lineup.</h2><p>${j.vendors.length} vendors are currently confirmed for October 23. Menus may be refined as festival night gets closer.</p></div>
        <div class="fall26-partner-grid" role="list" aria-label="Confirmed Fall Festival food vendors">
          ${j.vendors.map(v=>{
            const d=domain(v.website);
            const logo=d?`<img class="fall26-partner-logo" src="https://www.google.com/s2/favicons?domain_url=https://${esc(d)}&sz=256" alt="" loading="lazy" decoding="async">`:`<span style="font-size:32px;font-weight:900" aria-hidden="true">${esc((v.name||'V').slice(0,1))}</span>`;
            return `<article class="fall26-partner-card" role="listitem">
              <div class="fall26-partner-logo-wrap">${logo}</div>
              <div class="fall26-partner-copy">
                <span class="fall26-partner-type">${esc(v.type||'CONFIRMED FOOD VENDOR')}</span>
                <h3>${esc(v.name)}</h3>
                <p>${esc(v.offering||'Confirmed for Viking Quest Food Truck Row.')}</p>
                ${v.website?`<a class="fall26-partner-link" href="${esc(v.website)}" target="_blank" rel="noopener noreferrer">Visit vendor <span aria-hidden="true">→</span></a>`:''}
              </div>
            </article>`;
          }).join('')}
        </div>
        <div class="fall26-actions center" style="margin-top:22px"><a class="btn secondary" href="/vendors">View vendor page / apply →</a></div>
      </div>`;
      target.insertAdjacentElement('beforebegin',section);
    }catch(_){}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load); else load();
})();