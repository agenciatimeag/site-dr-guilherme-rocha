// Ajustes de conversão e velocidade aplicados a TODAS as páginas na montagem do site (não vai para o público).
// 1) Sem animações: tudo aparece na hora (só o slider de casos continua andando).
// 2) Imagens fora da primeira tela carregam só quando a pessoa chega nelas; a imagem principal tem prioridade.
// 3) Botão fixo de WhatsApp (barra no celular, botão flutuante no computador).
// 4) Textos persuasivos: botões, chamadas finais e topo das páginas de tratamento.
const WA = 'https://api.whatsapp.com/send?phone=5527995223099&amp;text=x'; // a mensagem é trocada pelo build.js (WA_MSG)
const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>';

const CSS = `<style id="perf">
html body *:not(.cs-track),html body *:not(.cs-track)::before,html body *:not(.cs-track)::after{animation:none!important;transition:none!important}
.rv,.up,.hf-in,.sw>span,.ch,.hf-cut{opacity:1!important}
.rv,.up,.hf-in,.sw>span,.ch{transform:none!important}
.hfx,.hf-spot,.hglow,.hglow2,.hripple,.progress,.hf-scroll{display:none!important}
html{scroll-behavior:auto!important}
@media (max-width:760px){.marquee{display:none!important}*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}.nav-in{background:rgba(255,255,255,.97)!important}.on-hero .nav-in{background:rgba(12,13,9,.92)!important}}
.wa-fix{position:fixed;z-index:9990;display:flex;align-items:center;justify-content:center;gap:10px;background:#1FA855;color:#fff!important;font:600 1rem/1.1 var(--sans,Arial,sans-serif);text-decoration:none!important;box-shadow:0 10px 30px -8px rgba(0,0,0,.45)}
.wa-fix svg{width:24px;height:24px;flex:0 0 auto}
.wa-fix small{display:block;font-weight:500;font-size:.72rem;opacity:.9}
@media (max-width:760px){.wa-fix{left:10px;right:10px;bottom:calc(10px + env(safe-area-inset-bottom,0px));min-height:58px;border-radius:16px;padding:8px 16px}body{padding-bottom:84px}}
@media (min-width:761px){.wa-fix{right:24px;bottom:24px;border-radius:999px;padding:14px 22px 14px 18px}}
.cta-micro{margin:2px 0 0;font-size:.82rem;opacity:.75;display:flex;align-items:center;gap:6px}
.hf .cta-micro{color:#E9EDE3;justify-content:center;font-size:.82rem!important;max-width:none!important}
@media (min-width:761px){.hf .cta-micro{justify-content:flex-start}}
.cta-micro .g5{color:#F5B301;font-weight:600}
.hf-proof .g5{color:#F5B301}
@media (max-width:760px){.hf-proof li{padding:0 12px!important}.hf-content>p.hf-in.h2{display:block!important;font-size:.95rem!important;line-height:1.45!important;color:rgba(244,245,240,.8)!important;max-width:36ch!important;margin:0 auto!important}.hf-cut{height:min(44svh,390px)!important}}
.cta .lead-cta{margin:0;color:inherit;opacity:.85;font-size:1.05rem;line-height:1.5;max-width:46ch}
</style>`;

const STICKY = `<a class="wa-fix" href="${WA}" target="_blank" rel="noopener" aria-label="Agendar consulta pelo WhatsApp">${WA_ICON}<span>Agendar minha consulta<small>Resposta em segundos no WhatsApp</small></span></a>`;
// micro-prova abaixo do botão do topo das páginas internas (a home já mostra os números no topo; o tempo de resposta fica na barra fixa)
const MICRO = '<p class="cta-micro"><span><b class="g5">★ 5,0</b> no Google · 15+ anos de prática · CRM-ES 11007</span></p>';

// ---------- Textos ----------
const GLOBAL = [
  [/>Agende sua avaliação hormonal</g, '>Agendar minha avaliação hormonal<'],
  [/>Agende sua consulta de avaliação</g, '>Quero agendar minha avaliação<'],
  [/>Agende sua avaliação(<|\s*<)/g, '>Agendar minha consulta$1'],
  [/>Iniciar conversa no WhatsApp</g, '>Agendar pelo WhatsApp<'],
  [/>Iniciar conversa(<span)/g, '>Falar com a equipe agora$1'],
  [/>Próximo passo</g, '>Resposta em segundos<'],
  [/Toda mudança consistente começa com <span class="it">uma boa conversa\.<\/span><\/h2>/g,
    'Você já esperou demais. <span class="it">Fale com a equipe agora.</span></h2>\n  <p class="lead-cta">Chame no WhatsApp: a equipe responde em segundos, faz uma triagem rápida do seu caso e já reserva o seu horário com o Dr. Guilherme.</p>'],
];

