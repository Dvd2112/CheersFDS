---
title: Resumo Executivo de Arquitetura Pulse App
aliases: [Master Arquitetura Pulse, Decisoes Arquiteturais]
tags: [arquitetura, decisoes, master, mvc, backend, frontend]
status: consolidado
created: 2026-04-06
updated: 2026-04-06
related: ["[[02-respostas-discovery-pulse-app]]", "[[03-diagnostico-arquitetural-pulse-app]]", "[[04-arquitetura-alvo-mvp-pulse-app]]", "[[06-diagnostico-opiniao-framework-php]]", "[[07-graphql-no-pulse-app]]"]
---

# Visao Geral
Pulse App e uma plataforma para venda de ingressos e controle financeiro de eventos universitarios, resolvendo o problema de taxas altas (23%) e repasse lento comparado a Cheers App.

## Prazo
- MVP funcional ate agosto de 2026.

## Publico
- Compradores de ingressos (universitarios).
- Atleticas (controle financeiro e operacional).
- Promoters (registro de venda e emissao).

# Decisoes de Arquitetura Consolidadas

## D1: Monolito Modular em Camadas vs. Microservicos
- Decisao: Monolito modular em camadas.
- Justificativa: Time pequeno (3 devs), prazo curto, necessidade de velocidade de entrega.
- Alternativa rejeitada: Microservicos (complexidade alta no MVP).
- Trade-off: Mais rapido agora, exige disciplina arquitetural para evitar acoplamento.

## D2: Backend unico (API REST) para Web + App vs. Backends separados
- Decisao: API unica REST em Laravel.
- Justificativa: Reduz duplicidade, manutencao centralizada, contratos claros.
- Reutilizacao: Web (React) + Mobile (React Native) consumem a mesma API.
- Trade-off: Exige flexibilidade de API design, nao de muitos backends.

## D3: Framework backend Laravel vs. Alternativas
- Decisao: Laravel.
- Alternativas consideradas:
  - Symfony: muito robusto, curva maior.
  - CodeIgniter: simples demais para complexidade financeira.
  - Slim/Lumen: bom para APIs minimas, insuficiente para MVP transacional.
- Justificativa: Ecossistema completo (auth, migrations, testes, fila), comunidade, fit com senioridade media do time.
- Stack: Laravel 11 + PHP 8.3 + PostgreSQL.

## D4: GraphQL vs. REST (fase MVP)
- Decisao: REST para MVP.
- GraphQL deixado para fase 2, quando complexidade de consulta composta aumentar.
- Justificativa: Prazo curto, foco em confiabilidade transacional.
- Criterio de migracao: Apos um ciclo de operacao real e metricas comprovando bottleneck.

## D5: Banco de dados PostgreSQL vs. MySQL/SQLite
- Decisao: PostgreSQL.
- Justificativa: Mejor suporte a JSON, JSONB, triggers, auditoria avancada.
- Migrations: Versionadas no laravel/migrations.

## D6: Seguranca e Autenticacao
- Decisao: JWT para API + Laravel Auth para web.
- Perfis: Comprador, Promoter, Admin Atletica, Admin Plataforma.
- Auditoria: Trilha obrigatoria para operacoes financeiras criticas.
- Nivel: LGPD preparado, implementacao minima no MVP.

## D7: Fluxo de Pagamento
- Decisao: 1 gateway inicial (recomendado: Stripe ou PagSeguro para Brasil).
- Idempotencia: Webhook com idempotencia implementada.
- Repasse: Calculo e registro de repasse pos confirmacao de pagamento.

## D8: Frontend Web (React)
- Decisao: React atual reorganizado por features modular.
- Estrutura: src/features/<modulo>/components, src/shared/services, src/shared/types.
- Remocao: Mocks de login, tudo passa para API real.

## D9: Mobile (fase MVP ou MVP+1)
- Decisao: React Native com compartilhamento parcial de logica com web.
- Fase 1: PWA evolutiva ou web responsivo em agosto.
- Fase 2: App nativo apos estabilizar web.

## D10: Observabilidade e Operacao
- Logs: Centralizados (recomendado: ELK ou agregador simples).
- Alertas: Erro, indisponibilidade, falha de pagamento.
- Ambientes: local, staging (com dados reais mascarados), producao.
- CI/CD: GitHub Actions basico (lint + teste + deploy).

## D11: Versionamento e Rollback
- Decisao: Semver + Blue/Green deployment simples.
- Staging validado por equipe antes de producao.

## D12: Escopo MVP
### Deve-se entrar ate agosto
- Cadastro/login por perfil.
- Eventos e lotes.
- Compra de ingresso com validacao.
- Integracao com gateway de pagamento.
- Emissao de ingresso (PDF ou ticket eletronico).
- Painel financeiro basico (vendas, repasse, lotes).
- Trilha de auditoria para acesso e movimentos financeiros.

### Pode esperar apos uso real
- Ecommerce de produtos da atletica.
- Modulos administrativos avancados (secretarias, eventos, marketing, tesoureiro).
- Dashboard executivo com KPIs multiplos.
- Integracao com whatsapp/SMS notificacao.

# Fronteiras e Regras Arquiteturais
## Regra 1: Separacao de Preocupacoes
- Controller: entrada HTTP, validacao basica, autorizacao.
- Service/UseCase: regra de negocio.
- Domain: entidades e regras criticas.
- Repository/Infrastructure: persistencia e integracao.

## Regra 2: Dominio Financeiro
- Nunca no frontend.
- Sempre auditado no backend.
- Idempotente para operacoes criticas.

## Regra 3: Autorizacao por Perfil
- Cadastrada no banco, nao hardcoded.
- Middleware de autorizacao em rotas criticas.

## Regra 4: Integracao com Externos
- Encapsulada em Adapter/Service.
- Com fallback e retry obvio.

# Modulos Backend Iniciais
- Auth: Autenticacao, JWT, Refresh Token.
- Event: CRUD evento, lote.
- Sale: Venda, carrinho, emissao de ingresso.
- Payment: Integracao gateway, webhook, confirmacao.
- Financial: Calculo repasse, relatorio de vendas.
- Audit: Log de alteracoes criticas.

# Estrutura de Pastas (Backend Laravel)
```
app/
  Domain/
    Auth/
    Event/
    Sale/
    Payment/
    Financial/
  Application/
    Services/
      AuthService.php
      EventService.php
      SaleService.php
      PaymentService.php
  Infrastructure/
    Repositories/
    Integrations/
      PaymentGateway/
  Http/
    Controllers/
    Middleware/
    Requests/
    Resources/
database/
  migrations/
tests/
  Unit/
  Feature/
```

# Estrutura de Pastas (Frontend React)
```
src/
  features/
    auth/
      components/
      pages/
      services/
    events/
      components/
      pages/
      services/
    sales/
      components/
      pages/
      services/
  shared/
    components/
    services/
    types/
    hooks/
```

# Criterios de Pronto para MVP
- [x] Arquitetura definida e documentada.
- [ ] Backend base rodando com auth e banco.
- [ ] API REST documentada (Swagger).
- [ ] Testes minimos nos fluxos criticos (compra + pagamento).
- [ ] Frontend resetado e conectado a API.
- [ ] Staging e producao configurados.
- [ ] Trilha de auditoria funcionando.
- [ ] Plano de incident response.

# Proximos Passos Imediatos
- [ ] Setup inicial do Laravel (veja [[08-onboarding-setup-ambiente]]).
- [ ] Criar backlog tecnico de 3 sprints para MVP.
- [ ] Iniciar ciclo de desenvolvimento com dailies e revisoes semanais.
