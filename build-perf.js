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
@media (max-width:760px){.hf-proof li{padding:0 12px!important}.hf-content>p.hf-in.h2{display:block!important;font-size:.95rem!important;line-height:1.45!important;color:rgba(244,245,240,.8)!important;max-width:36ch!important;margin:0 auto!important}.hf-cut{height:min(52svh,470px)!important;margin-bottom:-90px!important;-webkit-mask-image:linear-gradient(180deg,#000 62%,transparent 98%);mask-image:linear-gradient(180deg,#000 62%,transparent 98%);filter:none!important}}
.ph-img{position:relative}
.ph-doc{position:absolute;left:0;right:0;bottom:0;padding:56px 20px 18px;background:linear-gradient(0deg,rgba(12,13,9,.92),rgba(12,13,9,.55) 60%,transparent);color:#F4F5F0;font-size:.82rem;line-height:1.4}
.ph-doc b{display:block;font:600 1.15rem/1.2 var(--display,inherit);letter-spacing:-.01em;color:#fff}
.ph-doc .ph-g{display:block;margin-top:2px}
.ph-doc .g5{display:inline;font:inherit;color:#F5B301;font-weight:600}
.ph-img img.ph-dr{object-position:50% 8%!important}
.cta .lead-cta{margin:0;color:inherit;opacity:.85;font-size:1.05rem;line-height:1.5;max-width:46ch}
html body .wa-fix{background:#11793E!important}html body .wa-fix small{opacity:1!important;color:#fff!important}
html body .also p{color:#454c41!important}html body .quote-card p{color:#14170F!important}html body .quote-card small{color:#2f352b!important;opacity:1!important}
html body .step .n b,html body .flow .n,html body .flow .pill,html body .cloud .hl{color:#14170F!important}
html body .post .meta b{color:#3F5239!important}html body .ct-addr small,html body .ct-more small,html body .fg h3{color:#6E5420!important}
html body .wordmark .it{color:#6F8069!important}
.foot .fh4{font-size:.85rem;color:var(--muted);font-weight:400;letter-spacing:0;margin:0 0 14px}
</style>`;

const STICKY = `<a class="wa-fix" href="${WA}" target="_blank" rel="noopener" aria-label="Agendar consulta pelo WhatsApp">${WA_ICON}<span>Agendar minha consulta<small>Resposta em segundos no WhatsApp</small></span></a>`;
// foto do Dr. Guilherme no topo das páginas de tratamento, com nome e prova
const docImg = (src, w, h, alt) => `<img class="ph-dr" src="/${src}" alt="${alt}" width="${w}" height="${h}"><span class="ph-doc"><b>Dr. Guilherme Rocha</b>15+ anos de prática · +10 mil vidas transformadas<span class="ph-g"><span class="g5">★ 5,0</span> no Google</span></span>`;
const DOC = {
  'obesidade.html': docImg('poltrona.jpg', 1000, 1250, 'Dr. Guilherme Rocha, médico em Guarapari, sentado em poltrona de couro'),
  'menopausa.html': docImg('estudio.jpg', 834, 1250, 'Dr. Guilherme Rocha, médico em Guarapari, de blazer cinza'),
  'implante.html': docImg('retrato.jpg', 928, 1152, 'Dr. Guilherme Rocha, médico em Guarapari, com a mão apoiada no queixo'),
  'platinum.html': docImg('emag-hero.jpg', 563, 1000, 'Dr. Guilherme Rocha, médico responsável pelo Programa Platinum'),
};

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

// ---------- Velocidade no celular ----------
const fs = require('fs');
const path = require('path');
const readOr = f => { try { return fs.readFileSync(path.join(__dirname, f), 'utf8'); } catch (e) { return null; } };
const CSS_FILE = readOr('styles.css');
const JS_FILE = readOr('site.js');
const minCss = c => c.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{};])\s*/g, '$1');

// CSS só com as regras que a página usa (a folha completa tem 75 KB; cada página usa uma parte).
// Classes que o JavaScript coloca depois (menu, vídeo, artigos do blog) ficam sempre.
const JS_CLASSES = ['on-hero', 'scrolled', 'hold', 'ytm', 'on', 'ytm-x', 'ytm-box', 'short', 'post', 'cover', 'meta', 'by', 'read', 'open'];
function splitTop(str, ch) { // divide por vírgula fora de parênteses
  const out = []; let d = 0, cur = '';
  for (const c of str) { if (c === '(') d++; if (c === ')') d--; if (c === ch && !d) { out.push(cur); cur = ''; } else cur += c; }
  out.push(cur); return out;
}
function purgeCss(css, html) {
  const cls = new Set(JS_CLASSES), ids = new Set(), tags = new Set(['html', 'body']);
  for (const m of html.matchAll(/\sclass=(?:"([^"]*)"|'([^']*)'|([^\s>"']+))/g)) (m[1] || m[2] || m[3] || '').split(/\s+/).forEach(c => c && cls.add(c));
  for (const m of html.matchAll(/\sid=(?:"([^"]*)"|'([^']*)'|([^\s>"']+))/g)) ids.add(m[1] || m[2] || m[3]);
  for (const m of html.matchAll(/<([a-z][a-z0-9]*)\b/g)) tags.add(m[1]);
  const keepSel = sel => {
    const t = sel.replace(/:(not|has|is|where)\((?:[^()]|\([^()]*\))*\)/g, '').replace(/\[[^\]]*\]/g, '').replace(/::?[a-z-]+(\([^)]*\))?/g, '');
    for (const m of t.matchAll(/\.([\w-]+)/g)) if (!cls.has(m[1])) return false;
    for (const m of t.matchAll(/#([\w-]+)/g)) if (!ids.has(m[1])) return false;
    for (const m of t.matchAll(/(?:^|[\s>+~])([a-z][a-z0-9]*)/g)) if (!tags.has(m[1])) return false;
    return true;
  };
  // percorre as regras (com @media aninhado)
  const walk = src => {
    let out = '', i = 0;
    while (i < src.length) {
      const open = src.indexOf('{', i); if (open < 0) break;
      const head = src.slice(i, open).trim();
      let d = 1, j = open + 1; while (j < src.length && d) { if (src[j] === '{') d++; else if (src[j] === '}') d--; j++; }
      const body = src.slice(open + 1, j - 1);
      if (/^@media/.test(head)) { const inner = walk(body); if (inner) out += head + '{' + inner + '}'; }
      else if (/^@/.test(head)) out += head + '{' + body + '}';
      else if (splitTop(head, ',').some(keepSel)) out += head + '{' + body + '}';
      i = j;
    }
    return out;
  };
  try { return walk(css); } catch (e) { return css; }
}

// Google Tag Manager, Analytics, Clarity e Pixel: os eventos ficam guardados desde o primeiro instante (nada se perde),
// mas os arquivos pesados (≈450 KB) só baixam no primeiro toque/rolagem ou 8 s depois de a página abrir.
// Assim a foto e o texto aparecem primeiro no celular. Em /obrigado e /forms continua tudo imediato (conversão).
const TAGS_LATER = `<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});gtag('js',new Date());gtag('config','G-RKRPTG597H');
(function(c,a){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}})(window,'clarity');
!function(f){if(f.fbq)return;var n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window);
fbq('init','667194305437913');fbq('track','PageView');
(function(){var ok=0,ev=['pointerdown','touchstart','scroll','keydown','mousemove'];function go(){if(ok)return;ok=1;ev.forEach(function(e){removeEventListener(e,go)});
['https://www.googletagmanager.com/gtm.js?id=GTM-N8DP97WZ','https://www.googletagmanager.com/gtag/js?id=G-RKRPTG597H','https://www.clarity.ms/tag/ypuk4cn7ns','https://connect.facebook.net/en_US/fbevents.js'].forEach(function(u){var s=document.createElement('script');s.async=true;s.src=u;document.head.appendChild(s)})}
ev.forEach(function(e){addEventListener(e,go,{passive:true})});addEventListener('load',function(){setTimeout(go,8000)})})();
</script>`;
const TAGS_NOW = ['forms.html', 'obrigado.html'];
function tagsLater(html, f) {
  if (TAGS_NOW.includes(f) || !html.includes('GTM-N8DP97WZ')) return html;
  const gtm = /<!-- Google Tag Manager -->\s*<script>[\s\S]*?<\/script>\s*<!-- End Google Tag Manager -->/;
  const rest = /<!-- Google Analytics 4 -->[\s\S]*?<!-- Meta Pixel -->\s*<script>[\s\S]*?<\/script>/;
  if (!gtm.test(html) || !rest.test(html)) return html;
  return html.replace(gtm, () => TAGS_LATER).replace(rest, '');
}

// Imagens no tamanho certo para cada tela, em AVIF/WebP, pelo otimizador de imagens da Vercel (/_vercel/image).
const IMG_SIZES = [256, 384, 640, 828, 1080, 1200];
const vimg = (src, w) => `/_vercel/image?url=${encodeURIComponent(src)}&amp;w=${w}&amp;q=72`;
function sizesFor(a, src) {
  if (/class="hf-cut/.test(a)) return '(max-width:760px) 320px, 620px';
  if (/class="ph-dr/.test(a)) return '(max-width:860px) calc(100vw - 32px), 460px';
  if (/^\/caso-/.test(src)) return '(max-width:640px) 74vw, 360px';
  return '(max-width:760px) 100vw, 50vw';
}
function responsive(html) {
  html = html.replace(/<img\b([^>]*?)\ssrc="(\/[\w.-]+\.(?:jpe?g|png|webp))"([^>]*)>/g, (m, pre, src, post) => {
    const a = pre + post;
    if (/logo-img|srcset=/.test(a)) return m;
    const wm = a.match(/\bwidth="(\d+)"/);
    const nat = wm ? +wm[1] : 1200;
    // até o primeiro tamanho maior que a foto original (a Vercel não amplia: devolve a original nesse caso)
    const ws = IMG_SIZES.filter((w, i) => w < nat || (i > 0 && IMG_SIZES[i - 1] < nat && w >= nat) || (i === 0 && w >= nat));
    if (!ws.length) return m;
    const set = ws.map(w => vimg(src, w) + ' ' + w + 'w').join(', ');
    const def = ws.includes(640) ? 640 : ws[ws.length - 1];
    return `<img${pre} src="${vimg(src, def)}" srcset="${set}" sizes="${sizesFor(a, src)}"${post}>`;
  });
  // foto do topo da home: pré-carrega a mesma versão que o celular vai usar
  html = html.replace(/<link rel="preload" as="image" href="(\/[\w.-]+\.(?:jpe?g|png|webp))" fetchpriority="high">/, (m, src) =>
    `<link rel="preload" as="image" href="${vimg(src, 640)}" imagesrcset="${IMG_SIZES.filter(w => w <= 1080).map(w => vimg(src, w) + ' ' + w + 'w').join(', ')}" imagesizes="(max-width:760px) 320px, 620px" fetchpriority="high">`);
  // capas dos artigos (fundo): versão menor
  html = html.replace(/url\((\/b-[\w-]+\.jpg)\)/g, (m, src) => `url(${vimg(src, 640).replace(/&amp;/g, '&')})`);
  return html;
}

// Fontes no próprio site (pacotes @fontsource do package.json), sem depender do Google Fonts na abertura.
// Se os pacotes não estiverem instalados, continua usando o Google Fonts como antes.
const LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const FONTS = [
  ['Instrument Sans', '@fontsource-variable/instrument-sans', 'instrument-sans-latin-wght-normal.woff2', '400 700'],
  ['Inter', '@fontsource-variable/inter', 'inter-latin-wght-normal.woff2', '400 600'],
];
let fontsOk = null;
function localFonts() {
  if (fontsOk !== null) return fontsOk;
  try {
    const dest = path.join(__dirname, '.vercel', 'output', 'static', 'fonts');
    fs.mkdirSync(dest, { recursive: true });
    for (const [, pkg, file] of FONTS) fs.copyFileSync(path.join(path.dirname(require.resolve(pkg + '/package.json')), 'files', file), path.join(dest, file));
    fontsOk = true;
  } catch (e) { fontsOk = false; }
  return fontsOk;
}
const FONT_CSS = FONTS.map(([fam, , file, w]) => `@font-face{font-family:"${fam}";font-style:normal;font-display:swap;font-weight:${w};src:url(/fonts/${file}) format("woff2");unicode-range:${LATIN}}`).join('');
function fonts(html) {
  if (!/fonts\.googleapis\.com\/css2/.test(html) || !localFonts()) return html;
  html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.(googleapis|gstatic)\.com"( crossorigin)?>/g, '')
    .replace(/<link rel="preload" as="style" href="https:\/\/fonts\.googleapis\.com[^>]*><noscript><link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*><\/noscript>/g, '')
    .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/g, '');
  return html.replace('</head>', `<link rel="preload" as="font" type="font/woff2" href="/fonts/${FONTS[0][2]}" crossorigin><style>${FONT_CSS}</style></head>`);
}

// Ajustes de acessibilidade: ordem dos títulos do rodapé e nome dos botões igual ao texto visível
function a11y(html) {
  html = html.replace(/<footer>[\s\S]*?<\/footer>/, ft => ft.replace(/<h4>([\s\S]*?)<\/h4>/g, '<p class="fh4">$1</p>'));
  html = html.replace(/(<a class="wa-fix"[^>]*?) aria-label="[^"]*"/, '$1');
  html = html.replace(/(<button type="button" class="vt yt"[^>]*?) aria-label="[^"]*"/g, '$1');
  return html;
}

function perf(html, f) {
  if (f === 'admin.html') return html;
  html = copyText(html, f);
  // páginas de tratamento: a foto do topo passa a ser o Dr. Guilherme, com nome e prova (rosto conhecido logo na primeira tela)
  if (DOC[f]) html = html.replace(/(<div class="ph-img up u2">)<img src="\/[a-z]+-bg\.jpg"[^>]*>/, '$1' + DOC[f]);
  // imagens: a primeira imagem de conteúdo tem prioridade; as outras carregam sob demanda
  let first = true;
  html = html.replace(/<img\b([^>]*)>/g, (m, a) => {
    if (/logo-img|class="fm-|ty-/.test(a)) return m;
    if (first) { first = false; return /fetchpriority/.test(a) ? m : `<img fetchpriority="high"${a}>`; }
    if (/\bloading=/.test(a)) return m;
    return `<img loading="lazy" decoding="async"${a}>`;
  });
  if (!NO_STICKY.includes(f) && !html.includes('class="wa-fix"')) html = html.replace('</body>', STICKY + '\n</body>');
  html = fonts(a11y(responsive(tagsLater(html, f))));
  // CSS e JS do site embutidos na página: menos idas e vindas ao servidor antes de mostrar o conteúdo
  if (CSS_FILE) html = html.replace(/<link rel="stylesheet" href="\/styles\.css">/, () => '<style>' + (f === 'tpl.html' || TAGS_NOW.includes(f) ? minCss(CSS_FILE) : purgeCss(minCss(CSS_FILE), html)) + '</style>');
  // (o cabeçalho é ajustado no próximo quadro, sem forçar o navegador a recalcular o layout no carregamento)
  if (JS_FILE) html = html.replace('<script src="/site.js"></script>', () => '<script>' + JS_FILE.replace('upd();window.addEventListener', 'requestAnimationFrame(upd);window.addEventListener') + '</script>');
  return html.replace('</head>', CSS + '</head>');
}

module.exports = { perf, copyText, copyJson, IMG_SIZES };