const NODES = require('./build-copy.js'); // textos de cada página (original → novo)
const PAGES = {
  'index.html': [
    [/<li><b>\+10 mil<\/b> vidas transformadas<\/li><\/ul>/, '<li><b>+10 mil</b> vidas transformadas</li><li><b class="g5">★ 5,0</b> no Google</li></ul>'],
    [/O mais alto nível de acompanhamento do <span class="it">Instituto\.<\/span>/, 'Programa Platinum: <span class="it">o método exclusivo do Dr. Guilherme.</span>'],
    [/(<h1 class="hf-in h1">)[\s\S]*?(<\/h1>)/, '$1Emagrecimento e menopausa <span class="it">com abordagem metabólica.</span>$2'],
    [/<p class="hf-in h2">[^<]*<\/p>/, '<p class="hf-in h2">Há mais de 15 anos ajudando pessoas a emagrecer em Guarapari, principalmente depois dos 40, quando dieta sozinha já não funciona.</p>'],
    [/Será um prazer <span class="it">receber você\.<\/span>/, 'Seu horário está a <span class="it">uma mensagem de distância.</span>'],
    [/O agendamento é feito pelo WhatsApp\. A equipe do Instituto responde e reserva o melhor horário para você\./, 'Mande uma mensagem agora: a equipe responde em segundos, faz uma triagem rápida e já reserva o seu horário.'],
    [/(<summary>Como agendar a avaliação\?<i><\/i><\/summary><p>)[^<]*/, '$1Toque em qualquer botão “Agendar minha consulta”. A equipe responde em segundos no WhatsApp, faz uma triagem rápida do seu caso e já reserva o seu horário'],
  ],
};

// troca texto exato entre tags (preserva espaços e layout)
const escRe = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function nodes(s, f) {
  for (const [from, to] of NODES[f] || []) {
    const re = new RegExp('>(\\s*)' + escRe(from) + '(\\s*)<');
    if (!re.test(s)) { console.warn('[copy] texto não encontrado em', f, from.slice(0, 50)); continue; }
    s = s.replace(re, (m, a, b) => '>' + a + to + b + '<');
  }
  return s;
}

function apply(s, list, f) {
  for (const [re, to] of list) {
    if (!re.test(s)) { if (f) console.warn('[copy] não encontrado em', f, String(re).slice(0, 70)); re.lastIndex = 0; continue; }
    re.lastIndex = 0; s = s.replace(re, to);
  }
  return s;
}
const copyText = (s, f) => apply(apply(nodes(s, f), GLOBAL), PAGES[f] || [], f);

// textos dentro do JSON de partes do blog (tpl-parts.json): aplica em cada texto, sem quebrar o JSON
function copyJson(raw) {
  const walk = v => typeof v === 'string' ? copyText(v) : Array.isArray(v) ? v.map(walk) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)])) : v;
  try { return JSON.stringify(walk(JSON.parse(raw))); } catch (e) { return raw; }
}

const NO_STICKY = ['admin.html', 'forms.html', 'obrigado.html'];

function perf(html, f) {
  if (f === 'admin.html') return html;
  html = copyText(html, f);
  // micro-texto de confiança logo abaixo do primeiro botão de agendamento do topo
  html = html.replace(/(<div class="hero-ctas up u3"[^>]*>[\s\S]*?<\/a><\/div>)/, '$1' + MICRO);
  // imagens: a primeira imagem de conteúdo tem prioridade; as outras carregam sob demanda
  let first = true;
  html = html.replace(/<img\b([^>]*)>/g, (m, a) => {
    if (/logo-img|class="fm-|ty-/.test(a)) return m;
    if (first) { first = false; return /fetchpriority/.test(a) ? m : `<img fetchpriority="high"${a}>`; }
    if (/\bloading=/.test(a)) return m;
    return `<img loading="lazy" decoding="async"${a}>`;
  });
  if (!NO_STICKY.includes(f) && !html.includes('class="wa-fix"')) html = html.replace('</body>', STICKY + '\n</body>');
  return html.replace('</head>', CSS + '</head>');
}

module.exports = { perf, copyText, copyJson };
