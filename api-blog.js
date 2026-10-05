// /blog            → lista de artigos
// /blog/:slug      → artigo
// /sitemap.xml     → mapa do site para o Google (páginas + artigos publicados)
const { load, sortPosts, CATEGORIES } = require('./lib-store');
const { query, send, isAdmin } = require('./lib-http');
const { listPage, postPage, notFound } = require('./lib-render');

const origin = req => (process.env.SITE_URL || `${(req.headers['x-forwarded-proto'] || 'http').split(',')[0]}://${req.headers['x-forwarded-host'] || req.headers.host}`).replace(/\/$/, '');
const PAGES = ['/', '/obesidade', '/platinum', '/menopausa', '/implante', '/sobre', '/blog'];
const PAGES_UPDATED = '2026-10-05'; // atualize ao mudar o conteúdo das páginas fixas

module.exports = async (req, res) => {
  try {
    const q = query(req);
    const db = await load();
    const o = origin(req);
    const admin = isAdmin(req);
    const published = sortPosts(db.posts.filter(p => p.status === 'published'));
    const html = { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 's-maxage=60, stale-while-revalidate=600' };

    if (q.sitemap) {
      const today = new Date().toISOString().slice(0, 10);
      const rows = [
        ...PAGES.map(u => `  <url><loc>${o}${u === '/' ? '/' : u}</loc><lastmod>${PAGES_UPDATED}</lastmod><changefreq>monthly</changefreq><priority>${u === '/' ? '1.0' : u === '/blog' ? '0.7' : '0.9'}</priority></url>`),
        ...published.map(p => `  <url><loc>${o}/blog/${p.slug}</loc><lastmod>${(p.updatedAt || p.date || today).slice(0, 10)}</lastmod><priority>0.6</priority></url>`),
      ];
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</urlset>\n`;
      return send(res, 200, xml, { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 's-maxage=3600' });
    }

    if (q.slug) {
      // quem está logado no painel também vê rascunhos (pré-visualização)
      const post = (admin ? db.posts : published).find(p => p.slug === q.slug);
      if (!post) return send(res, 404, notFound(), { 'Content-Type': 'text/html; charset=utf-8' });
      const related = [...published.filter(p => p.id !== post.id && p.category === post.category), ...published.filter(p => p.id !== post.id && p.category !== post.category)].slice(0, 3);
      return send(res, 200, postPage({ post, related, origin: o }), admin ? { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } : html);
    }

    send(res, 200, listPage({ posts: published, categories: CATEGORIES, origin: o }), html);
  } catch (e) {
    console.error(e);
    send(res, 500, 'Erro ao carregar o blog.', { 'Content-Type': 'text/plain; charset=utf-8' });
  }
};
