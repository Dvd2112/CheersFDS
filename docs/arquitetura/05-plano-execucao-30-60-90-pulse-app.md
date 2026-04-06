---
title: Plano de Execucao 30-60-90 Pulse App
aliases: [Roadmap Arquitetural Pulse]
tags: [plano, mvp, execucao, risco]
status: ativo
created: 2026-04-06
updated: 2026-04-06
related: ["[[03-diagnostico-arquitetural-pulse-app]]", "[[04-arquitetura-alvo-mvp-pulse-app]]"]
---

# Contexto
Prazo-alvo de negocio ate agosto, com orcamento reduzido e necessidade de validar fluxo de receita real.

# Janela 0-30 dias
## Foco
Fundacao tecnica minima e definicao do dominio critico.

## Entregas
- [ ] Definir escopo fechado do MVP (must-have).
- [ ] Subir backend base (auth, perfis, eventos, lotes, vendas).
- [ ] Definir modelo de dados inicial e migracoes.
- [ ] Configurar ambientes local + staging.
- [ ] CI inicial (lint + teste basico).

## Riscos
- Escopo inflado e sem corte.
- Paralelismo improdutivo com time pequeno.

## Mitigacao
- Backlog semanal com limite de WIP.
- Revisao tecnica curta diaria.

# Janela 31-60 dias
## Foco
Fluxo financeiro fim a fim em staging com dados de teste.

## Entregas
- [ ] Integrar gateway de pagamento.
- [ ] Processar webhook com idempotencia.
- [ ] Emitir ingresso apos confirmacao de pagamento.
- [ ] Registrar repasse financeiro e auditoria.
- [ ] Dashboard financeiro basico (vendas por evento/lote).

## Riscos
- Falhas de conciliacao financeira.
- Erros de autorizacao por perfil.

## Mitigacao
- Testes de integracao para pagamento/repasse.
- Matriz de permissao por perfil.

# Janela 61-90 dias
## Foco
Hardening operacional para piloto real.

## Entregas
- [ ] Observabilidade minima (logs, alertas, healthcheck).
- [ ] Testes e2e dos fluxos de receita.
- [ ] Plano de rollback e runbook de incidente.
- [ ] Piloto com grupo controlado (1-2 atleticas).
- [ ] Ajustes para release de agosto.

## Riscos
- Pico de uso em janelas de evento.
- Suporte operacional insuficiente no lancamento.

## Mitigacao
- Teste de carga basico em rotas criticas.
- Escala de plantao no dia de evento.

# Metricas de Sucesso
- Tempo medio de confirmacao de compra.
- Taxa de erro no checkout.
- Tempo de repasse e conciliacao.
- Disponibilidade em janela critica de evento.
- Numero de incidentes criticos por semana.

# Decisoes Reversiveis e Irreversiveis
## Reversiveis
- Ferramenta de monitoracao.
- Estrategia de notificacao.

## Menos reversiveis
- Modelo de dominio financeiro.
- Estrutura de permissao e auditoria.
- Contrato principal da API.

# Proximos Passos
- [ ] Transformar este plano em backlog tecnico semanal.
- [ ] Nomear dono por modulo.
- [ ] Definir criterio de aceite por entrega critica.