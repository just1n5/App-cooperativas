# Orden Interno - MVP Development Roadmap

## Overview

This roadmap outlines the detailed plan to complete the **Minimum Viable Product (MVP)** for Orden Interno, a SaaS application for cooperative management and SICSES regulatory compliance in Colombia.

**Target Timeline**: 8 weeks
**Goal**: Deliver a functional MVP that allows one cooperative to manage associates, governance, and generate SICSES reports.

---

## 📊 Development Phases

### **Phase 2.1: Core Infrastructure** (Weeks 1-2)
*Foundation layer - authentication, authorization, multi-tenancy*

#### Week 1: Authentication & Authorization

**Priority: CRITICAL** - Everything depends on this

- [ ] **Task 1.1**: Create Prisma Service Module
  - Singleton Prisma client
  - Global module for DI
  - Error handling
  - **Files**: `apps/backend/src/prisma/prisma.service.ts`, `prisma.module.ts`
  - **Estimate**: 2 hours

- [ ] **Task 1.2**: Implement JWT Authentication
  - Install dependencies: `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt`
  - Create Auth module structure
  - JWT strategy with Passport
  - Login/register/logout endpoints
  - Refresh token mechanism
  - **Files**: `apps/backend/src/auth/*`
  - **Estimate**: 8 hours

- [ ] **Task 1.3**: Implement RBAC System
  - Roles guard
  - Permissions decorator
  - Role-based endpoint protection
  - **Files**: `apps/backend/src/common/guards/roles.guard.ts`
  - **Estimate**: 4 hours

- [ ] **Task 1.4**: Create Auth DTOs and Validators
  - LoginDto, RegisterDto, RefreshTokenDto
  - class-validator decorators
  - **Files**: `apps/backend/src/auth/dto/*`
  - **Estimate**: 2 hours

#### Week 2: Multi-tenancy & Base UI

- [ ] **Task 2.1**: Implement Multi-tenancy Middleware
  - Tenant resolver from JWT
  - Tenant context injection
  - Prisma middleware for automatic tenant filtering
  - Tenant guard
  - **Files**: `apps/backend/src/tenants/middleware/tenant.middleware.ts`
  - **Estimate**: 6 hours

- [ ] **Task 2.2**: Implement Tenants Module (Backend)
  - CRUD operations for tenants
  - Tenant creation with admin user
  - Tenant settings
  - **Files**: `apps/backend/src/tenants/*`
  - **Estimate**: 4 hours

- [ ] **Task 2.3**: Set up Shadcn UI Components
  - Install Shadcn CLI
  - Add base components: Button, Card, Table, Form, Input, Select, Dialog, Dropdown, Badge, Tabs
  - Configure theme
  - **Files**: `apps/frontend/src/components/ui/*`
  - **Estimate**: 3 hours

- [ ] **Task 2.4**: Create Authentication Pages (Frontend)
  - Login page with form
  - Register page (tenant + admin user)
  - Auth context/store (Zustand)
  - Protected route wrapper
  - **Files**: `apps/frontend/src/app/(auth)/*`
  - **Estimate**: 6 hours

- [ ] **Task 2.5**: Create Dashboard Layout
  - Main layout with sidebar
  - Top navigation with user menu
  - Breadcrumbs
  - Protected layout component
  - **Files**: `apps/frontend/src/app/(dashboard)/layout.tsx`
  - **Estimate**: 5 hours

**Deliverables Phase 2.1**:
- ✅ Users can register a new cooperative (tenant)
- ✅ Users can log in and receive JWT token
- ✅ Token-based authentication working
- ✅ Role-based access control functional
- ✅ Multi-tenancy isolation working
- ✅ Base UI components library ready
- ✅ Dashboard layout with navigation

---

### **Phase 2.2: Core Business Modules** (Weeks 3-4)
*Users, Associates, Governance*

#### Week 3: Users & Associates Management

- [ ] **Task 3.1**: Implement Users Module (Backend)
  - CRUD endpoints for users
  - User profile update
  - Password change
  - User activation/deactivation
  - **Files**: `apps/backend/src/users/*`
  - **Estimate**: 6 hours

- [ ] **Task 3.2**: Create Users UI (Frontend)
  - Users list page with table
  - Create user modal
  - Edit user modal
  - User detail page
  - **Files**: `apps/frontend/src/app/(dashboard)/users/*`
  - **Estimate**: 6 hours

