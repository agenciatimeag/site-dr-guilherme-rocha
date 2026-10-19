// Ajustes da página inicial feitos na montagem do site (não vai para o público).
// 1) Casos de sucesso: slider logo abaixo do topo, montado com as fotos caso-1.jpg, caso-2.jpg... que estiverem no repositório.
//    Legendas opcionais em casos.json, ex.: { "caso-1.jpg": "Acompanhamento de 6 meses no Programa Platinum" }
//    Sem nenhuma foto caso-*, a seção não aparece.
// 2) Ordem: topo → casos de sucesso → áreas de atuação → sobre o Dr. Guilherme → restante.
// 3) Botão "Agendar minha consulta" no fim de cada dobra.
const fs = require('fs');
const path = require('path');

const WA = 'https://api.whatsapp.com/send?phone=5527995223099&amp;text=agendar';
const ARROW = '<span class="ic"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8h12M9 3l5 5-5 5"/></svg></span>';
const LABEL = 'Agendar minha consulta';
const cta = (extra = '') => `<div class="wrap"><div class="cta-fold${extra}"><a class="btn btn-dark cta-big" href="${WA}" target="_blank" rel="noopener">${LABEL}${ARROW}</a><small>Atendimento pelo WhatsApp · resposta da equipe do Instituto</small></div></div>`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CSS = `<style>
.cta-fold{display:flex;flex-direction:column;align-items:center;gap:10px;margin-top:clamp(32px,4vw,48px);text-align:center}
.cta-fold small{color:var(--muted);font-size:.82rem}
.cta-big{padding:9px 9px 9px 26px;font-size:1rem;box-shadow:0 10px 30px -12px rgba(29,34,27,.45)}
.cta-big .ic{width:38px;height:38px}
@media (max-width:760px){.cta-fold{align-items:stretch}.cta-big{display:flex!important;justify-content:space-between;width:100%;font-size:1.02rem;font-weight:600;padding:10px 10px 10px 22px;min-height:56px}}
#casos .cs{position:relative;margin-top:8px}
.cs-track{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:4px;-webkit-overflow-scrolling:touch}
.cs-track::-webkit-scrollbar{display:none}
.cs-slide{position:relative;flex:0 0 calc((100% - 32px)/3);scroll-snap-align:start;margin:0;background:var(--card);border:1px solid var(--line);border-radius:var(--r-lg);overflow:hidden;display:flex;flex-direction:column}
.cs-slide img{display:block;width:100%;height:auto;aspect-ratio:9/10;object-fit:cover;background:#E7EAE2}
.cs-slide figcaption{padding:14px 18px 18px;font-size:.92rem;color:var(--ink);line-height:1.45}
.cs-slide figcaption b{display:block;font:600 .78rem var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--gold-deep);margin-bottom:4px}
.cs-ba{position:absolute;left:0;right:0;top:12px;display:flex;justify-content:space-around;pointer-events:none}.cs-ba i{font:600 .7rem var(--sans);font-style:normal;letter-spacing:.08em;text-transform:uppercase;background:rgba(20,23,15,.72);color:#fff;padding:5px 10px;border-radius:99px;backdrop-filter:blur(4px)}
.cs-nav{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:20px}
.cs-btn{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--ink);display:grid;place-items:center;cursor:pointer;transition:background .25s,color .25s}
.cs-btn:hover{background:var(--olive);color:#fff}
.cs-btn svg{width:16px;height:16px}
.cs-dots{display:flex;gap:8px}
.cs-dots button{width:8px;height:8px;border-radius:99px;border:0;padding:0;background:var(--line);cursor:pointer;transition:width .3s,background .3s}
.cs-dots button[aria-current="true"]{width:24px;background:var(--olive)}
.cs-note{color:var(--muted);font-size:.8rem;text-align:center;margin-top:14px}
@media (max-width:1000px){.cs-slide{flex-basis:calc((100% - 16px)/2)}}
@media (max-width:640px){.cs-slide{flex-basis:84%}}
</style>`;

const JS = `<script>(function(){var r=document.querySelector('[data-cs]');if(!r)return;var t=r.querySelector('.cs-track'),s=[].slice.call(t.children),d=r.querySelector('.cs-dots'),i=0,timer;
s.forEach(function(_,k){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Ir para o caso '+(k+1));b.onclick=function(){go(k);stop()};d.appendChild(b)});
function pos(el){return el.getBoundingClientRect().left-t.getBoundingClientRect().left+t.scrollLeft}
function go(k){i=(k+s.length)%s.length;t.scrollTo({left:pos(s[i]),behavior:'smooth'})}
function mark(){var x=t.scrollLeft,best=0,m=1e9;s.forEach(function(el,k){var dd=Math.abs(pos(el)-x);if(dd<m){m=dd;best=k}});i=best;[].forEach.call(d.children,function(b,k){b.setAttribute('aria-current',k===i?'true':'false')})}
t.addEventListener('scroll',function(){clearTimeout(t._m);t._m=setTimeout(mark,80)},{passive:true});
r.querySelector('.cs-prev').onclick=function(){go(i-1);stop()};r.querySelector('.cs-next').onclick=function(){go(i+1);stop()};
function stop(){clearInterval(timer)}
if(s.length>1&&!matchMedia('(prefers-reduced-motion: reduce)').matches){timer=setInterval(function(){var end=t.scrollLeft+t.clientWidth>=t.scrollWidth-4;go(end?0:i+1)},5000);['pointerdown','touchstart','mouseenter'].forEach(function(e){t.addEventListener(e,stop,{passive:true})})}
if(s.length<2)r.querySelector('.cs-nav').style.display='none';mark()})();</script>`;

