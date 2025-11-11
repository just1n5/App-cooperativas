# Architecture Overview - Orden Interno

## System Architecture

Orden Interno is a **multi-tenant SaaS application** designed using a **modern microservices-oriented architecture** with clear separation of concerns.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js Frontend (React + TypeScript)         │  │
│  │  - App Router                                         │  │
│  │  - Shadcn UI + Tailwind CSS                          │  │
│  │  - TanStack Query (React Query)                       │  │
│  │  - Zustand (State Management)                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ▼
                         HTTP/HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         API LAYER                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           NestJS Backend (TypeScript)                 │  │
│  │  - RESTful API                                        │  │
│  │  - JWT Authentication                                 │  │
│  │  - RBAC (Role-Based Access Control)                  │  │
│  │  - Swagger/OpenAPI Documentation                      │  │
│  │                                                        │  │
│  │  Modules:                                             │  │
│  │  ├── Auth Module                                      │  │
│  │  ├── Tenants Module (Multi-tenancy)                  │  │
│  │  ├── Users Module                                     │  │
│  │  ├── Associates Module (CRM)                         │  │
│  │  ├── Governance Module                               │  │
│  │  ├── Financial Module                                │  │
│  │  └── SICSES Module (Compliance Engine)              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         PostgreSQL 15 (Relational Database)           │  │
│  │  - Prisma ORM                                         │  │
│  │  - Multi-tenant schema isolation                      │  │
│  │  - Row-level security (planned)                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Redis (Optional - Caching)               │  │
│  │  - Session storage                                    │  │
│  │  - Cache layer                                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Design Principles

### 1. Multi-Tenancy

Each cooperative (tenant) has isolated data with a `tenantId` foreign key on all major entities. This ensures:

- **Data isolation**: No cross-tenant data access
- **Scalability**: Easy to add new cooperatives
- **Security**: Tenant-aware middleware validates all requests

**Implementation Strategy**: Shared database, separate schemas per tenant (via Prisma schema filter)

### 2. Security-First Design

- **Authentication**: JWT tokens with refresh token rotation
- **Authorization**: Role-Based Access Control (RBAC)
  - `ADMIN`: Full system access
  - `MANAGER`: Report generation and approval
  - `ACCOUNTANT`: Financial data upload
  - `AUDITOR`: Read-only access
- **Encryption**:
  - TLS/SSL for data in transit
  - Database encryption at rest
  - Bcrypt for password hashing
- **Audit Trail**: Immutable audit logs for all critical operations

### 3. Modularity

Each business domain is encapsulated in a **NestJS module**:

- **Auth Module**: Authentication and authorization
- **Tenants Module**: Multi-tenant management
- **Users Module**: User CRUD
- **Associates Module**: Member management (CRM)
- **Governance Module**: Governance bodies and positions
- **Financial Module**: Chart of accounts and balances
- **SICSES Module**: Compliance reporting engine

Each module is independently testable and deployable.

### 4. Separation of Concerns

```
Frontend (Next.js)
├── Presentation Layer (UI Components)
├── State Management (Zustand + React Query)
└── API Client (Axios)

Backend (NestJS)
├── Controllers (HTTP handlers)
├── Services (Business logic)
├── Repositories (Data access via Prisma)
└── DTOs & Validators (class-validator)

Database (PostgreSQL + Prisma)
└── Schema (Single source of truth)
```

## Tech Stack Justification

### Frontend: Next.js 14+

**Why?**
- Server-side rendering (SSR) for SEO and performance
- App Router for modern routing
- Built-in API routes (if needed)
- Excellent TypeScript support
- Vercel deployment optimization

### Backend: NestJS

**Why?**
- **Enterprise-grade**: Scalable, maintainable architecture
- **TypeScript-first**: Type safety across the stack
- **Modular**: Clear separation of concerns
- **Built-in features**: Guards, interceptors, pipes, decorators
- **Excellent for fintech/GRC**: Strong validation and error handling

### Database: PostgreSQL

**Why?**
- **Relational integrity**: Essential for financial data
- **ACID compliance**: Critical for cooperative transactions
- **Advanced features**: JSON support, full-text search, row-level security
- **Mature ecosystem**: Proven in production at scale
- **Prisma ORM**: Type-safe database access

### ORM: Prisma

