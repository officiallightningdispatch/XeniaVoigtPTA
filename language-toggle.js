(()=>{
  const STORAGE_KEY='voigt-site-language';
  const GOOGLE_COOKIE='googtrans';

  function getCookie(name){
    return document.cookie.split(';').map(v=>v.trim()).find(v=>v.startsWith(name+'='))?.split('=').slice(1).join('=')||'';
  }

  function currentLanguage(){
    const cookie=decodeURIComponent(getCookie(GOOGLE_COOKIE));
    if(cookie.endsWith('/es')) return 'es';
    return localStorage.getItem(STORAGE_KEY)==='es'?'es':'en';
  }

  function setTranslateCookie(lang){
    const value=lang==='es'?'/en/es':'/en/en';
    const host=location.hostname;
    document.cookie=`${GOOGLE_COOKIE}=${value};path=/;max-age=31536000;SameSite=Lax`;
    if(host.includes('.')) document.cookie=`${GOOGLE_COOKIE}=${value};path=/;domain=.${host};max-age=31536000;SameSite=Lax`;
    localStorage.setItem(STORAGE_KEY,lang);
  }

  function makeButton(){
    if(document.getElementById('languageToggle')) return;
    const lang=currentLanguage();
    const button=document.createElement('button');
    button.id='languageToggle';
    button.type='button';
    button.className='language-toggle notranslate';
    button.setAttribute('translate','no');
    button.setAttribute('aria-label',lang==='es'?'Switch website to English':'Cambiar el sitio web a español');
    button.title=lang==='es'?'English':'Español';
    button.innerHTML=`<span aria-hidden="true">🌐</span><span class="language-toggle-full">${lang==='es'?'English':'Español'}</span><span class="language-toggle-short">${lang==='es'?'EN':'ES'}</span>`;
    button.addEventListener('click',()=>{
      const next=currentLanguage()==='es'?'en':'es';
      setTranslateCookie(next);
      location.reload();
    });

    const actions=document.querySelector('.header-actions');
    if(actions) actions.insertBefore(button,actions.firstChild);
    else {
      button.classList.add('language-toggle-floating');
      document.body.appendChild(button);
    }
  }

  function addGoogleElement(){
    if(document.getElementById('google_translate_element')) return;
    const el=document.createElement('div');
    el.id='google_translate_element';
    el.className='notranslate';
    el.setAttribute('translate','no');
    document.body.appendChild(el);
  }

  window.googleTranslateElementInit=function(){
    if(!window.google?.translate?.TranslateElement) return;
    new google.translate.TranslateElement({
      pageLanguage:'en',
      includedLanguages:'en,es',
      autoDisplay:false
    },'google_translate_element');
  };

  function loadGoogleTranslate(){
    if(document.querySelector('script[data-voigt-translate]')) return;
    const s=document.createElement('script');
    s.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async=true;
    s.dataset.voigtTranslate='1';
    document.head.appendChild(s);
  }

  function init(){
    makeButton();
    addGoogleElement();
    loadGoogleTranslate();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
  setTimeout(makeButton,350);
  setTimeout(makeButton,900);
})();
