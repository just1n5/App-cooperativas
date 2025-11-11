# Development Guidelines - Orden Interno

## Code Style & Standards

### TypeScript

**General Rules**
- Use strict TypeScript mode
- No `any` types (use `unknown` if truly dynamic)
- Explicit return types on functions
- Use interfaces for objects, types for unions
- Prefer `const` over `let`, never use `var`

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  role: UserRole;
}

function findUser(id: string): Promise<User | null> {
  // implementation
}

// ❌ Bad
function findUser(id: any): any {
  // implementation
}
```

### Backend (NestJS)

#### Module Structure

```
feature/
├── feature.module.ts
├── feature.controller.ts
├── feature.service.ts
├── dto/
│   ├── create-feature.dto.ts
│   ├── update-feature.dto.ts
│   └── feature-response.dto.ts
├── entities/
│   └── feature.entity.ts (if using TypeORM)
├── guards/
│   └── feature.guard.ts (if needed)
└── __tests__/
    ├── feature.controller.spec.ts
    └── feature.service.spec.ts
```

#### Controller Best Practices

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';

@ApiTags('associates')
@ApiBearerAuth()
@Controller('associates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssociatesController {
  constructor(private readonly associatesService: AssociatesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Create a new associate' })
  async create(
    @Body() dto: CreateAssociateDto,
    @CurrentUser() user: UserPayload,
  ): Promise<AssociateResponseDto> {
    return this.associatesService.create(dto, user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get associate by ID' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ): Promise<AssociateResponseDto> {
    return this.associatesService.findOne(id, user.tenantId);
  }
}
```

#### Service Best Practices

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AssociatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAssociateDto, tenantId: string): Promise<Associate> {
    // Business logic here
    return this.prisma.associate.create({
      data: {
        ...dto,
        tenantId,
      },
    });
  }

  async findOne(id: string, tenantId: string): Promise<Associate> {
    const associate = await this.prisma.associate.findFirst({
      where: { id, tenantId },
    });

    if (!associate) {
      throw new NotFoundException(`Associate with ID ${id} not found`);
    }

    return associate;
  }
}
```

#### DTO Best Practices

```typescript
import { IsString, IsEmail, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender, DocumentType } from '@orden-interno/shared';

export class CreateAssociateDto {
  @ApiProperty({ enum: DocumentType })
  @IsEnum(DocumentType)
  documentType: DocumentType;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  documentNumber: string;

  @ApiProperty({ example: 'Juan' })
  @IsString()
  firstName: string;

