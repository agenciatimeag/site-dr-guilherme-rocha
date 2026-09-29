import re,os,glob,shutil
from PIL import Image
src='out'; D='dist'
shutil.rmtree(D,ignore_errors=True); os.makedirs(D+'/img')
DOMAIN='https://www.drguilhermerocha.com.br'
idx=open(f'{src}/index.html').read()
css=re.search(r'<style>(.*?)</style>',idx,re.S).group(1)
open(f'{D}/styles.css','w').write(css)
NOIDX='<meta name="robots" content="noindex, nofollow">'
pages=[]
for f in sorted(glob.glob(f'{src}/*.html')):
    h=open(f).read(); name=os.path.basename(f)
    h=h.replace('<style>'+css+'</style>','<link rel="stylesheet" href="/styles.css">')
    if not h.lstrip().lower().startswith('<!doctype'):
        m=re.search(r'<!--HEAD-->(.*?)<!--/HEAD-->',h,re.S); head=m.group(1); h=h.replace(m.group(0),'')
        # fonts link + stylesheet into head
        extra=''.join(re.findall(r'<link rel="(?:preconnect|stylesheet)"[^>]*>',h[:3000]))
        h=re.sub(r'<link rel="(?:preconnect|stylesheet)"[^>]*>','',h,count=4)
        h=f'<!doctype html>\n<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">{head}{extra}{NOIDX}</head><body style="margin:0">'+h+'</body></html>'
    else:
        h=h.replace('<meta charset="utf-8">','<meta charset="utf-8">'+NOIDX,1)
    open(f'{D}/{name}','w').write(h); pages.append(name)
used=set()
for n in pages: used|=set(re.findall(r'img/([\w-]+\.(?:jpg|png|webp))',open(f'{D}/{n}').read()))
for n in used:
    if n.endswith((".png",".webp")): shutil.copy(f'{src}/img/{n}',f'{D}/img/{n}')
    else: Image.open(f'{src}/img/{n}').save(f'{D}/img/{n}',quality=76,optimize=True,progressive=True)
open(f'{D}/robots.txt','w').write(f'User-agent: *\nDisallow: /\n\n# Ao publicar no domínio definitivo, troque por:\n# User-agent: *\n# Allow: /\n# Sitemap: {DOMAIN}/sitemap.xml\n')
urls=['']+[p[:-5] for p in pages if p!='index.html']
sm='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{DOMAIN}/{u}</loc><lastmod>2026-09-29</lastmod><priority>{"1.0" if u=="" else ("0.8" if not u.startswith("blog-") else "0.6")}</priority></url>\n' for u in urls)+'</urlset>\n'
open(f'{D}/sitemap.xml','w').write(sm)
open(f'{D}/vercel.json','w').write('{\n  "cleanUrls": true,\n  "headers": [\n    { "source": "/img/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }\n  ]\n}\n')
tot=sum(os.path.getsize(os.path.join(r,x)) for r,_,fs in os.walk(D) for x in fs)
print(len(pages),'pages',sorted(used),tot)
