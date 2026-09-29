// Monta as páginas do blog com o mesmo visual do site.
// tpl.html é a "casca" do site (cabeçalho, menu, rodapé, estilos), gerada junto com o site.
const fs = require('fs');
const path = require('path');
const { readMinutes, CATEGORIES } = require('./lib-store');

const SHELL = fs.readFileSync(path.join(__dirname, 'tpl.html'), 'utf8');
const PARTS = JSON.parse(fs.readFileSync(path.join(__dirname, 'tpl-parts.json'), 'utf8'));
const { cta: CTA, wa: WA, arrow: A, arrowSmall: AS, phys: PHYS } = PARTS;
const GRAD = { 'Emagrecimento': 1, 'Menopausa': 2, 'Implante hormonal': 4 };
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const strip = s => String(s || '').replace(/<[^>]+>/g, '');
const dataBR = d => { const [y, m, dd] = String(d || '').split('-').map(Number); return y ? `${dd} de ${MESES[m - 1]} de ${y}` : ''; };
const abs = (o, u) => !u ? '' : /^https?:\/\//.test(u) ? u : o + (u.startsWith('/') ? u : '/' + u);
const slugId = t => String(t).normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
const ldJson = o => JSON.stringify(o).replace(/</g, '\\u003c');

function page({ title, desc, body, canon, extra = '', type = 'article', ogimg = '' }) {
  const rep = { '@@TITLE@@': esc(title), '@@DESC@@': esc(desc), '@@CANON@@': canon, '@@OGTYPE@@': type, '@@OGIMG@@': esc(ogimg), '@@EXTRA@@': extra, '@@BODY@@': body };
  return SHELL.replace(/@@(TITLE|DESC|CANON|OGTYPE|OGIMG|EXTRA|BODY)@@/g, m => rep[m]);
}

function card(p, extraClass = '') {
  const cover = p.cover ? `background-image:url('${esc(p.cover)}');background-size:cover;background-position:50% 35%` : '';
  return `<a class="post rv${extraClass}" href="/blog/${esc(p.slug)}" data-cat="${esc(p.category)}"><div class="cover g${GRAD[p.category] || 1}" style="${cover}"></div><div class="meta"><b>${esc(p.category)}</b>· ${p.min || readMinutes(p.content)} min de leitura</div><h3>${esc(p.title)}</h3><p class="by">Por ${esc(p.author || 'Dr. Guilherme Rocha')}</p><span class="read">Ler artigo ${AS}</span></a>`;
}

function listPage({ posts, categories = CATEGORIES, origin }) {
  const cnt = c => posts.filter(p => p.category === c).length;
  const body = `
<section class="ph-hero"><div class="wrap"><div class="ph-txt">
  <p class="crumb up"><a href="/">Início</a> / Blog</p>
  <h1 class="up u1">Conteúdos para entender <span class="it">o seu corpo.</span></h1>
  <p class="lead up u2">Artigos do Dr. Guilherme Rocha sobre as dúvidas que mais aparecem no consultório, com informação clara e baseada em evidência científica.</p>
</div></div></section>
<section><div class="wrap">
  <div class="bfilter" role="group" aria-label="Filtrar por tema" style="margin-top:0"><button type="button" data-f="Todos" aria-pressed="true">Todos<span>${posts.length}</span></button>${categories.map(c => `<button type="button" data-f="${esc(c)}" aria-pressed="false">${esc(c)}<span>${cnt(c)}</span></button>`).join('')}</div>
  <div class="posts" id="plist">${posts.map(p => card(p)).join('')}</div>
</div></section>
${CTA}
<script>
document.querySelectorAll('.bfilter button').forEach(function(b){b.addEventListener('click',function(){var f=b.dataset.f;document.querySelectorAll('.bfilter button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});document.querySelectorAll('#plist .post').forEach(function(p){p.hidden=!(f==='Todos'||p.dataset.cat===f);if(!p.hidden)p.classList.add('in')})})});
</script>`;
  const ld = { '@context': 'https://schema.org', '@type': 'Blog', name: 'Blog do Dr. Guilherme Rocha', url: origin + '/blog', inLanguage: 'pt-BR', author: { '@type': 'Physician', name: 'Dr. Guilherme Loureiro Rocha' } };
  return page({
    title: 'Blog do Dr. Guilherme Rocha: emagrecimento, menopausa e hormônios',
    desc: 'Artigos do Dr. Guilherme Rocha sobre emagrecimento, efeito sanfona, obesidade, menopausa, perimenopausa e implante hormonal, com base em evidência científica.',
    body, canon: 'blog', type: 'website', ogimg: origin + '/retrato.jpg',
    extra: `<script type="application/ld+json">${ldJson(ld)}</script>`,
  });
}