- [ ] **Task 3.3**: Implement Associates Module (Backend)
  - CRUD endpoints for associates
  - Search and filtering
  - Pagination
  - Associate statistics
  - **Files**: `apps/backend/src/associates/*`
  - **Estimate**: 8 hours

- [ ] **Task 3.4**: Create Associates UI (Frontend)
  - Associates list with advanced filters
  - Create associate form (multi-step)
  - Edit associate form
  - Associate detail page with tabs
  - **Files**: `apps/frontend/src/app/(dashboard)/associates/*`
  - **Estimate**: 10 hours

#### Week 4: Governance Module

- [ ] **Task 4.1**: Implement Governance Module (Backend)
  - CRUD for governance bodies
  - CRUD for governance positions
  - CRUD for meetings
  - Current/historical boards
  - **Files**: `apps/backend/src/governance/*`
  - **Estimate**: 8 hours

- [ ] **Task 4.2**: Create Governance UI (Frontend)
  - Governance bodies list
  - Create/edit body modal
  - Body detail with members
  - Add/remove positions
  - Meeting management
  - **Files**: `apps/frontend/src/app/(dashboard)/governance/*`
  - **Estimate**: 10 hours

- [ ] **Task 4.3**: Document Repository (Basic)
  - File upload endpoint
  - Document metadata storage
  - Document list and download
  - **Files**: `apps/backend/src/documents/*`
  - **Estimate**: 4 hours

**Deliverables Phase 2.2**:
- ✅ Full user management (CRUD)
- ✅ Complete associate management system
- ✅ Governance bodies and positions management
- ✅ Meeting tracking
- ✅ Basic document repository

---

### **Phase 2.3: SICSES Compliance Engine** (Weeks 5-6)
*The core value proposition - regulatory compliance*

#### Week 5: Financial Data & SICSES Foundation

- [ ] **Task 5.1**: Implement Financial Accounts Module (Backend)
  - CRUD for chart of accounts
  - Account hierarchy management
  - Balance updates
  - Period management
  - **Files**: `apps/backend/src/financial/*`
  - **Estimate**: 8 hours

- [ ] **Task 5.2**: Create Financial Accounts UI (Frontend)
  - Chart of accounts tree view
  - Account creation wizard
  - Balance input forms
  - **Files**: `apps/frontend/src/app/(dashboard)/financial/*`
  - **Estimate**: 8 hours

- [ ] **Task 5.3**: Create SICSES Module Structure
  - Base report generator class
  - Report configuration
  - Validation framework
  - **Files**: `apps/backend/src/sicses/*`
  - **Estimate**: 4 hours

- [ ] **Task 5.4**: Implement Data Import
  - CSV/Excel parser
  - Data validation on import
  - Bulk insert with transactions
  - Import status tracking
  - **Files**: `apps/backend/src/sicses/import/*`
  - **Estimate**: 8 hours

#### Week 6: SICSES Report Generators

- [ ] **Task 6.1**: Implement SICSES Validation Engine
  - Validation rule definitions
  - Rule executor
  - Cross-field validations
  - Validation report generator
  - **Files**: `apps/backend/src/sicses/validators/*`
  - **Estimate**: 10 hours

- [ ] **Task 6.2**: F9998 Generator (Identificación)
  - Data extraction from tenant
  - .txt file generation
  - Format validation
  - **Files**: `apps/backend/src/sicses/generators/f9998.generator.ts`
  - **Estimate**: 4 hours

- [ ] **Task 6.3**: F9999 Generator (Base Social)
  - Associates data extraction
  - Format according to SICSES spec
  - File generation
  - **Files**: `apps/backend/src/sicses/generators/f9999.generator.ts`
  - **Estimate**: 6 hours

- [ ] **Task 6.4**: F8888 Generator (Órganos de Dirección)
  - Governance data extraction
  - Format according to SICSES spec
  - File generation
  - **Files**: `apps/backend/src/sicses/generators/f8888.generator.ts`
  - **Estimate**: 6 hours

- [ ] **Task 6.5**: Create SICSES Reports UI
  - Report generation wizard
  - Report list with status
  - Validation results display
  - File download
  - **Files**: `apps/frontend/src/app/(dashboard)/sicses/*`
  - **Estimate**: 10 hours

