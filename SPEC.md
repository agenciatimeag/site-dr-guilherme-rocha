# Especificação dos artigos do blog do Dr. Guilherme Rocha

Contexto: blog do site pessoal do Dr. Guilherme Loureiro Rocha (médico, CRM-ES 11007, mais de 15 anos de prática, olhar integrativo), que atende no Instituto Guilherme Rocha, em Guarapari (ES). Áreas: emagrecimento avançado (Programa Platinum, acompanhamento multidisciplinar presencial), tratamento da obesidade, menopausa e perimenopausa, implante hormonal. Público de alto padrão. Objetivo dos artigos: gerar autoridade no Google (SEO), aparecer em respostas de IA e buscadores (AEO/GEO), e deixar claro que o Dr. Guilherme e o Instituto fazem esses tratamentos.

## Formato de saída (obrigatório)
Escreva UM arquivo Python no caminho indicado no seu pedido, contendo apenas:

POSTS = [
  dict(
    slug='blog-...',            # ascii, minúsculas, hífens, começa com blog-, até ~60 caracteres
    cat='...',                  # categoria indicada no seu pedido
    kw='...',                   # palavra-chave principal
    title='...',                # até 65 caracteres, com a palavra-chave no início quando possível
    desc='...',                 # meta description entre 140 e 158 caracteres
    lead='...',                 # 1 a 2 frases de abertura (aparecem no topo da página)
    body='''...''',             # HTML do corpo (ver regras)
    faq=[('pergunta','resposta'), ('...','...'), ('...','...')],   # exatamente 3, respostas de 40 a 70 palavras
    sources=[('Título da fonte, Instituição ou periódico, ano','https://...'), ...],  # 2 a 5 fontes
  ),
  ...
]

Depois de escrever, VALIDE executando: python3 -c "import runpy;d=runpy.run_path('ARQUIVO');P=d['POSTS'];print(len(P));[print(p['slug'],len(p['title']),len(p['desc']),len(p['body'].split())) for p in P]" e confira: nenhum travessão "—" em nenhum campo (grep), títulos até 65, desc 140 a 158, corpo entre 750 e 1100 palavras.

## Regras do corpo (body)
- HTML simples: <h2>, <h3> opcional, <p>, <ul><li>, <ol><li>, <b>, <a href="...">. Sem <h1> (o título já é o h1).
- Primeiro bloco: um <h2> em forma de pergunta com a palavra-chave, seguido de um parágrafo de 40 a 60 palavras que responde de forma direta e completa (trecho para featured snippet e respostas de IA).
- 4 a 6 seções <h2>, várias em forma de pergunta natural que as pessoas digitam no Google.
- Pelo menos uma lista <ul> ou <ol>.
- Um box de resumo exatamente neste formato: <div class="key"><b>Em resumo</b><ul><li>...</li></ul></div> (3 a 4 itens).
- Citações no texto no formato "(Instituição ou autor, ano)" quando houver dado ou recomendação, ligadas às fontes da lista.
- Links internos (pelo menos 1, no máximo 3), com texto âncora natural: platinum.html (Programa Platinum, emagrecimento avançado), obesidade.html (tratamento da obesidade), menopausa.html (menopausa e perimenopausa), implante.html (implante hormonal).
- Última seção: <h2> como "Como o Dr. Guilherme Rocha trata ..." ou "Quando procurar uma avaliação", mostrando de forma elegante que o Dr. Guilherme faz esse tratamento no Instituto Guilherme Rocha, em Guarapari (ES), com avaliação individual, exames e acompanhamento próximo. Sem linguagem de venda agressiva.
- 750 a 1100 palavras.

## Tom e estilo
- Português do Brasil, claro, elegante, com autoridade e acolhimento. Frases de comprimento variado, com conectivos.
- Proibido travessão "—" (use vírgula, dois pontos, parênteses).
- Evite o padrão de contraste seco típico de IA ("não é X, é Y", frases curtas empilhadas em oposição).
- Evite clichês de marketing ("revolucionário", "segredo", "milagroso", "transforme sua vida").
- Refira-se ao médico como "Dr. Guilherme Rocha" ou "Dr. Guilherme" (terceira pessoa).

## Regras éticas e regulatórias (CFM) obrigatórias
- Não prometer resultados nem citar números de quilos perdidos; não usar antes e depois; não usar depoimentos.
- Não chamar o Dr. Guilherme de "especialista" nem citar títulos de especialidade. Não usar "medicina funcional" como especialidade (pode usar "olhar integrativo").
- Não citar nomes comerciais/marcas de medicamentos (Ozempic, Mounjaro, Wegovy etc.). Pode citar classes e princípios ativos de forma informativa (ex.: "agonistas do receptor de GLP-1", "tirzepatida", "semaglutida") sem recomendar uso.
- Sempre deixar claro que indicação, dose e tratamento dependem de avaliação médica individual.
- Implantes hormonais: NÃO demonizar (o Instituto realiza implantes). Apresentar benefícios reais de forma honesta e embasada (liberação contínua, estabilidade, conveniência, adesão, alívio de sintomas da menopausa quando há indicação), com a segurança ligada a indicação correta, avaliação, exames e monitoramento. Deixar claro que o Instituto não indica implantes com finalidade estética ou de ganho de desempenho (alinhado à Resolução CFM 2.333/2023). Não fazer afirmações que contradigam a regulação vigente; pesquise o estado atual (CFM, Anvisa) antes de escrever.
- Não inventar dados, estudos ou estatísticas. Todo número precisa ter fonte real.

## Fontes
- Use WebSearch/WebFetch para encontrar e CONFIRMAR fontes reais e confiáveis: The Menopause Society (NAMS), FEBRASGO, SBEM, ABESO, Ministério da Saúde, OMS/WHO, NIH/NCBI/PubMed, NEJM, Lancet, JAMA, BMJ, Endocrine Society, Cochrane, Mayo Clinic, sociedades médicas.
- As URLs precisam existir (prefira páginas institucionais estáveis ou PubMed/DOI). Não invente URLs.
