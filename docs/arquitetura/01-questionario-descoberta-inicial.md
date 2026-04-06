---
title: Questionario de Descoberta Inicial
aliases: [Discovery, Diagnostico Inicial]
tags: [arquitetura, produto, stakeholders, equipe, prototipo]
status: em-andamento
created: 2026-04-06
updated: 2026-04-06
related: ["[[00-guia-documentacao-obsidian]]"]
---

# Contexto
O sistema atual esta em estagio de prototipo. Antes de evoluir arquitetura e stack, precisamos mapear negocio, usuarios, equipe, restricoes e riscos.

# Questionario Estruturado
## 1. Produto e objetivo de negocio
- Qual problema real o aplicativo resolve?
- Qual e a meta principal nos proximos 3, 6 e 12 meses?
- Como voces medem sucesso hoje (usuarios ativos, receita, retencao, conversao)?
- O que ja foi validado com usuarios e o que ainda e hipotese?
- Qual e a principal dor do estado atual do prototipo?

## 2. Publico-alvo e contexto de uso
- Quem e o publico principal e secundario?
- Em que contexto o produto e usado?
- Quais dispositivos dominam o uso esperado?
- Precisa funcionar offline ou com internet instavel?
- Ha requisitos de acessibilidade definidos?

## 3. Tipo de produto e canais
- O foco sera web, mobile, desktop ou hibrido?
- Se mobile: nativo, hibrido ou PWA?
- Existe necessidade de publicacao em lojas?
- O mesmo backend atendera multiplos clientes?
- Ha restricoes de plataforma do cliente?

## 4. Stakeholders e governanca
- Quem e o sponsor principal?
- Quem aprova orcamento e prazo?
- Quem aprova requisitos de negocio?
- Quem representa o usuario final nas decisoes?
- Existe conflito de prioridade entre areas?

## 5. Equipe de desenvolvimento
- Quantas pessoas no time e quais papeis?
- O time e interno, terceirizado ou misto?
- Qual a senioridade media?
- Qual stack o time domina hoje?
- Existe experiencia com arquitetura modular, testes e CI/CD?

## 6. Stack atual e conhecimento tecnico
- Quais tecnologias estao no prototipo atual?
- Por que foram escolhidas?
- O que funciona bem na stack atual?
- O que trava produtividade e manutencao?
- Quais tecnologias o time evita e por que?

## 7. Arquitetura atual (as-is)
- Como o codigo esta organizado hoje?
- Existe separacao entre UI, regras e dados?
- O backend ja existe ou depende de mocks?
- Quais integracoes externas ja existem?
- Quais partes quebram com frequencia?

## 8. Dados e regras criticas
- Quais sao as entidades centrais do dominio?
- Quais regras de negocio sao inegociaveis?
- Onde essas regras estao hoje?
- Ha necessidade de auditoria/historico?
- Quais dados sao sensiveis?

## 9. Qualidade e operacao
- Existe pipeline de build/test/deploy?
- Quais testes existem (unitario, integracao, e2e)?
- Quem valida release antes de producao?
- Como erros e performance sao monitorados?
- Qual processo quando algo quebra em producao?

## 10. Seguranca e compliance
- Ha requisitos de LGPD/compliance?
- Como login e autorizacao funcionam hoje?
- Quais perfis de acesso existem?
- Quais riscos de seguranca ja foram mapeados?
- Existe trilha de auditoria e retencao de dados?

## 11. Escalabilidade, custo e restricoes
- Qual volume esperado de usuarios no lancamento e em 12 meses?
- Qual orcamento mensal de infraestrutura?
- Existe prazo nao negociavel?
- Qual tolerancia a indisponibilidade?
- Quais dependencias externas podem virar gargalo?

## 12. Mudanca e priorizacao
- O que vem primeiro: velocidade, estabilidade ou escala?
- Quais funcionalidades entram no primeiro ciclo?
- O que pode ser descartado do prototipo sem impacto?
- Quais decisoes precisam ser reversiveis no inicio?
- Qual risco voces aceitam para ganhar tempo?

# Maturidade (escala 1 a 5)
- [ ] Clareza de produto e metricas
- [ ] Conhecimento do publico e jornada
- [ ] Definicao de stakeholders
- [ ] Capacidade tecnica da equipe
- [ ] Organizacao arquitetural do codigo
- [ ] Qualidade de testes e release
- [ ] Seguranca e compliance
- [ ] Observabilidade e operacao
- [ ] Priorizacao de backlog
- [ ] Capacidade de evolucao do prototipo

# Proximos Passos
- [x] Receber suas respostas.
- [ ] Consolidar diagnostico arquitetural.
- [ ] Propor arquitetura-alvo em camadas.
- [ ] Montar plano incremental 30-60-90 dias com riscos e trade-offs.

# Notas Relacionadas
- [[02-respostas-discovery-pulse-app]]
- [[03-diagnostico-arquitetural-pulse-app]]
- [[04-arquitetura-alvo-mvp-pulse-app]]
- [[05-plano-execucao-30-60-90-pulse-app]]
