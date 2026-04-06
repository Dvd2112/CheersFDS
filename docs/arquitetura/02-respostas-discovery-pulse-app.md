---
title: Respostas Discovery Inicial Pulse App
aliases: [Discovery Pulse, Respostas Discovery]
tags: [arquitetura, discovery, produto, stakeholders, mvp]
status: consolidado
created: 2026-04-06
updated: 2026-04-06
related: ["[[01-questionario-descoberta-inicial]]"]
---

# Resumo Rapido
- Produto: Pulse App.
- Problema central: taxas altas (referencia de 23%), demora de repasse e baixa aderencia do software atual ao contexto de atleticas e promoters.
- Estado atual: prototipo apenas frontend, sem backend, banco de dados e autenticacao real.
- Prazo de negocio: versao usavel ate agosto.
- Restricao forte: orcamento baixo.

# Produto e Objetivos
- Objetivo de 2 semanas: aplicacao minimamente funcional.
- Objetivo de 3 meses: produto viavel com pagamento e analise financeira em servidor, com clientes reais.
- Validado ate agora: dor de taxa e repasse.
- Em aberto: validacao de jornada completa, retencao e operacao financeira em escala real.

# Publico e Canais
- Personas:
  - Comprador final universitario (quer menor taxa e compra simples).
  - Atletica (controle financeiro, operacional e de equipe de promoters).
  - Promoter (registro de venda e emissao de ingresso com menor friccao de dados pessoais).
- Uso principal: mobile (iOS e Android), com suporte web.
- Requisito desejado: funcionamento com internet instavel (operacao offline-first para promoter).

# Stakeholders e Governanca
- Sponsor e decisao de prioridade: fundador + investidor/cliente.
- Aprovacao de orcamento: investidor.
- Aprovacao de requisitos: fundador + investidor.
- Representacao do usuario final: atletica + investidor (hub de eventos universitarios).

# Time e Capacidade Tecnica
- Time inicial: 3 pessoas.
- Composicao: 1 pleno (lidera arquitetura, QA e desenvolvimento), 1 junior com base em infra/PHP, 1 iniciante.
- Dominio tecnico atual: PHP e bases de JS (React).
- Gap principal: maturidade em arquitetura modular, testes e CI/CD para parte do time.

# Stack e Arquitetura Atual (As-Is)
- Stack atual: frontend React de demonstracao em GH Pages.
- Sem backend, sem banco, sem autenticacao real, sem observabilidade.
- Organizacao atual: por componentes, sem separacao de camadas de dominio.

# Qualidade, Seguranca e Operacao
- Testes: inexistentes.
- Pipeline CI/CD: inexistente.
- Monitoramento: inexistente.
- Seguranca: risco alto no estado atual por falta de autenticacao/autorizacao e validacao de dados.
- Auditoria financeira: requisito importante para a proxima fase.

# Escalabilidade e Restricoes
- Volume inicial estimado: 500 usuarios, com picos em janela de venda/evento.
- Prazo fixo: agosto.
- Orcamento: baixo/quase nulo no inicio.
- Tolerancia a indisponibilidade: ainda nao definida.

# Priorizacao Inicial
- Obrigatorio no MVP:
  - Cadastro e login.
  - Fluxo de venda de ingressos.
  - Cadastro e gestao de promoters.
  - Integracao com gateway de pagamento.
  - Controle financeiro basico (vendas, repasses, lotes).
- Pode esperar dados reais de uso:
  - Ecommerce de produtos da atletica.
  - Modulos administrativos mais amplos (secretarias e perfis avancados).

# Maturidade Informada (Atual)
- Clareza de produto e metricas: 3
- Conhecimento do publico e jornada: 3
- Stakeholders e governanca: 2
- Capacidade tecnica da equipe: 2
- Organizacao arquitetural do codigo: 1 (ajuste aplicado a partir da resposta; o valor 5 foi tratado como objetivo alvo)
- Qualidade de testes e release: 1
- Seguranca e compliance: 1
- Observabilidade e operacao: 1
- Priorizacao de backlog: 1
- Evolucao prototipo -> producao: 1