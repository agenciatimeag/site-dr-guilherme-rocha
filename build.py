import re
src=open('current-imgs.html').read()
CSS=src[src.index('<style>')+7:src.index('</style>')]
def sec(start):
    i=src.index(start); j=src.index('</section>',i)+10; return src[i:j]
S_PLAT=sec('<section id="platinum"'); S_STORY=sec('<section id="historia"'); S_METHOD=sec('<section id="metodo"')
S_MENO=sec('<section id="menopausa"'); S_IMP=sec('<section id="implante"'); S_CRIT=sec('<section style="padding-top:0">\n  <div class="wrap crit">')
S_CONTACT=sec('<section id="contato"')
FOOT=src[src.index('<footer>'):src.index('</footer>')+9]
WA=re.search(r'href="(https://api\.whatsapp[^"]+)"',src).group(1)
WAP=re.search(r'href="(https://api\.whatsapp[^"]+Platinum)"',src).group(1)
HF=sec('<section class="hf"')
A='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8h12M9 3l5 5-5 5"/></svg>'
AS='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 8h12M9 3l5 5-5 5"/></svg>'
def ic(p): return f'<div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">{p}</svg></div>'
FONTS='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400..700&family=Inter:wght@400;500;600&display=swap">'

EXTRA='''
/* home enxuta + páginas internas */
.about-l p.lead2{color:var(--muted);font-size:1.12rem;max-width:44ch}
.chiprow{display:flex;flex-wrap:wrap;gap:8px}
.chiprow span{background:var(--card);border:1px solid var(--line);border-radius:999px;padding:9px 15px;font-size:.9rem;font-weight:500}
.area{min-height:300px}
.area.photo{min-height:380px}
.pl > .pl-grid:first-child{margin-top:0}
/* clareza: o que parece botão é botão */
.about-l .chiprow,.plt .chiprow{gap:6px 0}
.about-l .chiprow span,.plt .chiprow span{background:none!important;border:0!important;padding:0!important;border-radius:0;font-size:.95rem;transform:none!important}
.about-l .chiprow span+span::before,.plt .chiprow span+span::before{content:"·";margin:0 12px;color:var(--accent-2)}
.plt .chiprow span{color:var(--on-dark-muted)!important}
.about-l .chiprow span{color:var(--muted)!important;font-size:.74rem!important;font-weight:500;letter-spacing:.14em;text-transform:uppercase}
.about-l .chiprow span+span::before{color:var(--sage)}
.also div span{background:none!important;border:0!important;padding:0!important;font-weight:600}
.also div span+span::before{content:"·";margin:0 10px;color:var(--accent-2)}
.ct{display:grid;grid-template-columns:1.25fr .75fr;border-radius:var(--r-xl);overflow:hidden;border:1px solid var(--line);background:var(--card)}
.ct-main{background:var(--dark);color:#fff;padding:clamp(28px,5vw,64px);display:grid;gap:20px;justify-items:start;align-content:center;position:relative;isolation:isolate}
.ct-main::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(60% 80% at 100% 0%,rgba(199,171,107,.22),transparent 70%)}
.ct-main .it{color:var(--accent-2)}
/* luz dourada que passeia (sem seguir o mouse) + reflexo no nome */
.hf-name{top:clamp(110px,15vh,170px)}
@media (max-width:760px){.hf-name{top:24vh}.hf-name .n2{font-size:25vw}}
.hglow{opacity:1!important;width:min(1100px,130vw);height:min(1100px,130vw);margin:0;left:-20%;top:-30%;background:radial-gradient(closest-side,rgba(214,178,104,.22),rgba(199,171,107,.08) 45%,transparent 75%);filter:blur(10px)}
.hglow2{position:absolute;width:min(900px,110vw);height:min(900px,110vw);right:-25%;bottom:-35%;border-radius:50%;background:radial-gradient(closest-side,rgba(174,189,171,.14),rgba(110,132,104,.06) 50%,transparent 75%);filter:blur(10px)}
.hf-name .n2{background:linear-gradient(100deg,transparent 42%,rgba(255,248,225,.9) 50%,transparent 58%) 0 0/250% 100% no-repeat,linear-gradient(180deg,#F3E3B6 0%,#C7AB6B 45%,rgba(154,123,58,.35) 100%)!important;-webkit-background-clip:text!important;background-clip:text!important}
@media (prefers-reduced-motion:no-preference){
  .hglow{animation:aur1 18s ease-in-out infinite alternate}
  .hglow2{animation:aur2 22s ease-in-out infinite alternate}
  @keyframes aur1{0%{transform:translate3d(0,0,0) scale(1)}33%{transform:translate3d(45vw,12vh,0) scale(1.15)}66%{transform:translate3d(70vw,-4vh,0) scale(.95)}100%{transform:translate3d(25vw,22vh,0) scale(1.1)}}
  @keyframes aur2{0%{transform:translate3d(0,0,0)}50%{transform:translate3d(-55vw,-20vh,0) scale(1.2)}100%{transform:translate3d(-20vw,-40vh,0) scale(.9)}}
  .hf-name .n2{animation:nameup 1.4s cubic-bezier(.16,1,.3,1) .25s both,namesheen 7s cubic-bezier(.4,0,.2,1) 2.5s infinite!important}
  @keyframes namesheen{0%{background-position:130% 0,0 0}45%,100%{background-position:-30% 0,0 0}}
}

/* ===== HERO 2: nome monumental + retrato recortado ===== */
.hf2{background:radial-gradient(90% 70% at 50% 35%,#1d2217 0%,#0c0e09 70%)}
.hf2::before{background:linear-gradient(0deg,#0C0D09 0%,rgba(12,13,9,.94) 20%,rgba(12,13,9,.4) 38%,rgba(12,13,9,0) 55%)!important;z-index:3!important}
.hf2 .hf-content,.hf2 .hf-bar{z-index:4}
.hf-name{position:absolute;left:0;right:0;top:clamp(90px,11vh,130px);display:flex;flex-direction:column;align-items:center;line-height:.8;z-index:1;pointer-events:none;font-family:var(--display);font-weight:700;letter-spacing:-.06em;text-transform:uppercase;will-change:transform}
.hf-name span{display:block;white-space:nowrap}
.hf-name .n1{font-size:clamp(3.6rem,11.5vw,12rem);color:transparent;-webkit-text-stroke:1px rgba(199,171,107,.45)}
.hf-name .n2{font-size:clamp(5rem,20vw,21rem);background:linear-gradient(180deg,#F3E3B6 0%,#C7AB6B 45%,rgba(154,123,58,.35) 100%);-webkit-background-clip:text;background-clip:text;color:transparent;margin-top:-.02em}
.hf-spot{position:absolute;left:50%;top:34%;width:min(900px,120vw);height:min(900px,120vw);transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(199,171,107,.28) 0%,rgba(199,171,107,.08) 35%,transparent 65%);z-index:1;pointer-events:none}
.hf-cut{position:absolute;left:50%;bottom:0;height:min(92vh,1000px);width:auto;max-width:none;transform:translateX(-50%);z-index:2;filter:drop-shadow(0 30px 60px rgba(0,0,0,.6));will-change:transform}
.hf2 .hfx{z-index:0}
.hf2 .hf-content{padding-bottom:clamp(18px,2.4vw,30px)}
@media (max-width:760px){.hf-cut{height:74vh}.hf-name{top:110px}.hf-spot{top:40%}}
@media (prefers-reduced-motion:no-preference){
  .hf-name span{animation:nameup 1.4s cubic-bezier(.16,1,.3,1) both}
  .hf-name .n1{animation-delay:.1s}.hf-name .n2{animation-delay:.25s}
  @keyframes nameup{from{opacity:0;transform:translateY(60px) scale(.96);filter:blur(10px)}to{opacity:1;transform:none;filter:none}}
  .hf-cut{animation:cutup 1.8s cubic-bezier(.16,1,.3,1) .45s both}
  @keyframes cutup{from{opacity:0;transform:translateX(-50%) translateY(70px);filter:brightness(.2) drop-shadow(0 30px 60px rgba(0,0,0,.6))}to{opacity:1;transform:translateX(-50%);filter:brightness(1) drop-shadow(0 30px 60px rgba(0,0,0,.6))}}
  .hf-spot{animation:spotin 2.4s ease .6s both,spotpulse 7s ease-in-out 3s infinite}
  @keyframes spotin{from{opacity:0}to{opacity:1}}
  @keyframes spotpulse{0%,100%{opacity:1}50%{opacity:.65}}
  .hf-name .n2{background-size:100% 200%;animation:nameup 1.4s cubic-bezier(.16,1,.3,1) .25s both}
  .hf2 .hf-in{animation-delay:1.1s}.hf2 .hf-in.h1{animation-delay:1.2s}.hf2 .hf-in.h2{animation-delay:1.4s}.hf2 .hf-in.h3{animation-delay:1.55s}.hf2 .hf-in.h4{animation-delay:1.8s}
}

/* hero: grade viva, cantos, partículas e brilho que segue o mouse */
.hfx{position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden}
.hf-photo{z-index:-2}
.hf::before{z-index:-1}
.hfx{z-index:0}
.hf-content,.hf-bar{z-index:2}
.hfx-grid{position:absolute;inset:0;-webkit-mask:radial-gradient(75% 70% at 50% 45%,transparent 30%,#000 75%);mask:radial-gradient(75% 70% at 50% 45%,transparent 30%,#000 75%)}
.hfx .gl{stroke:rgba(199,171,107,.28);stroke-width:1;stroke-dasharray:3000;stroke-dashoffset:3000;animation:gldraw 2.4s cubic-bezier(.6,0,.2,1) forwards}
.hfx .gd{fill:var(--accent-2);opacity:0;animation:gdot .8s ease forwards,gpulse 3.2s ease-in-out 3s infinite}
@keyframes gldraw{to{stroke-dashoffset:0}}
@keyframes gdot{to{opacity:.8}}
@keyframes gpulse{0%,100%{opacity:.8}50%{opacity:.25}}
.hc{position:absolute;width:26px;height:26px;border-color:rgba(199,171,107,.55);border-style:solid;border-width:0;opacity:0;animation:gdot 1s ease 1.8s forwards}
.hc.tl{top:96px;left:28px;border-top-width:1px;border-left-width:1px}
.hc.tr{top:96px;right:28px;border-top-width:1px;border-right-width:1px}
.hc.bl{bottom:28px;left:28px;border-bottom-width:1px;border-left-width:1px}
.hc.br{bottom:28px;right:28px;border-bottom-width:1px;border-right-width:1px}
.hp{position:absolute;width:3px;height:3px;border-radius:50%;background:var(--accent-2);box-shadow:0 0 12px 2px rgba(199,171,107,.55);opacity:0;animation:hfloat 7s ease-in-out infinite}
@keyframes hfloat{0%{opacity:0;transform:translateY(12px)}25%{opacity:.9}75%{opacity:.6}100%{opacity:0;transform:translateY(-46px)}}
.hglow{position:absolute;left:0;top:0;width:520px;height:520px;margin:-260px 0 0 -260px;border-radius:50%;background:radial-gradient(circle,rgba(199,171,107,.16),rgba(199,171,107,.05) 40%,transparent 70%);opacity:0;transition:opacity .6s;will-change:transform}
.hf.glow-on .hglow{opacity:1}
.hripple{position:absolute;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;border:1px solid rgba(199,171,107,.8);pointer-events:none;animation:hrip 1s cubic-bezier(.2,.7,.2,1) forwards;z-index:1}
@keyframes hrip{to{transform:scale(40);opacity:0}}
@media (max-width:640px){.hc{display:none}.hfx-grid{opacity:.6}}
@media (prefers-reduced-motion:reduce){.hfx .gl{stroke-dashoffset:0;animation:none}.hfx .gd,.hc{opacity:.7;animation:none}.hp{display:none}}

.ph-img img[src*='-bg.jpg']{object-position:50% 0%}
.ph-img:has(img[src*='-bg.jpg']){aspect-ratio:3/4;box-shadow:0 30px 80px rgba(0,0,0,.35)}
.area.photo.nf.nf-noimg{background:radial-gradient(90% 60% at 70% 20%,rgba(199,171,107,.22),transparent 60%),radial-gradient(80% 70% at 20% 40%,#3E4A37,#14170F)}
.nf-ph{position:absolute;inset:0;background:repeating-linear-gradient(135deg,rgba(255,255,255,.025) 0 2px,transparent 2px 14px)}

/* tag Platinum com brilho metálico */
.pill-gold{position:relative;overflow:hidden;isolation:isolate;background:linear-gradient(110deg,#A9843A 0%,#F1D88F 20%,#C79F4A 38%,#FFF3C9 50%,#C79F4A 62%,#EACB7C 82%,#A9843A 100%)!important;background-size:240% 100%!important;color:#2B2410!important;font-weight:700!important;text-shadow:0 1px 0 rgba(255,248,220,.55);box-shadow:inset 0 0 0 1px rgba(255,240,190,.75),inset 0 -1px 0 rgba(120,90,30,.35),0 6px 22px rgba(214,172,82,.5),0 0 28px rgba(241,205,120,.3)}
.pill-gold::after{content:"";position:absolute;inset:-2px;z-index:-1;background:linear-gradient(100deg,transparent 35%,rgba(255,255,255,.85) 50%,transparent 65%);transform:translateX(-130%)}
@media (prefers-reduced-motion:no-preference){
  .pill-gold{animation:goldflow 6s linear infinite}
  .pill-gold::after{animation:goldsweep 3.4s cubic-bezier(.4,0,.2,1) infinite}
  @keyframes goldflow{from{background-position:0% 0}to{background-position:240% 0}}
  @keyframes goldsweep{0%,55%{transform:translateX(-130%)}85%,100%{transform:translateX(130%)}}
}

/* card Platinum estilo Netflix */
.area.photo.nf{min-height:520px;background:#0d0f0a;transition:transform .6s cubic-bezier(.2,.8,.2,1),box-shadow .6s}
.area.photo.nf img{object-position:50% 8%;transition:transform 1.2s cubic-bezier(.2,.8,.2,1),filter .6s}
.area.photo.nf::after{background:linear-gradient(0deg,rgba(10,12,8,.96) 18%,rgba(10,12,8,.55) 45%,rgba(10,12,8,0) 70%)}
.area.photo.nf .icon{display:none}
.area.photo.nf .in{gap:12px}
.area.photo.nf h3{font-size:1.6rem}
.area.photo.nf:hover{transform:translateY(-6px) scale(1.02);box-shadow:0 30px 70px rgba(10,12,8,.35),0 0 0 1px rgba(199,171,107,.55)}
.area.photo.nf:hover img{transform:scale(1.07);filter:saturate(1.08)}

.logo-img{height:34px;width:auto;display:block}
.lg-w{display:none}
.nav.on-hero .lg-w{display:block}
.nav.on-hero .lg-g{display:none}
.foot-logo{height:44px}
.foot-id{margin-top:14px!important;font-size:.82rem!important;color:var(--muted)}
@media (max-width:420px){.logo-img{height:28px}}
.hf-bar{justify-content:center!important}
/* card Platinum com diamante */
.area.photo.gold{background:radial-gradient(80% 60% at 50% 22%,rgba(199,171,107,.28),transparent 70%),linear-gradient(180deg,#1B1F16,#101309)}
.area.photo.gold::after{background:none}
.area.photo.gold .icon{display:none}
.area.photo.gold{min-height:470px}
.gem{position:relative;z-index:2;margin:30px auto 0;width:58%;max-width:200px;filter:drop-shadow(0 18px 40px rgba(199,171,107,.35));transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.gem svg{width:100%;height:auto;display:block;overflow:visible}
.gem-shine{opacity:0;mix-blend-mode:screen}
.area.photo.gold:hover .gem{transform:translateY(-6px) rotate(-3deg)}
@media (prefers-reduced-motion:no-preference){
  .gem-shine{animation:gemshine 5s ease-in-out infinite}
  @keyframes gemshine{0%,70%,100%{opacity:0}82%{opacity:.35}}
  .gem{animation:gemfloat 6s ease-in-out infinite}
  @keyframes gemfloat{0%,100%{translate:0 0}50%{translate:0 -6px}}
}

.ct-main h2{font-size:clamp(2.2rem,4.4vw,3.8rem)}
.ct-main p{color:var(--on-dark-muted);font-size:1.08rem;max-width:46ch}
.ct-btn{font-size:1.05rem;padding:9px 9px 9px 24px}
.ct-btn .ic{width:40px;height:40px}
.ct-main .ct-num{font-size:.95rem;color:#fff;user-select:all}
.ct-side{padding:clamp(24px,4vw,48px);display:grid;gap:30px;align-content:center}
.ct-side small{display:block;font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-deep);font-weight:600;margin-bottom:8px}
.ct-addr b{font:500 1.25rem var(--display);letter-spacing:-.02em}
.ct-addr p{color:var(--muted);margin:6px 0 10px}
.ct-more{display:grid;gap:10px;padding-top:26px;border-top:1px solid var(--line)}
.tlink{justify-self:start;color:var(--ink);font-weight:500;background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;padding-bottom:2px;transition:background-size .4s cubic-bezier(.2,.8,.2,1),color .3s}
.tlink:hover{background-size:100% 1px;color:var(--sage-deep)}
@media (max-width:860px){.ct{grid-template-columns:1fr}}

.hf h1{max-width:20ch!important;font-size:clamp(2.7rem,6vw,6.2rem)!important}
.vt-track{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding-block:4px 20px;padding-inline:calc(max(0px,(100vw - 1280px)/2) + clamp(16px,3vw,32px));scroll-padding-inline:calc(max(0px,(100vw - 1280px)/2) + clamp(16px,3vw,32px));scrollbar-width:none}
.vt-track::-webkit-scrollbar{display:none}
.vt{flex:0 0 clamp(220px,22vw,280px);aspect-ratio:9/16;scroll-snap-align:start;border-radius:var(--r-lg);position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;padding:18px;color:#fff;isolation:isolate;transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.vt::before{content:"";position:absolute;inset:0;z-index:-1;transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.vt:nth-child(5n+1)::before{background:radial-gradient(90% 60% at 30% 20%,#6E7C62,#2F3629)}
.vt:nth-child(5n+2)::before{background:radial-gradient(90% 60% at 70% 25%,#D8BF86,#8A6D33)}
.vt:nth-child(5n+3)::before{background:radial-gradient(90% 60% at 40% 30%,#C3D0C0,#5F7359)}
.vt:nth-child(5n+4)::before{background:radial-gradient(90% 60% at 60% 20%,#4A5742,#1D221B)}
.vt:nth-child(5n+5)::before{background:radial-gradient(90% 60% at 30% 25%,#B9A06A,#48503E)}
.vt:hover{transform:translateY(-6px)}
.vt:hover::before{transform:scale(1.08)}
.vt-top{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;font-size:.78rem;font-weight:500;padding:7px 12px;border-radius:999px;background:rgba(255,255,255,.16);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.vt-top svg{width:14px;height:14px}
.vt-play{align-self:center;width:68px;height:68px;border-radius:50%;background:rgba(255,255,255,.92);color:var(--olive);display:grid;place-items:center;box-shadow:0 12px 30px rgba(0,0,0,.25);transition:transform .4s cubic-bezier(.2,.8,.2,1)}
.vt-play svg{width:24px;height:24px;margin-left:3px}
.vt:hover .vt-play{transform:scale(1.1)}
.vt-foot{display:grid;gap:2px}
.vt-foot b{font:500 1.05rem var(--display);letter-spacing:-.02em}
.vt-foot small{font-size:.8rem;opacity:.8}

.wordmark{font-size:clamp(2.6rem,10.6vw,10rem)!important}
.area p{font-size:1rem}
.plt{position:relative;overflow:hidden;border-radius:var(--r-xl);background:#14170F;color:var(--on-dark);padding:clamp(28px,5vw,72px);display:grid;grid-template-columns:1.2fr .8fr;gap:32px;align-items:center;isolation:isolate}
.plt::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(60% 70% at 90% 20%,rgba(199,171,107,.25),transparent 70%)}
.plt::after{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;padding:1px;background:linear-gradient(135deg,rgba(199,171,107,.6),rgba(255,255,255,.06) 40%,rgba(199,171,107,.35));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.plt-l{display:grid;gap:22px;justify-items:start;min-width:0}
.plt h2{font-size:clamp(2.2rem,4.6vw,4rem)}
.plt h2 .it{background:linear-gradient(90deg,#E9D7A8,#C7AB6B 60%,#A88C4E);-webkit-background-clip:text;background-clip:text;color:transparent}
.plt p{color:var(--on-dark-muted);font-size:1.08rem;max-width:46ch}
.plt .chiprow span{background:rgba(255,255,255,.05);border-color:rgba(199,171,107,.35);color:#fff}
.plt-r{display:grid;justify-items:center;text-align:center;gap:10px;min-width:0}
.plt-word{font:600 clamp(3rem,7vw,6rem)/.9 var(--display);letter-spacing:-.06em;background:linear-gradient(180deg,#F1E4C2,#C7AB6B 55%,#8E7440);-webkit-background-clip:text;background-clip:text;color:transparent}
.plt-r .pl-stars{font-size:1.1rem;letter-spacing:.3em}
.plt-r small{color:var(--on-dark-muted);letter-spacing:.14em;text-transform:uppercase;font-size:.75rem}
@media (max-width:860px){.plt{grid-template-columns:1fr}.plt-r{justify-items:start;text-align:left;order:-1}}
.method.three{grid-template-columns:repeat(3,1fr)}
@media (max-width:860px){.method.three{grid-template-columns:1fr}}
.qa.short details p{max-width:56ch}
/* página interna */
.ph-hero{background:#14170F;color:var(--on-dark);padding-block:clamp(120px,14vw,170px) clamp(48px,6vw,80px);position:relative;overflow:hidden;isolation:isolate}
.ph-hero::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(50% 70% at 80% 30%,rgba(199,171,107,.2),transparent 70%),radial-gradient(40% 60% at 0% 100%,rgba(174,189,171,.12),transparent 70%)}
.ph-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:clamp(28px,5vw,72px);align-items:center}
.ph-txt{display:grid;gap:22px;justify-items:start;min-width:0}
.crumb{font-size:.85rem;color:var(--on-dark-muted)}
.crumb a{color:#fff;text-decoration:underline;text-underline-offset:3px}
.ph-hero h1{font-size:clamp(3rem,7vw,6.2rem);letter-spacing:-.055em;line-height:.95}
.ph-hero h1 .it{color:var(--accent-2)}
.ph-hero .lead{color:var(--on-dark-muted);font-size:1.18rem;max-width:44ch}
.ph-img{border-radius:var(--r-xl);overflow:hidden;aspect-ratio:4/5;max-height:560px;width:100%;justify-self:end}
.ph-img img{width:100%;height:100%;object-fit:cover;object-position:50% 20%}
@media (max-width:860px){.ph-grid{grid-template-columns:1fr}.ph-img{max-height:420px;aspect-ratio:4/4;justify-self:stretch}}
.others{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:36px}
.other{background:var(--card);border:1px solid var(--line);border-radius:var(--r-lg);padding:24px;display:flex;justify-content:space-between;align-items:center;gap:16px;font:500 1.2rem var(--display);letter-spacing:-.03em;transition:transform .3s,box-shadow .3s}
.other:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(47,54,41,.08)}
.other span{width:36px;height:36px;border-radius:50%;background:var(--sage-soft);display:grid;place-items:center;flex:none}
.other span svg{width:14px;height:14px}
@media (max-width:760px){.others{grid-template-columns:1fr}}
'''

