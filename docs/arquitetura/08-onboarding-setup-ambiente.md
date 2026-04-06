---
title: Onboarding e Setup do Ambiente Pulse App
aliases: [Setup Inicial, Instalacao Dependencias]
tags: [onboarding, setup, laravel, php, postgres, development]
status: ativo
created: 2026-04-06
updated: 2026-04-06
related: ["[[MASTER-pulseapp-decisoes]]"]
---

# Pre-requisitos do Sistema
## Versoes Obrigatorias
- PHP 8.3+
- Node.js 18+ LTS
- PostgreSQL 14+
- Git 2.30+
- Composer 2.5+

## Ferramentas de Desenvolvimento
- VS Code (ou editor de escolha).
- Extensoes recomendadas:
  - Laravel Extension Pack (Brent)
  - Prettier (formatacao JavaScript)
  - PostgreSQL (gerenciamento banco)

# Setup Inicial do Ambiente Local

## 1. Clonar repositorio
```bash
git clone https://github.com/Dvd2112/CheersFDS.git
cd CheersFDS
```

## 2. Setup Backend (Laravel)
### Passo 1: Instalar dependencias PHP
```bash
cd backend
composer install
```

### Passo 2: Criar arquivo .env
```bash
cp .env.example .env
php artisan key:generate
```

### Passo 3: Configurar banco de dados no .env
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=pulse_app_dev
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
```

### Passo 4: Criar banco de dados
```bash
# Via psql
createdb pulse_app_dev

# Ou via GUI (pgAdmin ou DBeaver)
```

### Passo 5: Executar migrations
```bash
php artisan migrate
# Apos pronto, seed de dados iniciais
php artisan db:seed
```

### Passo 6: Gerar JWT secret (se usar JWT para mobile)
```bash
php artisan jwt:secret
```

### Passo 7: Subir servidor de desenvolvimento
```bash
php artisan serve
# API rodara em http://localhost:8000
```

## 3. Setup Frontend (React Web)
### Passo 1: Instalar dependencias
```bash
cd frontend
npm install
```

### Passo 2: Criar arquivo .env
```bash
cp .env.example .env
```

#### Conteudo do .env
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_ENV=development
```

### Passo 3: Subir servidor de desenvolvimento
```bash
npm start
# Frontend rodara em http://localhost:3000
```

## 4. Banco de Dados - Primeira Vez
### Criar usuário postgres
```bash
sudo -u postgres psql
postgres=# CREATE USER pulse_dev WITH PASSWORD 'senha_dev';
postgres=# ALTER ROLE pulse_dev SET client_encoding TO 'utf8';
postgres=# ALTER ROLE pulse_dev SET default_transaction_isolation TO 'read committed';
postgres=# GRANT ALL PRIVILEGES ON DATABASE pulse_app_dev TO pulse_dev;
postgres=# \q
```

### Verificar conexao
```bash
psql -h localhost -U pulse_dev -d pulse_app_dev
# Se pedir senha, digite 'senha_dev'
```

# Estructura de Diretorio do Projeto
```
CheersFDS/
├── backend/                    # Laravel
│   ├── app/
│   │   ├── Domain/             # Regras de negocio
│   │   ├── Application/        # Casos de uso / Services
│   │   ├── Infrastructure/     # Repositories, Adapters
│   │   └── Http/               # Controllers, Middleware
│   ├── database/
│   │   ├── migrations/         # Migrações do banco
│   │   └── seeders/            # Dados iniciais
│   ├── routes/
│   │   └── api.php             # Definição de rotas da API
│   ├── .env.example
│   ├── composer.json
│   └── artisan
├── frontend/                   # React
│   ├── src/
│   │   ├── features/           # Modulos por feature
│   │   ├── shared/             # Componentes reutilizaveis
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── docs/
│   ├── arquitetura/            # Decisoes e planejamento
│   └── (mais documentação)
└── README.md
```

# Variaveis de Ambiente Obrigatorias

## Backend (.env no backend/)
```env
APP_NAME=PulseApp
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=pulse_app_dev
DB_USERNAME=pulse_dev
DB_PASSWORD=senha_dev

JWT_SECRET=<gerado por php artisan jwt:secret>

PAYMENT_GATEWAY=stripe  # ou pagseguro, a definir
STRIPE_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
```

## Frontend (.env no frontend/)
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_ENV=development
REACT_APP_LOG_LEVEL=debug
```

# Comandos Uteis Dia a Dia

## Backend
```bash
# Criar nova migration
php artisan make:migration create_users_table

# Criar novo modelo
php artisan make:model User -m

# Criar novo controller
php artisan make:controller UserController --resource

# Rodar testes
php artisan test

# Formatar codigo
./vendor/bin/pint
```

## Frontend
```bash
# Criar componente (manual ou gerador)
npm run generate:component NomeComponente

# Rodar testes
npm test

# Build producao
npm run build

# Lint e formatacao
npm run lint
npm run format
```

# Database - Primeiras Migrations

### Users (Autenticacao)
```sql
-- database/migrations/2026_04_06_create_users_table.php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('email')->unique();
    $table->string('password');
    $table->enum('role', ['buyer', 'promoter', 'admin_athletic', 'admin_platform']);
    $table->timestamps();
    $table->softDeletes();
});
```

### Events (Eventos)
```sql
Schema::create('events', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->datetime('date_start');
    $table->datetime('date_end');
    $table->unsignedBigInteger('athletic_id');
    $table->timestamps();
    $table->foreign('athletic_id')->references('id')->on('athletics');
});
```

# Problemas Comuns

## "SQLSTATE[08006]: Connection refused"
- Verificar se PostgreSQL esta rodando: `sudo systemctl status postgresql`
- Verificar credenciais no .env
- Testar conexao: `psql -h localhost -U pulse_dev -d pulse_app_dev`

## "Module not found" no Frontend
- Limpar cache: `rm -rf node_modules && npm install`
- Verificar variaveis de ambiente: `-env.example` esta identico ao `.env`?

## JWT_SECRET nao gerado
```bash
# Se esquecer de fazer isso
php artisan jwt:secret
```

## Migrations travando
```bash
# Listar tudo e resetar (cuidado, apaga dados!)
php artisan migrate:reset
php artisan migrate
```

# Checklist de Setup Completo
- [ ] PHP 8.3+ instalado (`php -v`)
- [ ] Node.js 18+ instalado (`node -v`)
- [ ] PostgreSQL 14+ instalado e rodando
- [ ] Repositorio clonado e branches corretos
- [ ] Backend: `.env` configurado e `php artisan migrate` rodou
- [ ] Backend: `php artisan serve` rodando em http://localhost:8000
- [ ] Frontend: `.env` configurado
- [ ] Frontend: `npm start` rodando em http://localhost:3000
- [ ] Poder fazer login em http://localhost:3000 (mock ate ter backend real)
- [ ] Poder acessar API em http://localhost:8000/api/health

# Proximos Passos Apos Setup
- [ ] Criar primeiro endpoint de autenticacao.
- [ ] Documentar API (Swagger).
- [ ] Setup CI/CD basico (GitHub Actions).
- [ ] Criar backlog tecnico de sprint 1.
