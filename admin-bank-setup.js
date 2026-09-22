(()=> {
  const path=(location.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/');
  if(path!=='/admin')return;
  const sessionKey='voigt-pta-board-session';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  async function api(method='GET',body){
    const session=sessionStorage.getItem(sessionKey);
    if(!session)return null;
    const r=await fetch('/api/bank-setup',{
      method,
      headers:{'x-admin-session':session,...(body?{'Content-Type':'application/json'}:{})},
      body:body?JSON.stringify(body):undefined,
      cache:'no-store'
    });
    const j=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(j.error||'Banking setup request failed.');
    return j;
  }

  function statusCopy(status){
    if(status==='details_saved')return 'Banking details saved securely — ready for payment-provider connection.';
    return 'Banking setup has not been completed yet.';
  }

  async function render(){
    const root=document.getElementById('adminRoot');
    if(!root)return false;
    let data;
    try{data=await api();}catch{return false;}
    if(!data)return false;

    let el=document.getElementById('donationBankSetup');
    if(!el){
      el=document.createElement('section');
      el.id='donationBankSetup';
      el.className='admin-card';
      root.prepend(el);
    }

    if(!data.authorized){
      const d=data.details||{};
      el.innerHTML=`<div class="admin-section-title"><h2>Donation banking setup</h2><p>${esc(statusCopy(data.status))}</p></div>
        <div class="admin-callout"><strong>Privacy:</strong> full bank-account information is only available to the PTA President and Treasurer. Other board members can see setup status only.</div>
        ${data.status==='details_saved'?`<div class="admin-finance-grid" style="margin-top:12px"><div class="admin-finance-card"><strong>${esc(d.bankName||'Bank connected for setup')}</strong><span>Bank</span></div><div class="admin-finance-card"><strong>•••• ${esc(d.accountLast4||'')}</strong><span>Account ending</span></div><div class="admin-finance-card"><strong>${esc(data.updatedBy||'Board')}</strong><span>Last updated by</span></div></div>`:''}`;
      return true;
    }

    const d=data.details||{};
    el.innerHTML=`<div class="admin-section-title"><h2>Donation banking setup</h2><p>Enter the PTA banking information needed to activate secure online monetary donations.</p></div>
      <div class="admin-callout"><strong>Secure handling:</strong> routing and account numbers are encrypted before they are stored. Do not enter Social Security numbers, dates of birth, passwords, PINs, or online-banking credentials here. Any identity verification requested by the payment provider should be completed directly with that provider.</div>
      <form id="bankSetupForm" class="admin-bank-form" style="margin-top:16px">
        <div class="admin-bank-grid">
          <label>PTA legal name *<input name="legalName" value="${esc(d.legalName||'Xenia Voigt Arts Academy PTA')}" required></label>
          <label>EIN <input name="ein" value="${esc(d.ein||'')}" placeholder="Optional if not immediately available"></label>
          <label>Bank name *<input name="bankName" value="${esc(d.bankName||'')}" required></label>
          <label>Account holder name *<input name="accountHolder" value="${esc(d.accountHolder||'')}" required></label>
          <label>Routing number *<input name="routingNumber" inputmode="numeric" autocomplete="off" value="${esc(d.routingNumber||'')}" required></label>
          <label>Account number *<input name="accountNumber" inputmode="numeric" autocomplete="off" value="${esc(d.accountNumber||'')}" required></label>
          <label>Account type *<select name="accountType" required>
            <option value="">Select one</option>
            <option value="Checking" ${d.accountType==='Checking'?'selected':''}>Checking</option>
            <option value="Savings" ${d.accountType==='Savings'?'selected':''}>Savings</option>
          </select></label>
          <label>Authorized signer *<input name="authorizedSigner" value="${esc(d.authorizedSigner||'')}" required></label>
          <label>Signer title <input name="signerTitle" value="${esc(d.signerTitle||'')}"></label>
          <label>Signer email *<input type="email" name="signerEmail" value="${esc(d.signerEmail||'')}" required></label>
          <label>Signer phone <input type="tel" name="signerPhone" value="${esc(d.signerPhone||'')}"></label>
          <label class="full">Notes <textarea name="notes" placeholder="Anything Brittani/Rudy should know while activating the donation provider.">${esc(d.notes||'')}</textarea></label>
        </div>
        <div class="buttons left" style="margin-top:16px">
          <button class="btn primary" type="submit">Save banking details securely</button>
          ${data.status==='details_saved'?'<button class="btn secondary" type="button" id="clearBankSetup">Clear saved details</button>':''}
        </div>
        <p id="bankSetupStatus" role="status" style="margin-top:12px"></p>
      </form>
      <div class="admin-callout" style="margin-top:16px"><strong>What happens next:</strong> once these details are saved, the donation checkout can be connected so monetary sponsors can pay directly from the website. The payment provider may separately ask the authorized signer to complete identity verification.</div>
      <style>
        .admin-bank-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .admin-bank-grid label{display:flex;flex-direction:column;gap:6px;font-weight:800;font-size:13px}
        .admin-bank-grid input,.admin-bank-grid select,.admin-bank-grid textarea{width:100%;border:1.5px solid #222;border-radius:10px;padding:11px;font:inherit;background:#fff;color:#171717}
        .admin-bank-grid textarea{min-height:90px;resize:vertical}.admin-bank-grid .full{grid-column:1/-1}
        @media(max-width:760px){.admin-bank-grid{grid-template-columns:1fr}.admin-bank-grid .full{grid-column:auto}}
      </style>`;

    const form=document.getElementById('bankSetupForm');
    form?.addEventListener('submit',async e=>{
      e.preventDefault();
      const status=document.getElementById('bankSetupStatus');
      const btn=form.querySelector('button[type=submit]');
      if(!form.reportValidity())return;
      btn.disabled=true;btn.textContent='Saving securely…';status.textContent='';
      try{
        const body=Object.fromEntries(new FormData(form).entries());
        await api('POST',body);
        status.textContent='Saved. Banking setup information is ready for donation-provider connection.';
        await render();
      }catch(err){
        status.textContent=err.message;
        btn.disabled=false;btn.textContent='Save banking details securely';
      }
    });

    document.getElementById('clearBankSetup')?.addEventListener('click',async()=>{
      if(!confirm('Clear the saved banking details from the PTA portal?'))return;
      try{await api('DELETE');await render();}catch(err){alert(err.message);}
    });
    return true;
  }

  let attempts=0;
  const boot=setInterval(async()=>{attempts++; if(await render()||attempts>40)clearInterval(boot);},500);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
})();