CSS_ADD=r'''
/* ===== autenticidade: sem pílulas, títulos neutros, grid quebrado ===== */
.it{color:inherit}
.hf .it,.ph-hero .it,.plt .it,.cta .it,.c-card.inst .it,.step.last .it,.dark-block .it{color:var(--accent-2)}
.progress{position:fixed;top:0;left:0;right:0;height:2px;z-index:80;pointer-events:none}
.progress i{display:block;height:100%;width:0;background:var(--accent-2)}
.hf-grid{position:relative;display:grid;grid-template-columns:1.4fr .6fr;align-items:end;gap:32px;padding-bottom:clamp(24px,3vw,40px)}
.hf-grid h1{font-size:clamp(3rem,7.4vw,7.6rem);letter-spacing:-.06em;line-height:.92;font-weight:500;text-align:left;max-width:none}
.hf-side{display:grid;gap:18px;justify-items:start;padding-bottom:10px;border-left:1px solid rgba(255,255,255,.18);padding-left:22px}
.hf-side p{color:rgba(244,245,240,.75);font-size:1rem;max-width:30ch}
@media (max-width:860px){.hf-grid{grid-template-columns:1fr}.hf-side{border-left:0;padding-left:0}}
.me{padding-top:clamp(80px,10vw,140px)}
.me-grid{display:grid;grid-template-columns:repeat(12,1fr);align-items:center}
.me-photo{grid-column:1/8;grid-row:1;margin:0;border-radius:var(--r-xl);overflow:hidden;aspect-ratio:5/6;max-height:760px}
.me-photo img{width:100%;height:100%;object-fit:cover;object-position:50% 30%;transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}
.me-photo:hover img{transform:scale(1.03)}
.me-card{grid-column:7/13;grid-row:1;position:relative;z-index:2;background:var(--card);border:1px solid var(--line);border-radius:var(--r-xl);padding:clamp(28px,4vw,56px);display:grid;gap:20px;box-shadow:0 30px 80px rgba(47,54,41,.12);margin-top:22%}
.me-card h2{font-size:clamp(2.6rem,5vw,4.4rem)}
.me-card p{color:var(--muted);font-size:1.08rem}
.me-card .sig{color:var(--ink);font:500 1.05rem var(--display);padding-top:18px;border-top:1px solid var(--line)}
.me-card .sig small{display:block;font:400 .85rem var(--sans);color:var(--muted)}
.me-small{display:none;grid-column:9/12;grid-row:2;margin:-60px 0 0;border-radius:var(--r-lg);overflow:hidden;aspect-ratio:4/5;position:relative;z-index:1}
.me-small img{width:100%;height:100%;object-fit:cover;filter:grayscale(1)}
@media (max-width:860px){.me-grid{grid-template-columns:1fr}.me-photo,.me-card,.me-small{grid-column:1;grid-row:auto}.me-card{margin:-80px 16px 0}.me-small{display:none}}
.treat-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:10px 40px;margin-bottom:28px}
.treat-head p{color:var(--muted)}
.trows{border-top:1px solid var(--ink)}
.trow{position:relative;display:grid;grid-template-columns:1.1fr 1fr auto;gap:24px;align-items:center;padding:34px 8px;border-bottom:1px solid var(--line);transition:padding .45s cubic-bezier(.2,.8,.2,1),background .45s}
.trow h3{font-size:clamp(1.7rem,3.4vw,2.9rem);letter-spacing:-.045em;transition:transform .45s cubic-bezier(.2,.8,.2,1);display:flex;align-items:center;flex-wrap:wrap;gap:6px 14px}
.trow h3 em{font-style:normal;font:600 .7rem var(--sans);letter-spacing:.14em;text-transform:uppercase;padding:6px 10px;border-radius:999px;background:var(--accent-2);color:var(--olive)}
.trow p{color:var(--muted);max-width:42ch}
.tgo{width:52px;height:52px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;transition:all .4s cubic-bezier(.2,.8,.2,1)}
.tgo svg{width:16px;height:16px}
.trow:hover{padding-inline:28px;background:var(--card)}
.trow:hover h3{transform:translateX(6px)}
.trow:hover .tgo{background:var(--olive);border-color:var(--olive);color:#fff;transform:rotate(-45deg)}
@media (max-width:760px){.trow{grid-template-columns:1fr auto;padding:26px 4px}.trow p{grid-column:1/-1;grid-row:2}}
.tfloat{position:fixed;left:0;top:0;width:240px;aspect-ratio:4/5;border-radius:18px;overflow:hidden;pointer-events:none;z-index:40;opacity:0;transform:translate(-50%,-50%) scale(.8);transition:opacity .3s,transform .3s;box-shadow:0 30px 60px rgba(0,0,0,.25)}
.tfloat.on{opacity:1}
.tfloat img{width:100%;height:100%;object-fit:cover}
@media (hover:none){.tfloat{display:none}}
.also2{margin-top:22px;color:var(--muted)}
.also2 b{color:var(--ink);font-weight:500}
.plt2{position:relative;display:grid;gap:22px;overflow:hidden;border-radius:var(--r-xl);background:#14170F;color:#fff;padding:clamp(28px,5vw,72px);isolation:isolate;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.plt2::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(50% 80% at 100% 0%,rgba(199,171,107,.28),transparent 70%)}
.plt2::after{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;padding:1px;background:linear-gradient(135deg,rgba(199,171,107,.6),rgba(255,255,255,.06) 40%,rgba(199,171,107,.35));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.plt2:hover{transform:scale(1.01)}
.plt2-top{display:flex;gap:14px;align-items:center;font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;color:var(--on-dark-muted)}
.plt-word.big{font-size:clamp(4rem,16vw,14rem);line-height:.8;margin-left:-.04em}
.plt2-line{font:500 clamp(1.2rem,2vw,1.6rem)/1.3 var(--display);letter-spacing:-.02em;max-width:34ch}
.plt2-data{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid rgba(199,171,107,.3);margin-top:10px}
.plt2-data div{padding:22px 20px 0 0;display:grid;gap:6px}
.plt2-data div+div{padding-left:20px;border-left:1px solid rgba(199,171,107,.2)}
.plt2-data b{font:600 clamp(1.8rem,3vw,2.6rem)/1 var(--display);letter-spacing:-.04em;color:var(--accent-2)}
.plt2-data span{color:var(--on-dark-muted);font-size:.92rem;max-width:24ch}
.plt2-go{display:inline-flex;align-items:center;gap:10px;justify-self:end;font-weight:500;color:var(--accent-2);border-bottom:1px solid var(--accent-2);padding-bottom:4px}
.plt2-go svg{width:14px;height:14px}
@media (max-width:760px){.plt2-data{grid-template-columns:1fr}.plt2-data div+div{padding-left:0;border-left:0}.plt2-go{justify-self:start}}
.how-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:clamp(24px,5vw,80px);align-items:start}
.how-grid h2{position:sticky;top:120px}
.how-line{list-style:none;margin:0;padding:0;position:relative}
.how-line::before{content:"";position:absolute;left:23px;top:24px;bottom:24px;width:1px;background:linear-gradient(var(--olive),var(--sage))}
.how-line li{position:relative;display:grid;grid-template-columns:48px 1fr;column-gap:22px;padding-block:22px}
.how-n{grid-row:span 2;width:48px;height:48px;border-radius:50%;background:var(--bg);border:1px solid var(--olive);display:grid;place-items:center;font:600 1rem var(--display);color:var(--olive);position:relative;transition:background .3s,color .3s}
.how-line li:hover .how-n{background:var(--olive);color:#fff}
.how-line b{font:500 1.5rem var(--display);letter-spacing:-.03em;padding-top:8px}
.how-line p{color:var(--muted);margin-top:4px}
@media (max-width:860px){.how-grid{grid-template-columns:1fr}.how-grid h2{position:static}}
.proof{padding-top:0}
.proof-in{display:flex;flex-wrap:wrap;align-items:center;gap:20px 28px;padding:26px 30px;border-radius:var(--r-lg);border:1px dashed var(--sage);background:var(--card)}
.proof-g{width:52px;height:52px;border-radius:50%;background:var(--bg);display:grid;place-items:center}
.proof-g svg{width:24px;height:24px}
.proof-in p{flex:1;min-width:240px;color:var(--muted)}
.proof-in p b{display:block;color:var(--ink);font:500 1.2rem var(--display);letter-spacing:-.02em}
#duvidas .faq h2{align-self:start}
'''
POLISH=r'''
/* ===== POLIMENTO: animações e hovers ===== */
.progress{position:fixed;top:0;left:0;right:0;height:2px;z-index:90;pointer-events:none}
.progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--sage),var(--accent-2))}
.nav{transition:padding .4s cubic-bezier(.2,.8,.2,1)}
.nav.scrolled{padding-block:8px}
.nav.scrolled .nav-in{box-shadow:0 14px 40px rgba(47,54,41,.12)}
.menu a{position:relative}
.menu a::after{content:"";position:absolute;left:14px;right:14px;bottom:5px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:right;transition:transform .45s cubic-bezier(.7,0,.2,1)}
.menu a:hover::after{transform:scaleX(1);transform-origin:left}
.menu a:hover{background:transparent!important}
/* botões: fundo que se revela */
.btn{position:relative;overflow:hidden;isolation:isolate;transition:transform .35s cubic-bezier(.2,.8,.2,1),color .45s,border-color .45s,box-shadow .45s}
.btn::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;transform:scaleX(0);transform-origin:right;transition:transform .55s cubic-bezier(.7,0,.2,1)}
.btn:hover::before{transform:scaleX(1);transform-origin:left}
.btn-dark::before{background:#2F3629}
.btn-light::before{background:var(--sage-soft)}
.btn-gold::before{background:#EADBB4}
.btn-accent::before{background:var(--olive)}
.btn-line::before{background:var(--olive)}
.btn-line:hover{color:#fff;border-color:var(--olive)}
.btn-line.dark::before{background:#fff}
.btn-line.dark:hover{color:var(--olive)}
.btn:hover{box-shadow:0 12px 30px rgba(47,54,41,.18)}
.btn:active{transform:translateY(0) scale(.97)}
/* luz que segue o mouse nos cards */
.spot{position:relative}
.spot::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),rgba(174,189,171,.32),transparent 45%);opacity:0;transition:opacity .45s}
.spot:hover::after{opacity:1}
.spot-gold::after{background:radial-gradient(520px circle at var(--mx,50%) var(--my,50%),rgba(199,171,107,.2),transparent 45%)}
.area .icon{transition:transform .5s cubic-bezier(.2,.8,.2,1),background .4s,color .4s}
.area:hover .icon{transform:rotate(-8deg) scale(1.08);background:var(--olive);color:#fff}
.area.photo:hover .icon{background:rgba(255,255,255,.25)}
.step{position:relative;transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s}
.step:hover{transform:translateY(-5px);box-shadow:0 22px 50px rgba(47,54,41,.1)}
.step .n b{transition:background .4s,color .4s,border-color .4s}
.step:not(.last):hover .n b{background:var(--olive);color:#fff;border-color:var(--olive)}
.c-card .arr,.c-card .ico{transition:transform .45s cubic-bezier(.2,.8,.2,1),background .35s,color .35s,border-color .35s}
a.c-card:hover .arr{background:var(--olive);border-color:var(--olive);color:#fff;transform:rotate(-45deg)}
a.c-card.accent:hover .arr{background:#fff;color:var(--olive)}
a.c-card:hover .ico{transform:translateY(-3px)}
.chiprow span,.cred{transition:border-color .3s,transform .3s}
.chiprow span:hover{border-color:var(--sage-deep);transform:translateY(-2px)}
.marquee:hover .mq{animation-play-state:paused}
.mq span{transition:background .3s,color .3s}
.mq span:hover{background:var(--olive);color:#fff}
.mq span:hover svg{color:var(--accent-2)}
/* Platinum: brilho que atravessa a palavra */
.plt-word{background:linear-gradient(100deg,#B79A58 0%,#C7AB6B 30%,#F6EBCB 45%,#C7AB6B 60%,#9A7B3A 100%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent}
.pl-feat{transition:background .3s,border-color .3s,transform .4s cubic-bezier(.2,.8,.2,1)}
.pl-feat:hover{transform:translateY(-3px)}
.pl-feat .pl-ic{transition:transform .4s cubic-bezier(.2,.8,.2,1)}
.pl-feat:hover .pl-ic{transform:scale(1.1) rotate(-6deg)}
.pl-days span{transition:background .3s,border-color .3s}
.pl-days span:hover{background:rgba(199,171,107,.12);border-color:var(--accent-2)}
/* depoimentos */
.vt-track{cursor:grab}
.vt-track.drag{cursor:grabbing;scroll-snap-type:none}
.vt-track.drag .vt{pointer-events:none}
.vt-play{position:relative}
.vt-play::after{content:"";position:absolute;inset:-8px;border-radius:50%;border:1px solid rgba(255,255,255,.7);opacity:0;transform:scale(.8)}
/* FAQ */
details .ans{overflow:hidden}
summary{transition:color .3s}
summary:hover{color:var(--sage-deep)}
summary:hover i{background:var(--sage-soft)}
/* imagens com profundidade */
.pxl{will-change:transform}
.ph,.ph-img,.cta .img{overflow:hidden}
@media (prefers-reduced-motion:no-preference){
  .js .rv{opacity:.001;transform:translateY(34px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform 1.1s cubic-bezier(.2,.7,.2,1);transition-delay:var(--d,0s)}
  .js .rv.in{opacity:1;transform:none}
  .js .sw{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.1em;margin-bottom:-.1em}
  .js .sw>span{display:inline-block;transform:translateY(110%);transition:transform 1.1s cubic-bezier(.2,.7,.2,1);transition-delay:calc(var(--i)*55ms + .05s)}
  .js .in .sw>span,.js .sw.in>span{transform:none}
  .plt-word{animation:shine 7s linear infinite}
  @keyframes shine{from{background-position:120% 0}to{background-position:-130% 0}}
  .vt:hover .vt-play::after{animation:ring 1.4s cubic-bezier(.2,.7,.2,1) infinite}
  @keyframes ring{0%{opacity:.9;transform:scale(.85)}100%{opacity:0;transform:scale(1.5)}}
  body{animation:pagein .6s cubic-bezier(.2,.7,.2,1) both}
  @keyframes pagein{from{opacity:.001}to{opacity:1}}
  body.leaving{opacity:0;transition:opacity .35s ease}
  .js .wordmark .ch{display:inline-block;transform:translateY(100%);transition:transform 1s cubic-bezier(.2,.7,.2,1);transition-delay:calc(var(--i)*35ms)}
  .js .wordmark.in .ch{transform:none}
}
'''
STYLE='<style>'+CSS+EXTRA+POLISH+__import__('platinum_body').PP_CSS+'</style>'
def nav(home):
    h='' if home else 'index.html'
    links=[(h+'#sobre','Sobre'),(h+'#tratamentos','Tratamentos'),('platinum.html','Platinum'),(h+'#como-funciona','Como funciona'),('blog.html','Blog'),(h+'#contato','Contato')]
    li=''.join(f'<li><a href="{a}">{b}</a></li>' for a,b in links)
    dr=''.join(f'<a href="{a}">{b}</a>' for a,b in links)
    return f'''<div class="progress" aria-hidden="true"><i id="prog"></i></div>
<a class="skip" href="#conteudo">Ir para o conteúdo</a>
<header class="nav" id="topo">
  <div class="wrap">
    <div class="nav-in">
      <a class="logo" href="{'#topo' if home else 'index.html'}" aria-label="Dr. Guilherme Rocha, início"><img class="logo-img lg-g" src="img/logo-verde.png" alt="G.Rocha" width="161" height="42"><img class="logo-img lg-w" src="img/logo-branco.png" alt="" width="161" height="42"></a>
      <ul class="menu">{li}</ul>
      <a class="btn btn-dark" href="{WA}" target="_blank" rel="noopener">Agendar consulta<span class="ic">{A}</span></a>
      <button class="burger" id="burger" aria-expanded="false" aria-controls="drawer" aria-label="Abrir menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 8h16M4 16h16"/></svg></button>
    </div>
    <nav class="drawer" id="drawer" hidden>{dr}<a href="{WA}" target="_blank" rel="noopener" style="background:var(--olive);color:#fff;margin-top:6px">Agendar pelo WhatsApp</a></nav>
  </div>
</header>'''

