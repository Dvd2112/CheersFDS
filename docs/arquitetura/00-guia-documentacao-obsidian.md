---
title: Guia de Documentacao de Conversas
aliases: [Guia Docs, Processo de Registro]
tags: [arquitetura, documentacao, processo, obsidian]
status: ativo
created: 2026-04-06
updated: 2026-04-06
---

# Objetivo
Manter um historico claro das decisoes e descobertas do projeto, saindo do prototipo para uma base de produto.

# Regra Combinada
A partir deste ponto, tudo que for relevante em nossas conversas sera registrado em arquivos Markdown dentro da pasta `docs/`.

# Padrao Obsidian
- Frontmatter YAML no topo.
- Titulo com heading `#`.
- Secoes curtas e objetivas.
- Checklist com `- [ ]` quando houver acoes.
- Links internos com wikilinks quando fizer sentido: `[[nome-da-nota]]`.

# Estrutura Recomendada
- `docs/arquitetura/`: visao arquitetural, decisoes, questionarios, planos.
- `docs/produto/`: personas, jornadas, requisitos, roadmap.
- `docs/operacao/`: deploy, monitoracao, incidentes, runbooks.

# Formato Base para Novas Notas
```md
---
title: <Titulo>
tags: [<tag1>, <tag2>]
status: rascunho
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Contexto

# Decisao

# Alternativas

# Trade-offs

# Riscos

# Proximos Passos
- [ ] Acao 1
- [ ] Acao 2
```

# Observacoes
- Este padrao prioriza clareza, incrementalismo e decisoes reversiveis no inicio.
- Quando voce responder ao questionario, vamos gerar uma nota de diagnostico e um plano 30-60-90 dias.