# Quick Reference Guide - Orden Interno

## 🚀 Common Commands

### Setup & Installation
```bash
# Initial setup (one-time)
make install              # Install all dependencies
make docker-up            # Start Docker services
make db-migrate           # Run database migrations
make db-seed              # Seed with demo data

# All-in-one setup
make setup                # Does all of the above
```

### Development
```bash
# Start everything
make dev                  # Start backend + frontend

# Start individually
make dev-backend          # Backend only (http://localhost:3001)
make dev-frontend         # Frontend only (http://localhost:3000)

# Database tools
make db-studio            # Open Prisma Studio
make db-reset             # Reset database (CAUTION!)
```

### Building & Testing
```bash
make build                # Build all apps
make test                 # Run all tests
make lint                 # Lint all code
```

### Docker
```bash
make docker-up            # Start services
make docker-down          # Stop services
make docker-logs          # View logs
```

### Cleanup
```bash
make clean                # Remove build artifacts
```

---

## 🌐 URLs & Access

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | - |
| **Backend API** | http://localhost:3001 | - |
| **API Docs** | http://localhost:3001/api/docs | - |
| **Prisma Studio** | Run `make db-studio` | - |
| **pgAdmin** | http://localhost:5050 | admin@orden-interno.com / admin |
| **PostgreSQL** | localhost:5432 | postgres / postgres |
| **Redis** | localhost:6379 | No auth |

### Demo User
- **Email**: admin@cooperativa-demo.com
- **Password**: Admin123!
- **Role**: Admin
- **Tenant**: Cooperativa Demo

---

## 📁 Project Structure

```
App-cooperativas/
├── apps/
│   ├── backend/          # NestJS API
│   │   ├── src/
│   │   │   ├── auth/     # Authentication
│   │   │   ├── users/    # User management
│   │   │   ├── associates/ # Associate management
│   │   │   ├── governance/ # Governance bodies
│   │   │   ├── financial/  # Financial accounts
│   │   │   ├── sicses/     # SICSES compliance
│   │   │   └── common/     # Shared utilities
│   │   └── test/         # Tests
│   │
│   └── frontend/         # Next.js App
│       └── src/
│           ├── app/      # Pages (App Router)
│           ├── components/ # React components
│           ├── lib/      # Utilities
│           ├── hooks/    # Custom hooks
│           └── services/ # API services
│
├── packages/
│   ├── database/         # Prisma schema
│   ├── shared/           # Shared types
│   └── ui/               # UI components
│
├── docker/               # Docker configs
├── docs/                 # Documentation
└── .github/              # GitHub workflows
```

---

## 🔑 Environment Variables

### Backend (.env)
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/orden_interno"
API_PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## 🗄️ Database

### Key Entities
- **Tenant** - Cooperatives (multi-tenancy)
- **User** - System users
- **Associate** - Cooperative members
- **GovernanceBody** - Boards, committees
- **FinancialAccount** - Chart of accounts
- **SicsesReport** - Compliance reports
- **AuditLog** - Activity logs

### Common Prisma Commands
```bash
cd packages/database

# Generate Prisma Client
pnpm prisma generate

# Create migration
pnpm prisma migrate dev --name migration_name

# Apply migrations
pnpm prisma migrate deploy

# Reset database
pnpm prisma migrate reset

# Open Studio
pnpm prisma studio
```

---

## 🎨 UI Components (Shadcn)

### Installation
```bash
cd apps/frontend
pnpm dlx shadcn-ui@latest add [component-name]
```

### Commonly Used Components
- `button` - Button component
- `card` - Card layout
- `form` - Form components
- `input` - Input fields
- `select` - Select dropdown
- `table` - Data table
- `dialog` - Modal dialog
- `dropdown-menu` - Dropdown menu
- `badge` - Badge/chip
- `tabs` - Tab navigation

---

## 🔐 User Roles

| Role | Permissions | Description |
|------|-------------|-------------|
| **ADMIN** | Full access | System administrator |
| **MANAGER** | Read/Write/Approve | Cooperative manager |
| **ACCOUNTANT** | Read/Write financial data | Upload financial data |
| **AUDITOR** | Read-only | View and audit |
| **USER** | Limited read | Basic user |

---

## 📊 SICSES Report Formats