  @ApiPropertyOptional({ example: 'Carlos' })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty({ example: 'juan@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: '1980-05-15' })
  @IsDateString()
  dateOfBirth: string;
}
```

### Frontend (Next.js)

#### Component Structure

```
feature/
├── page.tsx (Server Component)
├── layout.tsx (if needed)
├── components/
│   ├── feature-list.tsx
│   ├── feature-form.tsx
│   └── feature-card.tsx
├── hooks/
│   └── use-feature.ts
└── actions.ts (Server Actions if needed)
```

#### Component Best Practices

```typescript
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { associatesApi } from '@/services/associates';
import type { Associate } from '@orden-interno/shared';

export function AssociateList() {
  const queryClient = useQueryClient();

  const { data: associates, isLoading, error } = useQuery({
    queryKey: ['associates'],
    queryFn: associatesApi.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: associatesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['associates'] });
      toast.success('Associate deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Associates</CardTitle>
      </CardHeader>
      <CardContent>
        {associates?.map((associate) => (
          <AssociateCard
            key={associate.id}
            associate={associate}
            onDelete={() => deleteMutation.mutate(associate.id)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
```

#### Form Best Practices

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  documentNumber: z.string().min(6, 'Document number must be at least 6 characters'),
});

type FormValues = z.infer<typeof formSchema>;

interface AssociateFormProps {
  onSubmit: (data: FormValues) => Promise<void>;
  defaultValues?: Partial<FormValues>;
}

export function AssociateForm({ onSubmit, defaultValues }: AssociateFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      firstName: '',
      lastName: '',
      email: '',
      documentNumber: '',
    },
  });

  const handleSubmit = async (data: FormValues) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Juan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* More fields... */}

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Form>
  );
}
```

#### API Service Layer

```typescript
// apps/frontend/src/services/associates.ts
import api from '@/lib/api';
import type { Associate, AssociateCreateDTO, PaginatedResponse } from '@orden-interno/shared';

export const associatesApi = {
  getAll: async (): Promise<Associate[]> => {
    const { data } = await api.get<Associate[]>('/associates');
    return data;
  },

  getById: async (id: string): Promise<Associate> => {
    const { data } = await api.get<Associate>(`/associates/${id}`);
    return data;
  },

  create: async (dto: AssociateCreateDTO): Promise<Associate> => {
    const { data } = await api.post<Associate>('/associates', dto);
    return data;
  },

  update: async (id: string, dto: Partial<AssociateCreateDTO>): Promise<Associate> => {
    const { data } = await api.put<Associate>(`/associates/${id}`, dto);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/associates/${id}`);
  },

  search: async (query: string): Promise<Associate[]> => {
    const { data } = await api.get<Associate[]>('/associates/search', {
      params: { q: query },
    });
    return data;
  },
};
```

---

## Testing Standards

### Backend Unit Tests (Jest)

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AssociatesService } from './associates.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('AssociatesService', () => {
  let service: AssociatesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssociatesService,
        {
          provide: PrismaService,
          useValue: {
            associate: {
              create: jest.fn(),
              findFirst: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AssociatesService>(AssociatesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an associate', async () => {
      const dto = {
        documentType: 'CC',
        documentNumber: '1234567890',
        firstName: 'Juan',
        lastName: 'Pérez',
        // ... other fields
      };
      const tenantId = 'tenant-123';
      const expected = { id: 'assoc-123', ...dto, tenantId };

      jest.spyOn(prisma.associate, 'create').mockResolvedValue(expected as any);

      const result = await service.create(dto, tenantId);

      expect(result).toEqual(expected);
      expect(prisma.associate.create).toHaveBeenCalledWith({
        data: { ...dto, tenantId },
      });
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if associate not found', async () => {
      jest.spyOn(prisma.associate, 'findFirst').mockResolvedValue(null);

      await expect(service.findOne('invalid-id', 'tenant-123')).rejects.toThrow(
        'Associate with ID invalid-id not found',
      );
    });
  });
});
```

### E2E Tests (Supertest)

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('Associates (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Login to get auth token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@test.com', password: 'password' });

    authToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/associates (POST)', () => {
    it('should create a new associate', () => {
      return request(app.getHttpServer())
        .post('/associates')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          documentType: 'CC',
          documentNumber: '1234567890',
          firstName: 'Juan',
          lastName: 'Pérez',
          // ... other fields
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.firstName).toBe('Juan');
        });
    });

    it('should return 401 without auth token', () => {
      return request(app.getHttpServer())
        .post('/associates')
        .send({
          documentType: 'CC',
          documentNumber: '1234567890',
          firstName: 'Juan',
          lastName: 'Pérez',
        })
        .expect(401);
    });
  });
});
```

---

## Git Workflow

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Examples:**

```bash
feat(auth): implement JWT refresh token mechanism

- Add refresh token generation
- Create refresh endpoint
- Update token expiration handling

Closes #123
```

```bash
fix(associates): resolve duplicate document number validation

The validation was not checking across tenants correctly.
Now it properly validates within tenant scope only.

Fixes #456
```

### Branch Naming

```
feature/short-description
bugfix/short-description
hotfix/short-description
release/version
```

**Examples:**
```
feature/jwt-authentication
feature/associates-crud
bugfix/validation-error
hotfix/security-patch
```

### Pull Request Process

1. **Create PR** with clear title and description
2. **Fill PR template** (description, testing, screenshots)
3. **Link related issues** (Closes #123)
4. **Request review** from at least 1 team member
5. **Ensure CI passes** (tests, linting)
6. **Address review comments**
7. **Squash and merge** when approved

---

## Error Handling

### Backend Error Handling

```typescript
import { HttpException, HttpStatus } from '@nestjs/common';

// Custom exceptions
export class AssociateNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Associate with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateDocumentException extends HttpException {
  constructor(documentNumber: string) {
    super(
      `Associate with document number ${documentNumber} already exists`,
      HttpStatus.CONFLICT,
    );
  }
}

