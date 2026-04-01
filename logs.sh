#!/bin/bash
# Script para ver logs em tempo real

echo "📋 Logs do The Marrrweco (Ctrl+C para sair)"
echo ""

docker-compose logs -f