def footer(home):
    h='' if home else 'index.html'
    return f'''<footer>
  <div class="wrap">
    <div class="foot">
      <div><a class="logo" href="{h or '#topo'}"><img class="logo-img foot-logo" src="img/logo-verde.png" alt="G.Rocha" width="184" height="48"></a><p class="foot-id">Dr. Guilherme Loureiro Rocha · Médico · CRM-ES 11007</p><p>Instituto Guilherme Rocha · Rua Francisco Vieira Passos, Muquiçaba, Guarapari (ES).</p></div>
      <div><h4>Tratamentos</h4><ul><li><a href="platinum.html">Emagrecimento avançado</a></li><li><a href="obesidade.html">Tratamento da obesidade</a></li><li><a href="menopausa.html">Menopausa e perimenopausa</a></li><li><a href="implante.html">Implante hormonal</a></li></ul></div>
      <div><h4>Site</h4><ul><li><a href="{h}#sobre">Sobre</a></li><li><a href="{h}#como-funciona">Como funciona</a></li><li><a href="blog.html">Blog</a></li><li><a href="{h}#duvidas">Dúvidas</a></li><li><a href="{h}#contato">Contato</a></li></ul></div>
      <div><h4>Redes</h4><ul><li><a href="https://www.instagram.com/dr.guilhermerocha" target="_blank" rel="noopener">Instagram</a></li><li><a href="https://www.instagram.com/institutoguilhermerocha/" target="_blank" rel="noopener">Instituto</a></li><li><a href="https://share.google/YFuNMOtc5Fs2zYW9q" target="_blank" rel="noopener">Google</a></li><li><a href="{WA}" target="_blank" rel="noopener">WhatsApp</a></li></ul></div>
    </div>
    <div class="wordmark rv" aria-hidden="true">Guilherme <span class="it">Rocha</span></div>
    <div class="legal"><span>Conteúdo informativo. Diagnóstico e tratamento dependem de avaliação médica individual.</span><span>© 2026 Dr. Guilherme Rocha · CRM-ES 11007</span></div>
  </div>
</footer>'''

