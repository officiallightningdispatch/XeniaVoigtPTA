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
    const final=document.querySelector('.fall26-final p'); if(final) final.textContent='Games on. Train rolling. Trunks open. Food vendors serving. Fall night handled.';
  });
})();