**Deliverables Phase 2.3**:
- ✅ Financial accounts management
- ✅ Data import from CSV/Excel
- ✅ SICSES validation engine
- ✅ F9998, F9999, F8888 report generators
- ✅ Report generation and download UI

---

### **Phase 2.4: Dashboard & BI** (Week 7)
*Data visualization and insights*

#### Week 7: Analytics Dashboard

- [ ] **Task 7.1**: Implement Dashboard API Endpoints
  - Total associates count
  - Active vs inactive
  - Contributions summary
  - Recent growth metrics
  - Report completion status
  - **Files**: `apps/backend/src/dashboard/*`
  - **Estimate**: 6 hours

- [ ] **Task 7.2**: Create Dashboard Components
  - KPI cards (associates, contributions, etc.)
  - Line chart for growth
  - Pie chart for status distribution
  - Recent activity list
  - **Files**: `apps/frontend/src/app/(dashboard)/page.tsx`
  - **Estimate**: 8 hours

- [ ] **Task 7.3**: Implement Charts with Recharts
  - Associate growth over time
  - Contributions by period
  - Governance body composition
  - **Files**: `apps/frontend/src/components/charts/*`
  - **Estimate**: 6 hours

- [ ] **Task 7.4**: Create Internal Reports
  - Associates report (PDF/Excel)
  - Governance report
  - Financial summary
  - **Files**: `apps/backend/src/reports/*`
  - **Estimate**: 6 hours

**Deliverables Phase 2.4**:
- ✅ Management dashboard with KPIs
- ✅ Interactive charts
- ✅ Internal report generation

---

### **Phase 2.5: Testing, Security & Polish** (Week 8)
*Production readiness*

#### Week 8: Testing, Security, Deployment

- [ ] **Task 8.1**: Implement Audit Logging
  - Audit interceptor
  - Log all critical operations
  - Audit log viewer (admin only)
  - **Files**: `apps/backend/src/common/interceptors/audit.interceptor.ts`
  - **Estimate**: 4 hours

- [ ] **Task 8.2**: Add Unit Tests
  - Auth service tests
  - Associates service tests
  - SICSES validators tests
  - Report generators tests
  - **Target**: 70% coverage on services
  - **Estimate**: 12 hours

- [ ] **Task 8.3**: Add E2E Tests
  - Auth flow
  - Associate CRUD flow
  - Report generation flow
  - **Files**: `apps/backend/test/e2e/*`
  - **Estimate**: 8 hours

- [ ] **Task 8.4**: Security Audit
  - Input validation review
  - SQL injection prevention check
  - XSS prevention check
  - CSRF protection
  - Rate limiting fine-tuning
  - Dependency vulnerability scan
  - **Estimate**: 6 hours

- [ ] **Task 8.5**: Set up CI/CD
  - GitHub Actions workflows
  - Automated testing on PR
  - Build and deploy to staging
  - **Files**: `.github/workflows/*`
  - **Estimate**: 4 hours

- [ ] **Task 8.6**: Performance Optimization
  - Database query optimization
  - Add necessary indexes
  - Frontend bundle size optimization
  - Implement caching where needed
  - **Estimate**: 6 hours

- [ ] **Task 8.7**: Final MVP Testing & Bug Fixes
  - Full system testing
  - Cross-browser testing
  - Mobile responsiveness check
  - Bug fixes
  - **Estimate**: 8 hours

**Deliverables Phase 2.5**:
- ✅ Audit logging operational
- ✅ 70%+ test coverage
- ✅ E2E tests for critical flows
- ✅ Security hardened
- ✅ CI/CD pipeline operational
- ✅ Performance optimized
- ✅ MVP production-ready

---

## 📦 MVP Feature Scope

### ✅ In Scope (MVP)

**Authentication & Authorization**
- [x] User registration (with tenant creation)
- [x] Login with JWT
- [x] Role-based access control (5 roles)
- [x] Password reset (basic)

**Multi-tenancy**
- [x] Tenant isolation
- [x] Tenant-aware queries
- [x] Tenant switching (for admins)

**User Management**
- [x] Create, read, update users
- [x] Activate/deactivate users
- [x] Role assignment

**Associate Management (CRM)**
- [x] CRUD operations for associates
- [x] Search and filter
- [x] Member status tracking
- [x] Contributions tracking

