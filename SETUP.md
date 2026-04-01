# The Marrrweco - Setup Guia Completo

## ✅ Requisitos

- Docker Desktop (incluindo Docker Compose)
- Git
- Navegador web moderno
- Terminal/CMD

## 🚀 Instalação Passo a Passo

### 1. Clone o Repositório

```bash
git clone https://github.com/Dvd2112/CheersFDS.git
cd CheersFDS
```

### 2. Configure Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# (Opcional) Edite o .env se necessário
# Por padrão, está configurado para desenvolvimento local
```

### 3. Inicie os Containers Docker

```bash
# Inicie todos os serviços
docker-compose up -d

# Aguarde ~30 segundos para o banco de dados iniciar
# Você pode monitorar com:
docker-compose logs -f
```

### 4. Instale Dependências do Frontend (dentro do container)

```bash
# O container Node já fará isso automaticamente
# Mas se precisar manualmente:
docker-compose exec node npm install
```

### 5. Acesse a Aplicação

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Frontend React | http://localhost:3000 | Interface da aplicação |
| Backend API | http://localhost:8000 | Endpoints da API |
| PostgreSQL | localhost:5432 | Banco de dados |

## 🧪 Teste a Aplicação

### Credenciais de Teste

**1. Cliente:**
- Email: `joao@email.com`
- Senha: `password`
- Tipo de usuário: Cliente

**2. Promoter:**
- Email: `maria@promoter.com`
- Senha: `password`
- Tipo de usuário: Promoter

**3. Atlética:**
- Email: `atletica@uni.com`
- Senha: `password`
- Tipo de usuário: Atlética

### Fluxo de Teste

1. **Login**
   - Abra http://localhost:3000
   - Selecione o tipo de usuário (Cliente/Promoter/Atlética)
   - Insira email e senha
   - Clique em "Entrar"

2. **Explorar Telas**
   - **Cliente**: Ver eventos disponíveis, comprar ingressos
   - **Promoter**: Ver dashboard com eventos e estatísticas
   - **Atlética**: Gerenciar gastos e saldo

3. **Ver Ingressos**
   - Cliente podem ver ingressos comprados
   - Clicar no ingresso abre modal com detalhes
   - Contém informações completas e QR Code mockup

## 📁 Estrutura de Arquivos

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth.jsx         # Tela de Login
│   │   ├── Auth.css
│   │   ├── TicketView.jsx   # Tela de Ver Ingressos
│   │   └── TicketView.css
│   ├── pages/
│   │   ├── PromoterDashboard.jsx
│   │   ├── CustomerPage.jsx
│   │   ├── AthleticDashboard.jsx
│   │   └── Dashboard.css
│   ├── styles/
│   │   └── global.css       # Estilos globais e tema
│   ├── App.jsx              # Componente principal
│   ├── App.css
│   └── index.js
└── package.json

backend/
├── index.php                # Router principal
├── config.php               # Configurações
├── Database.php             # Classe de BD
├── Auth.php                 # Autenticação
├── .htaccess
└── php.ini

database/
├── schema.sql               # Estrutura BD
└── seed.sql                 # Dados de teste

docker-compose.yml          # Orquestração
nginx.conf                  # Configuração web
.env.example                # Variáveis de exemplo
SETUP.md                    # Este arquivo
README.md                   # Documentação geral
```

## 🎨 Tema e Cores

O projeto usa a paleta "Neon Tech" definida:

```css
--color-black: #000000          /* Base */
--color-neon-green: #00FF00     /* Destaque principal */
--color-tech-green: #00BF63     /* Verde suave */
--color-light-gray: #D9D9D9     /* Texto secundário */
--color-white: #FFFFFF          /* Texto principal */
```

Todos os componentes foram estilizados com essa paleta.

## 🔧 Comandos Úteis Docker

```bash
# Ver status dos containers
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (limpar BD)
docker-compose down -v

# Reconstruir containers
docker-compose build --no-cache

# Executar comando em um container
docker-compose exec php php artisan migrate
docker-compose exec node npm install

# Acessar terminal do container
docker-compose exec node sh
docker-compose exec php bash
```

## ✨ Telas Desenvolvidas

### ✅ Tela de Login
- Campo de seleção de tipo de usuário
- Inputs de email e senha
- Validação de formulário
- Design responsivo mobile-first
- Animações e efeitos neon

