# 🎉 The Marrrweco - Compre Ingressos para Festas Universitárias

Bem-vindo ao **The Marrrweco**, a plataforma mais moderna e futurista para compra de ingressos de festas universitárias!

## 🚀 Início Rápido

### Com Docker (Recomendado)

```bash
# 1. Clone o repositório
git clone https://github.com/Dvd2112/CheersFDS.git
cd CheersFDS

# 2. Inicie os containers
docker-compose up -d

# 3. Acesse
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
```

### Credenciais de Teste

| Tipo | Email | Senha |
|------|-------|-------|
| Cliente | joao@email.com | password |
| Promoter | maria@promoter.com | password |
| Atlética | atletica@uni.com | password |

[📖 **Setup Detalhado →** SETUP.md](SETUP.md)

## ✨ Funcionalidades

### 🔐 Autenticação
- Login com 3 tipos de usuário (Cliente, Promoter, Atlética)
- Autenticação JWT segura
- Validação de credenciais

### 🎫 Ver Ingressos
- Listagem de ingressos comprados
- Modal interativo com detalhes
- QR Code para cada ingresso
- Status de utilização
- Opções de transferência

### 🛍️ Dashboard Cliente
- Explorar eventos disponíveis
- Carrinho de compras
- Histórico de ingressos

### 📊 Dashboard Promoter
- Estatísticas de eventos
- Controle de vendas
- Receita total
- Gerenciar eventos

### 💰 Dashboard Atlética
- Gerenciador de gastos
- Rastreamento de saldo
- Histórico de transações

## 🎨 Design

### Paleta de Cores
```
🖤 Preto Absoluto (#000000)      - Base e solidez
🟢 Verde Neon (#00FF00)          - Energia e futuro
🟢 Verde Tecnológico (#00BF63)   - Inovação
⚫ Cinza Claro (#D9D9D9)         - Neutralidade
⚪ Branco Puro (#FFFFFF)         - Clareza
```

### Responsividade
- ✅ Mobile-first
- ✅ Tablet otimizado
- ✅ Desktop completo
- ✅ Animações suaves

## 🛠️ Tecnologias

| Frontend | Backend | Database |
|----------|---------|----------|
| React 18 | PHP 8.2 | PostgreSQL 15 |
| React Router | Nginx | Docker |
| CSS3 | JWT Auth | Compose |
| Axios | REST API | Alpine Linux |

## 📁 Estrutura

```
CheersFDS/
├── frontend/          React app
├── backend/           PHP API
├── database/          SQL schemas
├── docker-compose.yml Orquestração
└── README.md          Este arquivo
```

## 🔧 Comandos Úteis

```bash
# Ver status
docker-compose ps

# Logs em tempo real
docker-compose logs -f

# Parar
docker-compose down

# Reconstruir
docker-compose build --no-cache

# Acessar container
docker-compose exec node sh
docker-compose exec php bash
```

## 📚 Documentação

- [🏗️ SETUP.md](SETUP.md) - Guia de instalação completo
- [📖 README_DETALHADO.md](README_DETALHADO.md) - Documentação técnica
- [⚙️ .env.example](.env.example) - Variáveis de ambiente

## 🎯 Telas Implementadas

✅ **Tela de Login** - Autenticação para 3 tipos de usuário  
✅ **Ver Ingressos** - Modal interativo com detalhes  
✅ **Dashboard Cliente** - Eventos e carrinho  
✅ **Dashboard Promoter** - Estatísticas e eventos  
✅ **Dashboard Atlética** - Gerenciamento financeiro  

## 🔐 Segurança

- ✅ Senhas com Bcrypt
- ✅ JWT com expiração
- ✅ CORS configurado
- ✅ Validação de entrada
- ✅ Prepared statements

## 🚀 Deploy

```bash
# Build da imagem
docker build -t marrrweco .

# Push para registry (Docker Hub, AWS ECR, etc)
docker tag marrrweco seu-usuario/marrrweco:latest
docker push seu-usuario/marrrweco:latest

# Deploy em servidor
docker pull seu-usuario/marrrweco:latest
docker run -d -p 80:80 seu-usuario/marrrweco
```

## ❌ Problemas Comuns

### Erro de conexão BD
```bash
docker-compose down
docker-compose up -d
# Aguarde 30 segundos
```

### API retorna 404
```bash
docker-compose logs php
docker-compose logs nginx
```

### Frontend não carrega
```bash
docker-compose logs node
docker-compose exec node npm install
```

## 📞 Suporte

Encontrou um bug? Abra uma [Issue](https://github.com/Dvd2112/CheersFDS/issues)

## 📝 Desenvolvido por

**Dvd2112** - Criador do The Marrrweco

## 📄 Licença

Este projeto é fornecido como está para fins educacionais.

---

### 🎉 Vamos Começar?

```bash
git clone https://github.com/Dvd2112/CheersFDS.git
cd CheersFDS
docker-compose up -d
# Abra http://localhost:3000
```

**The Marrrweco - Sua entrada para a diversão!** 🎊

*Made with ❤️ for University Parties*