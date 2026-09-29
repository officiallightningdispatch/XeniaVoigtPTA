(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/fall-festival') return;
  const onReady=fn=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn,{once:true}):fn();
  onReady(()=>{
    const lede=document.querySelector('.fall26-lede');
    if(lede) lede.textContent='One covered bounce/combo inflatable, one trackless train, carnival games, five Viking stations, food vendors, Trunk-or-Treat, Cake Walk, silent auction and a sensory-friendly retreat.';
    const strip=document.querySelector('.fall26-poster-strip');
    if(strip) strip.textContent='TRAIN · BOUNCE · FOOD · GAMES · ART · TRUNKS';
    document.querySelectorAll('.fall26-partner-card').forEach(card=>{
      const t=(card.textContent||'').toLowerCase();
      if(['kona ice','coco\'s eats','roxk n grill','rock n grill','gelato lab'].some(n=>t.includes(n))) card.remove();
    });
    const quest=[...document.querySelectorAll('.fall26-card')].find(x=>(x.querySelector('h3')?.textContent||'').trim()==='Viking Quest');
    if(quest){
      const p=quest.querySelector('p'); if(p) p.textContent='Complete five fall-themed stations: Pumpkin Bowling, Apple Scoop Challenge, Fall Sensory Mystery, Collaborative Autumn Mural and Gratitude Tree.';
      const chips=quest.querySelector('.fall26-chips'); if(chips) chips.innerHTML='<b>🎃 Pumpkin Bowling</b><b>🍎 Apple Scoop Challenge</b><b>🍂 Fall Sensory Mystery</b><b>🎨 Collaborative Autumn Mural</b><b>🌳 Gratitude Tree</b>';
    }
    const grid=document.querySelector('.fall26-adventure-grid');
    if(grid && !grid.querySelector('[data-pumpkin-decorating]')){
      const card=document.createElement('article');
      card.className='fall26-card';
      card.setAttribute('data-pumpkin-decorating','');
      card.innerHTML='<div class="fall26-icon" aria-hidden="true">🎃</div><span>CREATE YOUR OWN</span><h3>Mini Pumpkin Decorating</h3><p>A limited-quantity, no-carving decorating activity for children. Supplies are being finalized now.</p>';
      grid.appendChild(card);
    }

    async function refreshTrunkRecruitment(){
      let open=11,claimed=9,total=20;
      try{
        const r=await fetch('/api/trunk-hosts',{cache:'no-store'});
        const j=await r.json();
        if(r.ok){open=Number(j.remaining);claimed=Number(j.claimedSpots);total=Number(j.totalSpots);}
      }catch(_){}
      let section=document.querySelector('[data-trunk-recruitment]');
      if(!section){
        section=document.createElement('section');
        section.className='section';
        section.setAttribute('data-trunk-recruitment','');
        const finalSection=document.querySelector('.fall26-final');
        finalSection?.insertAdjacentElement('beforebegin',section);
      }
      section.innerHTML='<div class="container"><div class="fall26-section-head"><span>TRUNK-OR-TREAT HOSTS NEEDED</span><h2>'+open+' trunk spots are still open.</h2><p>'+claimed+' of '+total+' spaces are currently claimed or reserved. Families, staff, and approved community partners can host a family-friendly decorated trunk. We are finalizing the full host roster by Wednesday evening, September 30.</p></div><div class="fall26-actions center"><a class="btn primary" href="/trunk-host.html">Apply to host a trunk →</a></div></div>';
    }
    refreshTrunkRecruitment();

    const final=document.querySelector('.fall26-final p'); if(final) final.textContent='Games on. Train rolling. Trunks open. Food vendors serving. Fall night handled.';
  });
})();
