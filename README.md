# Orden Interno - Cooperative Management & Compliance SaaS

A robust, secure, and scalable web application for Colombian savings and credit cooperatives, providing automated regulatory compliance (SICSES) and internal management tools.

## 🎯 Vision

**Dual Purpose:**
1. **Regulatory Compliance**: Automate generation of mandatory reports required by Superintendencia de la Economía Solidaria (Supersolidaria) - SICSES system
2. **Internal Order**: Centralized management system for associates, governance bodies, and internal reporting

## 🏗️ Architecture

This is a **monorepo** managed with **pnpm** and **Turbo**, containing:

```
orden-interno/
├── apps/
│   ├── backend/          # NestJS API server
│   └── frontend/         # Next.js application
├── packages/
│   ├── database/         # Prisma schema & migrations
│   ├── shared/           # Shared TypeScript types
│   └── ui/               # Shared UI components (Shadcn UI)
└── docker/               # Docker configurations
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State**: TanStack Query + Zustand

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: class-validator

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Deployment**: Cloud (AWS/GCP/Azure)
- **CI/CD**: GitHub Actions

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker & Docker Compose (for local development)
- PostgreSQL 14+ (or use Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd App-cooperativas
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start PostgreSQL (Docker)**
   ```bash
   pnpm docker:up
   ```

5. **Run database migrations**
   ```bash
   pnpm db:migrate
   ```

6. **Start development servers**
   ```bash
   pnpm dev
   ```

   This will start:
   - Backend API: http://localhost:3001
   - Frontend: http://localhost:3000

## 📦 Modules

### Module 1: SICSES Compliance Engine
ETL and report generation engine for regulatory compliance.

**Features:**
- Data ingestion (CSV/Excel import or database connection)
- Data validation (Supersolidaria rules)
- Report generation (.txt/.zip format)

**Priority Formats:**
- F9998: Identification
- F3: Chart of Accounts (Financial Statements)
- F9999: Social Base (Members, employees)
- F130: Statistical Information
- F8888: Management and Control Bodies
- F9013: Individual Contributions Report

### Module 2: Governance & Internal Order (CRM)
Centralized associate and governance management.

**Features:**
- Associate database (demographics, contributions, contact)
- Governance profiles (Board members, Oversight Committee)
- Document repository (bylaws, meeting minutes, policies)

### Module 3: Financial Data
Integration with existing accounting systems.

**Options:**
- A) Integration module with accounting software APIs
- B) Light accounting module for consolidated financial data

### Module 4: Business Intelligence
Real-time dashboards and internal reporting.

**Features:**
- Management dashboard with KPIs
- Associate growth tracking
- Financial status summary
- SICSES report completion status
- Internal reports for Board of Directors

## 🔐 Security

### Key Features
- **RBAC**: Role-Based Access Control (Admin, Accountant, Manager, Auditor)
- **Encryption**: SSL/TLS (in transit) + database encryption (at rest)
- **Audit Logging**: Immutable audit trail for all critical operations
- **Multi-tenancy**: Isolated data per cooperative

### User Roles
- **Administrator**: Full system access
- **Manager**: Approve and generate reports
- **Accountant**: Upload financial data
- **Auditor**: Read-only access

## 📊 Database Schema

Core entities:
- Tenants (Cooperatives)
- Users & Roles
- Associates (Members)
- Governance Bodies
- Financial Accounts
- Reports & Submissions
- Audit Logs

## 🐳 Docker

Start all services:
```bash
docker-compose up -d
```

Stop services:
```bash
docker-compose down
```

## 📝 Scripts

```bash
# Development
pnpm dev              # Start all apps in dev mode
pnpm build            # Build all apps
pnpm test             # Run all tests
pnpm lint             # Lint all apps

# Database
pnpm db:migrate       # Run Prisma migrations
pnpm db:studio        # Open Prisma Studio

# Docker
pnpm docker:up        # Start Docker services
pnpm docker:down      # Stop Docker services

# Utilities
pnpm format           # Format code with Prettier
pnpm clean            # Clean all build artifacts
```

## 📚 Documentation

- [Architecture Design](./docs/architecture.md) - System architecture overview
- [API Documentation](./docs/api.md) - Backend API reference
- [Database Schema](./docs/database.md) - Database design
- [SICSES Integration](./docs/sicses.md) - Regulatory compliance guide
- [Deployment Guide](./docs/deployment.md) - Production deployment

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in specific app
pnpm --filter @orden-interno/backend test
pnpm --filter @orden-interno/frontend test
```

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

[UNLICENSED] - Proprietary software

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ for Colombian Cooperatives**
