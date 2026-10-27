/* Versão leve: sem animações. Os códigos de estatística (GA4, Clarity, Pixel, GTM) ficam no <head> (build.js).
   Aqui: eventos de clique no WhatsApp, menu, cabeçalho, dúvidas, vídeos de depoimento e artigos recentes do blog. */
window.dataLayer=window.dataLayer||[];if(!window.gtag)window.gtag=function(){dataLayer.push(arguments)};
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href*="wa.me"],a[href*="api.whatsapp"]');if(!a)return;
  var lbl=(a.textContent||'').trim().slice(0,80);
  try{gtag('event','whatsapp_click',{page_path:location.pathname,link_text:lbl,button_place:a.classList.contains('wa-fix')?'fixo':'pagina'})}catch(_){}
  try{if(window.fbq)fbq('track','Contact',{content_name:'WhatsApp',page:location.pathname})}catch(_){}
},true);

(function(){
  /* menu do celular */
  var b=document.getElementById('burger'),d=document.getElementById('drawer');
  if(b&&d){b.addEventListener('click',function(){var o=d.hidden;d.hidden=!o;b.setAttribute('aria-expanded',String(o))});
    d.addEventListener('click',function(e){if(e.target.closest('a')){d.hidden=true;b.setAttribute('aria-expanded','false')}})}

  /* cabeçalho: muda de cor sobre o topo escuro (sem efeitos de rolagem) */
  var nav=document.querySelector('.nav'),hf=document.querySelector('.hf,.ph-hero,.sb-hero,.art-hero'),tick=false;
  function upd(){tick=false;if(!nav)return;var y=window.scrollY;nav.classList.toggle('on-hero',!!hf&&y<hf.offsetHeight-90);nav.classList.toggle('scrolled',y>30)}
  upd();window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});

  /* dúvidas: uma aberta por vez */
  document.querySelectorAll('details').forEach(function(dt){dt.addEventListener('toggle',function(){if(!dt.open)return;var box=dt.closest('section')||document;
    box.querySelectorAll('details[open]').forEach(function(o){if(o!==dt)o.open=false})})});

  /* depoimentos: abre o vídeo do YouTube */
  document.querySelectorAll('.yt').forEach(function(c){c.addEventListener('click',function(){
    var id=c.getAttribute('data-yt'),sh=c.getAttribute('data-short')==='1';
    var m=document.createElement('div');m.className='ytm on';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
    m.innerHTML='<button class="ytm-x" aria-label="Fechar vídeo">×</button><div class="ytm-box'+(sh?' short':'')+'"><iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0&playsinline=1&modestbranding=1" title="Depoimento em vídeo" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
    document.body.appendChild(m);document.documentElement.style.overflow='hidden';
    function close(){document.documentElement.style.overflow='';document.removeEventListener('keydown',esc);m.remove()}
    function esc(ev){if(ev.key==='Escape')close()}
    m.addEventListener('click',function(ev){if(ev.target===m||ev.target.closest('.ytm-x'))close()});document.addEventListener('keydown',esc);
    try{gtag('event','video_depoimento',{video_id:id})}catch(_){}
  })});

  /* blog: mostra os artigos mais recentes publicados pelo painel (só quando a área aparece na tela) */
  var boxes=document.querySelectorAll('[data-latest]'),cnt=document.querySelectorAll('[data-count]');
  if((boxes.length||cnt.length)&&/^https?:$/.test(location.protocol)){
    var load=function(){
      var esc=function(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
      fetch('/api/posts',{headers:{'Accept':'application/json'}}).then(function(r){return r.ok?r.json():null}).then(function(dd){if(!dd||!dd.posts||!dd.posts.length)return;
        var ps=dd.posts.filter(function(p){return p.status==='published'||!p.status});
        cnt.forEach(function(c){c.textContent=ps.length});
        boxes.forEach(function(bx){var n=+bx.getAttribute('data-latest')||3,cat=bx.getAttribute('data-cat');var list=(cat?ps.filter(function(p){return p.category===cat}):ps).slice(0,n);if((list.length<n&&!cat)||!list.length)return;
          bx.innerHTML=list.map(function(p){return '<a class="post" href="/blog/'+esc(p.slug)+'" data-cat="'+esc(p.category)+'"><div class="cover" style="background-image:url('+esc(p.cover)+');background-size:cover;background-position:50% 35%"></div><div class="meta"><b>'+esc(p.category)+'</b>· '+(p.min||4)+' min de leitura</div><h3>'+esc(p.title)+'</h3><p class="by">Por '+esc(p.author||'Dr. Guilherme Rocha')+'</p><span class="read">Ler artigo</span></a>'}).join('')})
      }).catch(function(){})};
    var tgt=boxes[0]||cnt[0];
    if('IntersectionObserver' in window&&tgt){var io=new IntersectionObserver(function(es){if(es.some(function(x){return x.isIntersecting})){io.disconnect();load()}},{rootMargin:'400px'});io.observe(tgt)}else{setTimeout(load,3000)}
  }
})();
