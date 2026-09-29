// Monta o site para a Vercel (Build Output API v3) a partir dos arquivos soltos do repositório.
// Assim o GitHub só precisa de arquivos na raiz, sem pastas.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, '.vercel', 'output');
fs.rmSync(OUT, { recursive: true, force: true });

const files = fs.readdirSync(ROOT).filter(f => fs.statSync(path.join(ROOT, f)).isFile());

// ---------- Arquivos do servidor (não vão para o público) ----------
const SERVER = f => /^(api|lib)-.+\.js$/.test(f) || /^tpl.*\.(html|json)$/.test(f) || f === 'seed.json';
const PRIVATE = f => SERVER(f) || ['build.js', 'dev.js', 'package.json', 'package-lock.json', 'vercel.json', 'sitemap.xml'].includes(f)
  || /\.(py|md|zip)$/i.test(f) || /^LEIA-ME/i.test(f)
  || /^blog(-.+)?\.html$/.test(f)          // o blog agora é gerado pelo servidor em /blog
  || f === 'current-imgs.html';
const PUBLIC_EXT = /\.(html|css|js|jpg|jpeg|png|webp|avif|gif|svg|ico|txt|xml|json|woff2?|mp4|webm|pdf)$/i;

// ---------- Velocidade (PageSpeed) ----------
// 1) As fontes do Google carregam sem travar a primeira pintura da página.
// 2) Na página inicial, a foto do topo é baixada com prioridade e aparece sem esperar a animação.
// Também coloca no <head> os códigos oficiais de estatística (Google Analytics 4, Microsoft Clarity e Meta Pixel),
// do jeito que cada ferramenta pede, para que elas encontrem o código ao verificar o site.
const TRACKING = `
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RKRPTG597H"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-RKRPTG597H');</script>
<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ypuk4cn7ns");
</script>
<!-- Meta Pixel -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','667194305437913');fbq('track','PageView');
</script>
`;
// Google Tag Manager: o mais alto possível no <head> e logo depois da abertura do <body>, como o Google pede.
const GTM_HEAD = `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N8DP97WZ');</script>
<!-- End Google Tag Manager -->
`;
const GTM_BODY = `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N8DP97WZ"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
`;
// Mensagem que já aparece escrita quando a pessoa clica em qualquer botão de WhatsApp do site.
const WA_MSG = 'Olá, visitei o site e gostaria de atendimento! [NÃO APAGUE ESTA MENSAGEM]';
const waText = s => s.replace(/(api\.whatsapp\.com\/send\?phone=\d+&(?:amp;)?text=)[^"'\\\s<>]*/g,
  (m, pre) => pre + encodeURIComponent(WA_MSG).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase()));
function speed(html, f) {
  html = waText(html);
  if (f !== 'admin.html' && !html.includes('GTM-N8DP97WZ')) {
    html = html.includes('<meta charset="utf-8">')
      ? html.replace('<meta charset="utf-8">', '<meta charset="utf-8">' + GTM_HEAD)
      : html.replace('<head>', '<head>' + GTM_HEAD);
    html = html.replace(/<body[^>]*>/, m => m + GTM_BODY);
  }
  if (f !== 'admin.html' && !html.includes('clarity.ms/tag')) html = html.replace('</head>', TRACKING + '</head>');
  html = html.replace(/<link\b(?=[^>]*rel="stylesheet")(?=[^>]*href="(https:\/\/fonts\.googleapis\.com\/css2[^"]*)")[^>]*>/g,
    (m, href) => `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${href}"></noscript>`);
  if (f === 'index.html') {
    html = html.replace('<img class="hf-cut" ', '<img class="hf-cut" fetchpriority="high" ');
    html = html.replace('</head>', '<link rel="preload" as="image" href="/retrato-cut.webp" fetchpriority="high">'
      + '<style>.hf-cut{animation-delay:0s!important}@keyframes cutup{from{opacity:.001;transform:translateX(-50%) translateY(70px);filter:brightness(.2) drop-shadow(0 30px 60px rgba(0,0,0,.6))}to{opacity:1;transform:translateX(-50%);filter:brightness(1) drop-shadow(0 30px 60px rgba(0,0,0,.6))}}</style></head>');
  }
  return html;
}

