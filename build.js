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

// ---------- Estáticos ----------
const STATIC = path.join(OUT, 'static');
fs.mkdirSync(STATIC, { recursive: true });
const overrides = {};
for (const f of files) {
  if (PRIVATE(f) || !PUBLIC_EXT.test(f)) continue;
  fs.copyFileSync(path.join(ROOT, f), path.join(STATIC, f));
  // endereços limpos: /sobre em vez de /sobre.html
  if (f.endsWith('.html') && f !== 'index.html') overrides[f] = { path: f.slice(0, -5), contentType: 'text/html; charset=utf-8' };
}

// ---------- Funções (uma pasta .func por rota da API) ----------
const serverFiles = files.filter(SERVER);
for (const f of files.filter(f => /^api-.+\.js$/.test(f))) {
  const name = f.replace(/^api-/, '').replace(/\.js$/, '');
  const fn = path.join(OUT, 'functions', 'api', name + '.func');
  fs.mkdirSync(fn, { recursive: true });
  for (const s of serverFiles) fs.copyFileSync(path.join(ROOT, s), path.join(fn, s));
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
