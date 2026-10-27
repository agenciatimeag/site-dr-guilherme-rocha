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
const cta = (extra = '') => `<div class="wrap"><div class="cta-fold${extra}"><a class="btn btn-dark cta-big" href="${WA}" target="_blank" rel="noopener">${LABEL}${ARROW}</a></div></div>`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CSS = `<style>
.cta-fold{display:flex;flex-direction:column;align-items:center;gap:10px;margin-top:clamp(32px,4vw,48px);text-align:center}
.cta-fold small{color:var(--muted);font-size:.82rem}
.cta-big{padding:9px 9px 9px 26px;font-size:1rem;box-shadow:0 10px 30px -12px rgba(29,34,27,.45)}
.cta-big .ic{width:38px;height:38px}
@media (max-width:760px){.cta-fold{align-items:stretch}.cta-big{display:flex!important;justify-content:space-between;width:100%;font-size:1.02rem;font-weight:600;padding:10px 10px 10px 22px;min-height:56px}}
#casos .cs{position:relative;margin-top:8px;overflow:hidden;-webkit-mask:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.cs-track{display:flex;gap:16px;width:max-content;animation:csmove var(--cs-dur,36s) linear infinite;will-change:transform}
.cs:hover .cs-track,.cs.hold .cs-track{animation-play-state:paused}
@keyframes csmove{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 8px))}}
.cs-slide{position:relative;flex:0 0 auto;width:clamp(260px,26vw,360px);margin:0;background:var(--card);border:1px solid var(--line);border-radius:var(--r-lg);overflow:hidden}
.cs-slide img{display:block;width:100%;height:auto;aspect-ratio:9/10;object-fit:cover;background:#E7EAE2}
.cs-slide figcaption{padding:14px 18px 18px;font-size:.92rem;color:var(--ink);line-height:1.45}
.cs-slide figcaption b{display:block;font:600 .78rem var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--gold-deep);margin-bottom:4px}
.cs-ba{position:absolute;left:0;right:0;top:12px;display:flex;justify-content:space-around;pointer-events:none}.cs-ba i{font:600 .7rem var(--sans);font-style:normal;letter-spacing:.08em;text-transform:uppercase;background:rgba(20,23,15,.72);color:#fff;padding:5px 10px;border-radius:99px;backdrop-filter:blur(4px)}
@media (max-width:640px){.cs-slide{width:74vw}#casos .cs{margin-inline:calc(var(--gut) * -1)}}
@media (prefers-reduced-motion:reduce){.cs-track{animation:none;width:auto;overflow-x:auto}.cs-slide.dup{display:none}}
.cs-note{color:var(--muted);font-size:.8rem;text-align:center;margin-top:14px}
.hf-eyebrow{font:500 .78rem/1.3 var(--sans)!important;letter-spacing:.12em;text-transform:uppercase;color:#E9D7A8!important;margin:0}
.hf-name{display:none!important}
.hf-proof{list-style:none;margin:2px 0 0;padding:0;display:flex;justify-content:center;align-items:stretch}
.hf-proof li{display:flex;flex-direction:column;align-items:center;gap:2px;padding:0 22px;font-size:.78rem;line-height:1.25;letter-spacing:.02em;color:rgba(244,245,240,.7);text-align:center}
.hf-proof li+li{border-left:1px solid rgba(233,215,168,.28)}
.hf-proof b{display:block;font:600 1.45rem/1 var(--display);letter-spacing:-.02em;color:#E9D7A8}
@keyframes cutupm{from{opacity:.001;transform:translateY(40px)}to{opacity:1;transform:none}}
@media (min-width:761px){
.hf{justify-content:center!important}
.hf-cut{left:auto!important;right:max(2vw,calc((100vw - 1280px)/2));transform:none!important;height:min(90vh,940px)!important;animation:cutupm 1.2s cubic-bezier(.16,1,.3,1) both!important}
.hf-spot{left:72%!important;top:42%!important}
.hf2::before{background:linear-gradient(90deg,rgba(12,13,9,.92) 0%,rgba(12,13,9,.6) 42%,rgba(12,13,9,0) 62%),linear-gradient(0deg,#0C0D09 0%,rgba(12,13,9,0) 22%)!important}
.hf-content{width:100%;max-width:1280px;margin:0 auto;box-sizing:border-box;text-align:left!important;justify-items:start!important;padding-block:110px 40px!important}
.hf h1{font-size:clamp(2.6rem,4.4vw,4.6rem)!important;max-width:15ch!important;line-height:1!important}
.hf p{max-width:40ch}
.hf-proof{justify-content:flex-start}.hf-proof li{align-items:flex-start;text-align:left}.hf-proof li:first-child{padding-left:0}
.hf-eyebrow{display:block;white-space:nowrap}
.hf-bar{position:absolute!important;bottom:0;left:0;right:0}
}
@media (max-width:760px){
.hf{height:auto!important;min-height:0!important;max-height:none!important;justify-content:flex-start!important;padding-top:84px!important}
.hf-spot{top:300px!important}
.hf-cut{position:relative!important;left:auto!important;bottom:auto!important;display:block;height:min(50svh,440px)!important;width:auto!important;margin:0 auto -64px!important;transform:none!important;animation:cutupm 1.2s cubic-bezier(.16,1,.3,1) both!important}
.hf2::before{background:linear-gradient(0deg,#0C0D09 0%,rgba(12,13,9,.96) 40%,rgba(12,13,9,.45) 53%,rgba(12,13,9,0) 64%)!important}
.hf-content{gap:12px!important;padding-bottom:calc(28px + env(safe-area-inset-bottom,0px))!important}
.hf h1{font-size:1.95rem!important;line-height:1.04!important;max-width:18ch!important}
.hf-content > p.hf-in.h2{display:none}
.hf-content{width:100%;box-sizing:border-box;min-width:0}.hf-proof li{padding:0 16px;font-size:.74rem}.hf-proof b{font-size:1.3rem}
.hf-bar{display:none!important}
.hf .btn{display:flex!important;justify-content:space-between;width:100%;max-width:420px;min-height:56px;font-size:1.02rem;font-weight:600;padding:10px 10px 10px 22px}
.hf2 .hf-in,.hf2 .hf-in.h1,.hf2 .hf-in.h2,.hf2 .hf-in.h3{animation-delay:.15s!important;animation-duration:.6s!important}
}
</style>`;

