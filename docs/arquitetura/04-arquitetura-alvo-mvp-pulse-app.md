---
title: Arquitetura Alvo MVP Pulse App
aliases: [Arquitetura To-Be Pulse]
tags: [arquitetura, mvp, backend, frontend, mobile]
status: proposta
created: 2026-04-06
updated: 2026-04-06
related: ["[[03-diagnostico-arquitetural-pulse-app]]", "[[06-diagnostico-opiniao-framework-php]]"]
---

# Objetivo
Definir uma arquitetura enxuta, de baixo custo e evolutiva para colocar o MVP em producao com seguranca minima.

# Visao em Camadas
## Cliente
- Web Admin/Operacao: React.
- Mobile usuario/promoter: React Native (ou PWA evolutiva no curtissimo prazo).

## Servicos
- API unica em PHP (Laravel recomendado pelo fit do time).
- Modulos internos:
  - Auth e Perfis.
  - Eventos e Lotes.
  - Vendas e Ingressos.
  - Financeiro e Repasses.
  - Auditoria.

## Dados
- Banco relacional (PostgreSQL).
- Tabelas auditaveis para operacoes financeiras.
- Migracoes versionadas.

## Integracoes
- Gateway de pagamento (1 provedor inicial).
- Webhooks com idempotencia.
- Notificacao transacional (email/whatsapp em etapa posterior).

## Operacao
- Ambientes: local, staging, producao.
- CI/CD simples com testes minimos e deploy automatizado.
- Monitoracao inicial: logs centralizados e alertas de erro.

# Fronteiras de Modulo
- Regra: UI nao acessa banco diretamente.
- Regra: dominio nao depende de framework de UI.
- Regra: integracoes externas encapsuladas por adaptadores.

# Convencoes de Organizacao de Codigo
- Backend:
  - app/Domain/<Modulo>
  - app/Application/<Modulo>
  - app/Infrastructure/<Modulo>
  - app/Http/Controllers
- Frontend:
  - src/features/<modulo>
  - src/shared/components
  - src/shared/services
  - src/shared/types

# Decisoes com Trade-offs
## Monolito modular primeiro
- Pro: entrega mais rapida para time pequeno.
- Contra: exige disciplina para nao virar monolito acoplado.

## API REST primeiro
- Pro: simples e conhecida pelo time.
- Contra: pode exigir mais chamadas no cliente do que GraphQL.

## Offline parcial para promoter
- Pro: reduz perda de venda em campo sem internet.
- Contra: aumenta complexidade de sincronizacao e conflitos.

# Checklist de Revisao Arquitetural
- [ ] Cada modulo tem dono, fronteira e contrato.
- [ ] Regras financeiras estao no backend, nao no frontend.
- [ ] Operacoes criticas sao idempotentes.
- [ ] Existe trilha de auditoria para mudancas financeiras.
- [ ] Existem testes minimos para fluxos de receita.