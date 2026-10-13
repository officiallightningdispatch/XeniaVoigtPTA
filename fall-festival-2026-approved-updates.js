(()=>{
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/fall-festival') return;
  const onReady=fn=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn,{once:true}):fn();

  onReady(()=>{
    const lede=document.querySelector('.fall26-lede');
    if(lede) lede.textContent='A free family fall night with one trackless train, one covered combo inflatable, carnival and giant games, five Viking Quest trials, fall activities, Trunk-or-Treat, food vendors, Cake Walk, silent auction, performances, a Photo Stop and a sensory-friendly retreat.';

    const strip=document.querySelector('.fall26-poster-strip');
    if(strip) strip.textContent='TRAIN · QUEST · GAMES · TRUNKS · FOOD · FALL FUN';

    document.querySelectorAll('.fall26-partner-card').forEach(card=>{
      const t=(card.textContent||'').toLowerCase();
      if(['kona ice',"coco's eats",'roxk n grill','rock n grill','gelato lab'].some(n=>t.includes(n))) card.remove();
    });

    const cards=[...document.querySelectorAll('.fall26-card')];

    const quest=cards.find(x=>(x.querySelector('h3')?.textContent||'').trim()==='Viking Quest');
    if(quest){
      const p=quest.querySelector('p');
      if(p) p.textContent='Complete five Viking Quest trials in any order. A station volunteer marks your Quest card after each completed trial.';
      const chips=quest.querySelector('.fall26-chips');
      if(chips) chips.innerHTML='<b>🪓 The Trial of Skill</b><b>🛡️ The Shield Wall</b><b>ᚱ The Rune Maker’s Workshop</b><b>🧭 The Viking Navigator’s Trial</b><b>🎵 The Skald’s Stage</b>';
    }

    const fallCard=cards.find(x=>(x.querySelector('h3')?.textContent||'').trim()==='Create, Play & Explore');
    if(fallCard){
      const p=fallCard.querySelector('p');
      if(p) p.textContent='Beyond Viking Quest, families can enjoy these separate fall-festival activities throughout the event.';
      const chips=fallCard.querySelector('.fall26-chips');
      if(chips) chips.innerHTML='<b>🎃 Pumpkin Bowling</b><b>🍂 Fall Sensory Mystery</b><b>🎨 Pumpkin Decorating</b><b>🌈 Face Painting</b><b>📸 Photo Stop</b><b>🎯 Carnival & Giant Games</b>';
    }

    // Remove any stale extra Mini Pumpkin Decorating card injected by an older update.
    document.querySelectorAll('[data-pumpkin-decorating]').forEach(el=>el.remove());

    const trunk=cards.find(x=>(x.querySelector('h3')?.textContent||'').trim()==='Sensory-Friendly Start');
    if(trunk){
      const p=trunk.querySelector('p');
      if(p) p.textContent='Sensory-friendly Trunk-or-Treat runs from 5:30–6:00 PM. General Trunk-or-Treat opens to everyone after 6:00 PM.';
    }

    const rideCard=cards.find(x=>(x.querySelector('h3')?.textContent||'').includes('Trackless Train'));
    if(rideCard){
      const p=rideCard.querySelector('p');
      if(p) p.textContent='Ride the trackless train, play on the single covered combo inflatable, and enjoy Giant Connect Four, Cornhole, Giant Checkers, Giant Jenga, ring toss and other just-for-fun games.';
    }

    document.querySelectorAll('.fall26-partner-card').forEach(card=>{
      const h3=(card.querySelector('h3')?.textContent||'').trim();
      if(h3==='Pour The Fun'){
        const p=card.querySelector('p');
        if(p) p.textContent='Zombie Juice, Hocus Pocus specialty drinks, and Street Corn.';
      }
    });

    const trunkHostSection=document.querySelector('[data-trunk-recruitment]');
    if(trunkHostSection) trunkHostSection.remove();

    const final=document.querySelector('.fall26-final p');
    if(final) final.textContent='Free admission. Big fall fun. One Viking night for the whole family.';
  });
})();