---
title: Diagnostico e Opiniao Tecnica + Framework MVC PHP
aliases: [Opiniao Arquitetural Pulse, Escolha Framework PHP]
tags: [arquitetura, php, mvc, laravel, symfony, codeigniter]
status: recomendado
created: 2026-04-06
updated: 2026-04-06
related: ["[[03-diagnostico-arquitetural-pulse-app]]", "[[04-arquitetura-alvo-mvp-pulse-app]]", "[[05-plano-execucao-30-60-90-pulse-app]]", "[[07-graphql-no-pulse-app]]"]
---

# Diagnostico Objetivo
## Estado atual
- Produto ainda em prototipo visual.
- Ausencia de backend, banco, autenticacao real, testes e observabilidade.

## Leitura de risco
- O maior risco nao e tecnologia: e escopo + prazo curto + time pequeno.
- Se tentar entregar muitas frentes ao mesmo tempo, o projeto perde qualidade e previsibilidade.
- Como o nucleo do negocio e financeiro, seguranca e rastreabilidade precisam nascer no MVP.

## Minha opiniao tecnica
- Voce esta no caminho certo ao reiniciar com arquitetura em camadas.
- A decisao correta agora e reduzir escopo para um nucleo transacional confiavel:
  - cadastro/login,
  - eventos/lotes,
  - compra/pagamento,
  - emissao de ingresso,
  - painel financeiro minimo.
- Tudo fora desse nucleo (ecommerce, modulos administrativos amplos) deve ficar para apos validar operacao real.

# Estrutura MVC com PHP: qual framework e melhor
## Recomendacao final para o Pulse App
- Framework recomendado: Laravel.

## Por que Laravel no seu contexto
- Fit com equipe: voces ja tem base em PHP e JS.
- Velocidade de entrega: ecossistema pronto para auth, fila, jobs, migracoes, testes e API.
- Custo de onboarding: menor para juniors comparado a alternativas mais complexas.
- Comunidade e material: reduz risco de bloqueio tecnico.

## Alternativas e trade-offs
### Symfony
- Pro: muito robusto para cenarios enterprise e arquitetura altamente customizada.
- Contra: curva maior e entrega inicial mais lenta para time pequeno com prazo apertado.
- Quando escolher: se o time tiver senioridade alta em Symfony e governanca forte desde o dia 1.

### CodeIgniter
- Pro: leve e simples para comecar rapido.
- Contra: ecossistema e padronizacao de recursos modernos menores que Laravel.
- Quando escolher: projetos muito pequenos e de baixa complexidade transacional.

### Slim/Lumen (microframework)
- Pro: minimo e rapido para APIs simples.
- Contra: mais trabalho manual para recursos que Laravel ja entrega pronto.
- Quando escolher: servicos pequenos e isolados, nao como base principal do seu MVP financeiro.

# Padrao arquitetural recomendado (Laravel + MVC evolutivo)
## Camadas
- Controller: entrada HTTP, validacao basica, autorizacao.
- Service/Application: casos de uso e regras de orquestracao.
- Domain: regras criticas de negocio e entidades.
- Repository/Infrastructure: persistencia e integracoes externas.

## Regra pratica
- Nao concentrar regra de negocio em Controller.
- Nao deixar regra financeira no frontend.
- Sempre registrar auditoria de operacoes criticas.

# Stack sugerida para comecar com baixo custo
- Backend: Laravel 11 + PHP 8.3.
- Banco: PostgreSQL.
- Cache/Fila: Redis (inicialmente opcional, recomendado para crescer).
- Front web: React atual reorganizado por features.
- Mobile: React Native na fase seguinte, mantendo a mesma API.
- Deploy: VPS simples inicial com ambiente staging separado.

# Criterio de decisao curto
Se o objetivo e chegar em agosto com MVP funcional e risco controlado, Laravel entrega o melhor equilibrio entre velocidade, manutencao e capacidade de evolucao para seu time atual.

# Proximos passos recomendados
- [ ] Definir oficialmente Laravel como base do backend.
- [ ] Criar backlog tecnico do nucleo transacional em 3 sprints.
- [ ] Definir modelo de dados inicial (usuarios, eventos, lotes, pedidos, pagamentos, repasses, auditoria).
- [ ] Implementar autenticacao por perfil e trilha de auditoria antes do go-live.