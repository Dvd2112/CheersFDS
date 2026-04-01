#!/bin/bash
# Makefile alternativo para Windows/Unix

.PHONY: help start stop logs install build test clean rebuild health

help:
	@echo "=== The Marrrweco Commands ==="
	@echo ""
	@echo "make start      - Inicia a aplicação"
	@echo "make stop       - Para a aplicação"
	@echo "make restart    - Reinicia a aplicação"
	@echo "make logs       - Mostra logs em tempo real"
	@echo "make install    - Instala dependências"
	@echo "make build      - Build dos containers"
	@echo "make clean      - Remove containers e volumes"
	@echo "make rebuild    - Reconstrói tudo do zero"
	@echo "make health     - Verifica status dos containers"
	@echo ""

start:
	@echo "🚀 Iniciando The Marrrweco..."
	docker-compose up -d
	@echo "✅ Aplicação iniciada!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:8000"

stop:
	@echo "🛑 Parando The Marrrweco..."
	docker-compose down

restart: stop start
	@echo "✅ Aplicação reiniciada!"

logs:
	docker-compose logs -f

install:
	@echo "📦 Instalando dependências..."
	docker-compose exec node npm install
	@echo "✅ Dependências instaladas!"

build:
	@echo "🔨 Building containers..."
	docker-compose build --no-cache
	@echo "✅ Build completo!"

clean:
	@echo "🧹 Limpando..."
	docker-compose down -v
	@echo "✅ Limpeza completa!"

rebuild: clean build start
	@echo "✅ Reconstrução completa!"

health:
	@echo "🏥 Status dos containers:"
	docker-compose ps

.DEFAULT_GOAL := help