JS='''<script>
(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches,fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  /* toda página nova começa do topo (ou na âncora, se houver) */
  try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}
  function toTop(){if(location.hash&&location.hash.length>1){var t=document.getElementById(location.hash.slice(1));if(t){t.scrollIntoView({behavior:'instant',block:'start'});return}}window.scrollTo({top:0,left:0,behavior:'instant'})}
  toTop();window.addEventListener('load',toTop);window.addEventListener('pageshow',function(e){if(e.persisted)toTop()});
  var b=document.getElementById('burger'),d=document.getElementById('drawer');
  b.addEventListener('click',function(){var o=d.hidden;d.hidden=!o;b.setAttribute('aria-expanded',String(o))});
  d.addEventListener('click',function(e){if(e.target.closest('a')){d.hidden=true;b.setAttribute('aria-expanded','false')}});
  var nav=document.querySelector('.nav'),hf=document.querySelector('.hf,.ph-hero'),pr=document.getElementById('prog');
  var hfp=document.querySelector('.hf-photo'),hfc=document.querySelector('.hf-content');
  var pimgs=[].slice.call(document.querySelectorAll('.about-r .ph img,.ph-img img,.cta .img img,.consult .ph img'));
  pimgs.forEach(function(im){im.classList.add('pxl')});
  function onScroll(){
    var y=window.scrollY,h=document.documentElement;
    nav.classList.toggle('on-hero',!!hf&&y<hf.offsetHeight-90);
    nav.classList.toggle('scrolled',y>30);
    if(pr)pr.style.width=(y/(h.scrollHeight-h.clientHeight)*100)+'%';
    if(reduce)return;
    if(hfp&&y<window.innerHeight*1.2){hfp.style.transform='translate3d(0,'+(y*.28)+'px,0)';if(hfc){hfc.style.transform='translate3d(0,'+(y*-.08)+'px,0)';hfc.style.opacity=Math.max(0,1-y/(window.innerHeight*.7))}}
    var hn=document.querySelector('.hf-name');if(hn&&y<window.innerHeight*1.2){hn.style.transform='translate3d('+(window.__mx||0)*-14+'px,'+(y*.45)+'px,0)';hn.style.opacity=Math.max(0,1-y/(window.innerHeight*.8));if(hfc){hfc.style.opacity=Math.max(0,1-y/(window.innerHeight*.6))}}
    var vh=window.innerHeight;
    pimgs.forEach(function(im){var r=im.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;var o=(r.top+r.height/2-vh/2)/vh;im.style.transform='translate3d(0,'+(o*-40)+'px,0) scale(1.12)'});
  }
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);

  /* hero: brilho que segue o mouse e ondas no clique */
  var hfEl=document.querySelector('.hf'),hg=document.getElementById('hglow');
  if(hfEl&&hg&&fine&&!reduce){var gx=0,gy=0,tx=0,ty=0,run=false;
    function gl(){gx+=(tx-gx)*.12;gy+=(ty-gy)*.12;if(Math.abs(tx-gx)+Math.abs(ty-gy)>.5)requestAnimationFrame(gl);else run=false}
    var hcut=document.querySelector('.hf-cut'),hnm=document.querySelector('.hf-name');
    hfEl.addEventListener('pointermove',function(e){var r=hfEl.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;var mx=(e.clientX/r.width-.5);window.__mx=mx;if(hcut&&!hcut.getAnimations().some(function(a){return a.playState==='running'}))hcut.style.transform='translateX(-50%) translateX('+(mx*10)+'px)';if(hnm&&window.scrollY<50)hnm.style.transform='translate3d('+(mx*-18)+'px,0,0)';hfEl.classList.add('glow-on');if(!run){run=true;requestAnimationFrame(gl)}});
    hfEl.addEventListener('pointerleave',function(){hfEl.classList.remove('glow-on')});
    hfEl.addEventListener('click',function(e){if(e.target.closest('a,button'))return;var r=hfEl.getBoundingClientRect(),d=document.createElement('span');d.className='hripple';d.style.left=(e.clientX-r.left)+'px';d.style.top=(e.clientY-r.top)+'px';hfEl.appendChild(d);setTimeout(function(){d.remove()},1000)});
  }
  /* luz nos cards */
  if(fine){
    document.querySelectorAll('.area:not(.photo),.step,a.c-card:not(.inst),.cred,.post,.imp-item,.pl-card,.faq-help').forEach(function(el){el.classList.add('spot')});
    document.querySelectorAll('.plt,.pl').forEach(function(el){el.classList.add('spot','spot-gold')});
    document.querySelectorAll('.spot').forEach(function(el){el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')})});
  }
  /* FAQ com abertura suave */
  function closeD(o){var ww=o.querySelector('.ans');if(!reduce&&ww&&ww.animate){var hh=ww.offsetHeight;ww.animate([{height:hh+'px',opacity:1},{height:'0px',opacity:0}],{duration:320,easing:'cubic-bezier(.2,.7,.2,1)'}).onfinish=function(){o.open=false}}else{o.open=false}}
  document.querySelectorAll('details').forEach(function(dt){
    dt.addEventListener('toggle',function(){if(!dt.open)return;var box=dt.closest('section')||document;box.querySelectorAll('details[open]').forEach(function(o){if(o!==dt)closeD(o)})});
    var s=dt.querySelector('summary'),p=dt.querySelector('summary ~ *');if(!p)return;
    var w=document.createElement('div');w.className='ans';p.parentNode.insertBefore(w,p);w.appendChild(p);
    s.addEventListener('click',function(e){
      if(reduce||!w.animate)return;e.preventDefault();
      if(dt.open){var h=w.offsetHeight;w.animate([{height:h+'px',opacity:1},{height:'0px',opacity:0}],{duration:320,easing:'cubic-bezier(.2,.7,.2,1)'}).onfinish=function(){dt.open=false}}
      else{dt.open=true;var h2=w.offsetHeight;w.animate([{height:'0px',opacity:0},{height:h2+'px',opacity:1}],{duration:450,easing:'cubic-bezier(.2,.7,.2,1)'})}
    });
  });
  /* arrastar depoimentos */
  var tr=document.querySelector('.vt-track');
  if(tr&&fine){var down=false,sx=0,sl=0,moved=0;
    tr.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=0;sx=e.clientX;sl=tr.scrollLeft});
    window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;moved=Math.abs(dx);if(moved>6)tr.classList.add('drag');tr.scrollLeft=sl-dx});
    window.addEventListener('pointerup',function(){if(!down)return;down=false;setTimeout(function(){tr.classList.remove('drag')},0)});
    tr.addEventListener('click',function(e){if(moved>6){e.preventDefault();moved=0}},true);
  }
  /* transição entre páginas */
  document.querySelectorAll('a[href$=".html"],a[href*=".html#"]').forEach(function(a){a.addEventListener('click',function(e){if(reduce||e.metaKey||e.ctrlKey||a.target==='_blank')return;e.preventDefault();document.body.classList.add('leaving');setTimeout(function(){location.href=a.href},320)})});
  window.addEventListener('pageshow',function(){document.body.classList.remove('leaving')});
  if(reduce||!('IntersectionObserver' in window))return;
  /* títulos palavra por palavra */
  document.querySelectorAll('.rv h2, h2.rv, .head h2, .faq-l h2').forEach(function(h){
    var i=0;(function walk(n){[].slice.call(n.childNodes).forEach(function(c){
      if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(t){if(!t)return;if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(t));return}var o=document.createElement('span');o.className='sw';var inn=document.createElement('span');inn.textContent=t;inn.style.setProperty('--i',i++);o.appendChild(inn);f.appendChild(o)});c.parentNode.replaceChild(f,c)}
      else if(c.nodeType===1&&!c.classList.contains('sw'))walk(c)})})(h);
    if(!h.closest('.rv'))h.classList.add('rv');
  });
  /* letras do nome no rodapé */
  document.querySelectorAll('.wordmark').forEach(function(w){var i=0;(function walk(n){[].slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split('').forEach(function(ch){var s=document.createElement('span');s.className='ch';s.textContent=ch===' '?' ':ch;s.style.setProperty('--i',i++);f.appendChild(s)});c.parentNode.replaceChild(f,c)}else if(c.nodeType===1)walk(c)})})(w)});
  /* revelar ao rolar, em cascata */
  var els=[].slice.call(document.querySelectorAll('.rv')),vh=window.innerHeight;
  els.forEach(function(el){var sib=[].slice.call(el.parentElement.children).filter(function(x){return x.classList.contains('rv')});var k=sib.indexOf(el);if(sib.length>1)el.style.setProperty('--d',Math.min(k,5)*90+'ms')});
  document.documentElement.classList.add('js');
  els.forEach(function(el){if(el.getBoundingClientRect().top<vh)el.classList.add('in')});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -10% 0px'});
  els.forEach(function(el){if(!el.classList.contains('in'))io.observe(el)});
})();
</script>'''