**Why?**
- **Type-safe**: Auto-generated types from schema
- **Developer experience**: Intuitive API, great migrations
- **Performance**: Optimized queries
- **Multi-tenancy support**: Middleware for tenant filtering

## Data Flow

### Example: Creating a SICSES Report

1. **User Request**:
   ```
   Frontend → POST /api/sicses/reports
   ```

2. **Authentication & Authorization**:
   ```
   JWT Guard → Validate token
   Roles Guard → Check user has MANAGER or ADMIN role
   Tenant Guard → Inject tenantId into request context
   ```

3. **Business Logic**:
   ```
   SicsesController → SicsesService
   ├── Validate request DTO
   ├── Fetch data from database (filtered by tenantId)
   ├── Apply SICSES validation rules
   ├── Generate report file (.txt/.zip)
   └── Save report metadata to database
   ```

4. **Response**:
   ```
   API Response → Frontend
   ├── Report ID
   ├── Download URL
   └── Validation status
   ```

5. **Audit**:
   ```
   Audit interceptor logs:
   - User ID
   - Tenant ID
   - Action: GENERATE_REPORT
   - Timestamp
   ```

## Scalability Considerations

### Horizontal Scaling

- **Stateless API**: NestJS backend can scale horizontally behind a load balancer
- **Session storage**: Use Redis for distributed session management
- **File storage**: Use S3-compatible storage (not local filesystem)

### Database Optimization

- **Indexes**: Strategic indexes on frequently queried fields (`tenantId`, `status`, etc.)
- **Connection pooling**: Prisma connection pooling
- **Read replicas**: For reporting queries (future)

### Caching Strategy

- **Redis**: Cache frequently accessed data (user profiles, tenant configs)
- **React Query**: Client-side caching with automatic invalidation
- **CDN**: Static assets served via CDN

## Deployment Architecture (Production)

```
┌──────────────────────────────────────────────────────────┐
│                    Load Balancer (AWS ALB)                │
└──────────────────────────────────────────────────────────┘
                          │
         ┌────────────────┴────────────────┐
         ▼                                  ▼
┌──────────────────┐              ┌──────────────────┐
│   Frontend       │              │   Backend API    │
│   (Vercel)       │              │   (ECS/Fargate)  │
│   Next.js        │              │   NestJS         │
└──────────────────┘              └──────────────────┘
                                           │
                          ┌────────────────┴────────────────┐
                          ▼                                  ▼
                  ┌──────────────┐                  ┌──────────────┐
                  │  PostgreSQL  │                  │    Redis     │
                  │  (RDS)       │                  │  (ElastiCache)│
                  └──────────────┘                  └──────────────┘
```

## Security Architecture

### Defense in Depth

1. **Network Layer**: VPC, Security Groups, WAF
2. **Application Layer**: JWT, RBAC, Input validation
3. **Data Layer**: Encryption at rest, tenant isolation
4. **Monitoring**: CloudWatch, audit logs, alerting

### OWASP Top 10 Mitigation

- **Injection**: Prisma ORM (parameterized queries)
- **Broken Auth**: JWT with secure storage
- **XSS**: React's built-in escaping + Content Security Policy
- **CSRF**: SameSite cookies + CSRF tokens
- **Security Misconfiguration**: Helmet.js, secure headers
- **Sensitive Data Exposure**: Encryption, no secrets in code
- **Access Control**: RBAC guards on all endpoints
- **Known Vulnerabilities**: Dependency scanning (Snyk/Dependabot)

## Monitoring & Observability

### Logging

- **Structured logs**: JSON format
- **Log levels**: ERROR, WARN, INFO, DEBUG
- **Centralized**: CloudWatch Logs / ELK Stack

### Metrics

- **Application**: Response time, error rate, throughput
- **Business**: Reports generated, active users, data quality
- **Infrastructure**: CPU, memory, disk, network

### Tracing

- **Distributed tracing**: OpenTelemetry (future)
- **Request IDs**: Track requests across services

## Testing Strategy

```
Unit Tests (Jest)
├── Services (business logic)
├── Utilities
└── Pure functions

Integration Tests
├── API endpoints (Supertest)
├── Database operations
└── Module interactions

E2E Tests (Playwright)
└── Critical user flows
```

## Next Steps

1. Implement remaining modules (Auth, SICSES engine)
2. Add comprehensive test coverage
3. Set up CI/CD pipeline
4. Performance testing and optimization
5. Security audit and penetration testing
