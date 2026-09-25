(()=> {
  if((location.pathname.replace(/\\/index\\.html$/,'').replace(/\\/$/,'')||'/')!=='/admin')return;
  const SESSION='voigt-pta-board-session';
  const main=document.querySelector('main#main');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  async function post(data){const r=await fetch('/api/admin-reset',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Could not complete the request.');return j;}
  function attachReset(){
    const form=document.getElementById('adminLogin');
    if(!form||document.getElementById('adminResetRequest'))return;
    const button=document.createElement('button');
    button.id='adminResetRequest';button.type='button';button.className='btn secondary';
    button.textContent='Email me a password reset link';
    button.style.marginTop='10px';
    const status=document.getElementById('adminStatus');
    form.insertAdjacentElement('afterend',button);
    button.addEventListener('click',async()=>{
      const username=document.getElementById('adminUsername')?.value?.trim();
      if(!username){if(status)status.textContent='Enter your board username above first.';return;}
      button.disabled=true;if(status)status.textContent='Requesting secure reset link…';
      try{const result=await post({action:'request-reset',username});if(status)status.textContent=result.message||'Check the email address on file for a secure reset link.';}
      catch(error){if(status)status.textContent=error.message;}
      finally{button.disabled=false;}
    });
  }
  function resetScreen(token){
    if(!main)return;
    main.innerHTML='<section class="admin-shell"><div class="container admin-login"><div class="admin-login-card"><span class="mini-label">SECURE BOARD ACCESS</span><h1>Create a new password</h1><p>Choose a password with at least 12 characters. This reset link works once and expires after 30 minutes.</p><form id="adminResetForm"><label>New password<input id="resetPassword" type="password" autocomplete="new-password" minlength="12" required></label><label>Confirm password<input id="resetConfirm" type="password" autocomplete="new-password" minlength="12" required></label><button class="btn primary" type="submit">Save password</button></form><div id="resetStatus" class="newsletter-status" aria-live="polite"></div></div></div></section>';
    document.getElementById('adminResetForm').addEventListener('submit',async e=>{
      e.preventDefault();const a=document.getElementById('resetPassword').value,b=document.getElementById('resetConfirm').value,status=document.getElementById('resetStatus');
      if(a!==b){status.textContent='Passwords do not match.';return;}
      status.textContent='Saving…';
      try{const result=await post({action:'reset-password',token,newPassword:a});sessionStorage.setItem(SESSION,result.session);history.replaceState({},'',location.pathname);location.reload();}
      catch(error){status.textContent=error.message;}
    });
  }
  const token=new URLSearchParams(location.search).get('reset');
  if(token)resetScreen(token);
  else{
    attachReset();
    if(main)new MutationObserver(attachReset).observe(main,{childList:true,subtree:true});
  }
})();