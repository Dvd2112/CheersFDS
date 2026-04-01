# The Marrrweco - Aplicação de Compra de Ingressos para Festas Universitárias

## 🎉 Sobre o Projeto

The Marrrweco é uma plataforma moderna de compra de ingressos para festas universitárias, com design mobile-first e interface futurista.

### Arquitetura

- **Frontend**: React com design responsivo e mobile-first
- **Backend**: PHP com API REST
- **Banco de Dados**: PostgreSQL
- **Docker**: Ambiente containerizado para desenvolvimento

### Cores da Marca

- **Preto Absoluto** (#000000) - Base e solidez
- **Verde Neon** (#00FF00) - Energia e futuro
- **Verde Tecnológico** (#00BF63) - Inovação sustentável
- **Cinza Claro** (#D9D9D9) - Neutralidade
- **Branco Puro** (#FFFFFF) - Clareza

## 🚀 Início Rápido

### Prerequisitos

- Docker e Docker Compose
- Git

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Dvd2112/CheersFDS.git
cd CheersFDS
```

2. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. **Inicie os containers**
```bash
docker-compose up -d
```

4. **Acesse a aplicação**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### Primeiro Login

Use as credenciais de teste:

**Cliente:**
- Email: `joao@email.com`
- Senha: `password`
- Tipo: Cliente

**Promoter:**
- Email: `maria@promoter.com`
- Senha: `password`
- Tipo: Promoter

**Atlética:**
- Email: `atletica@uni.com`
- Senha: `password`
- Tipo: Atlética

## 📱 Estrutura do Projeto

```
CheersFDS/
├── frontend/                 # Aplicação React
│   ├── public/              # Arquivos estáticos
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas
│   │   ├── styles/          # CSS global
│   │   ├── App.jsx          # App principal
│   │   └── index.js         # Entry point
│   └── package.json
├── backend/                  # API PHP
│   ├── index.php            # Router principal
│   ├── config.php           # Configurações
│   ├── Database.php         # Classe para BD
│   ├── Auth.php             # Autenticação
│   └── .htaccess            # Rewrite rules
├── database/                 # Scripts SQL
│   ├── schema.sql           # Estrutura do BD
│   └── seed.sql             # Dados de teste
├── docker-compose.yml       # Orquestração Docker
├── nginx.conf               # Configuração Nginx
└── README.md
```

## 🎯 Funcionalidades

### Tela de Login
- ✅ Autenticação com 3 tipos de usuário
- ✅ Design responsivo mobile-first
- ✅ Validação de credenciais
- ✅ JWT Token

### Tela de Ver Ingresso
- ✅ Listagem de ingressos do usuário
- ✅ Modal interativo com detalhes
- ✅ QR Code (mockup)
- ✅ Status do ingresso
- ✅ Opções de transferência

### Dashboard Cliente
- 📅 Eventos disponíveis
- 🛒 Carrinho de compras
- 🎫 Histórico de ingressos
- 💳 Opções de pagamento

### Dashboard Promoter
- 📊 Dashboard com estatísticas
- 📈 Gráficos de vendas
- 🎟️ Gerenciar eventos
- 💰 Controle de receita

### Dashboard Atlética
- 💰 Gerenciador de gastos
- 📊 Balanço financeiro
- 📝 Histórico de transações
- 🎯 Rastreamento de saldo

## 🔧 API Endpoints

### Autenticação
```
POST /api/auth/login
POST /api/auth/register
```

### Ingressos
```
GET /api/tickets              # Listar meus ingressos
GET /api/events/upcoming      # Ver eventos disponíveis
```

### Promoter
```
GET /api/promoter/events      # Meus eventos e estatísticas
POST /api/promoter/events     # Criar novo evento
```

### Atlética
```
GET /api/athletic/data        # Dados financeiros
POST /api/expenses            # Adicionar despesa
```

## 🎨 Design System

### Tipografia
- Títulos: Bold, 24-32px
- Subtítulos: 16-20px
- Corpo: 14-16px
- Pequeno: 12-14px

### Componentes
- Botões com efeito hover
- Inputs com border glow
- Cards com gradientes
- Modais animados

### Responsividade
- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px+

## 🔐 Segurança

- ✅ Senhas hasheadas com Bcrypt
- ✅ JWT Token com expiração
- ✅ CORS configurado
- ✅ Validação de entrada
- ✅ Prepared statements no BD

## 📦 Tecnologias

- React 18.2
- React Router 6.14
- Axios 1.4
- PHP 8.2
- PostgreSQL 15
- Docker & Docker Compose
- Nginx

## 🛠️ Desenvolvimento

### Instalar dependências (sem Docker)

**Frontend:**
```bash
cd frontend
npm install
npm start
```

**Backend:**
Requer PHP 8.2+ e PostgreSQL

### Testes

```bash
# Frontend
cd frontend
npm test

# Backend
# Criar arquivo para testes PHP
```

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` baseado em `.env.example`:

```env
# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=the_marrrweco
DB_USER=postgres
DB_PASSWORD=password

# JWT
JWT_SECRET=seu-secret-super-seguro-aqui

# App
APP_ENV=development
API_BASE_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:3000
```

## 🚀 Deploy

### Usando Docker Compose

```bash
# Build e start
docker-compose up -d

# Stop
docker-compose down

# Logs
docker-compose logs -f
```

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato através do repositório.

## 📄 Licença

Este projeto é fornecido como está. Use livremente para fins educacionais.

---

**Desenvolvido com ❤️ para festas universitárias**

The Marrrweco - Sua entrada para a diversão! 🎉