// ---------- Estáticos ----------
const STATIC = path.join(OUT, 'static');
fs.mkdirSync(STATIC, { recursive: true });
const overrides = {};
for (const f of files) {
  if (PRIVATE(f) || !PUBLIC_EXT.test(f)) continue;
  if (f.endsWith('.html')) fs.writeFileSync(path.join(STATIC, f), speed(fs.readFileSync(path.join(ROOT, f), 'utf8'), f));
  else fs.copyFileSync(path.join(ROOT, f), path.join(STATIC, f));
  // endereços limpos: /sobre em vez de /sobre.html
  if (f.endsWith('.html') && f !== 'index.html') overrides[f] = { path: f.slice(0, -5), contentType: 'text/html; charset=utf-8' };
}

// ---------- Funções (uma pasta .func por rota da API) ----------
const serverFiles = files.filter(SERVER);
for (const f of files.filter(f => /^api-.+\.js$/.test(f))) {
  const name = f.replace(/^api-/, '').replace(/\.js$/, '');
  const fn = path.join(OUT, 'functions', 'api', name + '.func');
  fs.mkdirSync(fn, { recursive: true });
  for (const s of serverFiles) {
    if (s === 'tpl.html') fs.writeFileSync(path.join(fn, s), speed(fs.readFileSync(path.join(ROOT, s), 'utf8'), s));
    else if (s === 'tpl-parts.json') fs.writeFileSync(path.join(fn, s), waText(fs.readFileSync(path.join(ROOT, s), 'utf8')));
    else fs.copyFileSync(path.join(ROOT, s), path.join(fn, s));
  }
  fs.cpSync(path.join(ROOT, 'node_modules'), path.join(fn, 'node_modules'), { recursive: true });
  fs.writeFileSync(path.join(fn, 'package.json'), JSON.stringify({ private: true }));
  fs.writeFileSync(path.join(fn, '.vc-config.json'), JSON.stringify({
    runtime: 'nodejs22.x', handler: f, launcherType: 'Nodejs', shouldAddHelpers: true,
  }, null, 2));
}

// ---------- Rotas ----------
const NOINDEX = { 'X-Robots-Tag': 'noindex' };
fs.writeFileSync(path.join(OUT, 'config.json'), JSON.stringify({
  version: 3,
  overrides,
  routes: [
    // endereços antigos do blog → novos (301 permanente, bom para o Google)
    { src: '^/blog\\.html$', headers: { Location: '/blog' }, status: 301 },
    { src: '^/blog-([a-z0-9-]+?)(?:\\.html)?/?$', headers: { Location: '/blog/$1' }, status: 301 },
    { src: '^/index\\.html$', headers: { Location: '/' }, status: 301 },
    { src: '^/(.+)\\.html$', headers: { Location: '/$1' }, status: 301 },
    // blog e mapa do site gerados pelo servidor
    { src: '^/blog/?$', dest: '/api/blog' },
    { src: '^/blog/([^/]+)/?$', dest: '/api/blog?slug=$1' },
    { src: '^/sitemap\\.xml$', dest: '/api/blog?sitemap=1' },
    { src: '^/admin/?$', dest: '/admin', headers: NOINDEX },
    { src: '^/(.*)\\.(jpg|jpeg|png|webp|avif|svg)$', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }, continue: true },
    { handle: 'filesystem' },
  ],
}, null, 2));

console.log('Site montado em .vercel/output:', Object.keys(overrides).length + 1, 'páginas,', files.filter(f => /^api-/.test(f)).length, 'funções');
