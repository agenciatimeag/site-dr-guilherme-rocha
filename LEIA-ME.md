# Site e Blog do Dr. Guilherme Rocha

## Como está organizado
- Páginas do site: `index.html`, `sobre.html`, `platinum.html`, `obesidade.html`, `menopausa.html`, `implante.html`
- `/blog` e `/blog/nome-do-artigo`: blog gerado no servidor, com o mesmo visual do site
- `/admin`: painel para escrever, editar e publicar artigos
- `/sitemap.xml`: mapa do site para o Google, atualizado sozinho a cada artigo publicado
- Endereços antigos (`/blog-nome-do-artigo.html`) redirecionam para os novos automaticamente

Todos os arquivos ficam soltos na raiz do repositório, sem pastas. O `build.js` monta o site na Vercel.

## Configuração na Vercel (já feita)
- Blob Store `blog-dr-guilherme-rocha` conectado ao projeto (guarda os artigos e as fotos)
- `ADMIN_PASSWORD`: senha do painel
- `SITE_URL`: https://www.drguilhermerocha.com.br

Para trocar a senha: Vercel → projeto → Settings → Environment Variables → `ADMIN_PASSWORD` → editar e fazer um novo deploy.

## Usar o painel
Acesse `www.drguilhermerocha.com.br/admin`, entre com a senha e clique em **Novo artigo**.
Rascunhos só aparecem para quem está logado. Ao publicar, o artigo entra no blog, na página inicial e no mapa do site em até 1 minuto.

## Testar no computador
`npm install` e depois `ADMIN_PASSWORD=teste node dev.js`, e abrir http://localhost:3000
