#!/bin/bash
# Script para parar e limpar The Marrrweco

echo "🛑 Parando The Marrrweco..."

docker-compose down

echo "✅ Aplicação parada"
echo ""
echo "Para remover dados do banco:"
echo "  docker-compose down -v"