PAGES={'platinum':'Programa Platinum','obesidade':'Tratamento da obesidade','menopausa':'Menopausa e perimenopausa','implante':'Implante hormonal'}
def others(cur):
    return '<section style="padding-top:0"><div class="wrap"><div class="head rv"><span class="tag">Outros tratamentos</span></div><div class="others">'+''.join(f'<a class="other rv" href="{k}.html">{v}<span>{AS}</span></a>' for k,v in PAGES.items() if k!=cur)+'</div></div></section>'

CTA=f'''<section style="padding-top:0"><div class="wrap"><div class="cta rv">
  <div class="txt"><span class="tag dark" style="align-self:flex-start">Próximo passo</span>
  <h2>Vamos entender juntos o que o seu corpo <span class="it">está pedindo.</span></h2>
  <div class="hero-ctas" style="margin-top:6px"><a class="btn btn-light" href="{WA}" target="_blank" rel="noopener">Agendar pelo WhatsApp<span class="ic">{A}</span></a></div>
  <p class="phone">WhatsApp: <b>(27) 99522-3099</b></p></div>
  <div class="img"><img src="img/estudio.jpg" alt=""></div>
</div></div></section>'''

# ---------- BLOG ----------
from blogdata import POSTS
BLOG_CSS=r"""
.post{transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s}
a.post:hover{transform:translateY(-5px);box-shadow:0 22px 50px rgba(47,54,41,.1)}
a.post .cover{transition:filter .5s}
a.post:hover .cover{filter:saturate(1.15) brightness(1.05)}
.post .cover.g1{background:radial-gradient(90% 90% at 80% 10%,#5B6650,#2F3629)}
.post .cover.g2{background:radial-gradient(90% 90% at 20% 0%,#D8BF86,#9A7B3A)}
.post .cover.g3{background:radial-gradient(90% 90% at 70% 20%,#C3D0C0,#6E8468)}
.post .read{padding-inline:12px;font-weight:500;font-size:.9rem;display:flex;align-items:center;gap:8px;margin-top:auto}
.post .read svg{width:14px;height:14px;transition:transform .3s}
a.post:hover .read svg{transform:translateX(4px)}
.bfilter{display:flex;flex-wrap:wrap;gap:8px;margin-top:36px}
.bfilter button{font:500 .92rem var(--sans);padding:10px 18px;border-radius:999px;border:1px solid var(--line);background:var(--card);color:var(--ink);cursor:pointer;transition:all .3s}
.bfilter button:hover{border-color:var(--olive)}
.bfilter button[aria-pressed="true"]{background:var(--olive);border-color:var(--olive);color:#fff}
.art-hero{background:#14170F;color:var(--on-dark);padding-block:clamp(120px,14vw,170px) clamp(40px,5vw,64px);position:relative;overflow:hidden;isolation:isolate}
.art-hero::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(50% 70% at 85% 20%,rgba(199,171,107,.2),transparent 70%)}
.art-hero .in{max-width:880px;display:grid;gap:22px}
.art-hero h1{font-size:clamp(2.4rem,5.4vw,4.6rem);letter-spacing:-.05em;line-height:1}
.art-hero .lead{color:var(--on-dark-muted);font-size:1.2rem;max-width:60ch}
.art-meta{display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center;font-size:.88rem;color:var(--on-dark-muted)}
.art-meta .who{display:flex;align-items:center;gap:10px;color:#fff;font-weight:500}
.art-meta .who img{width:36px;height:36px;border-radius:50%;object-fit:cover;object-position:50% 20%}
.catpill{justify-self:start;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;font-weight:600;padding:6px 12px;border-radius:999px;background:var(--accent-2);color:var(--olive)}
.art-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:clamp(32px,6vw,90px);align-items:start}
.prose{font-size:1.1rem;line-height:1.75;color:var(--ink-2);max-width:68ch}
.prose h2{font-size:clamp(1.6rem,2.6vw,2.1rem);letter-spacing:-.035em;margin:2.2em 0 .6em;color:var(--ink)}
.prose h2:first-child{margin-top:0}
.prose p{margin:0 0 1.1em}
.prose ul{margin:0 0 1.3em;padding-left:1.2em}
.prose li{margin-bottom:.5em}
.prose li::marker{color:var(--sage-deep)}
.prose b{color:var(--ink);font-weight:600}
.key{margin:2em 0;padding:26px 28px;border-radius:var(--r-lg);background:var(--sage-soft);border:1px solid var(--line)}
.key>b{display:block;font:500 1.2rem var(--display);letter-spacing:-.02em;margin-bottom:10px}
.key ul{margin:0}
.aside{position:sticky;top:110px;display:grid;gap:12px}
.author{background:var(--card);border:1px solid var(--line);border-radius:var(--r-lg);padding:24px;display:grid;gap:14px}
.author img{width:64px;height:64px;border-radius:50%;object-fit:cover;object-position:50% 20%}
.author b{font:500 1.15rem var(--display);letter-spacing:-.02em}
.author p{color:var(--muted);font-size:.92rem}
.aside .cta-mini{background:var(--olive);color:#fff;border-radius:var(--r-lg);padding:24px;display:grid;gap:14px}
.aside .cta-mini p{color:var(--on-dark-muted);font-size:.92rem}
.aside .cta-mini b{font:500 1.2rem var(--display);letter-spacing:-.02em}
.disc{margin-top:36px;font-size:.88rem;color:var(--muted);padding-top:20px;border-top:1px solid var(--line)}
@media (max-width:960px){.art-grid{grid-template-columns:1fr}.aside{position:static}}
"""

import runpy as _rp, json, re as _re
for _p in POSTS:
    if _p['cat'] in ('Obesidade','Metabolismo'): _p['cat']='Emagrecimento'
    _p.setdefault('faq',[]); _p.setdefault('sources',[])
NEW=[]
for _f in ['emag_a','emag_b','meno_a','meno_b','impl']: NEW+=_rp.run_path(f'articles/{_f}.py')['POSTS']
POSTS=NEW+POSTS
GRAD={'Emagrecimento':1,'Menopausa':2,'Implante hormonal':4}
for _p in POSTS:
    _p['grad']=GRAD[_p['cat']]
    _p['min']=max(3,round(len(_re.sub('<[^>]+>',' ',_p['body']).split())/200))
