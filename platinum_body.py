def build(WA,WAP,A,AS):
    ck='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="m4 8.5 2.5 2.5L12 5.5"/></svg>'
    x='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg>'
    inc=['Os recursos definidos no seu planejamento individual','Acompanhamento médico com o Dr. Guilherme','Profissionais da equipe previstos no seu plano','Medicamentos do planejamento, fornecidos e administrados no Instituto durante o período contratado','Suporte da equipe clínica pelo WhatsApp, quando previsto']
    exc=['A consulta de avaliação, que é paga à parte','Exames laboratoriais e de imagem','Medicamentos comprados em farmácias externas','Recursos que não estejam no seu planejamento']
    items=[('Acompanhamento médico','O Dr. Guilherme avalia o caso, define a estratégia e acompanha a sua evolução.'),
    ('Planejamento individual','Metas, etapas e ajustes pensados para o seu histórico e a sua rotina.'),
    ('Equipe multidisciplinar','Nutrologia e neurologia com o próprio Dr. Guilherme, além de nutricionista, psicólogo e educador físico, conforme o seu plano.'),
    ('Plano alimentar','Montado e acompanhado pela equipe de nutrição do Instituto.'),
    ('Suporte próximo','Contato com a equipe clínica pelo WhatsApp, dirigida pelo Dr. Guilherme.'),
    ('Medicamentos e protocolos','Quando indicados, fornecidos e administrados no próprio Instituto, incluindo avaliação corporal por bioimpedância.')]
    steps=[('Consulta de avaliação','Uma consulta individual com o Dr. Guilherme, obrigatória para quem deseja entrar no Platinum. Ele avalia histórico, dificuldades, objetivos e exames.','R$ 650 · paga à parte'),
    ('Indicação','Se o Platinum fizer sentido para o seu caso, ele é apresentado a você. O ingresso não é automático, e você pode fazer a consulta sem contratar o programa.',''),
    ('Planejamento, duração e valor','Você recebe o plano personalizado: o que ele inclui, quanto tempo dura e o investimento correspondente.',''),
    ('Início no Instituto','O programa é presencial. Os retornos e avaliações seguem a frequência definida pelo Dr. Guilherme para o seu caso.',''),
    ('Reavaliação no fim do período','O Dr. Guilherme avalia resultados e evolução. Se houver necessidade de continuidade, um novo planejamento é elaborado, com nova duração e novo valor.','')]
    groups=[('Antes de entrar',[
      ('Preciso fazer uma consulta antes?','Sim. A consulta de avaliação com o Dr. Guilherme é obrigatória. É nela que ele entende o seu caso e define se o Platinum é indicado.'),
      ('A consulta já faz parte do Platinum?','Não. A consulta e o programa são serviços diferentes, contratados separadamente. O valor de R$ 650 corresponde apenas à consulta e não representa o preço do Platinum.'),
      ('Posso fazer a consulta e não entrar no programa?','Sim. O ingresso não é automático e depende de indicação médica e da sua decisão.'),
      ('O Platinum pode ser feito online?','Não. O programa é exclusivamente presencial, porque envolve avaliações, medicamentos administrados no Instituto e acompanhamento próximo.')]),
    ('Valores',[
      ('Quanto custa o Platinum?','O Platinum não tem preço fixo. O valor é definido depois da consulta e considera a duração do programa, as suas necessidades, o planejamento médico, os medicamentos e protocolos previstos e os profissionais envolvidos. Por isso não é possível informar um preço único antes da avaliação.'),
      ('Os medicamentos estão incluídos?','Estão incluídos os medicamentos que fazem parte do seu planejamento e que são fornecidos e administrados pelo Instituto durante o período contratado. Medicamentos comprados em farmácias externas não estão incluídos.'),
      ('Os exames estão incluídos?','Não. Exames laboratoriais e de imagem são solicitados conforme a necessidade. Informações sobre locais e valores podem ser verificadas com o Dr. Guilherme e com a recepção.')]),
    ('Durante o programa',[
      ('Quanto tempo dura?','Os períodos mais comuns são 60, 90, 120 e 180 dias. O programa pode passar de 180 dias quando o Dr. Guilherme considerar necessário.'),
      ('Quantas consultas e retornos terei?','Não existe um número fixo. A frequência depende da duração contratada, das suas necessidades, da sua evolução e do planejamento definido pelo Dr. Guilherme.'),
      ('Quem conduz o programa?','O Dr. Guilherme Loureiro Rocha, que avalia o caso, define a estratégia e acompanha a evolução. Outros profissionais do Instituto participam conforme o planejamento.'),
      ('O acompanhamento nutricional é feito pelo Dr. Guilherme?','Não. Quando previsto no plano, o acompanhamento nutricional e o plano alimentar são conduzidos pelos profissionais de nutrição da equipe do Instituto.'),
      ('Como funciona o suporte pelo WhatsApp?','Quando previsto, o suporte é feito por uma equipe clínica dirigida pelo Dr. Guilherme, pelo WhatsApp do Instituto. Ele não acontece pelo WhatsApp pessoal do médico.'),
      ('Posso escolher o medicamento ou o protocolo?','A escolha do medicamento, da dose, da frequência e do tempo de uso, assim como de medicamentos injetáveis e outros protocolos, depende exclusivamente da avaliação médica. Nenhum medicamento ou protocolo específico é garantido antes da consulta.')]),
    ('Depois e questões administrativas',[
      ('O que acontece quando o período termina?','O Dr. Guilherme avalia resultados, evolução e necessidades. Se houver indicação de continuidade, é feito um novo planejamento, com nova duração e novo valor. Alguns pacientes permanecem em acompanhamento por períodos mais longos.'),
      ('Como pausar ou cancelar?','Pedidos de pausa, cancelamento ou alterações contratuais são tratados diretamente com o setor administrativo do Instituto.')])]
    faq=''.join(f'<div class="fg rv"><h3>{g}</h3><div class="qa">'+''.join(f'<details><summary>{q}<i></i></summary><p>{a}</p></details>' for q,a in qs)+'</div></div>' for g,qs in groups)
    return f'''
<section class="pp"><div class="wrap pp-narrow">
  <div class="pp-intro rv">
    <h2>O que é o <span class="it">Platinum.</span></h2>
    <p class="pp-big">É um acompanhamento médico avançado, próximo e totalmente personalizado para quem precisa de uma estratégia mais completa de emagrecimento. É o programa cinco estrelas do Instituto Guilherme Rocha.</p>
    <p>Conforme o seu planejamento, ele reúne acompanhamento médico, equipe clínica, suporte nutricional, medicamentos e protocolos adequados ao seu caso, tudo conduzido pelo Dr. Guilherme Loureiro Rocha.</p>
    <p class="pp-facts"><span>Plano individual</span><span>60 a 180+ dias</span><span>Exclusivamente presencial</span></p>
  </div>
</div></section>

<section class="pp"><div class="wrap pp-narrow">
  <h2 class="rv">Para quem <span class="it">é indicado.</span></h2>
  <ul class="pp-for rv">
    <li>{ck}Para quem já tentou emagrecer outras vezes e não conseguiu manter o resultado.</li>
    <li>{ck}Para quem precisa de um acompanhamento mais próximo do que consultas espaçadas.</li>
    <li>{ck}Para quem tem questões associadas, como alterações metabólicas ou hormonais, que pedem o olhar de mais de um profissional.</li>
    <li>{ck}Para quem quer uma estratégia completa, em um só lugar.</li>
  </ul>
  <p class="pp-note rv">A indicação é sempre do Dr. Guilherme, depois da consulta de avaliação.</p>
</div></section>

<section class="pp"><div class="wrap pp-narrow">
  <h2 class="rv">Como funciona, <span class="it">passo a passo.</span></h2>
  <ol class="pp-steps">{''.join(f'<li class="rv"><span class="n">{i+1}</span><div><h3>{t}</h3><p>{d}</p>{f"<span class=pp-tag>{tag}</span>" if tag else ""}</div></li>' for i,(t,d,tag) in enumerate(steps))}</ol>
  <div class="rv" style="margin-top:28px"><a class="btn btn-dark" href="{WAP}" target="_blank" rel="noopener">Agende sua consulta de avaliação<span class="ic">{A}</span></a></div>
</div></section>

<section class="pp"><div class="wrap pp-narrow">
  <h2 class="rv">O que pode fazer parte <span class="it">do seu plano.</span></h2>
  <p class="pp-lead rv">Cada planejamento é individual. Somente os recursos definidos no plano apresentado depois da consulta fazem parte do programa contratado.</p>
  <dl class="pp-list rv">{''.join(f'<div><dt>{t}</dt><dd>{d}</dd></div>' for t,d in items)}</dl>
</div></section>

<section class="pp"><div class="wrap pp-narrow">
  <h2 class="rv">Duração.</h2>
  <div class="pp-days rv"><span><b>60</b>dias</span><span><b>90</b>dias</span><span><b>120</b>dias</span><span><b>180+</b>dias</span></div>
  <p class="pp-lead rv">Esses são os períodos mais comuns. Não existe um número fixo de consultas: a frequência dos retornos acompanha a sua evolução e o planejamento definido pelo Dr. Guilherme.</p>
</div></section>

<section class="pp"><div class="wrap pp-narrow">
  <h2 class="rv">O que está incluído <span class="it">e o que não está.</span></h2>
  <div class="pp-io rv">
    <div class="in"><h3>Incluído</h3><ul>{''.join(f'<li>{ck}{t}</li>' for t in inc)}</ul></div>
    <div class="out"><h3>Não incluído</h3><ul>{''.join(f'<li>{x}{t}</li>' for t in exc)}</ul></div>
  </div>
</div></section>

<section class="pp" id="duvidas-platinum"><div class="wrap pp-narrow">
  <h2 class="rv">Todas as dúvidas <span class="it">sobre o Platinum.</span></h2>
  {faq}
  <div class="pp-end rv"><p>Ainda tem alguma dúvida? A equipe do Instituto responde pelo WhatsApp.</p><a class="btn btn-dark" href="{WAP}" target="_blank" rel="noopener">Iniciar conversa<span class="ic">{A}</span></a></div>
</div></section>
'''
PP_CSS=r"""
.pp{padding-block:clamp(48px,6vw,80px)}
.pp + .pp{border-top:1px solid var(--line)}
.pp-narrow{max-width:880px}
.pp h2{font-size:clamp(2rem,4vw,3.2rem);margin-bottom:26px}
.pp-intro{display:grid;gap:18px}
.pp-intro h2{margin-bottom:6px}
.pp-intro .pp-big{color:var(--ink)!important;font-size:clamp(1.3rem,2.2vw,1.7rem)!important;font:500 clamp(1.3rem,2.2vw,1.7rem)/1.35 var(--display);letter-spacing:-.02em;color:var(--ink)}
.pp-intro p{color:var(--muted);font-size:1.08rem;max-width:64ch}
.pp-facts{display:flex;flex-wrap:wrap;gap:6px 0;font-size:.95rem!important;color:var(--ink)!important;font-weight:500}
.pp-facts span+span::before{content:"·";margin:0 12px;color:var(--accent-2)}
.pp-lead{color:var(--muted);font-size:1.05rem;max-width:64ch;margin-bottom:26px}
.pp-for{list-style:none;margin:0;padding:0;display:grid;gap:14px}
.pp-for li{display:grid;grid-template-columns:28px 1fr;gap:14px;font-size:1.1rem;align-items:start}
.pp-for svg,.pp-io svg{width:24px;height:24px;padding:5px;border-radius:50%;background:var(--sage-soft);color:var(--olive);margin-top:2px}
.pp-note{margin-top:22px;color:var(--muted);font-size:.95rem}
.pp-steps{list-style:none;margin:0;padding:0;position:relative}
.pp-steps::before{content:"";position:absolute;left:21px;top:22px;bottom:22px;width:1px;background:var(--line)}
.pp-steps li{display:grid;grid-template-columns:44px 1fr;gap:22px;padding-block:18px;position:relative}
.pp-steps .n{width:44px;height:44px;border-radius:50%;background:var(--bg);border:1px solid var(--olive);display:grid;place-items:center;font:600 1rem var(--display);color:var(--olive)}
.pp-steps li:first-child .n{background:var(--olive);color:#fff}
.pp-steps h3{font-size:1.35rem;margin-top:8px}
.pp-steps p{color:var(--muted);margin-top:6px;max-width:60ch}
.pp-tag{display:inline-block;margin-top:10px;font-size:.85rem;font-weight:500;padding:6px 12px;border-radius:8px;background:var(--accent-soft);color:var(--ink-2)}
.pp-list{margin:0;display:grid;grid-template-columns:1fr 1fr;column-gap:40px}
.pp-list div{padding-block:18px;border-top:1px solid var(--line)}
.pp-list dt{font:500 1.15rem var(--display);letter-spacing:-.02em}
.pp-list dd{margin:4px 0 0;color:var(--muted);font-size:.95rem}
@media (max-width:700px){.pp-list{grid-template-columns:1fr}}
.pp-days{display:flex;flex-wrap:wrap;gap:0;margin-bottom:22px;border-block:1px solid var(--line)}
.pp-days span{flex:1;min-width:110px;padding:20px 0;display:grid;gap:2px;font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.pp-days span+span{padding-left:22px;border-left:1px solid var(--line)}
.pp-days b{font:600 2.4rem/1 var(--display);letter-spacing:-.04em;color:var(--olive);text-transform:none}
.pp-io{display:grid;grid-template-columns:1fr 1fr;gap:40px}
.pp-io h3{font-size:1.2rem;margin-bottom:14px}
.pp-io ul{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.pp-io li{display:grid;grid-template-columns:28px 1fr;gap:12px;color:var(--ink-2)}
.pp-io .out svg{background:#EFE7E3;color:#8A4B3A}
@media (max-width:700px){.pp-io{grid-template-columns:1fr}}
.fg{margin-top:30px}
.fg h3{font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-deep);font-family:var(--sans);font-weight:600;margin-bottom:12px}
.pp-end{margin-top:40px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;padding:24px 26px;border-radius:var(--r-lg);background:var(--sage-soft)}
.pp-end p{font-weight:500}
"""