**Governance**
- [x] Manage governance bodies
- [x] Assign positions to associates
- [x] Track meetings (basic)

**Financial Data**
- [x] Chart of accounts management
- [x] Account balance entry
- [x] Period management

**SICSES Compliance**
- [x] Data import (CSV/Excel)
- [x] Validation engine
- [x] Report generators (F9998, F9999, F8888)
- [x] Report download
- [x] Validation results

**Dashboard & BI**
- [x] Main dashboard with KPIs
- [x] Growth charts
- [x] Basic internal reports

**Security & Audit**
- [x] Audit logging
- [x] Secure authentication
- [x] Input validation

### ❌ Out of Scope (MVP)

*These features will be in future releases*

- [ ] F3, F130, F9013 report generators (remaining formats)
- [ ] Advanced document management system
- [ ] Email notifications
- [ ] Integration with external accounting systems (API)
- [ ] Advanced BI with custom queries
- [ ] Multi-language support
- [ ] Mobile app
- [ ] Batch report generation
- [ ] Advanced workflow approvals
- [ ] Data versioning/history
- [ ] Advanced search (Elasticsearch)

---

## 🎯 Success Criteria (MVP)

The MVP is considered complete when:

1. ✅ A new cooperative can register and create an admin user
2. ✅ Admin can invite and manage users with different roles
3. ✅ Users can perform CRUD operations on associates
4. ✅ Users can manage governance bodies and positions
5. ✅ Users can enter financial account data
6. ✅ Users can import data from CSV/Excel
7. ✅ System validates data against SICSES rules
8. ✅ Users can generate F9998, F9999, F8888 reports
9. ✅ Reports can be downloaded in correct format
10. ✅ Dashboard shows key metrics and charts
11. ✅ All critical operations are audited
12. ✅ System is secure (passes basic security audit)
13. ✅ 70%+ test coverage on backend services
14. ✅ CI/CD pipeline is operational

---

## 📋 Technical Debt & Future Improvements

Items to address post-MVP:

### High Priority (After MVP)
- Implement remaining SICSES formats (F3, F130, F9013)
- Add comprehensive error handling and user feedback
- Implement email notifications
- Add data export functionality (Excel, PDF)
- Implement advanced search and filtering
- Add data validation on frontend forms

### Medium Priority
- Implement real-time notifications (WebSocket)
- Add batch operations
- Implement data versioning
- Add advanced reporting with custom queries
- Implement workflow approval system
- Add multi-language support (i18n)

### Low Priority (Future)
- Mobile application
- API for external integrations
- Advanced analytics with ML
- Data visualization studio
- White-label capabilities
- SSO integration

---

## 🚀 Getting Started with Development

### Prerequisites
- All setup from Phase 1 completed
- Docker services running
- Database migrated and seeded

### Development Process

1. **Pick a task** from the roadmap (follow the order)
2. **Create a feature branch**: `git checkout -b feature/task-name`
3. **Implement the task** (backend first, then frontend)
4. **Write tests** for new functionality
5. **Test locally** (manual + automated)
6. **Create PR** with clear description
7. **Code review** and merge
8. **Deploy to staging** (via CI/CD)

### Coding Standards

**Backend (NestJS)**
- Use DTOs for all inputs/outputs
- Validate with class-validator
- Use dependency injection
- Write unit tests (Jest)
- Document with JSDoc and Swagger decorators

**Frontend (Next.js)**
- Use TypeScript strictly
- Create reusable components
- Use React Query for server state
- Use Zod for form validation
- Follow accessibility best practices

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `release/*` - Release preparation

---

## 📊 Progress Tracking

### Week 1
- [ ] Authentication & Authorization

### Week 2
- [ ] Multi-tenancy & Base UI

### Week 3
- [ ] Users & Associates Management

### Week 4
- [ ] Governance Module

### Week 5
- [ ] Financial Data & SICSES Foundation

### Week 6
- [ ] SICSES Report Generators

### Week 7
- [ ] Dashboard & BI

### Week 8
- [ ] Testing, Security & Polish

---

## 📞 Support & Questions

For questions or issues during development:
1. Check this roadmap first
2. Review architecture documentation
3. Check API documentation (Swagger)
4. Create a GitHub issue if stuck

---

**Last Updated**: 2025-11-11
**Version**: 1.0
**Status**: Ready to Start Phase 2.1
