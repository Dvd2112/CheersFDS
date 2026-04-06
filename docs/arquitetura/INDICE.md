---
title: Indice de Documentacao Pulse App
aliases: [Indice Arquitetura, Mapa Docs]
tags: [indice, arquitetura, master]
status: ativo
created: 2026-04-06
updated: 2026-04-06
---

# Pulse App - Indice de Documentacao Arquitetural

Bem-vindo ao repositorio de documentacao Pulse App. Esta e a pagina central para navegacao.

## Documentos Principais

### 1. Comece Aqui
- **[[MASTER-pulseapp-decisoes]]** - Resumo executivo de todas as decisoes arquiteturais tomadas.

### 2. Descoberta e Diagnostico
- **[[01-questionario-descoberta-inicial]]** - Questionario original preenchido.
- **[[02-respostas-discovery-pulse-app]]** - Consolidacao das respostas.
- **[[03-diagnostico-arquitetural-pulse-app]]** - Diagnostico de forcas, lacunas e riscos.

### 3. Arquitetura e Decisoes
- **[[04-arquitetura-alvo-mvp-pulse-app]]** - Visao em camadas e convencoes de codigo.
- **[[06-diagnostico-opiniao-framework-php]]** - Por que Laravel + MVC.
- **[[07-graphql-no-pulse-app]]** - Quando usar GraphQL (recomendacao: apos MVP).

### 4. Planejamento e Operacao
- **[[05-plano-execucao-30-60-90-pulse-app]]** - Roadmap de 90 dias em 3 janelas.
- **[[08-onboarding-setup-ambiente]]** - Como instalar, versoes de dependencias, primeiros passos.
- **[[09-github-actions-project-setup]]** - CI/CD com GitHub Actions, Project automation, templates de issue.

### 5. Referencia
- **[[00-guia-documentacao-obsidian]]** - Como manter esta documentacao em Obsidian.

---

## Mapa Visual (Fluxo de Leitura)

### Para PM / Stakeholder
1. [[MASTER-pulseapp-decisoes]]
2. [[02-respostas-discovery-pulse-app]]
3. [[05-plano-execucao-30-60-90-pulse-app]]

### Para Desenvolvedor Backend Novo
1. [[MASTER-pulseapp-decisoes]]
2. [[04-arquitetura-alvo-mvp-pulse-app]]
3. [[08-onboarding-setup-ambiente]]
4. [[09-github-actions-project-setup]]

### Para Desenvolvedor Frontend Novo
1. [[MASTER-pulseapp-decisoes]]
2. [[04-arquitetura-alvo-mvp-pulse-app]]
3. [[08-onboarding-setup-ambiente]]

### Para Arquiteto / Tech Lead
1. [[03-diagnostico-arquitetural-pulse-app]]
2. [[04-arquitetura-alvo-mvp-pulse-app]]
3. [[06-diagnostico-opiniao-framework-php]]
4. [[07-graphql-no-pulse-app]]
5. [[09-github-actions-project-setup]]

---

## Decisoes Criticas Consolidadas

| Decisao | Escolha | Justificativa |
|---------|---------|---------------|
| Backend | Laravel | Ecossistema, prazo curto, fit com time |
| Arquitetura | Monolito Modular | Velocidade + disciplina |
| API | REST (MVP), GraphQL depois | Foco em confiabilidade transacional |
| Banco | PostgreSQL | Auditoria avancada, JSON, triggers |
| Frontend Web | React remodelado | Separacao modular por features |
| Mobile | React Native (Fase 2) | Reutiliza API com web |
| Seguranca | JWT + Auth Laravel | Perfis e auditoria para financeiro |

---

## Proximos Passos Imediatos

- [ ] **Semana 1**: Setup backend Laravel com auth e banco.
- [ ] **Semana 2-3**: Fluxo de venda e pagamento.
- [ ] **Semana 4-6**: Hardening, testes, staging.
- [ ] **Semana 7-12**: Piloto, ajustes, lancamento agosto.

---

## Convenoes na Documentacao

- **#**: Titulo principal (nao use multiplos)
- **##**: Secoes maiores
- **###**: Subsecoes
- **[[link]]**: Link interno Obsidian
- **- [ ]**: Checklist (marca progresso)
- **| Table |**: Para comparacoes rapidas

---

## Estrutura de Pastas Esperada

```
CheersFDS/
├── docs/
│   ├── arquitetura/          <- Voce esta aqui
│   │   ├── 00-guia-documentacao-obsidian.md
│   │   ├── 01-questionario-descoberta-inicial.md
│   │   ├── 02-respostas-discovery-pulse-app.md
│   │   ├── 03-diagnostico-arquitetural-pulse-app.md
│   │   ├── 04-arquitetura-alvo-mvp-pulse-app.md
│   │   ├── 05-plano-execucao-30-60-90-pulse-app.md
│   │   ├── 06-diagnostico-opiniao-framework-php.md
│   │   ├── 07-graphql-no-pulse-app.md
│   │   ├── 08-onboarding-setup-ambiente.md
│   │   ├── 09-github-actions-project-setup.md
│   │   └── INDICE.md (este arquivo)
│   │   └── MASTER-pulseapp-decisoes.md
│   ├── produto/               # (futuro: personas, jornadas, roadmap)
│   └── operacao/              # (futuro: runbooks, incident response)
├── backend/                   # Laravel (a criar)
├── frontend/                  # React (a reorganizar)
└── README.md
```

---

## Contato e Questoes

- Tech Lead / Arquiteto: Envie questoes sobre decisoes aqui.
- PM: Use [[05-plano-execucao-30-60-90-pulse-app]] para roadmap.
- Developer: Comece em [[08-onboarding-setup-ambiente]].

---

**Ultima atualizacao**: 2026-04-06
**Status**: Arquitetura consolidada, pronto para desenvolvimento.