IMGS=['retrato','d-estudio','poltrona','d-silhueta','estudio','silhueta','d-poltrona']
TINT={'Emagrecimento':'rgba(0,0,0,0),rgba(0,0,0,0)','Menopausa':'rgba(0,0,0,0),rgba(0,0,0,0)','Implante hormonal':'rgba(0,0,0,0),rgba(0,0,0,0)'}
BIMG={'blog-tentei-de-tudo-e-nao-consigo-emagrecer': 'medida', 'blog-efeito-sanfona': 'sanfona', 'blog-parei-remedio-para-emagrecer-e-engordei': 'consulta', 'blog-metabolismo-lento-existe': 'suco', 'blog-fome-emocional-x-fome-fisica': 'hamburguer', 'blog-sono-e-emagrecimento': 'sono', 'blog-perda-de-massa-muscular-no-emagrecimento': 'consulta', 'blog-emagrecer-depois-dos-40': 'calma', 'blog-obesidade-e-doenca': 'fastfood', 'blog-tratamento-multidisciplinar-da-obesidade': 'consulta', 'blog-por-que-o-peso-volta': 'sanfona', 'blog-resistencia-a-insulina': 'suco', 'blog-caloroes-menopausa-causas-duracao-tratamento': 'calor', 'blog-menopausa-gordura-abdominal-ganho-de-peso': 'medida', 'blog-insonia-na-menopausa-causas-tratamento': 'sono', 'blog-terapia-hormonal-menopausa-mitos-verdades': 'luz', 'blog-menopausa-sem-sofrimento-opcoes-de-cuidado': 'jardim', 'blog-menopausa-saude-ossos-osteoporose': 'jardim', 'blog-libido-baixa-secura-vaginal-menopausa': 'luz', 'blog-ansiedade-irritabilidade-humor-perimenopausa': 'cansaco', 'blog-nevoa-mental-memoria-menopausa': 'cansaco', 'blog-exames-perimenopausa-fsh-diagnostico': 'leque', 'blog-sinais-da-perimenopausa': 'leque', 'blog-implante-hormonal-o-que-e-como-funciona': 'pinca', 'blog-beneficios-do-implante-hormonal': 'luz', 'blog-implante-adesivo-gel-ou-comprimido-reposicao': 'pinca', 'blog-como-e-a-colocacao-do-implante-hormonal': 'pinca', 'blog-implante-hormonal-e-seguro': 'calma'}
for _p in POSTS: _p['img']='b-'+BIMG[_p['slug']]
DOMAIN='https://www.drguilhermerocha.com.br'
PUB='2026-09-29'
FAV='<link rel="icon" type="image/png" href="data:image/png;base64,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">'
BLOG_CSS+=r"""
.art-cover{margin:0 0 40px;border-radius:var(--r-lg);overflow:hidden;aspect-ratio:16/10;background:var(--soft)}
.art-cover img{width:100%;height:100%;object-fit:cover;display:block}
.post .cover.g4{background:radial-gradient(90% 90% at 30% 10%,#E2D2A6,#6E8468)}
.bfilter button span{opacity:.6;margin-left:4px}
.toc{background:var(--card);border:1px solid var(--line);border-radius:var(--r-lg);padding:22px}
.toc b{display:block;font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-deep);margin-bottom:10px}
.toc ol{margin:0;padding-left:18px;display:grid;gap:8px;font-size:.92rem}
.toc a{color:var(--ink-2)}
.toc a:hover{color:var(--sage-deep)}
.prose h2{scroll-margin-top:110px}
.prose a{color:var(--olive);text-decoration:underline;text-underline-offset:3px;text-decoration-color:var(--sage)}
.art-faq{margin-top:48px}
.art-faq h2{margin-top:0!important}
.art-faq details p{font-size:1rem}
.refs{margin-top:40px;padding-top:24px;border-top:1px solid var(--line)}
.refs h2{font-size:1.2rem!important;margin:0 0 12px!important}
.refs ol{font-size:.9rem;color:var(--muted);padding-left:1.2em}
.refs li{margin-bottom:.4em}
.refs a{color:var(--muted);word-break:break-word}
.posts.three{grid-template-columns:repeat(3,1fr)}
@media (max-width:960px){.posts.three{grid-template-columns:1fr 1fr}}
@media (max-width:620px){.posts.three{grid-template-columns:1fr}}
"""
def pcard(p):
    return f'<a class="post rv" href="{p["slug"]}.html" data-cat="{p["cat"]}"><div class="cover g{p["grad"]}" style="background-image:linear-gradient(0deg,{TINT[p["cat"]]}),url(img/{p["img"]}.jpg);background-size:cover;background-position:50% 35%"></div><div class="meta"><b>{p["cat"]}</b>· {p["min"]} min de leitura</div><h3>{p["title"]}</h3><p class="by">Por Dr. Guilherme Rocha</p><span class="read">Ler artigo {AS}</span></a>'
def doc(title,desc,body,canon,extra_head='',otype='article',ogimg='retrato'):
    return f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{DOMAIN}/{canon}">
<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}"><meta property="og:type" content="{otype}"><meta property="og:locale" content="pt_BR"><meta property="og:url" content="{DOMAIN}/{canon}"><meta property="og:image" content="{DOMAIN}/img/{ogimg}.jpg"><meta name="twitter:card" content="summary_large_image">
{FAV}
{extra_head}
{FONTS}
{STYLE}
<style>body{{margin:0}}{BLOG_CSS}</style>
</head><body>
{nav(False)}
<main id="conteudo">
{body}
</main>
{footer(False)}
{JS}
</body></html>"""
CATS=['Emagrecimento','Menopausa','Implante hormonal']
cnt={c:sum(1 for p in POSTS if p['cat']==c) for c in CATS}
blog_index=doc('Blog do Dr. Guilherme Rocha: emagrecimento, menopausa e hormônios','Artigos do Dr. Guilherme Rocha sobre emagrecimento, efeito sanfona, obesidade, menopausa, perimenopausa e implante hormonal, com base em evidência científica.',f"""
<section class="ph-hero"><div class="wrap"><div class="ph-txt">
  <p class="crumb up"><a href="index.html">Início</a> / Blog</p>
  <h1 class="up u1">Conteúdos para entender <span class="it">o seu corpo.</span></h1>
  <p class="lead up u2">Artigos do Dr. Guilherme Rocha sobre as dúvidas que mais aparecem no consultório, com informação clara e baseada em evidência científica.</p>
</div></div></section>
<section><div class="wrap">
  <div class="bfilter" role="group" aria-label="Filtrar por tema" style="margin-top:0"><button type="button" data-f="Todos" aria-pressed="true">Todos<span>{len(POSTS)}</span></button>{''.join(f'<button type="button" data-f="{c}" aria-pressed="false">{c}<span>{cnt[c]}</span></button>' for c in CATS)}</div>
  <div class="posts" id="plist">{''.join(pcard(p) for p in POSTS)}</div>
</div></section>
{CTA}
<script>
document.querySelectorAll('.bfilter button').forEach(function(b){{b.addEventListener('click',function(){{var f=b.dataset.f;document.querySelectorAll('.bfilter button').forEach(function(x){{x.setAttribute('aria-pressed',String(x===b))}});document.querySelectorAll('#plist .post').forEach(function(p){{p.hidden=!(f==='Todos'||p.dataset.cat===f);if(!p.hidden)p.classList.add('in')}})}})}});
</script>""",'blog','<script type="application/ld+json">'+json.dumps({"@context":"https://schema.org","@type":"Blog","name":"Blog do Dr. Guilherme Rocha","url":DOMAIN+"/blog","inLanguage":"pt-BR","author":{"@type":"Physician","name":"Dr. Guilherme Loureiro Rocha"}},ensure_ascii=False)+'</script>','website')
def _slugify(t):
    import unicodedata
    t=unicodedata.normalize('NFKD',t).encode('ascii','ignore').decode().lower()
    return _re.sub(r'[^a-z0-9]+','-',t).strip('-')[:60]
PHYS={"@type":"Physician","@id":DOMAIN+"/#medico","name":"Dr. Guilherme Loureiro Rocha","url":DOMAIN+"/","image":DOMAIN+"/img/retrato.jpg","identifier":"CRM-ES 11007","medicalSpecialty":"Obesity medicine","knowsAbout":["Emagrecimento","Obesidade","Menopausa","Perimenopausa","Terapia hormonal","Implante hormonal"],"worksFor":{"@type":"MedicalClinic","name":"Instituto Guilherme Rocha","address":{"@type":"PostalAddress","streetAddress":"Rua Francisco Vieira Passos","addressLocality":"Guarapari","addressRegion":"ES","postalCode":"29215-440","addressCountry":"BR"},"telephone":"+55 27 99522-3099"},"sameAs":["https://www.instagram.com/dr.guilhermerocha","https://www.instagram.com/institutoguilhermerocha/"]}
PHYS.pop("medicalSpecialty")
arts={}
for p in POSTS:
    body=p['body']; toc=[]
    def _h2(m):
        txt=_re.sub('<[^>]+>','',m.group(1)); sid=_slugify(txt); toc.append((sid,txt)); return f'<h2 id="{sid}">{m.group(1)}</h2>'
    body=_re.sub(r'<h2>(.*?)</h2>',_h2,body)
    faq_html=''
    if p['faq']:
        faq_html='<section class="art-faq"><h2 id="perguntas-frequentes">Perguntas frequentes</h2><div class="qa">'+''.join(f'<details><summary>{q}<i></i></summary><p>{a}</p></details>' for q,a in p['faq'])+'</div></section>'
        toc.append(('perguntas-frequentes','Perguntas frequentes'))
    refs=''
    if p['sources']:
        refs='<div class="refs"><h2>Referências</h2><ol>'+''.join(f'<li>{t}. <a href="{u}" target="_blank" rel="noopener">{u}</a></li>' for t,u in p['sources'])+'</ol></div>'
    graph=[{"@type":"BlogPosting","@id":f"{DOMAIN}/{p['slug']}#artigo","headline":p['title'],"description":p['desc'],"inLanguage":"pt-BR","datePublished":PUB,"dateModified":PUB,"image":DOMAIN+"/img/retrato.jpg","mainEntityOfPage":f"{DOMAIN}/{p['slug']}","articleSection":p['cat'],"keywords":p.get('kw',''),"author":{"@id":DOMAIN+"/#medico"},"reviewedBy":{"@id":DOMAIN+"/#medico"},"publisher":{"@type":"MedicalClinic","name":"Instituto Guilherme Rocha","url":DOMAIN+"/"},"citation":[u for t,u in p['sources']]},
           PHYS,
           {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":DOMAIN+"/"},{"@type":"ListItem","position":2,"name":"Blog","item":DOMAIN+"/blog"},{"@type":"ListItem","position":3,"name":p['title'],"item":f"{DOMAIN}/{p['slug']}"}]}]
    if p['faq']: graph.append({"@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in p['faq']]})
    ld=json.dumps({"@context":"https://schema.org","@graph":graph},ensure_ascii=False)
    same=[q for q in POSTS if q is not p and q['cat']==p['cat']][:3]
    tochtml='<nav class="toc" aria-label="Neste artigo"><b>Neste artigo</b><ol>'+''.join(f'<li><a href="#{s}">{t}</a></li>' for s,t in toc)+'</ol></nav>'
    page_body=f"""
<section class="art-hero"><div class="wrap"><div class="in">
  <p class="crumb up"><a href="index.html">Início</a> / <a href="blog.html">Blog</a> / {p['cat']}</p>
  <span class="catpill up">{p['cat']}</span>
  <h1 class="up u1">{p['title']}</h1>
  <p class="lead up u2">{p['lead']}</p>
  <div class="art-meta up u3"><span class="who"><img src="img/retrato.jpg" alt="">Dr. Guilherme Rocha</span><span>CRM-ES 11007</span><span>{p['min']} min de leitura</span><span>Publicado em 29 de setembro de 2026</span></div>
