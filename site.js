/* Estatísticas: os códigos oficiais do Google Analytics 4, do Microsoft Clarity e do Meta Pixel
   ficam no <head> de cada página (colocados pelo build.js). Aqui ficam só os eventos de clique no WhatsApp. */
window.dataLayer=window.dataLayer||[];if(!window.gtag)window.gtag=function(){dataLayer.push(arguments)};
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href*="wa.me"],a[href*="api.whatsapp"]');if(a)gtag('event','whatsapp_click',{page_path:location.pathname,link_text:(a.textContent||'').trim().slice(0,80)});},true);
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href*="wa.me"],a[href*="api.whatsapp"]');if(a&&window.fbq)fbq('track','Contact',{content_name:'WhatsApp',page:location.pathname});},true);

(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches,fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  /* toda página nova começa do topo (ou na âncora, se houver) */
  try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}
  function toTop(){if(location.hash&&location.hash.length>1){var t=document.getElementById(location.hash.slice(1));if(t){t.scrollIntoView({behavior:'instant',block:'start'});return}}window.scrollTo({top:0,left:0,behavior:'instant'})}
  toTop();window.addEventListener('load',toTop);window.addEventListener('pageshow',function(e){if(e.persisted)toTop()});
  var b=document.getElementById('burger'),d=document.getElementById('drawer');
  b.addEventListener('click',function(){var o=d.hidden;d.hidden=!o;b.setAttribute('aria-expanded',String(o))});
  d.addEventListener('click',function(e){if(e.target.closest('a')){d.hidden=true;b.setAttribute('aria-expanded','false')}});
  var nav=document.querySelector('.nav'),hf=document.querySelector('.hf,.ph-hero,.sb-hero,.art-hero'),pr=document.getElementById('prog');
  var hfp=document.querySelector('.hf-photo'),hfc=document.querySelector('.hf-content');
  var pimgs=[].slice.call(document.querySelectorAll('.about-r .ph img,.ph-img img,.cta .img img,.consult .ph img'));
  pimgs.forEach(function(im){im.classList.add('pxl')});
  function onScroll(){
    var y=window.scrollY,h=document.documentElement;
    nav.classList.toggle('on-hero',!!hf&&y<hf.offsetHeight-90);
    nav.classList.toggle('scrolled',y>30);
    if(pr)pr.style.width=(y/(h.scrollHeight-h.clientHeight)*100)+'%';
    if(reduce)return;
    if(hfp&&y<window.innerHeight*1.2){hfp.style.transform='translate3d(0,'+(y*.28)+'px,0)';if(hfc){hfc.style.transform='translate3d(0,'+(y*-.08)+'px,0)';hfc.style.opacity=Math.max(0,1-y/(window.innerHeight*.7))}}
    var hn=document.querySelector('.hf-name');if(hn&&y<window.innerHeight*1.2){hn.style.transform='translate3d('+(window.__mx||0)*-14+'px,'+(y*.45)+'px,0)';hn.style.opacity=Math.max(0,1-y/(window.innerHeight*.8));if(hfc){hfc.style.opacity=Math.max(0,1-y/(window.innerHeight*.6))}}
    var vh=window.innerHeight;
    pimgs.forEach(function(im){var r=im.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;var o=(r.top+r.height/2-vh/2)/vh;im.style.transform='translate3d(0,'+(o*-40)+'px,0) scale(1.12)'});
  }
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);

  /* hero: brilho que segue o mouse e ondas no clique */
  var hfEl=document.querySelector('.hf'),hg=document.getElementById('hglow');
  if(hfEl&&hg&&fine&&!reduce){var gx=0,gy=0,tx=0,ty=0,run=false;
    function gl(){gx+=(tx-gx)*.12;gy+=(ty-gy)*.12;if(Math.abs(tx-gx)+Math.abs(ty-gy)>.5)requestAnimationFrame(gl);else run=false}
    var hcut=document.querySelector('.hf-cut'),hnm=document.querySelector('.hf-name');
    hfEl.addEventListener('pointermove',function(e){var r=hfEl.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;var mx=(e.clientX/r.width-.5);window.__mx=mx;if(hcut&&!hcut.getAnimations().some(function(a){return a.playState==='running'}))hcut.style.transform='translateX(-50%) translateX('+(mx*10)+'px)';if(hnm&&window.scrollY<50)hnm.style.transform='translate3d('+(mx*-18)+'px,0,0)';hfEl.classList.add('glow-on');if(!run){run=true;requestAnimationFrame(gl)}});
    hfEl.addEventListener('pointerleave',function(){hfEl.classList.remove('glow-on')});
    hfEl.addEventListener('click',function(e){if(e.target.closest('a,button'))return;var r=hfEl.getBoundingClientRect(),d=document.createElement('span');d.className='hripple';d.style.left=(e.clientX-r.left)+'px';d.style.top=(e.clientY-r.top)+'px';hfEl.appendChild(d);setTimeout(function(){d.remove()},1000)});
  }
  /* luz nos cards */
  if(fine){
    document.querySelectorAll('.area:not(.photo),.step,a.c-card:not(.inst),.cred,.post,.imp-item,.pl-card,.faq-help').forEach(function(el){el.classList.add('spot')});
    document.querySelectorAll('.plt,.pl').forEach(function(el){el.classList.add('spot','spot-gold')});
    document.querySelectorAll('.spot').forEach(function(el){el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')})});
  }
  /* FAQ com abertura suave */
  function closeD(o){var ww=o.querySelector('.ans');if(!reduce&&ww&&ww.animate){var hh=ww.offsetHeight;ww.animate([{height:hh+'px',opacity:1},{height:'0px',opacity:0}],{duration:320,easing:'cubic-bezier(.2,.7,.2,1)'}).onfinish=function(){o.open=false}}else{o.open=false}}
  document.querySelectorAll('details').forEach(function(dt){
    dt.addEventListener('toggle',function(){if(!dt.open)return;var box=dt.closest('section')||document;box.querySelectorAll('details[open]').forEach(function(o){if(o!==dt)closeD(o)})});
    var s=dt.querySelector('summary'),p=dt.querySelector('summary ~ *');if(!p)return;
    var w=document.createElement('div');w.className='ans';p.parentNode.insertBefore(w,p);w.appendChild(p);
    s.addEventListener('click',function(e){
      if(reduce||!w.animate)return;e.preventDefault();
      if(dt.open){var h=w.offsetHeight;w.animate([{height:h+'px',opacity:1},{height:'0px',opacity:0}],{duration:320,easing:'cubic-bezier(.2,.7,.2,1)'}).onfinish=function(){dt.open=false}}
      else{dt.open=true;var h2=w.offsetHeight;w.animate([{height:'0px',opacity:0},{height:h2+'px',opacity:1}],{duration:450,easing:'cubic-bezier(.2,.7,.2,1)'})}
    });
  });
  /* depoimentos: abre o vídeo do YouTube em tela cheia */
  document.querySelectorAll('.yt').forEach(function(c){c.addEventListener('click',function(e){
    var tr=c.closest('.vt-track');if(tr&&tr.classList.contains('drag'))return;
    var id=c.getAttribute('data-yt'),sh=c.getAttribute('data-short')==='1';
    var m=document.createElement('div');m.className='ytm';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
    m.innerHTML='<button class="ytm-x" aria-label="Fechar vídeo">×</button><div class="ytm-box'+(sh?' short':'')+'"><iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0&playsinline=1&modestbranding=1" title="Depoimento em vídeo" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
    document.body.appendChild(m);document.documentElement.style.overflow='hidden';requestAnimationFrame(function(){m.classList.add('on')});
    function close(){m.classList.remove('on');document.documentElement.style.overflow='';document.removeEventListener('keydown',esc);setTimeout(function(){m.remove()},300)}
    function esc(ev){if(ev.key==='Escape')close()}
    m.addEventListener('click',function(ev){if(ev.target===m||ev.target.closest('.ytm-x'))close()});document.addEventListener('keydown',esc);
    if(window.gtag)gtag('event','video_depoimento',{video_id:id});
  })});
  /* arrastar depoimentos */
  var tr=document.querySelector('.vt-track');
  if(tr&&fine){var down=false,sx=0,sl=0,moved=0;
    tr.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=0;sx=e.clientX;sl=tr.scrollLeft});
    window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;moved=Math.abs(dx);if(moved>6)tr.classList.add('drag');tr.scrollLeft=sl-dx});
    window.addEventListener('pointerup',function(){if(!down)return;down=false;setTimeout(function(){tr.classList.remove('drag')},0)});
    tr.addEventListener('click',function(e){if(moved>6){e.preventDefault();e.stopPropagation();moved=0}},true);
  }
  /* blog: mostra sempre os artigos mais recentes publicados pelo painel */
  (function(){var boxes=document.querySelectorAll('[data-latest]'),cnt=document.querySelectorAll('[data-count]');if(!boxes.length&&!cnt.length)return;
    if(!/^https?:$/.test(location.protocol))return;
    var esc=function(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
    fetch('/api/posts',{headers:{'Accept':'application/json'}}).then(function(r){return r.ok?r.json():null}).then(function(d){if(!d||!d.posts||!d.posts.length)return;
      var ps=d.posts.filter(function(p){return p.status==='published'||!p.status});
      cnt.forEach(function(c){c.textContent=ps.length});
      boxes.forEach(function(b){var n=+b.getAttribute('data-latest')||3,cat=b.getAttribute('data-cat');var list=(cat?ps.filter(function(p){return p.category===cat}):ps).slice(0,n);if(list.length<n&&!cat)return;if(!list.length)return;
        b.innerHTML=list.map(function(p){return '<a class="post rv in" href="/blog/'+esc(p.slug)+'" data-cat="'+esc(p.category)+'"><div class="cover" style="background-image:url('+esc(p.cover)+');background-size:cover;background-position:50% 35%"></div><div class="meta"><b>'+esc(p.category)+'</b>· '+(p.min||4)+' min de leitura</div><h3>'+esc(p.title)+'</h3><p class="by">Por '+esc(p.author||'Dr. Guilherme Rocha')+'</p><span class="read">Ler artigo <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 8h12M9 3l5 5-5 5"/></svg></span></a>'}).join('')})
    }).catch(function(){})})();
  /* transição entre páginas */
  document.querySelectorAll('a[href$=".html"],a[href*=".html#"],a[href^="/"]:not([href^="//"]):not([target])').forEach(function(a){a.addEventListener('click',function(e){if(reduce||e.metaKey||e.ctrlKey||a.target==='_blank')return;e.preventDefault();document.body.classList.add('leaving');setTimeout(function(){location.href=a.href},320)})});
  window.addEventListener('pageshow',function(){document.body.classList.remove('leaving')});
  if(reduce||!('IntersectionObserver' in window))return;
  /* títulos palavra por palavra */
  document.querySelectorAll('.rv h2, h2.rv, .head h2, .faq-l h2').forEach(function(h){
    var i=0;(function walk(n){[].slice.call(n.childNodes).forEach(function(c){
      if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(t){if(!t)return;if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(t));return}var o=document.createElement('span');o.className='sw';var inn=document.createElement('span');inn.textContent=t;inn.style.setProperty('--i',i++);o.appendChild(inn);f.appendChild(o)});c.parentNode.replaceChild(f,c)}
      else if(c.nodeType===1&&!c.classList.contains('sw')){var cs=getComputedStyle(c);if((cs.webkitBackgroundClip||cs.backgroundClip)==='text'){o=document.createElement('span');o.className='sw';var inn2=document.createElement('span');inn2.style.setProperty('--i',i++);c.parentNode.insertBefore(o,c);inn2.appendChild(c);o.appendChild(inn2)}else walk(c)}})})(h);
    if(!h.closest('.rv'))h.classList.add('rv');
  });
  /* letras do nome no rodapé */
  document.querySelectorAll('.wordmark').forEach(function(w){var i=0;(function walk(n){[].slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split('').forEach(function(ch){var s=document.createElement('span');s.className='ch';s.textContent=ch===' '?' ':ch;s.style.setProperty('--i',i++);f.appendChild(s)});c.parentNode.replaceChild(f,c)}else if(c.nodeType===1)walk(c)})})(w)});
  /* revelar ao rolar, em cascata */
  var els=[].slice.call(document.querySelectorAll('.rv')),vh=window.innerHeight;
  els.forEach(function(el){var sib=[].slice.call(el.parentElement.children).filter(function(x){return x.classList.contains('rv')});var k=sib.indexOf(el);if(sib.length>1)el.style.setProperty('--d',Math.min(k,5)*90+'ms')});
  document.documentElement.classList.add('js');
  els.forEach(function(el){if(el.getBoundingClientRect().top<vh)el.classList.add('in')});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:(window.innerWidth<760?'0px 0px 6% 0px':'0px 0px -10% 0px')});
  els.forEach(function(el){if(!el.classList.contains('in'))io.observe(el)});
})();
