(()=> {
  if((location.pathname.replace(/\\/index\\.html$/,'').replace(/\\/$/,'')||'/')!=='/admin')return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function section(title,items){return `<section class="shared-status-card"><h3>${esc(title)}</h3><ul>${(items||[]).map(i=>`<li><b>${esc(i.title)}:</b> ${esc(i.detail)}</li>`).join('')}</ul></section>`;}
  function render(data){
    const root=document.getElementById('adminRoot'),head=root?.querySelector('.admin-suite-head');
    if(!root||!head||document.getElementById('festivalSharedStatus'))return false;
    root.querySelector('.admin-kpis')?.remove();
    root.querySelector('#panel-events')?.remove();
    root.querySelector('#panel-role')?.remove();
    root.querySelector('#panel-finance')?.remove();
    root.querySelector('#panel-communications')?.remove();
    root.querySelectorAll('.admin-suite-tabs [data-panel]').forEach(b=>{if(!['submissions','resources'].includes(b.dataset.panel))b.remove();});
    const box=document.createElement('section');box.id='festivalSharedStatus';box.className='shared-status-board';
    box.innerHTML=`<header class="shared-status-head"><div><span class="mini-label">VIKING QUEST · LIVE STATUS</span><h2>${esc(data.event.title)}</h2><p>${esc(data.event.date)} · ${esc(data.event.time)} · ${esc(data.event.venue)}</p><small>Single shared update: ${esc(data.updatedAt)}</small></div><div class="shared-status-metrics"><b>${esc(data.event.attendance)}</b><span>planning attendance</span><b>${esc(data.budget.cashPledges)}</b><span>cash pledges</span><b>${esc(data.budget.allocation)}</b><span>PTA allocation</span><b>${esc(data.budget.spent)}</b><span>PTA spend to date</span></div></header>
    <div class="shared-status-groups">${section('Confirmed',data.confirmed)}${section('Pending',data.pending)}${section('Declined',data.declined)}${section('Follow-up',data.followUp)}</div>
    <div class="shared-status-bottom"><article><h3>What changed</h3><ul>${data.changes.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article><h3>Current blockers</h3><ul>${data.blockers.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article><h3>Approaching deadlines</h3><ul>${data.deadlines.map(x=>`<li><b>${esc(x.date)}:</b> ${esc(x.detail)}</li>`).join('')}</ul></article><article><h3>Next priority actions</h3><ol>${data.actions.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></article></div>`;
    head.insertAdjacentElement('afterend',box);
    const nav=root.querySelector('.admin-suite-tabs');
    const details=document.createElement('details');details.className='shared-tools-fold';details.innerHTML='<summary>Open forms and source files</summary><div></div>';
    const body=details.querySelector('div');
    [...root.children].filter(n=>n!==head&&n!==box&&n!==nav).forEach(n=>body.appendChild(n));
    if(nav)details.insertAdjacentElement('afterend',nav);root.appendChild(details);
    const style=document.createElement('style');style.textContent='.shared-status-board{margin:18px 0 24px;padding:18px;background:#f5f3ee;border-radius:18px;color:#18212b}.shared-status-head{display:flex;gap:20px;justify-content:space-between;align-items:flex-start;padding:18px;border-radius:14px;background:#142330;color:#fff}.shared-status-head h2{margin:8px 0}.shared-status-head p{margin:6px 0}.shared-status-head small{opacity:.8}.shared-status-metrics{display:grid;grid-template-columns:auto auto;gap:3px 10px;font-size:13px}.shared-status-metrics b{font-size:17px}.shared-status-groups{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:14px}.shared-status-card,.shared-status-bottom article{background:#fff;border-radius:14px;padding:16px;border:1px solid #e1e3e5}.shared-status-card h3,.shared-status-bottom h3{margin:0 0 8px}.shared-status-card ul,.shared-status-bottom ul,.shared-status-bottom ol{padding-left:20px;margin:0}.shared-status-card li,.shared-status-bottom li{margin:7px 0;line-height:1.45}.shared-status-bottom{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:14px}.shared-tools-fold{margin-top:16px}.shared-tools-fold>summary{cursor:pointer;font-weight:700;padding:12px;background:#fff;border-radius:10px}@media(max-width:760px){.shared-status-head{display:block}.shared-status-metrics{margin-top:14px}.shared-status-groups,.shared-status-bottom{grid-template-columns:1fr}}';document.head.append(style);
    return true;
  }
  async function install(){
    if(document.getElementById('festivalSharedStatus'))return true;
    try{const r=await fetch('/api/festival-status',{cache:'no-store'});if(!r.ok)return false;return render(await r.json());}catch(_){return false;}
  }
  let n=0;const timer=setInterval(async()=>{n++;if(await install()||n>60)clearInterval(timer);},500);
})();