</div></div></section>
<section><div class="wrap art-grid">
  <article class="prose"><figure class="art-cover"><img src="img/{p['img']}.jpg" alt="" width="1200" height="750"></figure>{body}
    {faq_html}
    {refs}
    <p class="disc">Conteúdo informativo, escrito e revisado sob responsabilidade do Dr. Guilherme Loureiro Rocha (CRM-ES 11007). Não substitui a consulta médica. Diagnóstico e tratamento dependem de avaliação individual.</p>
  </article>
  <aside class="aside">
    {tochtml}
    <div class="author"><img src="img/retrato.jpg" alt="Dr. Guilherme Rocha"><b>Dr. Guilherme Rocha</b><p>Médico há mais de 15 anos, dedicado ao emagrecimento, ao metabolismo e à saúde hormonal, com olhar integrativo. CRM-ES 11007.</p></div>
    <div class="cta-mini"><b>Quer entender o seu caso?</b><p>Agende uma avaliação no Instituto Guilherme Rocha, em Guarapari.</p><a class="btn btn-light" href="{WA}" target="_blank" rel="noopener" style="justify-self:start">Agende sua avaliação<span class="ic">{A}</span></a></div>
  </aside>
</div></section>
<section style="padding-top:0"><div class="wrap"><div class="head rv"><h2>Continue <span class="it">lendo.</span></h2></div><div class="posts three">{''.join(pcard(q) for q in same)}</div></div></section>
{CTA}"""
    arts[p['slug']]=doc(p['title']+' | Dr. Guilherme Rocha',p['desc'],page_body,p['slug'],f'<script type="application/ld+json">{ld}</script>',ogimg=p['img'])
_first={}
for _p in NEW: _first.setdefault(_p['cat'],_p)
BLOG_HOME=f"""<section id="blog" style="padding-top:0">
  <div class="wrap">
    <div class="areas-head rv" style="margin-bottom:0"><div class="head"><span class="tag">Blog</span><h2>Conteúdos para entender <span class="it">o seu corpo.</span></h2></div><a class="btn btn-line" href="blog.html">Ver os {len(POSTS)} artigos</a></div>
    <div class="posts">{''.join(pcard(_first[c]) for c in CATS)}</div>
  </div>
</section>

"""
def TOPIC(cat,title):
    ps=[p for p in NEW if p['cat']==cat][:3]
    return f"""<section style="padding-top:0"><div class="wrap"><div class="areas-head rv" style="margin-bottom:0"><div class="head"><h2>{title}</h2></div><a class="btn btn-line" href="blog.html">Ver todos os artigos</a></div><div class="posts three">{''.join(pcard(p) for p in ps)}</div></div></section>"""
TOPICS={'platinum':TOPIC('Emagrecimento','Leituras sobre <span class="it">emagrecimento.</span>'),'obesidade':TOPIC('Emagrecimento','Leituras sobre <span class="it">obesidade.</span>'),'menopausa':TOPIC('Menopausa','Leituras sobre <span class="it">menopausa.</span>'),'implante':TOPIC('Implante hormonal','Leituras sobre <span class="it">implante hormonal.</span>')}

CONTACT=f"""<section id="contato" style="padding-top:0">
  <div class="wrap">
    <div class="ct rv">
      <div class="ct-main">
        <h2>Será um prazer <span class="it">receber você.</span></h2>
        <p>O agendamento é feito pelo WhatsApp. A equipe do Instituto responde e reserva o melhor horário para você.</p>
        <a class="btn btn-light ct-btn" href="{WA}" target="_blank" rel="noopener">Agende pelo WhatsApp<span class="ic">{A}</span></a>
        <p class="ct-num">(27) 99522-3099</p>
      </div>
      <div class="ct-side">
        <div class="ct-addr"><small>Endereço</small><b>Instituto Guilherme Rocha</b><p>Rua Francisco Vieira Passos<br>Muquiçaba · Guarapari (ES)<br>CEP 29215-440</p><a class="tlink" href="https://share.google/YFuNMOtc5Fs2zYW9q" target="_blank" rel="noopener">Ver no mapa ↗</a></div>
        <div class="ct-more"><small>Acompanhe também</small>
          <a class="tlink" href="https://www.instagram.com/dr.guilhermerocha" target="_blank" rel="noopener">Instagram do Dr. Guilherme ↗</a>
          <a class="tlink" href="https://www.instagram.com/institutoguilhermerocha/" target="_blank" rel="noopener">Instagram do Instituto ↗</a>
          <a class="tlink" href="https://share.google/YFuNMOtc5Fs2zYW9q" target="_blank" rel="noopener">Avaliações no Google ↗</a>
        </div>
      </div>
    </div>
  </div>
</section>"""
# ---------- HOME ----------
MQ=re.search(r'<div class="marquee".*?</div>\n</div>',src,re.S).group(0)
home=f"""<!--HEAD--><title>Dr. Guilherme Rocha | Emagrecimento, menopausa e saúde hormonal em Guarapari</title><meta name="description" content="Dr. Guilherme Rocha, médico em Guarapari (ES) há mais de 15 anos: emagrecimento avançado, tratamento da obesidade, menopausa e implante hormonal. CRM-ES 11007.">
<link rel="canonical" href="{DOMAIN}/">
<meta property="og:title" content="Dr. Guilherme Rocha | Emagrecimento, menopausa e saúde hormonal"><meta property="og:description" content="Mais de 15 anos tratando o que a balança não mostra. Instituto Guilherme Rocha, Guarapari (ES)."><meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:url" content="{DOMAIN}/"><meta property="og:image" content="{DOMAIN}/img/retrato.jpg"><meta name="twitter:card" content="summary_large_image">
{FAV}
<script type="application/ld+json">{json.dumps({"@context":"https://schema.org","@graph":[PHYS,{"@type":"MedicalClinic","@id":DOMAIN+"/#instituto","name":"Instituto Guilherme Rocha","url":DOMAIN+"/","telephone":"+55 27 99522-3099","address":{"@type":"PostalAddress","streetAddress":"Rua Francisco Vieira Passos","addressLocality":"Guarapari","addressRegion":"ES","postalCode":"29215-440","addressCountry":"BR"},"sameAs":["https://www.instagram.com/institutoguilhermerocha/"]},{"@type":"WebSite","name":"Dr. Guilherme Rocha","url":DOMAIN+"/","inLanguage":"pt-BR"}]},ensure_ascii=False)}</script><!--/HEAD-->
{FONTS}
{STYLE}
<style>{BLOG_CSS}</style>
{nav(True)}
<main id="conteudo">
{HF}
{MQ}

<section id="sobre" style="padding-top:clamp(40px,6vw,80px)">
  <div class="wrap about-grid">
    <div class="about-l rv" style="justify-content:center">
      <div class="head">
        <span class="tag">Quem vai cuidar de você</span>
        <h2>Prazer, sou o <span class="it">Guilherme Rocha.</span></h2>
        <p class="lead2">Antes de falar em dieta ou remédio, eu quero entender a sua história. Depois, a gente segue junto até as mudanças se firmarem.</p>
        <div class="chiprow"><span>Médico · CRM-ES 11007</span><span>Instituto Guilherme Rocha</span><span>Guarapari (ES)</span></div>
        <a class="btn btn-dark" href="{WA}" target="_blank" rel="noopener" style="margin-top:8px">Agendar consulta<span class="ic">{A}</span></a>
      </div>
    </div>
    <div class="about-r rv">
      <div class="ph big"><img src="img/poltrona.jpg" alt="Dr. Guilherme Rocha de blazer azul, sentado em poltrona de couro"><span class="chip">Consulta sem pressa</span></div>
      <div class="quote-card"><p>Tratamento bom é aquele que você consegue manter.</p><small>O que orienta cada plano</small></div>
      <div class="ph sil"><img src="img/silhueta.jpg" alt="Perfil do Dr. Guilherme Rocha em preto e branco"></div>
    </div>
  </div>
</section>

<section id="tratamentos" style="padding-top:0">
  <div class="wrap">
    <div class="head rv" style="margin-bottom:40px"><span class="tag">Tratamentos</span><h2>Como posso <span class="it">te ajudar.</span></h2></div>
    <div class="areas">
      <a class="area photo nf rv" href="platinum.html"><img src="img/platinum-bg.jpg" alt="" loading="lazy">
        <div class="in">{ic('<path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3Z"/>')}<span class="pill-gold">Programa Platinum</span><h3>Emagrecimento avançado</h3><p>Equipe completa e acompanhamento de perto.</p><div class="more" style="border-color:rgba(255,255,255,.2)">Saiba mais {AS}</div></div></a>
      <a class="area photo nf rv" href="obesidade.html"><img src="img/obesidade-bg.jpg" alt="" loading="lazy">
        <div class="in"><h3>Tratamento da obesidade</h3><p>Tratamento sério, sem julgamento e sem dieta da moda.</p><div class="more" style="border-color:rgba(255,255,255,.2)">Saiba mais {AS}</div></div></a>
      <a class="area photo nf rv" href="menopausa.html"><img src="img/menopausa-bg.jpg" alt="" loading="lazy">
        <div class="in"><h3>Menopausa e perimenopausa</h3><p>Essa fase não precisa ser sinônimo de sofrimento.</p><div class="more" style="border-color:rgba(255,255,255,.2)">Saiba mais {AS}</div></div></a>
      <a class="area photo nf rv" href="implante.html"><img src="img/implante-bg.jpg" alt="" loading="lazy">
        <div class="in"><h3>Implante hormonal</h3><p>Reposição hormonal quando existe indicação clínica.</p><div class="more" style="border-color:rgba(255,255,255,.2)">Saiba mais {AS}</div></div></a>
    </div>
    <div class="also rv"><p><b>Também no Instituto</b>Com outros profissionais da equipe.</p><div><span>Neurologia</span><span>Nutrologia</span></div></div>
  </div>
</section>

<section style="padding-top:0">
  <div class="wrap">
    <div class="plt rv">
      <div class="plt-l">
        <div class="pl-badge"><span class="pl-stars">★★★★★</span>Programa Platinum</div>
        <h2>O programa mais completo do Instituto para <span class="it">emagrecer.</span></h2>
        <p>Médico, nutrologia, neurologia, nutrição, psicologia e educação física no mesmo plano.</p>
        <div class="chiprow"><span>Plano individual</span><span>60 a 180+ dias</span><span>Presencial</span></div>
        <div class="hero-ctas" style="margin-top:4px"><a class="btn btn-gold" href="platinum.html">Conhecer o Platinum<span class="ic">{A}</span></a></div>
      </div>
      <div class="plt-r"><span class="pl-stars">★★★★★</span><div class="plt-word">Platinum</div><small>Instituto Guilherme Rocha</small></div>
    </div>
  </div>
</section>

<section id="depoimentos" style="padding-top:0">
  <div class="wrap">
    <div class="areas-head rv" style="margin-bottom:36px"><div class="head"><span class="tag">Depoimentos</span><h2>Quem já passou <span class="it">por aqui.</span></h2></div><p class="sub">Pacientes do Instituto contando, com as próprias palavras, como foi o acompanhamento.</p></div>
  </div>
  <div class="vt-track"><a class="vt rv" href="https://www.instagram.com/p/Dai94XdBd_T/" target="_blank" rel="noopener" aria-label="Assistir depoimento 1 no Instagram"><span class="vt-top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>Depoimento</span><span class="vt-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span><span class="vt-foot"><b>Paciente do Instituto</b><small>Assistir no Instagram ↗</small></span></a><a class="vt rv" href="https://www.instagram.com/p/DdcXP8uAe4D/" target="_blank" rel="noopener" aria-label="Assistir depoimento 2 no Instagram"><span class="vt-top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>Depoimento</span><span class="vt-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span><span class="vt-foot"><b>Paciente do Instituto</b><small>Assistir no Instagram ↗</small></span></a><a class="vt rv" href="https://www.instagram.com/p/Dc4VjRpD2Fu/" target="_blank" rel="noopener" aria-label="Assistir depoimento 3 no Instagram"><span class="vt-top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>Depoimento</span><span class="vt-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span><span class="vt-foot"><b>Paciente do Instituto</b><small>Assistir no Instagram ↗</small></span></a><a class="vt rv" href="https://www.instagram.com/p/Da23sDcoifd/" target="_blank" rel="noopener" aria-label="Assistir depoimento 4 no Instagram"><span class="vt-top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>Depoimento</span><span class="vt-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span><span class="vt-foot"><b>Paciente do Instituto</b><small>Assistir no Instagram ↗</small></span></a><a class="vt rv" href="https://www.instagram.com/p/Dbl2jglox0W/" target="_blank" rel="noopener" aria-label="Assistir depoimento 5 no Instagram"><span class="vt-top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>Depoimento</span><span class="vt-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span><span class="vt-foot"><b>Paciente do Instituto</b><small>Assistir no Instagram ↗</small></span></a></div>
