// GET    /api/posts            lista (público: só publicados, sem o texto; painel: todos)
// GET    /api/posts?id=...     um artigo completo (painel)
// POST   /api/posts            cria ou atualiza (painel)
// DELETE /api/posts?id=...     exclui (painel)
const crypto = require('crypto');
const sanitizeHtml = require('sanitize-html');
const { load, save, slugify, readMinutes, sortPosts, CATEGORIES } = require('./lib-store');
const { query, body, send, isAdmin } = require('./lib-http');

const clean = html => sanitizeHtml(html || '', {
  allowedTags: ['p', 'h2', 'h3', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'a', 'blockquote', 'img', 'br', 'figure', 'figcaption', 'hr', 'div'],
  allowedAttributes: { a: ['href', 'target', 'rel'], img: ['src', 'alt'], div: ['class'] },
  allowedClasses: { div: ['key'] },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  transformTags: {
    strong: 'b', i: 'em',
    a: (tag, attribs) => {
      const href = attribs.href || '';
      const external = /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?drguilhermerocha\.com\.br/i.test(href);
      return { tagName: 'a', attribs: external ? { href, target: '_blank', rel: 'noopener' } : { href } };
    },
  },
  exclusiveFilter: f => f.tag === 'div' && !(f.attribs.class || '').includes('key'),
});
const cleanInline = html => sanitizeHtml(html || '', { allowedTags: ['b', 'strong', 'em', 'i', 'a', 'br'], allowedAttributes: { a: ['href'] }, allowedSchemes: ['http', 'https', 'mailto', 'tel'] }).trim();
const text = s => String(s || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
const url = s => (/^https?:\/\/\S+$/i.test(String(s || '').trim()) ? String(s).trim() : '');

function listFields(p) {
  const { content, faq, sources, ...rest } = p;
  return { ...rest, min: readMinutes(content) };
}

module.exports = async (req, res) => {
  try {
    const admin = isAdmin(req);
    const q = query(req);

    if (req.method === 'GET') {
      const db = await load();
      if (q.id) {
        if (!admin) return send(res, 401, { error: 'Não autorizado' });
        const p = db.posts.find(x => x.id === q.id);
        return p ? send(res, 200, p) : send(res, 404, { error: 'Artigo não encontrado' });
      }
      let posts = sortPosts(db.posts);
      if (!admin) posts = posts.filter(p => p.status === 'published');
      if (q.cat) posts = posts.filter(p => p.category === q.cat);
      if (q.limit) posts = posts.slice(0, Number(q.limit));
      return send(res, 200, { posts: posts.map(listFields), categories: CATEGORIES },
        admin ? { 'Cache-Control': 'no-store' } : { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' });
    }

    if (!admin) return send(res, 401, { error: 'Faça login no painel para continuar.' });

    if (req.method === 'POST') {
      const b = await body(req);
      if (!text(b.title)) return send(res, 400, { error: 'O artigo precisa de um título.' });
      const db = await load();
      const now = new Date().toISOString();
      let post = b.id ? db.posts.find(p => p.id === b.id) : null;
      if (!post) { post = { id: crypto.randomBytes(8).toString('hex'), createdAt: now }; db.posts.push(post); }

      let slug = slugify(b.slug || post.slug || b.title);
      let n = 2; const base = slug;
      while (db.posts.some(p => p.slug === slug && p.id !== post.id)) slug = base + '-' + n++;

      Object.assign(post, {
        slug,
        title: text(b.title).slice(0, 160),
        excerpt: text(b.excerpt).slice(0, 320),
        lead: text(b.lead).slice(0, 400),
        keywords: text(b.keywords).slice(0, 200),
        category: CATEGORIES.includes(b.category) ? b.category : CATEGORIES[0],
        cover: /^(https:\/\/|\/)/.test(b.cover || '') ? b.cover : '',
        coverAlt: text(b.coverAlt),
        author: text(b.author) || 'Dr. Guilherme Rocha',
        content: clean(b.content),
        faq: (Array.isArray(b.faq) ? b.faq : []).map(f => ({ q: text(f.q), a: cleanInline(f.a) })).filter(f => f.q && f.a).slice(0, 20),
        sources: (Array.isArray(b.sources) ? b.sources : []).map(s => ({ title: text(s.title), url: url(s.url) })).filter(s => s.title && s.url).slice(0, 20),
        status: b.status === 'published' ? 'published' : 'draft',
        date: /^\d{4}-\d{2}-\d{2}$/.test(b.date || '') ? b.date : now.slice(0, 10),
        updatedAt: now,
      });
      await save(db);
      return send(res, 200, post);
    }

    if (req.method === 'DELETE') {
      const db = await load();
      const before = db.posts.length;
      db.posts = db.posts.filter(p => p.id !== q.id);
      if (db.posts.length === before) return send(res, 404, { error: 'Artigo não encontrado' });
      await save(db);
      return send(res, 200, { ok: true });
    }

    send(res, 405, { error: 'Método não permitido' });
  } catch (e) {
    console.error(e);
    send(res, 500, { error: 'Erro no servidor: ' + e.message });
  }
};
