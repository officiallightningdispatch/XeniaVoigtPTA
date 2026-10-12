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
      const p=quest.querySelector('p'); if(p) p.textContent='Complete five authentic Viking Quest trials: The Trial of Skill, The Shield Wall, The Rune Maker’s Workshop, Viking Harvest Bowling and The Skald’s Stage.';
      const chips=quest.querySelector('.fall26-chips'); if(chips) chips.innerHTML='<b>🪓 The Trial of Skill</b><b>🛡️ The Shield Wall</b><b>ᚱ The Rune Maker’s Workshop</b><b>🎃 Viking Harvest Bowling</b><b>🎵 The Skald’s Stage</b>';
    }
    const grid=document.querySelector('.fall26-adventure-grid');
    if(grid && !grid.querySelector('[data-pumpkin-decorating]')){
      const card=document.createElement('article');
      card.className='fall26-card';
      card.setAttribute('data-pumpkin-decorating','');
      card.innerHTML='<div class="fall26-icon" aria-hidden="true">🎃</div><span>CREATE YOUR OWN</span><h3>Mini Pumpkin Decorating</h3><p>A no-carving decorating activity for children.</p>';
      grid.appendChild(card);
    }

    const trunkHostSection=document.querySelector('[data-trunk-recruitment]');
    if(trunkHostSection) trunkHostSection.remove();

    const final=document.querySelector('.fall26-final p'); if(final) final.textContent='Games on. Train rolling. Trunks open. Food vendors serving. Fall night handled.';
  });
})();
