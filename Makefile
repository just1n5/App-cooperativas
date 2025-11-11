.PHONY: help install dev build test clean docker-up docker-down db-migrate db-seed db-studio

# Default target
help:
	@echo "Orden Interno - Development Commands"
	@echo ""
	@echo "Setup:"
	@echo "  make install      - Install all dependencies"
	@echo "  make docker-up    - Start Docker services (PostgreSQL, Redis)"
	@echo "  make db-migrate   - Run database migrations"
	@echo "  make db-seed      - Seed database with demo data"
	@echo ""
	@echo "Development:"
	@echo "  make dev          - Start all development servers"
	@echo "  make dev-backend  - Start backend only"
	@echo "  make dev-frontend - Start frontend only"
	@echo ""
	@echo "Database:"
	@echo "  make db-studio    - Open Prisma Studio"
	@echo "  make db-reset     - Reset database (careful!)"
	@echo ""
	@echo "Other:"
	@echo "  make build        - Build all apps"
	@echo "  make test         - Run all tests"
	@echo "  make lint         - Lint all code"
	@echo "  make clean        - Clean build artifacts"
	@echo "  make docker-down  - Stop Docker services"

# Installation
install:
	@echo "📦 Installing dependencies..."
	pnpm install
	@echo "✅ Dependencies installed!"

# Docker
docker-up:
	@echo "🐳 Starting Docker services..."
	docker-compose up -d
	@echo "⏳ Waiting for PostgreSQL to be ready..."
	@sleep 5
	@echo "✅ Docker services started!"

docker-down:
	@echo "🛑 Stopping Docker services..."
	docker-compose down
	@echo "✅ Docker services stopped!"

docker-logs:
	docker-compose logs -f

# Database
db-migrate:
	@echo "🗄️  Running database migrations..."
	pnpm --filter @orden-interno/database migrate:deploy
	@echo "✅ Migrations complete!"

db-seed:
	@echo "🌱 Seeding database..."
	pnpm --filter @orden-interno/database seed
	@echo "✅ Database seeded!"

db-studio:
	@echo "🎨 Opening Prisma Studio..."
	pnpm --filter @orden-interno/database studio

db-reset:
	@echo "⚠️  Resetting database (this will delete all data)..."
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		pnpm --filter @orden-interno/database migrate:reset --force; \
		echo "✅ Database reset complete!"; \
	else \
		echo "❌ Database reset cancelled."; \
	fi

# Development
dev:
	@echo "🚀 Starting all development servers..."
	pnpm dev

dev-backend:
	@echo "🚀 Starting backend..."
	pnpm --filter @orden-interno/backend dev

dev-frontend:
	@echo "🚀 Starting frontend..."
	pnpm --filter @orden-interno/frontend dev

# Build
build:
	@echo "🏗️  Building all apps..."
	pnpm build
	@echo "✅ Build complete!"

# Test
test:
	@echo "🧪 Running tests..."
	pnpm test

# Lint
lint:
	@echo "🔍 Linting code..."
	pnpm lint

# Clean
clean:
	@echo "🧹 Cleaning build artifacts..."
	pnpm clean
	find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
	find . -name "dist" -type d -prune -exec rm -rf '{}' +
	find . -name ".next" -type d -prune -exec rm -rf '{}' +
	@echo "✅ Clean complete!"

# Full setup
setup: install docker-up db-migrate db-seed
	@echo "✨ Setup complete! Run 'make dev' to start development."
