function isEnglish(){return document.body.classList.contains('lang-en')}

const roleTransliterations={
  'caliph.html':{he:'חַ׳לִיפַה',en:'Khalīfa'},
  'emir.html':{he:'אַמִיר',en:'Amīr'},
  'sultan.html':{he:'סֻלְטָאן',en:'Sulṭān'},
  'vizier.html':{he:'וַזִיר',en:'Wazīr'},
  'grand-vizier.html':{he:'וַזִיר אַעְזַם',en:'Wazīr Aʿẓam'},
  'wali.html':{he:'וַאלִי',en:'Wālī'},
  'qadi.html':{he:'קַאדִי',en:'Qāḍī'},
  'qadi-al-qudat.html':{he:'קַאדִי אל־קֻדַאת',en:'Qāḍī al-Qudāt'},
  'mufti.html':{he:'מֻפְתִי',en:'Muftī'},
  'muhtasib.html':{he:'מֻחְתַסִב',en:'Muḥtasib'},
  'hajib.html':{he:'חַאגִ׳ב',en:'Ḥājib'},
  'katib.html':{he:'כַּאתִב',en:'Kātib'},
  'sahib-al-barid.html':{he:'צַאחִבּ אל־בַּרִיד',en:'Ṣāḥib al-Barīd'},
  'sharif.html':{he:'שַׁרִיף',en:'Sharīf'},
  'imam.html':{he:'אִמַאם',en:'Imām'}
};

function pagePrefix(){
  const path=window.location.pathname;
  if(path.includes('/roles/')||path.includes('/figures/')) return '../';
  return '';
}

function currentFile(){
  const parts=window.location.pathname.split('/').filter(Boolean);
  return parts[parts.length-1]||'index.html';
}

function renderUnifiedNav(){
  const header=document.querySelector('.site-header');
  if(!header) return;
  const p=pagePrefix();
  const file=currentFile();
  const inRoles=window.location.pathname.includes('/roles/');
  const inFigures=window.location.pathname.includes('/figures/');
  const active=(target)=> file===target || (target==='roles.html'&&inRoles) || (target==='figures.html'&&inFigures) ? 'active' : '';
  header.innerHTML=`
    <nav class="nav" aria-label="ניווט ראשי">
      <a class="brand" href="${p}index.html"><span class="brand-mark">☾</span><span>Islamic-Arab Government Roles</span></a>
      <div class="nav-links">
        <a class="${active('index.html')}" href="${p}index.html" data-lang="he">בית</a><a class="${active('index.html')}" href="${p}index.html" data-lang="en">Home</a>
        <a class="${active('introduction.html')}" href="${p}introduction.html" data-lang="he">מבוא</a><a class="${active('introduction.html')}" href="${p}introduction.html" data-lang="en">Intro</a>
        <a class="${active('timeline.html')}" href="${p}timeline.html" data-lang="he">ציר זמן</a><a class="${active('timeline.html')}" href="${p}timeline.html" data-lang="en">Timeline</a>
        <a class="${active('roles.html')}" href="${p}roles.html" data-lang="he">תפקידים</a><a class="${active('roles.html')}" href="${p}roles.html" data-lang="en">Roles</a>
        <a class="${active('institutions.html')}" href="${p}institutions.html" data-lang="he">מוסדות</a><a class="${active('institutions.html')}" href="${p}institutions.html" data-lang="en">Institutions</a>
        <a class="${active('military.html')}" href="${p}military.html" data-lang="he">צבא</a><a class="${active('military.html')}" href="${p}military.html" data-lang="en">Military</a>
        <a class="${active('law-religion.html')}" href="${p}law-religion.html" data-lang="he">משפט ודת</a><a class="${active('law-religion.html')}" href="${p}law-religion.html" data-lang="en">Law & Religion</a>
        <a class="${active('economy.html')}" href="${p}economy.html" data-lang="he">כלכלה</a><a class="${active('economy.html')}" href="${p}economy.html" data-lang="en">Economy</a>
        <a class="${active('glossary.html')}" href="${p}glossary.html" data-lang="he">מילון</a><a class="${active('glossary.html')}" href="${p}glossary.html" data-lang="en">Glossary</a>
        <a class="${active('figures.html')}" href="${p}figures.html" data-lang="he">דמויות</a><a class="${active('figures.html')}" href="${p}figures.html" data-lang="en">Figures</a>
        <a class="${active('sources.html')}" href="${p}sources.html" data-lang="he">מקורות</a><a class="${active('sources.html')}" href="${p}sources.html" data-lang="en">Sources</a>
        <a class="${active('about.html')}" href="${p}about.html" data-lang="he">אודות</a><a class="${active('about.html')}" href="${p}about.html" data-lang="en">About</a>
        <button class="language-toggle" type="button" id="languageToggle">English</button>
      </div>
    </nav>`;
}

function addRoleTransliteration(){
  if(!window.location.pathname.includes('/roles/')) return;
  const item=roleTransliterations[currentFile()];
  if(!item) return;
  const hero=document.querySelector('.hero');
  if(!hero || document.querySelector('.role-transliteration')) return;
  const lead=hero.querySelector('.lead');
  const block=document.createElement('div');
  block.className='card role-transliteration';
  block.innerHTML=`<h3 data-lang="he">תעתיק עברי מנוקד</h3><h3 data-lang="en">Vocalized Transliteration</h3><p data-lang="he"><strong>${item.he}</strong></p><p data-lang="en"><strong>${item.en}</strong></p>`;
  if(lead) lead.insertAdjacentElement('afterend',block); else hero.appendChild(block);
}

function applyLanguage(){
  const en=isEnglish();
  const t=document.getElementById('languageToggle');
  if(t)t.textContent=en?'עברית':'English';
  document.documentElement.lang=en?'en':'he';
  document.documentElement.dir=en?'ltr':'rtl';
  localStorage.setItem('siteLang',en?'en':'he')
}

function initLanguage(){
  if(localStorage.getItem('siteLang')==='en')document.body.classList.add('lang-en');
  applyLanguage();
  const t=document.getElementById('languageToggle');
  if(t)t.addEventListener('click',()=>{
    document.body.classList.toggle('lang-en');
    applyLanguage();
    if(typeof renderTimeline==='function')renderTimeline(0);
    if(typeof render==='function')render();
  })
}

function initModal(){
  const modal=document.getElementById('figureModal');
  if(!modal)return;
  const close=document.getElementById('closeModal');
  document.querySelectorAll('[data-modal-trigger]').forEach(trigger=>{
    trigger.addEventListener('click',(event)=>{
      event.preventDefault();
      const card=trigger.closest('[data-modal-name]');
      if(!card)return;
      document.getElementById('modalTitle').textContent=card.dataset.modalName;
      document.getElementById('modalYears').textContent=card.dataset.modalYears||'';
      document.getElementById('modalDescription').textContent=card.dataset.modalDescription||'';
      document.getElementById('modalInitials').textContent=card.dataset.modalInitials||'☾';
      modal.classList.add('open');
      close&&close.focus();
    })
  });
  function c(){modal.classList.remove('open')}
  close&&close.addEventListener('click',c);
  modal.addEventListener('click',e=>{if(e.target===modal)c()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')c()})
}

document.addEventListener('DOMContentLoaded',()=>{renderUnifiedNav();addRoleTransliteration();initLanguage();initModal()});