// Usage in service
async create(dto: CreateAssociateDto, tenantId: string): Promise<Associate> {
  // Check for duplicate
  const existing = await this.prisma.associate.findFirst({
    where: {
      tenantId,
      documentNumber: dto.documentNumber,
    },
  });

  if (existing) {
    throw new DuplicateDocumentException(dto.documentNumber);
  }

  try {
    return await this.prisma.associate.create({
      data: { ...dto, tenantId },
    });
  } catch (error) {
    // Log error
    this.logger.error(`Failed to create associate: ${error.message}`, error.stack);
    throw new HttpException(
      'Failed to create associate',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
```

### Frontend Error Handling

```typescript
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export function handleApiError(error: unknown) {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message;
    const status = error.response?.status;

    switch (status) {
      case 400:
        toast.error(`Validation Error: ${message}`);
        break;
      case 401:
        toast.error('Unauthorized. Please login again.');
        // Redirect to login
        break;
      case 403:
        toast.error('You do not have permission to perform this action.');
        break;
      case 404:
        toast.error('Resource not found.');
        break;
      case 409:
        toast.error(`Conflict: ${message}`);
        break;
      default:
        toast.error('An unexpected error occurred. Please try again.');
    }
  } else {
    toast.error('An unexpected error occurred.');
  }
}

// Usage in component
const mutation = useMutation({
  mutationFn: associatesApi.create,
  onSuccess: () => {
    toast.success('Associate created successfully');
  },
  onError: handleApiError,
});
```

---

## Performance Best Practices

### Database Queries

```typescript
// ❌ Bad - N+1 query problem
async getAssociatesWithPositions() {
  const associates = await this.prisma.associate.findMany();

  for (const associate of associates) {
    associate.positions = await this.prisma.governancePosition.findMany({
      where: { associateId: associate.id },
    });
  }

  return associates;
}

// ✅ Good - Use include
async getAssociatesWithPositions() {
  return this.prisma.associate.findMany({
    include: {
      governancePositions: {
        include: {
          body: true,
        },
      },
    },
  });
}
```

### Frontend Performance

```typescript
// Use React.memo for expensive components
export const AssociateCard = React.memo(({ associate, onDelete }) => {
  return (
    <Card>
      {/* ... */}
    </Card>
  );
});

// Use useMemo for expensive calculations
const sortedAssociates = useMemo(() => {
  return associates.sort((a, b) => a.lastName.localeCompare(b.lastName));
}, [associates]);

// Use useCallback for event handlers
const handleDelete = useCallback((id: string) => {
  deleteMutation.mutate(id);
}, [deleteMutation]);
```

---

## Security Checklist

- [ ] All inputs validated (backend + frontend)
- [ ] SQL injection prevented (Prisma handles this)
- [ ] XSS prevented (React escapes by default)
- [ ] CSRF protection (SameSite cookies)
- [ ] Authentication on all protected routes
- [ ] Authorization checks (RBAC)
- [ ] Rate limiting on APIs
- [ ] Sensitive data encrypted
- [ ] Secrets not in code (use .env)
- [ ] HTTPS in production
- [ ] Security headers (Helmet.js)
- [ ] Dependency vulnerabilities checked

---

## Documentation Standards

### Code Documentation

```typescript
/**
 * Creates a new associate in the system.
 *
 * @param dto - The associate creation data
 * @param tenantId - The tenant ID for multi-tenancy isolation
 * @returns The created associate
 * @throws DuplicateDocumentException if document number already exists
 * @throws InternalServerErrorException if database operation fails
 *
 * @example
 * ```typescript
 * const associate = await service.create({
 *   documentType: 'CC',
 *   documentNumber: '1234567890',
 *   firstName: 'Juan',
 *   lastName: 'Pérez',
 * }, 'tenant-123');
 * ```
 */
async create(dto: CreateAssociateDto, tenantId: string): Promise<Associate> {
  // implementation
}
```

### API Documentation (Swagger)

```typescript
@ApiOperation({
  summary: 'Create a new associate',
  description: 'Creates a new associate member for the cooperative. Requires ADMIN or MANAGER role.',
})
@ApiResponse({
  status: 201,
  description: 'Associate created successfully',
  type: AssociateResponseDto,
})
@ApiResponse({
  status: 400,
  description: 'Validation error',
})
@ApiResponse({
  status: 409,
  description: 'Duplicate document number',
})
@ApiBearerAuth()
@Post()
async create(@Body() dto: CreateAssociateDto): Promise<AssociateResponseDto> {
  // implementation
}
```

---

## Daily Development Checklist

### Before Starting
- [ ] Pull latest changes from `develop`
- [ ] Create feature branch
- [ ] Review task requirements
- [ ] Understand dependencies

### During Development
- [ ] Follow code style guidelines
- [ ] Write self-documenting code
- [ ] Add comments for complex logic
- [ ] Validate all inputs
- [ ] Handle errors properly
- [ ] Write tests as you go

### Before Committing
- [ ] Run linter: `pnpm lint`
- [ ] Run tests: `pnpm test`
- [ ] Test manually in browser/Postman
- [ ] Remove console.logs
- [ ] Check for TODOs
- [ ] Review your changes (git diff)

### Creating PR
- [ ] Write clear PR description
- [ ] Add screenshots (if UI changes)
- [ ] Link related issues
- [ ] Request review
- [ ] Ensure CI passes

---

**Remember**: Write code that your future self (and teammates) will thank you for!
