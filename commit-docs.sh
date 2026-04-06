#!/bin/bash
# Script de commit da documentação arquitetural Pulse App

cd /workspaces/CheersFDS

echo "📦 Preparando commit da documentação de arquitetura..."
echo ""

# Adicionar arquivos
git add docs/
git add .github/agents/
git add test-logins.js

# Verificar o que será commitado
echo "✅ Arquivos adicionados:"
git diff --cached --name-only | head -20
echo ""

# Fazer commit
git commit -m "docs(arquitetura): documentacao completa de arquitetura Pulse App MVP

FEATURES:
- Diseño de arquitectura en capas (Laravel + PHP 8.3 + PostgreSQL 14)
- 12 decisiones arquitectuales consolidadas con trade-offs
- Plan de ejecución 30-60-90 días desglosado por entrega
- Guía de onboarding completa (versiones, setup local, troubleshooting)
- Prototipos de GitHub Actions (CI/CD para frontend y backend)
- Plantillas de GitHub Issues automáticas
- Evaluación de GraphQL (recomendación: Fase 2 post-MVP)
- Stack final: Laravel 11 + React 18 + React Native + PostgreSQL 14

ARCHIVOS CREADOS:
- MASTER-pulseapp-decisoes.md (resumo ejecutivo)
- 01-questionario-descoberta-inicial.md (discovery consolidado)
- 02-respostas-discovery-pulse-app.md (análisis de contexto)
- 03-diagnostico-arquitetural-pulse-app.md (diagnostico de riesgos)
- 04-arquitetura-alvo-mvp-pulse-app.md (visión en capas)
- 05-plano-execucao-30-60-90-pulse-app.md (roadmap)
- 06-diagnostico-opiniao-framework-php.md (por qué Laravel)
- 07-graphql-no-pulse-app.md (evaluación GraphQL)
- 08-onboarding-setup-ambiente.md (instalación)
- 09-github-actions-project-setup.md (CI/CD y automación)
- INDICE.md (índice navegable Obsidian)
- docs/README.md (portal de entrada)

MODULO BACKEND:
- Auth, Events, Sales, Payment, Financial, Audit

MODULO FRONTEND:
- Reorganización modular por features

STATUS:
- Arquitectura: consolidada ✅
- MVP target: agosto 2026
- Prazo actual: pronto para desarrollo en Sprint 1"

# Mostrar resultado
echo ""
git log --oneline -1
echo ""
echo "✅ Commit realizado exitosamente!"
echo "📄 Documentación guardada en docs/arquitetura/"
echo "🔗 Próximo paso: Ejecutar 'git push origin main'"