function casesSection(root) {
  const fotos = fs.readdirSync(root).filter(f => /^caso-\d+\.(jpe?g|png|webp)$/i.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));
  if (!fotos.length) return '';
  let leg = {};
  try { leg = JSON.parse(fs.readFileSync(path.join(root, 'casos.json'), 'utf8')); } catch (e) { leg = {}; }
  const slides = fotos.map((f, k) => {
    const txt = leg[f] || '';
    const alt = 'Caso de sucesso ' + (k + 1) + ' de paciente do Dr. Guilherme Rocha' + (txt ? ': ' + txt : '');
    return `<figure class="cs-slide"><img src="/${f}" alt="${esc(alt)}" width="900" height="1000" loading="lazy" decoding="async"><span class="cs-ba" aria-hidden="true"><i>Antes</i><i>Depois</i></span>`
      + (txt ? `<figcaption><b>Caso ${k + 1}</b>${esc(txt)}</figcaption>` : '') + '</figure>';
  }).join('');
  const prev = '<button type="button" class="cs-btn cs-prev" aria-label="Caso anterior"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 8H2M7 3 2 8l5 5"/></svg></button>';
  const next = '<button type="button" class="cs-btn cs-next" aria-label="Próximo caso"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8h12M9 3l5 5-5 5"/></svg></button>';
  return `
<section id="casos" style="padding-top:clamp(48px,7vw,96px)">
  <div class="wrap">
    <div class="areas-head rv" style="margin-bottom:32px"><div class="head"><span class="tag">Casos de sucesso</span><h2>Resultados de quem <span class="it">confiou no processo.</span></h2></div><p class="sub">Pacientes do Instituto, acompanhados de perto pelo Dr. Guilherme. Imagens publicadas com autorização.</p></div>
    <div class="cs" data-cs><div class="cs-track">${slides}</div><div class="cs-nav">${prev}<div class="cs-dots"></div>${next}</div></div>
    <p class="cs-note">Resultados variam de pessoa para pessoa e dependem de avaliação e acompanhamento médico individual.</p>
  </div>
  ${cta()}
</section>
${JS}
`;
}

// devolve [inicio, fim] da seção <section ...> que casa com a regex (as seções da home não são aninhadas)
function range(html, re) {
  const m = html.match(re);
  if (!m) return null;
  return [m.index, html.indexOf('</section>', m.index) + '</section>'.length];
}

module.exports = function home(html, root) {
  if (html.includes('id="casos"') || html.includes('cta-fold')) return html;
  // dá um id à seção do Platinum para poder localizá-la
  html = html.replace(/<section style="padding-top:0">(\s*<div class="wrap">\s*<div class="plt)/, '<section id="platinum-home" style="padding-top:0">$1');

  // botão "Agendar minha consulta" no fim de cada dobra
  for (const id of ['tratamentos', 'platinum-home', 'depoimentos', 'como-funciona', 'blog', 'duvidas']) {
    const r = range(html, new RegExp('<section[^>]*id="' + id + '"[^>]*>'));
    if (!r) continue;
    const sec = html.slice(r[0], r[1]);
    html = html.slice(0, r[0]) + sec.replace(/<\/section>$/, '  ' + cta() + '\n</section>') + html.slice(r[1]);
  }

  // textos dos botões que já existiam
  html = html.replace(/(<a class="btn btn-light hf-in h3"[^>]*>)Agende sua avaliação/, '$1' + LABEL)
    .replace(/(<a class="btn btn-dark"[^>]*>)Agende sua avaliação(<span class="ic">[\s\S]{0,300}?<\/a><a class="btn btn-line" href="\/sobre")/, '$1' + LABEL + '$2')
    .replace('Agende pelo WhatsApp<span class="ic">', LABEL + '<span class="ic">');

  // nova ordem: casos de sucesso → áreas de atuação → sobre
  const rt = range(html, /<section[^>]*id="tratamentos"[^>]*>/);
  if (rt) {
    let trat = html.slice(rt[0], rt[1]);
    html = html.slice(0, rt[0]) + html.slice(rt[1]);
    trat = trat.replace('id="tratamentos" style="padding-top:0"', 'id="tratamentos" style="padding-top:clamp(56px,8vw,110px)"');
    html = html.replace('<section id="sobre" style="padding-top:clamp(40px,6vw,80px)">', trat + '\n\n<section id="sobre" style="padding-top:0">');
  }
  const casos = casesSection(root);
  if (casos) {
    html = html.replace('<section id="tratamentos" style="padding-top:clamp(56px,8vw,110px)"', casos + '\n<section id="tratamentos" style="padding-top:0"');
    html = html.replace('href="#sobre" aria-label="Rolar para o conteúdo"', 'href="#casos" aria-label="Rolar para o conteúdo"');
  } else {
    html = html.replace('href="#sobre" aria-label="Rolar para o conteúdo"', 'href="#tratamentos" aria-label="Rolar para o conteúdo"');
  }
  // miniaturas dos vídeos: usa sempre a hqdefault (a maxresdefault não existe em alguns vídeos e gerava erro 404 no console)
  html = html.replace(/(https:\/\/i\.ytimg\.com\/vi\/[\w-]+\/)maxresdefault\.jpg/g, '$1hqdefault.jpg')
    .replace(/ onload="if\(this\.naturalWidth&lt;=120\)[^"]*"/g, '')
    .replace(/ onerror="if\(this\.dataset\.f\)[^"]*"/g, ' onerror="this.style.opacity=0"');
  return html.replace('</head>', CSS + '</head>');
};