function postPage({ post: p, related, origin }) {
  const toc = [];
  const used = {};
  let body = String(p.content || '').replace(/<h2>([\s\S]*?)<\/h2>/g, (m, inner) => {
    const txt = strip(inner).trim();
    let id = slugId(txt) || 'secao';
    if (used[id]) id += '-' + (++used[id]); else used[id] = 1;
    toc.push([id, txt]);
    return `<h2 id="${id}">${inner}</h2>`;
  });
  const faq = p.faq || [];
  const sources = p.sources || [];
  let faqHtml = '';
  if (faq.length) {
    faqHtml = '<section class="art-faq"><h2 id="perguntas-frequentes">Perguntas frequentes</h2><div class="qa">' + faq.map(f => `<details><summary>${esc(f.q)}<i></i></summary><p>${f.a}</p></details>`).join('') + '</div></section>';
    toc.push(['perguntas-frequentes', 'Perguntas frequentes']);
  }
  const refs = sources.length ? '<div class="refs"><h2>Referências</h2><ol>' + sources.map(s => `<li>${esc(s.title)}. <a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url)}</a></li>`).join('') + '</ol></div>' : '';
  const url = `${origin}/blog/${p.slug}`;
  const img = abs(origin, p.cover) || origin + '/retrato.jpg';
  const phys = { ...PHYS, '@id': origin + '/#medico', url: origin + '/', image: origin + '/retrato.jpg' };
  const graph = [
    { '@type': 'BlogPosting', '@id': url + '#artigo', headline: p.title, description: p.excerpt, inLanguage: 'pt-BR', datePublished: p.date, dateModified: (p.updatedAt || p.date || '').slice(0, 10), image: img, mainEntityOfPage: url, articleSection: p.category, keywords: p.keywords || '', author: { '@id': origin + '/#medico' }, reviewedBy: { '@id': origin + '/#medico' }, publisher: { '@type': 'MedicalClinic', name: 'Instituto Guilherme Rocha', url: origin + '/' }, citation: sources.map(s => s.url) },
    phys,
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Início', item: origin + '/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: origin + '/blog' }, { '@type': 'ListItem', position: 3, name: p.title, item: url }] },
  ];
  if (faq.length) graph.push({ '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } })) });
  const tocHtml = toc.length ? '<nav class="toc" aria-label="Neste artigo"><b>Neste artigo</b><ol>' + toc.map(([s, t]) => `<li><a href="#${s}">${esc(t)}</a></li>`).join('') + '</ol></nav>' : '';
  const draft = p.status !== 'published' ? '<div style="background:#C7AB6B;color:#14170F;text-align:center;font:600 .85rem/1 Inter,sans-serif;padding:12px;position:relative;z-index:60">Pré-visualização de rascunho: só quem está logado no painel vê esta página.</div>' : '';
  const cover = p.cover ? `<figure class="art-cover"><img src="${esc(p.cover)}" alt="${esc(p.coverAlt || '')}" width="1200" height="750"></figure>` : '';
  const pageBody = `${draft}
<section class="art-hero"><div class="wrap"><div class="in">
  <p class="crumb up"><a href="/">Início</a> / <a href="/blog">Blog</a> / ${esc(p.category)}</p>
  <span class="catpill up">${esc(p.category)}</span>
  <h1 class="up u1">${esc(p.title)}</h1>
  ${p.lead ? `<p class="lead up u2">${esc(p.lead)}</p>` : ''}
  <div class="art-meta up u3"><span class="who"><img src="/retrato.jpg" alt="">${esc(p.author || 'Dr. Guilherme Rocha')}</span><span>CRM-ES 11007</span><span>${readMinutes(p.content)} min de leitura</span><span>Publicado em ${dataBR(p.date)}</span></div>
</div></div></section>
<section><div class="wrap art-grid">
  <article class="prose">${cover}${body}
    ${faqHtml}
    ${refs}
    <p class="disc">Conteúdo informativo, escrito e revisado sob responsabilidade do Dr. Guilherme Loureiro Rocha (CRM-ES 11007). Não substitui a consulta médica. Diagnóstico e tratamento dependem de avaliação individual.</p>
  </article>
  <aside class="aside">
    ${tocHtml}
    <div class="author"><img src="/retrato.jpg" alt="Dr. Guilherme Rocha"><b>Dr. Guilherme Rocha</b><p>Médico há mais de 15 anos, dedicado ao emagrecimento, ao metabolismo e à saúde hormonal, com olhar integrativo. CRM-ES 11007.</p></div>
    <div class="cta-mini"><b>Quer entender o seu caso?</b><p>Agende uma avaliação no Instituto Guilherme Rocha, em Guarapari.</p><a class="btn btn-light" href="${WA}" target="_blank" rel="noopener" style="justify-self:start">Agende sua avaliação<span class="ic">${A}</span></a></div>
  </aside>
</div></section>
${related.length ? `<section style="padding-top:0"><div class="wrap"><div class="head rv"><h2>Continue <span class="it">lendo.</span></h2></div><div class="posts three">${related.map(r => card(r)).join('')}</div></div></section>` : ''}
${CTA}`;
  return page({
    title: p.title + ' | Dr. Guilherme Rocha', desc: p.excerpt || p.lead || '', body: pageBody, canon: 'blog/' + p.slug,
    ogimg: img, extra: `<script type="application/ld+json">${ldJson({ '@context': 'https://schema.org', '@graph': graph })}</script>` + (p.status !== 'published' ? '<meta name="robots" content="noindex">' : ''),
  });
}

function notFound() {
  return page({
    title: 'Artigo não encontrado | Dr. Guilherme Rocha', desc: 'Este artigo não existe ou foi removido.', canon: 'blog', type: 'website', ogimg: '',
    extra: '<meta name="robots" content="noindex">',
    body: `<section class="ph-hero"><div class="wrap"><div class="ph-txt"><p class="crumb up"><a href="/">Início</a> / <a href="/blog">Blog</a></p><h1 class="up u1">Artigo não <span class="it">encontrado.</span></h1><p class="lead up u2">O endereço pode ter mudado ou o artigo foi retirado do ar.</p><div class="hero-ctas up u3"><a class="btn btn-light" href="/blog">Ver todos os artigos<span class="ic">${A}</span></a></div></div></div></section>`,
  });
}

module.exports = { listPage, postPage, notFound };