</section>

<section id="como-funciona" style="padding-top:0">
  <div class="wrap">
    <div class="head rv"><span class="tag">Como funciona</span><h2>Três passos para <span class="it">começar.</span></h2></div>
    <div class="method three">
      <div class="step rv"><div class="n"><b>01</b>Contato</div><div><h3>Mande uma mensagem</h3><p>A equipe encontra o melhor horário para você.</p></div></div>
      <div class="step rv"><div class="n"><b>02</b>Consulta</div><div><h3>Avaliação sem pressa</h3><p>Conversa, exame físico e revisão dos seus exames.</p></div></div>
      <div class="step last rv"><div class="n"><b>03</b>Plano</div><div><h3>Seguir <span class="it">junto</span></h3><p>Você sai com um caminho claro e retornos marcados.</p></div></div>
    </div>
  </div>
</section>

{BLOG_HOME}<section id="duvidas" style="padding-top:0">
  <div class="wrap faq">
    <div class="faq-l rv"><span class="tag" style="justify-self:start">Dúvidas</span><h2>Perguntas <span class="it">frequentes.</span></h2></div>
    <div class="qa short rv">
      <details open><summary>Como faço para agendar?<i></i></summary><p>Pelo WhatsApp (27) 99522-3099.</p></details>
      <details><summary>Quanto custa a consulta?<i></i></summary><p>R$ 650. Programas como o Platinum são contratados à parte, se houver indicação.</p></details>
      <details><summary>Preciso levar exames?<i></i></summary><p>Se tiver, leve, inclusive os antigos.</p></details>
      <details><summary>Onde fica o consultório?<i></i></summary><p>Rua Francisco Vieira Passos, Muquiçaba, Guarapari (ES).</p></details>
    </div>
  </div>
</section>

{CONTACT}
</main>
{footer(True)}
{JS}
"""


PMETA={
 'platinum':('Programa Platinum de emagrecimento | Dr. Guilherme Rocha','Programa Platinum do Instituto Guilherme Rocha: acompanhamento médico avançado e multidisciplinar para emagrecer, em Guarapari (ES). Veja como funciona.'),
 'obesidade':('Tratamento da obesidade em Guarapari | Dr. Guilherme Rocha','Tratamento da obesidade com o Dr. Guilherme Rocha em Guarapari (ES): investigação metabólica, plano individual e acompanhamento próximo. Agende sua avaliação.'),
 'menopausa':('Tratamento da menopausa em Guarapari | Dr. Guilherme Rocha','Cuidado na menopausa e perimenopausa com o Dr. Guilherme Rocha em Guarapari (ES): calorões, sono, humor, peso e terapia hormonal quando indicada.'),
 'implante':('Implante hormonal em Guarapari | Dr. Guilherme Rocha','Implante hormonal com critério médico no Instituto Guilherme Rocha, em Guarapari (ES): avaliação, exames, indicação individual e acompanhamento contínuo.'),
}
def page(key,h1,lead,img,body,title):
    return f'''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{PMETA[key][0]}</title>
<meta name="description" content="{PMETA[key][1]}">
<link rel="canonical" href="{DOMAIN}/{key}">
<meta property="og:title" content="{PMETA[key][0]}"><meta property="og:description" content="{PMETA[key][1]}"><meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:url" content="{DOMAIN}/{key}"><meta property="og:image" content="{DOMAIN}/img/{img}.jpg">
{FAV}
<script type="application/ld+json">{json.dumps({"@context":"https://schema.org","@graph":[{"@type":"MedicalWebPage","name":PMETA[key][0],"description":PMETA[key][1],"url":DOMAIN+"/"+key,"inLanguage":"pt-BR","reviewedBy":{"@id":DOMAIN+"/#medico"},"lastReviewed":PUB},PHYS,{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":DOMAIN+"/"},{"@type":"ListItem","position":2,"name":PAGES[key],"item":DOMAIN+"/"+key}]}]},ensure_ascii=False)}</script>
{FONTS}
{STYLE}
<style>body{{margin:0}}{BLOG_CSS}</style>
</head><body>
{nav(False)}
<main id="conteudo">
<section class="ph-hero">
  <div class="wrap ph-grid">
    <div class="ph-txt">
      <p class="crumb up"><a href="index.html#tratamentos">Tratamentos</a> / {PAGES[key]}</p>
      <h1 class="up u1">{h1}</h1>
      <p class="lead up u2">{lead}</p>
      <div class="hero-ctas up u3" style="margin-top:0"><a class="btn btn-light" href="{WAP if key=='platinum' else WA}" target="_blank" rel="noopener">Agendar avaliação<span class="ic">{A}</span></a></div>
    </div>
    <div class="ph-img up u2"><img src="img/{img}.jpg" alt=""></div>
  </div>
</section>
<div style="height:clamp(56px,8vw,100px)"></div>
{body}
{TOPICS.get(key,'')}
{others(key)}
{CTA}
</main>
{footer(False)}
{JS}
</body></html>'''

plat=re.sub(r'<div class="pl-head rv">.*?</div>\s*</div>\s*<div class="pl-grid">','<div class="pl-grid">',S_PLAT,count=1,flags=re.S)
# pl-head contains nested div (badge); handle robustly
if 'pl-head' in plat:
    i=plat.index('<div class="pl-head'); j=plat.index('<div class="pl-grid">'); plat=plat[:i]+plat[j:]
plat=plat.replace('style="margin-top:clamp(36px,5vw,64px)"','')
plat=plat.replace('.pl-grid','.pl-grid')
FAQP=re.findall(r'<details><summary>(?:Quanto custa o Programa Platinum|Posso fazer a consulta sem|O Platinum pode ser feito).*?</details>',src,re.S)
faqp=f'<section style="padding-top:0"><div class="wrap faq"><div class="faq-l rv"><span class="tag" style="justify-self:start">Dúvidas</span><h2>Sobre o <span class="it">Platinum.</span></h2></div><div class="qa rv">{"".join(FAQP)}</div></div></section>'
FAQI=re.findall(r'<details><summary>Quem pode usar implante.*?</details>',src,re.S)
faqi=f'<section style="padding-top:0"><div class="wrap faq"><div class="faq-l rv"><span class="tag" style="justify-self:start">Dúvidas</span><h2>Antes de <span class="it">decidir.</span></h2></div><div class="qa rv">{"".join(FAQI)}<details><summary>O implante serve para emagrecer?<i></i></summary><p>Não. O implante hormonal trata sintomas e deficiências hormonais com indicação clínica. O tratamento do peso é feito com outro plano, avaliado na consulta.</p></details></div></div></section>'

pages={
 'platinum':page('platinum','Programa <span class="it">Platinum</span>','O acompanhamento mais completo do Instituto para quem precisa de uma estratégia de emagrecimento mais robusta.','platinum-bg',__import__('platinum_body').build(WA,WAP,A,AS),'Programa Platinum'),
 'obesidade':page('obesidade','Tratamento da <span class="it">obesidade</span>','Obesidade é uma doença crônica. O tratamento começa por entender o que levou o peso até aqui.','obesidade-bg',S_STORY+S_METHOD+S_CRIT,'Tratamento da obesidade'),
 'menopausa':page('menopausa','Menopausa e <span class="it">perimenopausa</span>','Os sintomas dessa fase têm explicação e têm tratamento.','menopausa-bg',S_MENO,'Menopausa e perimenopausa'),
 'implante':page('implante','Implante <span class="it">hormonal</span>','Reposição hormonal por implante, quando existe indicação clínica.','implante-bg',S_IMP+faqi,'Implante hormonal'),
}
import re as _r
strip=lambda h:_r.sub(r'<span class="tag[^"]*"[^>]*>.*?</span>\s*','',h)
from copytext import apply as _ap
_log={}
home=home.replace('<div class="hf-photo">','''<div class="hfx" aria-hidden="true">
    <svg class="hfx-grid" width="100%" height="100%" preserveAspectRatio="none"><defs><pattern id="hgrid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(199,171,107,.09)" stroke-width=".5"/></pattern></defs>
      <rect width="100%" height="100%" fill="url(#hgrid)"/>
      <line x1="0" y1="20%" x2="100%" y2="20%" class="gl" style="animation-delay:.3s"/><line x1="0" y1="80%" x2="100%" y2="80%" class="gl" style="animation-delay:.6s"/>
      <line x1="20%" y1="0" x2="20%" y2="100%" class="gl" style="animation-delay:.9s"/><line x1="80%" y1="0" x2="80%" y2="100%" class="gl" style="animation-delay:1.2s"/>
      <circle cx="20%" cy="20%" r="2.5" class="gd" style="animation-delay:1.6s"/><circle cx="80%" cy="20%" r="2.5" class="gd" style="animation-delay:1.75s"/><circle cx="20%" cy="80%" r="2.5" class="gd" style="animation-delay:1.9s"/><circle cx="80%" cy="80%" r="2.5" class="gd" style="animation-delay:2.05s"/>
    </svg>
    <span class="hc tl"></span><span class="hc tr"></span><span class="hc bl"></span><span class="hc br"></span>
    <span class="hp" style="top:26%;left:14%;animation-delay:0s"></span><span class="hp" style="top:62%;left:86%;animation-delay:1.5s"></span><span class="hp" style="top:42%;left:9%;animation-delay:3s"></span><span class="hp" style="top:74%;left:91%;animation-delay:4.5s"></span><span class="hp" style="top:18%;left:70%;animation-delay:2.2s"></span><span class="hp" style="top:55%;left:28%;animation-delay:5.2s"></span>
    <div class="hglow" id="hglow"></div><div class="hglow2"></div>
  </div>
  <div class="hf-photo">''',1)
import re as _re2
home=_re2.sub(r'<div class="hf-photo">.*?</div>','''<div class="hf-name" aria-hidden="true"><span class="n2">Rocha</span></div>
  <div class="hf-spot" aria-hidden="true"></div>
  <img class="hf-cut" src="img/retrato-cut.webp" alt="Dr. Guilherme Rocha, de camisa preta, com a mão apoiada no queixo" width="928" height="1152">''',home,count=1,flags=_re2.S)
home=home.replace('<section class="hf" id="inicio">','<section class="hf hf2" id="inicio">',1)
home=_ap(home,_log)
pages={k:_ap(v,_log) for k,v in pages.items()}
blog_index=_ap(blog_index,_log)
arts={k:_ap(v,_log) for k,v in arts.items()}
open('out/blog.html','w').write(blog_index)
for k,v in arts.items(): open(f'out/{k}.html','w').write(v)
print('MISSING:',[a[:60] for a,n in _log.items() if n==0])
open('out/index.html','w').write(home)
for k,v in pages.items(): open(f'out/{k}.html','w').write(v)
for f in ['index']+list(pages):
    x=open(f'out/{f}.html').read(); print(f,len(x),x.count('—'),len(re.findall(r'\{\{',x)))