### ✅ Tela de Ver Ingresso
- Listagem de ingressos do usuário
- Cards interativos para cada ingresso
- Modal com detalhes completos
- Exibição de QR Code (mockup)
- Status do ingresso (Ativo/Usado)
- Botões de ação (Transferir/Compartilhar)

### ✅ Dashboard Cliente
- Grid de eventos disponíveis
- Carrinho de compras
- Listagem de eventos com preços

### ✅ Dashboard Promoter
- Cards de estatísticas (Eventos, Vendas, Receita)
- Listagem de eventos criados

### ✅ Dashboard Atlética
- Cards de estatísticas financeiras
- Histórico de despesas

## 🔐 API Endpoints Disponíveis

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de novo usuário

### Ingressos
- `GET /api/tickets` - Listar ingressos do usuário (requer token)
- `GET /api/events/upcoming` - Eventos disponíveis (requer token)

### Promoter
- `GET /api/promoter/events` - Dashboard promoter (requer token)

### Atlética
- `GET /api/athletic/data` - Dados financeiros (requer token)

## 🔑 Autenticação

O sistema usa JWT (JSON Web Tokens):

1. **Login**: Envia email + senha
2. **Resposta**: Retorna token JWT + dados do usuário
3. **Armazenamento**: Token salvo em localStorage
4. **Requisições**: Token enviado em header `Authorization: Bearer <token>`
5. **Validação**: Backend valida token e expiração

## 🐛 Troubleshooting

### Erro de conexão com banco de dados

```bash
# Reinicie o container PostgreSQL
docker-compose down
docker-compose up -d
# Aguarde 30 segundos pelo healthcheck
```

### Frontend não carrega

```bash
# Verifique logs do Node
docker-compose logs node

# Limpe cache e reinstale
docker-compose exec node npm install
docker-compose exec node npm start
```

### API retorna 404

```bash
# Verifique se o backend está rodando
docker-compose logs php
docker-compose logs nginx

# Teste direto a API
curl http://localhost:8000/api/auth/login
```

### Erro de CORS

```bash
# Verifique arquivo .env
# CORS_ORIGIN deve ser http://localhost:3000
```

## 📝 Próximas Funcionalidades

- [ ] Sistema de pagamento integrado
- [ ] Upload de foto de perfil
- [ ] Notificações por email
- [ ] Sistema de comentários em eventos
- [ ] Relatórios avançados para promoters
- [ ] App mobile nativa
- [ ] Integração com redes sociais
- [ ] Sistema de avaliações e resenhas

## 🤝 Desenvolvimento

### Frontend
```bash
# Dentro do container ou localmente em frontend/
npm start  # Inicia em http://localhost:3000
npm test   # Executa testes (quando configurado)
npm build  # Build para produção
```

### Backend
```bash
# Edite os arquivos PHP em backend/
# Mudanças refletem automaticamente no http://localhost:8000
```

## 📚 Documentação Adicional

- [README_DETALHADO.md](README_DETALHADO.md) - Documentação completa
- [.env.example](.env.example) - Variáveis de ambiente

## 💡 Dicas

1. **Desenvolvimento Frontend**: Abra devtools (F12) para ver logs
2. **Desenvolvimento Backend**: Verifique `docker-compose logs php`
3. **Banco de Dados**: Acesse direto via ferramenta SQL cliente (DBeaver, pgAdmin)
4. **Hot Reload**: React auto-recarrega mudanças de código
5. **API Testing**: Use Postman ou Insomnia para testar endpoints

## 🎯 Próximos Passos

1. Customize as cores em `frontend/src/styles/global.css`
2. Adicione mais campos de usuário em `database/schema.sql`
3. Implemente sistema de pagamento no backend
4. Configure SSL/TLS para produção
5. Setup de CI/CD (GitHub Actions)

## ❓ FAQ

**P: Como mudo as senhas padrão?**  
R: Edite `database/seed.sql` e regenere o banco com `docker-compose down -v && docker-compose up`

**P: Como faço deploy?**  
R: Veja seção Deploy do README_DETALHADO.md

**P: Posso usar isso em produção?**  
R: Não ainda. Configure JWT_SECRET, banco de dados seguro, e SSL/TLS antes.

---

**Divirta-se desenvolvendo! 🚀**
