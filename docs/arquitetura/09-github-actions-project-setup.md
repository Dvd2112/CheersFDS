---
title: GitHub Actions e Project Setup para Pulse App
aliases: [GitHub Automation, CI/CD, Project Management]
tags: [github-actions, ci-cd, github-project, automacao]
status: pronto-para-usar
created: 2026-04-06
updated: 2026-04-06
related: ["[[MASTER-pulseapp-decisoes]]", "[[08-onboarding-setup-ambiente]]"]
---

# Objetivo
Automatizar workflows de desenvolvimento, testes e deploy usando GitHub Actions e organizar backlog com GitHub Project.

# GitHub Actions - Prototipos Prontos

## 1. Action: Lint + Test + Build Frontend
### Local: `.github/workflows/frontend-ci.yml`
```yaml
name: Frontend CI

on:
  push:
    branches: [main, develop]
    paths:
      - 'frontend/**'
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: cd frontend && npm install
      
      - name: Lint
        run: cd frontend && npm run lint
      
      - name: Test
        run: cd frontend && npm test -- --coverage --watchAll=false
      
      - name: Build
        run: cd frontend && npm run build
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./frontend/coverage/lcov.info
```

## 2. Action: Php Lint + Laravel Test + Build
### Local: `.github/workflows/backend-ci.yml`
```yaml
name: Backend CI (Laravel)

on:
  push:
    branches: [main, develop]
    paths:
      - 'backend/**'
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_DB: pulse_app_test
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: pgsql, pdo_pgsql
          tools: composer:v2
      
      - name: Install dependencies
        run: cd backend && composer install --no-interaction
      
      - name: Copy .env
        run: cd backend && cp .env.example .env
      
      - name: Generate app key
        run: cd backend && php artisan key:generate
      
      - name: Run migrations
        run: cd backend && php artisan migrate --env=testing
        env:
          DB_CONNECTION: pgsql
          DB_HOST: localhost
          DB_DATABASE: pulse_app_test
          DB_USERNAME: postgres
          DB_PASSWORD: postgres
      
      - name: Run tests
        run: cd backend && php artisan test --coverage
        env:
          DB_CONNECTION: pgsql
          DB_HOST: localhost
          DB_DATABASE: pulse_app_test
          DB_USERNAME: postgres
          DB_PASSWORD: postgres
      
      - name: Lint (Pint)
        run: cd backend && ./vendor/bin/pint --test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## 3. Action: Deploy Staging
### Local: `.github/workflows/deploy-staging.yml`
```yaml
name: Deploy to Staging

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy Backend to Staging
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.STAGING_HOST }}
          username: ${{ secrets.STAGING_USER }}
          key: ${{ secrets.STAGING_SSH_KEY }}
          script: |
            cd /var/www/pulse-app-backend
            git pull origin develop
            composer install --no-dev
            php artisan migrate
            php artisan cache:clear
      
      - name: Deploy Frontend to Staging
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.STAGING_HOST }}
          username: ${{ secrets.STAGING_USER }}
          key: ${{ secrets.STAGING_SSH_KEY }}
          script: |
            cd /var/www/pulse-app-frontend
            git pull origin develop
            npm install
            npm run build
            # Ou deploye para S3/CloudFront se usar
```

## 4. Action: Deploy Producao (Manual)
### Local: `.github/workflows/deploy-production.yml`
```yaml
name: Deploy to Production (Manual)

on:
  workflow_dispatch:  # Disparo manual no GitHub UI
    inputs:
      version:
        description: 'Version to deploy (e.g., v1.0.0)'
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
        with:
          ref: ${{ github.event.inputs.version }}
      
      - name: Deploy Backend to Production
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_SSH_KEY }}
          script: |
            cd /var/www/pulse-app-backend
            git fetch origin
            git checkout ${{ github.event.inputs.version }}
            composer install --no-dev --optimize-autoloader
            php artisan migrate --force
            php artisan cache:clear
            # Notificar time
            echo "Backend deployed: ${{ github.event.inputs.version }}"
      
      - name: Deploy Frontend to Production
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_SSH_KEY }}
          script: |
            cd /var/www/pulse-app-frontend
            git fetch origin
            git checkout ${{ github.event.inputs.version }}
            npm install
            npm run build