const JS = `<script>(function(){var r=document.querySelector('[data-cs]');if(!r)return;function on(){r.classList.add('hold')}function off(){r.classList.remove('hold')}r.addEventListener('touchstart',on,{passive:true});r.addEventListener('touchend',off,{passive:true});r.addEventListener('touchcancel',off,{passive:true})})();</script>`;

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
  });
  // segunda cópia (escondida de leitores de tela) para o movimento contínuo sem emendas
  const dup = slides.map(h => h.replace('<figure class="cs-slide">', '<figure class="cs-slide dup" aria-hidden="true">').replace(/ alt="[^"]*"/, ' alt=""')).join('');
  const dur = Math.max(20, fotos.length * 6);
  return `
<section id="casos" style="padding-top:clamp(48px,7vw,96px)">
  <div class="wrap">
    <div class="areas-head rv" style="margin-bottom:32px"><div class="head"><span class="tag">Casos de sucesso</span><h2>Pessoas reais que <span class="it">pararam de recomeçar.</span></h2></div></div>
    <div class="cs" data-cs style="--cs-dur:${dur}s"><div class="cs-track">${slides.join('')}${dup}</div></div>
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

  // primeira tela: prova (números) logo acima do botão; CRM e cidade ficam só no rodapé
  html = html
    .replace(/(<p class="hf-in h2">[\s\S]*?<\/p>)/, '$1\n    <ul class="hf-proof hf-in h2"><li><b>15+</b> anos de experiência</li><li><b>+10 mil</b> vidas transformadas</li></ul>');

  // título da primeira tela pensado para conversão
  html = html.replace(/(<h1 class="hf-in h1">)[\s\S]*?(<\/h1>)/, '$1Emagrecimento e menopausa com <span class="it">um médico olhando para você por inteiro.</span>$2');

  // sem a linha de etiquetas (15+ anos / olhar integrativo / CRM) no bloco sobre
  html = html.replace(/\s*<div class="chiprow"><span>15\+ anos de prática clínica<\/span>[\s\S]*?<\/div>/, '');

  // dúvidas que travam o contato: convênio e valor
  html = html.replace(/(<details><summary>Onde fica o consultório\?)/, '<details><summary>Atende por convênio?<i></i></summary><p>O atendimento é particular. A equipe do Instituto passa todas as informações pelo WhatsApp.</p></details>\n      <details><summary>Qual o valor da consulta?<i></i></summary><p>A equipe do Instituto informa o valor e as formas de pagamento pelo WhatsApp, junto com os horários disponíveis.</p></details>\n      $1');

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
