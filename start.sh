#!/bin/bash
# Script de inicialização do The Marrrweco

set -e

echo "🎉 Bem-vindo ao The Marrrweco!"
echo ""
echo "Iniciando aplicação..."
echo ""

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado! Por favor instale Docker Desktop."
    exit 1
fi

# Verificar Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não encontrado!"
    exit 1
fi

echo "✅ Docker encontrado"
echo ""

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
fi

echo ""
echo "🚀 Iniciando containers..."
docker-compose up -d

echo ""
echo "⏳ Aguardando banco de dados iniciar..."
sleep 30

echo ""
echo "✅ Aplicação iniciada com sucesso!"
echo ""
echo "🌐 Acesse:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:8000"
echo "   Database:  localhost:5432"
echo ""
echo "🔑 Credenciais de teste:"
echo "   Cliente:   joao@email.com / password"
echo "   Promoter:  maria@promoter.com / password"
echo "   Atlética:  atletica@uni.com / password"
echo ""
echo "📚 Documentação: SETUP.md"
echo ""
echo "Happy coding! 🚀"
