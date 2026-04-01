# 🚀 GITHUB PAGES DEPLOYMENT GUIDE

## Setup Inicial (Uma vez)

### 1. Instale dependências do frontend
```bash
cd frontend
npm install
```

### 2. Faça push para GitHub
```bash
git push origin main
```

## Deploy para GitHub Pages

### Método 1: Via npm script (RECOMENDADO)

```bash
cd frontend
npm run deploy
```

Isso irá:
1. Build a aplicação
2. Criar branch `gh-pages`
3. Fazer push do build
4. Ativar GitHub Pages automaticamente

### Método 2: Configurar Actions (automático)

Crie arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: cd frontend && npm install
      
      - name: Build
        run: cd frontend && npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/build
```

## Verificar Deployment

### 1. Verifique as Settings do repositório:
- GitHub > Settings > Pages
- Deve estar em "Deploy from a branch" - `gh-pages`
- Status deve mostrar: "Your site is live at https://dvd2112.github.io/CheersFDS"

### 2. Acesse:
```
https://dvd2112.github.io/CheersFDS
```

## Credenciais para Teste

```
Cliente:   joao@email.com / password
Promoter:  maria@promoter.com / password
Atlética:  atletica@uni.com / password
```

## Dados Mock Inclusos

A aplicação funciona 100% sem backend usando dados mock:
- ✅ Autenticação com dados mock
- ✅ Ingressos pré-carregados
- ✅ Eventos disponíveis
- ✅ Dashboards com dados de exemplo
- ✅ Sem necessidade de servidor PHP/PostgreSQL

## Troubleshooting

### Página em branco após deploy
- Verifique URL em `public/index.html`
- Confirme `homepage` em `package.json`
- Limpe cache do navegador (Ctrl+F5 ou Cmd+Shift+R)

### Erro ao fazer deploy
```bash
# Limpar node_modules
rm -rf node_modules package-lock.json
npm install

# Tente novamente
npm run deploy
```

### Permissões de token
- Vá em GitHub > Settings > Developer settings > Personal access tokens
- Crie um token com permissão `repo` e `write:packages`
- Use em local: `git config --local credential.helper store`

## Próximas Melhorias

- [ ] Integrar backend PHP quando necessário
- [ ] Adicionar autenticação real
- [ ] Sistema de pagamento
- [ ] Notificações por email
- [ ] Upload de imagens

## Rollback

Para voltar a versão anterior:
```bash
git push origin --delete gh-pages
npm run deploy  # Irá recriar com versão atual
```

---

**Seu aplicativo está no ar em:** https://dvd2112.github.io/CheersFDS

