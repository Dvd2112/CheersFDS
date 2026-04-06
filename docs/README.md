---
title: Documentacao Pulse App
---

# Documentação Pulse App

Bem-vindo à documentação de arquitetura e operação do **Pulse App**, uma plataforma para venda de ingressos e controle financeiro de eventos universitários.

## Comece aqui

1. **Quer entender o que foi decidido?** → Leia [Resumo Executivo de Arquitetura](arquitetura/MASTER-pulseapp-decisoes.md)
2. **Quer desenvolver agora?** → Leia [Onboarding e Setup](arquitetura/08-onboarding-setup-ambiente.md)
3. **Quer ver todo o mapa?** → Acesse [Índice Completo](arquitetura/INDICE.md)

## Estrutura de Documentação

### 📋 `arquitetura/`
Todas as decisões técnicas, diagnóstico e planejamento de arquitetura.

- **MASTER-pulseapp-decisoes.md** - Resumo executivo (COMECE AQUI)
- **INDICE.md** - Índice navegável de todos os documentos
- **01-12** - Documentação detalhada por tema
- **08-onboarding-setup-ambiente.md** - Como instalar tudo
- **09-github-actions-project-setup.md** - CI/CD e Project automation

### 📦 `produto/` (em breve)
Personas, jornadas de usuário, roadmap de features.

### 🚀 `operacao/` (em breve)
Runbooks, incident response, SLAs, monitoramento.

## Stack Consolidado

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Backend | Laravel | 11+ |
| Frontend Web | React | 18+ |
| Mobile | React Native | Fase 2 |
| Banco | PostgreSQL | 14+ |
| Runtime | PHP | 8.3+ |
| Runtime | Node.js | 18+ LTS |

## Decisões Principais

✅ **Backend**: Laravel (contratos de API claros, ecossistema de auth e testes)
✅ **Arquitetura**: Monolito modular em camadas (velocidade + disciplina)
✅ **API**: REST no MVP, GraphQL avaliado para Fase 2
✅ **Segurança**: JWT + Auth Laravel com auditoria financeira
✅ **Banco**: PostgreSQL (triggers, JSONB, auditoria avançada)

## Como Usar Esta Documentação

### No VS Code
1. Abra a pasta `/docs/arquitetura/`
2. Instale a extensão "Foam for VS Code" ou use o Markdown Preview
3. Navegue pelos links `[[nome-do-arquivo]]`

### No Obsidian
1. Configure o vault apontando para `/docs/arquitetura/`
2. Abre automaticamente os links wikilink
3. Use a árvore de navegação

## Próximos Passos

- [ ] Clonar repositório e executar setup (veja [Onboarding](arquitetura/08-onboarding-setup-ambiente.md))
- [ ] Criar GitHub Project com templates de issue
- [ ] Montar backlog técnico em 3 sprints
- [ ] Iniciar sprint 1 com backend base

## Contato

- **Tech Lead**: Consulte decisões em `MASTER-pulseapp-decisoes.md`
- **Equipe Dev**: Comece em `08-onboarding-setup-ambiente.md`
- **PM/Stakeholder**: Veja roadmap em `05-plano-execucao-30-60-90-pulse-app.md`

---

**Status**: Arquitetura consolidada, pronto para desenvolvimento  
**Última atualização**: 2026-04-06  
**Versão**: 0.1 (MVP em preparação)
