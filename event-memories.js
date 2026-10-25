(()=>{
 const path=location.pathname.replace(/\/$/,'')||'/';if(path!=='/events')return;
 const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m]));
 function mount(){
  const main=document.querySelector('main#main');if(!main||document.getElementById('pta-photo-memories'))return;
  const section=document.createElement('section');section.id='pta-photo-memories';section.className='section';
  section.innerHTML=`<div class="container"><div class="memories-heading"><span class="mini-label">OUR COMMUNITY MEMORIES</span><h2>Past Events & Photo Galleries</h2><p>Celebrate moments from past PTA events. Submissions are private until reviewed and approved by the PTA.</p></div><article class="modern-panel accent memory-card"><span class="mini-label">OCTOBER 23, 2026 · COMPLETED</span><h3>Viking Quest Fall Festival 2026</h3><p>Thank you to our families, volunteers and community partners! Have photos to share? Add them to our community gallery for PTA review.</p><form id="memoryUpload"><label>Your name <input name="name" maxlength="100" autocomplete="name" required></label><label>Email <input name="email" type="email" maxlength="180" autocomplete="email" required></label><label>Photo <input name="photo" type="file" accept="image/jpeg,image/png,image/webp" required></label><label>Caption (optional) <input name="caption" maxlength="250"></label><label class="memory-check"><input type="checkbox" name="permission" required> I have permission to share this image, including permission from parents or guardians of identifiable children pictured. I understand the PTA may publish it after review.</label><input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="memory-honey"><button class="btn primary" type="submit">Submit photo for PTA approval</button><p id="memoryMessage" role="status"></p></form><h3>Approved memories</h3><div id="approvedMemories" class="memory-grid"><p>Loading gallery…</p></div></article><p class="memory-note">Photos are not displayed until the PTA approves them. Do not include private student information. Future completed PTA events will receive their own galleries.</p></div>`;
  main.appendChild(section);
  section.querySelector('#memoryUpload').addEventListener('submit',async e=>{
   e.preventDefault();const form=e.currentTarget,msg=section.querySelector('#memoryMessage'),button=form.querySelector('button');
   const file=form.elements.photo.files[0];
   if(!file||file.size>1400000){msg.textContent='Please choose a photo smaller than 1.4 MB.';return;}
   button.disabled=true;msg.textContent='Submitting securely…';
   try{
    const image=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});
    const response=await fetch('/api/event-photos?action=submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event:'viking-quest-2026',name:form.elements.name.value,email:form.elements.email.value,caption:form.elements.caption.value,permission:form.elements.permission.checked,website:form.elements.website.value,image})});
    const data=await response.json();if(!response.ok)throw Error(data.error||'Submission failed');
    form.reset();msg.textContent='Thank you! Your photo is private and awaiting PTA approval.';
   }catch(error){msg.textContent=error.message||'Could not submit photo.';}finally{button.disabled=false;}
  });
  fetch('/api/event-photos?action=approved').then(r=>r.ok?r.json():Promise.reject()).then(data=>{
   const list=section.querySelector('#approvedMemories');list.innerHTML=data.photos?.length?data.photos.map(p=>`<figure><img loading="lazy" src="${esc(p.url)}" alt="${esc(p.caption||'Community event memory')}"><figcaption>${esc(p.caption||'Viking Quest 2026')}</figcaption></figure>`).join(''):'<p>No approved photos yet. Be the first to contribute!</p>';
  }).catch(()=>{section.querySelector('#approvedMemories').textContent='Gallery is temporarily unavailable.';});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();setTimeout(mount,500);
})();