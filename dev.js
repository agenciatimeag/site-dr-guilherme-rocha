// Servidor local de testes: imita as rotas da Vercel. Não vai para produção.
// Uso: npm install && ADMIN_PASSWORD=teste node dev.js  →  http://localhost:3000
const http = require('http'), fs = require('fs'), path = require('path');
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain' };
const PORT = process.env.PORT || 3000;
http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x'); let p = decodeURIComponent(u.pathname); let m;
  const go = loc => { res.statusCode = 301; res.setHeader('Location', loc); res.end(); };
  if (p === '/blog.html') return go('/blog');
  if ((m = p.match(/^\/blog-([a-z0-9-]+?)(?:\.html)?\/?$/))) return go('/blog/' + m[1]);
  if (p === '/index.html') return go('/');
  if ((m = p.match(/^\/(.+)\.html$/))) return go('/' + m[1]);
  if (p === '/blog' || p === '/blog/') { req.url = '/api/blog' + u.search; p = '/api/blog'; }
  else if ((m = p.match(/^\/blog\/([^/]+)\/?$/))) { req.url = '/api/blog?slug=' + m[1]; p = '/api/blog'; }
  else if (p === '/sitemap.xml') { req.url = '/api/blog?sitemap=1'; p = '/api/blog'; }
  if (p.startsWith('/api/')) {
    const f = './api-' + p.slice(5) + '.js';
    if (!fs.existsSync(path.join(__dirname, f))) { res.statusCode = 404; return res.end('404'); }
    for (const k of Object.keys(require.cache)) if (!k.includes('node_modules')) delete require.cache[k];
    return require(f)(req, res);
  }
  if (p === '/') p = '/index.html';
  let f = path.join(__dirname, p);
  if (!path.extname(f) && fs.existsSync(f + '.html')) f += '.html';
  if (!f.startsWith(__dirname) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.statusCode = 404; return res.end('404'); }
  res.setHeader('Content-Type', T[path.extname(f)] || 'application/octet-stream');
  fs.createReadStream(f).pipe(res);
}).listen(PORT, () => console.log('http://localhost:' + PORT));