```

# GitHub Project - Setup para Backlog

## 1. Criar 3 Vistas
### Vista 1: Board (Kanban)
- Colunas: Backlog → To Do → In Progress → Review → Done
- Filtro automatico por status

### Vista 2: Table (Roadmap)
- Colunas: Title, Assignee, Status, Priority, Sprint, Date
- Ordenar por Sprint e Priority

### Vista 3: Timeline (Gantt)
- Visualizar dependencias entre tasks por sprint

## 2. Templates de Issue (GitHub Issue)

### Template: Feature Request
```markdown
---
name: Feature Request
about: Suggest a new feature
title: '[FEATURE] '
labels: 'feature'
---

## Descricao
<!-- Descreva brevemente a feature -->

## Contexto
<!-- Por que precisa dessa feature? Qual problema resolve? -->

## Criterios de Aceite
- [ ] Criterio 1
- [ ] Criterio 2

## Tarefas Tecnicas
- [ ] Task 1
- [ ] Task 2

## Sprint
<!-- Qual sprint sera desenvolvido? -->
```

### Template: Bug Report
```markdown
---
name: Bug Report
about: Report a bug
title: '[BUG] '
labels: 'bug'
---

## Descricao
<!-- Descreva o bug -->

## Steps para Reproduzir
1. 
2. 
3. 

## Resultado Esperado
<!-- O que deveria acontecer -->

## Resultado Real
<!-- O que esta acontecendo -->

## Prioridade
- [ ] Critica (bloqueador de release)
- [ ] Alta (afeta usuarios)
- [ ] Media (melhoria)
- [ ] Baixa (nice-to-have)
```

### Template: Task Tecnica
```markdown
---
name: Technical Task
about: Technical implementation task
title: '[TASK] '
labels: 'task'
---

## Objetivo
<!-- O que precisa ser implementado e por que -->

## Requisitos Tecnicos
- [ ] Requisito 1
- [ ] Requisito 2

## Tarefas de Implementacao
- [ ] Subtask A
- [ ] Subtask B

## Criterios de Pronto (Definition of Done)
- [ ] Codigo escrito e lint passou
- [ ] Testes unitarios passaram
- [ ] PR criada e reviewed
- [ ] Documentacao atualizada
- [ ] Deployed em staging
```

## 3. Automacao com GitHub Project + Actions

### Script: Auto-assign Issues criadas a backlog
```yaml
# .github/workflows/auto-add-to-project.yml
name: Auto-add Issues to Project

on:
  issues:
    types: [opened]

jobs:
  add-to-project:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/add-to-project@v0.5.0
        with:
          project-url: https://github.com/users/Dvd2112/projects/1
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

### Labels Recomendadas
```
- feature: Nova feature
- bug: Bug encontrado
- task: Tarefas tecnicas
- backend: Afeta backend
- frontend: Afeta frontend
- urgent: Urgente
- blocker: Bloqueia outro trabalho
- documentation: Docs ou onboarding
```

# Configurar Secrets no GitHub para CI/CD

Ve em: Settings > Secrets and variables > Actions > New repository secret

```
STAGING_HOST=seu-staging.com
STAGING_USER=deploy
STAGING_SSH_KEY=<private-key>
PROD_HOST=seu-prod.com
PROD_USER=deploy
PROD_SSH_KEY=<private-key>
```

# Workflows Recomendados para Sprint

## Sprint Planning (Inicio de Sprint)
- [ ] MVP milestone criar no GitHub (Sprint 1, Sprint 2, Sprint 3)
- [ ] Issues agrupadas por sprint
- [ ] Labels applicadas corretamente
- [ ] Assignees definidos

## Daily Standup
- Verificar In Progress no Project
- Bloqueadores reportados em comments de issues
- Syncro com time pelo Project timeline

## Sprint Review (Fim de Sprint)
- Mover tudo Done para fechado
- Labels update (done, tested, staged)
- Preparar release notes

# Proximos Passos
- [ ] Copiar templates de Actions para `.github/workflows/`
- [ ] Criar GitHub Project e configurar vistas
- [ ] Definir milestones para Sprint 1-3
- [ ] Criar primeiras issues de backend setup
- [ ] Testar CI/CD em branch develop