| Code | Name | Frequency | Status |
|------|------|-----------|--------|
| **F9998** | Identificación | Annual | 🎯 MVP Priority |
| **F9999** | Base Social | Quarterly | 🎯 MVP Priority |
| **F8888** | Órganos de Dirección | Annual | 🎯 MVP Priority |
| **F3** | Catálogo de Cuentas | Quarterly | ⏳ Post-MVP |
| **F130** | Información Estadística | Quarterly | ⏳ Post-MVP |
| **F9013** | Aportes Individuales | Annual | ⏳ Post-MVP |

---

## 🐛 Debugging

### Backend Logs
```bash
# View backend logs (if running via Docker)
docker logs -f orden-interno-backend

# View Nest logs (if running via make dev)
# Check terminal where backend is running
```

### Frontend Logs
```bash
# Browser console (F12)
# Check terminal where frontend is running
```

### Database Queries
```bash
# Enable Prisma query logging
# In .env: DATABASE_URL with ?log=query

# Or check logs in Prisma Studio
make db-studio
```

---

## 🧪 Testing

### Unit Tests
```bash
# Backend
cd apps/backend
pnpm test

# Specific file
pnpm test --watch users.service.spec.ts
```

### E2E Tests
```bash
# Backend E2E
cd apps/backend
pnpm test:e2e
```

### Manual Testing
- Use **Postman** or **Thunder Client** (VS Code extension)
- Import OpenAPI spec from: http://localhost:3001/api/docs-json
- Or use Swagger UI: http://localhost:3001/api/docs

---

## 🔄 Git Workflow

### Branch Naming
```bash
feature/description       # New feature
bugfix/description        # Bug fix
hotfix/description        # Urgent fix
refactor/description      # Code refactoring
```

### Commit Messages
```bash
# Format: <type>(<scope>): <subject>

feat(auth): implement JWT refresh token
fix(associates): resolve duplicate validation
docs(readme): update installation steps
test(users): add unit tests for user service
refactor(api): simplify error handling
```

### Common Git Commands
```bash
# Create feature branch
git checkout -b feature/my-feature

# Stage changes
git add .

# Commit with message
git commit -m "feat(scope): description"

# Push to remote
git push origin feature/my-feature

# Update from main
git pull origin main
```

---

## 📦 Package Management

### Add Dependency
```bash
# Root level (affects all)
pnpm add -w package-name

# Specific workspace
pnpm --filter @orden-interno/backend add package-name

# Dev dependency
pnpm --filter @orden-interno/backend add -D package-name
```

### Remove Dependency
```bash
pnpm --filter @orden-interno/backend remove package-name
```

### Update Dependencies
```bash
pnpm update
```

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Error
```bash
# Check Docker is running
docker ps

# Check PostgreSQL logs
docker logs orden-interno-db

# Verify DATABASE_URL in .env
```

### Module Not Found
```bash
# Reinstall dependencies
pnpm install

# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Prisma Client Not Generated
```bash
cd packages/database
pnpm prisma generate
```

### Build Errors
```bash
# Clean build artifacts
make clean

# Rebuild
make build
```

---

## 📚 Documentation Links

### Internal Docs
- [MVP Roadmap](./mvp-roadmap.md) - Development plan
- [Architecture](./architecture.md) - System design
- [Getting Started](./getting-started.md) - Setup guide
- [SICSES Specs](./sicses-specifications.md) - Report formats
- [Dev Guidelines](./development-guidelines.md) - Code standards

### External Resources
- [NestJS Docs](https://docs.nestjs.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query/latest)

---

## 🎯 Quick Tips

### Backend
- Always use DTOs for request/response
- Validate inputs with class-validator
- Use Swagger decorators for API docs
- Handle errors with custom exceptions
- Write unit tests as you go

### Frontend
- Use React Query for server state
- Validate forms with Zod
- Keep components small and focused
- Use TypeScript strictly
- Extract reusable logic into hooks

### Database
- Always include tenantId in queries
- Use transactions for multi-step operations
- Add indexes for frequently queried fields
- Test migrations on dev database first

### General
- Commit often with clear messages
- Run tests before pushing
- Review your own PR before submitting
- Document complex logic
- Ask for help when stuck!

---

**Need more help?** Check the full documentation or create a GitHub issue.

**Last Updated**: 2025-11-11
