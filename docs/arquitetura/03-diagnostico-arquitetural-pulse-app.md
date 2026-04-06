---
title: Diagnostico Arquitetural Inicial Pulse App
aliases: [Diagnostico Pulse, Arquitetura As-Is]
tags: [arquitetura, diagnostico, riscos, mvp]
status: ativo
created: 2026-04-06
updated: 2026-04-06
related: ["[[02-respostas-discovery-pulse-app]]", "[[04-arquitetura-alvo-mvp-pulse-app]]", "[[05-plano-execucao-30-60-90-pulse-app]]"]
---

# Contexto
Projeto em transicao de prototipo visual para produto transacional com fluxo financeiro real e prazo de entrega ate agosto.

# Diagnostico
## Forcas
- Dor de mercado clara e validada: taxa elevada e repasse lento.
- Nicho definido: eventos universitarios (atleticas e promoters).
- Sponsor identificado e acesso a usuarios iniciais.
- Stack base conhecida pelo time (PHP + JS/React).

## Lacunas Criticas
- Ausencia de backend, banco e autenticacao.
- Sem separacao de dominio e sem contratos de API.
- Sem testes, sem CI/CD e sem observabilidade.
- Requisitos de seguranca e LGPD ainda nao formalizados.
- Regras financeiras e trilha de auditoria nao definidas tecnicamente.

## Riscos Prioritarios
- R1: Entregar sem seguranca minima para transacoes financeiras.
- R2: Re-trabalho por falta de fronteiras de modulo e modelo de dados.
- R3: Gargalo de equipe por baixa senioridade media e acoplamento de conhecimento.
- R4: Falha operacional em picos de venda sem monitoramento e sem fila/retentativa.

# Decisoes Recomendadas
## D1. Arquitetura modular em camadas desde o MVP
- Decisao: separar Cliente, API, Dominio, Infra e Observabilidade.
- Alternativas:
  - Manter monolito sem fronteiras: mais rapido no curtissimo prazo, alto custo de manutencao.
  - Microservicos agora: complexidade alta para time e fase atual.
- Trade-off: monolito modular entrega equilibrio entre velocidade e governanca.

## D2. Backend unico para web e mobile
- Decisao: API unica (REST), reutilizada por web e app.
- Alternativas:
  - Backends separados por canal: maior custo e divergencia funcional.
- Trade-off: exige contrato de API bem definido, reduz duplicidade.

## D3. Priorizar fluxo financeiro fim a fim antes de features amplas
- Decisao: cadastro, venda, pagamento, emissao e conciliacao primeiro.
- Alternativas:
  - Construir ecommerce e modulos extras cedo: aumenta escopo e risco de prazo.
- Trade-off: foco restrito no inicio, com ganho de validacao de negocio real.

# Criterios de Pronto para MVP
- Autenticacao e autorizacao por perfil implementadas.
- Venda de ingresso com pagamento aprovado e registro de repasse.
- Painel minimo de controle financeiro por evento/lote.
- Logs auditaveis para operacoes financeiras criticas.
- Deploy com ambiente staging e producao, com rollback basico.

# Riscos em Aberto
- Escolha do gateway e tarifa por transacao.
- Definicao de SLA e tolerancia a indisponibilidade.
- Politica minima LGPD (consentimento, retencao e exclusao).

# Proximos Passos
- [ ] Formalizar requisitos de dominio financeiro com exemplos reais.
- [ ] Congelar escopo do MVP de agosto em backlog priorizado.
- [ ] Definir stack alvo final (web e mobile) com criterio de custo e prazo.
- [ ] Abrir ADRs curtas para decisoes tecnicas irreversiveis.