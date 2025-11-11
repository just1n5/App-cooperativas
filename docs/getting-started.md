# Getting Started with Orden Interno

This guide will help you set up the development environment and start working on Orden Interno.

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **pnpm** >= 8.0.0 (Install: `npm install -g pnpm`)
- **Docker & Docker Compose** ([Download](https://www.docker.com/get-started))
- **Git** ([Download](https://git-scm.com/))
- **Make** (usually pre-installed on Linux/Mac, [Windows](http://gnuwin32.sourceforge.net/packages/make.htm))

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd App-cooperativas
```

### 2. Install Dependencies

```bash
make install
# or
pnpm install
```

### 3. Start Docker Services

```bash
make docker-up
# or
docker-compose up -d
```

This will start:
- **PostgreSQL** on port `5432`
- **Redis** on port `6379`
- **pgAdmin** on port `5050` (optional)

### 4. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` if needed (default values work for local development).

### 5. Run Database Migrations

```bash
make db-migrate
# or
pnpm --filter @orden-interno/database migrate:deploy
```

### 6. Seed the Database (Optional)

```bash
make db-seed
# or
pnpm --filter @orden-interno/database seed
```

This creates:
- Demo tenant: **Cooperativa Demo**
- Admin user: `admin@cooperativa-demo.com` / `Admin123!`
- 2 sample associates
- Sample governance body

### 7. Start Development Servers

```bash
make dev
# or
pnpm dev
```

This will start:
- **Backend API**: http://localhost:3001
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:3001/api/docs

## Project Structure

```
App-cooperativas/
├── apps/
│   ├── backend/         # NestJS API
│   └── frontend/        # Next.js app
├── packages/
│   ├── database/        # Prisma schema
│   ├── shared/          # Shared types
│   └── ui/              # Shared UI components
├── docker/              # Docker configs
├── docs/                # Documentation
├── .env.example         # Environment template
├── docker-compose.yml   # Docker services
├── Makefile             # Development commands
├── package.json         # Root package
├── pnpm-workspace.yaml  # Workspace config
└── turbo.json           # Turbo config
```

## Development Workflow

### Running Individual Services

```bash
# Backend only
make dev-backend
# or
pnpm --filter @orden-interno/backend dev

# Frontend only
make dev-frontend
# or
pnpm --filter @orden-interno/frontend dev
```

### Database Management

```bash
# Open Prisma Studio (DB GUI)
make db-studio

# Create a new migration
cd packages/database
pnpm prisma migrate dev --name your_migration_name

# Reset database (⚠️ deletes all data!)
make db-reset
```

### Building for Production

```bash
make build
# or
pnpm build
```

### Running Tests

```bash
make test
# or
pnpm test
```

### Linting

```bash
make lint
# or
pnpm lint
```

## Accessing Services

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | - |
| Backend API | http://localhost:3001 | - |
| API Docs (Swagger) | http://localhost:3001/api/docs | - |
| Prisma Studio | http://localhost:5555 | - |
| pgAdmin | http://localhost:5050 | admin@orden-interno.com / admin |
| PostgreSQL | localhost:5432 | postgres / postgres |
| Redis | localhost:6379 | - |

## Common Issues

### Port Already in Use

If you see "port already in use" errors:

```bash
# Check what's using the port (example: 3000)
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Database Connection Issues

1. Ensure Docker is running:
   ```bash
   docker ps
   ```

2. Check PostgreSQL logs:
   ```bash
   docker logs orden-interno-db
   ```

3. Verify connection string in `.env`:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/orden_interno?schema=public"
   ```

### Prisma Client Not Generated

```bash
cd packages/database
pnpm prisma generate
```

### Node Modules Issues

```bash
# Clean install
make clean
make install
```

## Environment Variables

Key environment variables (see `.env.example` for full list):

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `API_PORT` | Backend port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `JWT_SECRET` | JWT signing secret | `dev-secret...` |
| `NEXT_PUBLIC_API_URL` | Frontend API URL | `http://localhost:3001/api` |

## Next Steps

- [ ] Read [Architecture Overview](./architecture.md)
- [ ] Review [Database Schema](./database.md)
- [ ] Explore [API Documentation](http://localhost:3001/api/docs)
- [ ] Check [SICSES Integration Guide](./sicses.md)
- [ ] Start building features!

## Getting Help

- Check the [documentation](./README.md)
- Review [GitHub Issues](https://github.com/your-org/orden-interno/issues)
- Contact the development team

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
