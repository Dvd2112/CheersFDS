#!/bin/bash

################################################################################
# 🚀 THE MARRRWECO - SCRIPT DE DEPLOY AUTOMÁTICO
# Faça o deploy para GitHub Pages em um único comando!
################################################################################

set -e  # Exit on error

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Banner
clear
echo -e "${BLUE}"
cat << "EOF"

╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║      🚀  THE MARRRWECO - GITHUB PAGES DEPLOYMENT  🚀                    ║
║                                                                           ║
║              Prepare-se para fazer o deploy do seu app!                   ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

EOF
echo -e "${NC}"

# Verificações iniciais
echo -e "${YELLOW}✓ Executando verificações iniciais...${NC}"

# Verificar se estamos no repositório correto
if [ ! -d ".git" ]; then
    echo -e "${RED}✗ Erro: Este script deve ser executado na raiz do projeto!${NC}"
    exit 1
fi

# Verificar se estamos na branch main
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
    echo -e "${YELLOW}⚠ Aviso: Você está na branch '$BRANCH', não em 'main'${NC}"
    read -p "Continuar mesmo assim? (s/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo -e "${RED}Deploy cancelado.${NC}"
        exit 1
    fi
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js não está instalado!${NC}"
    echo -e "${BLUE}Instale em: https://nodejs.org/${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js encontrado: $NODE_VERSION${NC}"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm não está instalado!${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm encontrado: $NPM_VERSION${NC}"

echo ""
echo -e "${YELLOW}Iniciando processo de deploy...${NC}"
echo ""

# Ir para o diretório frontend
if [ ! -d "frontend" ]; then
    echo -e "${RED}✗ Diretório 'frontend' não encontrado!${NC}"
    exit 1
fi

cd frontend

echo -e "${BLUE}📂 Trabalhando em: $(pwd)${NC}"
echo ""

# Passo 1: Instalar dependências
echo -e "${YELLOW}📦 Passo 1: Instalando dependências...${NC}"
if npm install; then
    echo -e "${GREEN}✓ Dependências instaladas com sucesso!${NC}"
else
    echo -e "${RED}✗ Erro ao instalar dependências!${NC}"
    exit 1
fi
echo ""

# Passo 2: Build
echo -e "${YELLOW}🔨 Passo 2: Fazendo build do React...${NC}"
if npm run build; then
    echo -e "${GREEN}✓ Build concluído com sucesso!${NC}"
else
    echo -e "${RED}✗ Erro durante o build!${NC}"
    exit 1
fi
echo ""

# Passo 3: Deploy
echo -e "${YELLOW}🌐 Passo 3: Fazendo deploy para GitHub Pages...${NC}"
if npm run deploy; then
    echo -e "${GREEN}✓ Deploy concluído com sucesso!${NC}"
else
    echo -e "${RED}✗ Erro durante o deploy!${NC}"
    echo -e "${BLUE}Certifique-se de ter acesso write ao repositório.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}"
cat << "EOF"

╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║                   ✨ DEPLOY CONCLUÍDO COM SUCESSO! ✨                   ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

EOF
echo -e "${NC}"

# Informações finais
echo -e "${BLUE}📊 INFORMAÇÕES DE DEPLOY:${NC}"
echo ""
echo -e "${GREEN}✓ Seu app está sendo publicado em:<br/>${NC}"
echo -e "  ${YELLOW}https://dvd2112.github.io/CheersFDS${NC}"
echo ""
echo -e "${BLUE}⏱ TEMPO ESTIMADO:${NC}"
echo "  GitHub Pages leva 1-2 minutos para processar"
echo ""
echo -e "${BLUE}🔑 CREDENCIAIS TEST:${NC}"
echo "  Email: joao@email.com"
echo "  Senha: password"
echo ""
echo -e "${BLUE}📋 PRÓXIMOS PASSOS:${NC}"
echo "  1. Aguarde 2-3 minutos"
echo "  2. Visite: https://dvd2112.github.io/CheersFDS"
echo "  3. Teste com as credenciais acima"
echo "  4. Navegue pelas telas"
echo ""
echo -e "${BLUE}💡 DICA:${NC}"
echo "  Se a página ficar em branco, limpe o cache:"
echo "  Ctrl+Shift+R (Windows/Linux) ou Cmd+Shift+R (Mac)"
echo ""
echo -e "${GREEN}Obrigado por usar The Marrrweco! 🎉${NC}"
echo ""

exit 0
