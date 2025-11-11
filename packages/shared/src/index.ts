// Shared types and interfaces for Orden Interno

// ==========================================
// USER & AUTH TYPES
// ==========================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId: string;
  tenantName: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  ACCOUNTANT = 'ACCOUNTANT',
  AUDITOR = 'AUDITOR',
  USER = 'USER',
}

// ==========================================
// SICSES REPORT TYPES
// ==========================================

export interface SicsesReportConfig {
  reportType: SicsesReportType;
  reportingPeriod: string;
  validationRules: ValidationRule[];
}

export enum SicsesReportType {
  F9998 = 'F9998', // Identificación
  F3 = 'F3',       // Catálogo Único de Cuentas
  F9999 = 'F9999', // Base Social
  F130 = 'F130',   // Información Estadística
  F8888 = 'F8888', // Órganos de Dirección y Control
  F9013 = 'F9013', // Informe Individual de Aportes
}

export interface ValidationRule {
  field: string;
  rule: string;
  message: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ReportGenerationResult {
  success: boolean;
  fileName?: string;
  fileSize?: number;
  validationErrors?: ValidationError[];
  message: string;
}

// ==========================================
// ASSOCIATE TYPES
// ==========================================

export interface AssociateCreateDTO {
  documentType: DocumentType;
  documentNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName?: string;
  dateOfBirth: string;
  gender: Gender;
  email?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  city?: string;
  department?: string;
  memberNumber: string;
  joinDate: string;
  contributions?: number;
}

export interface AssociateUpdateDTO extends Partial<AssociateCreateDTO> {
  status?: AssociateStatus;
}

export enum DocumentType {
  CC = 'CC',
  CE = 'CE',
  TI = 'TI',
  NIT = 'NIT',
  PASSPORT = 'PASSPORT',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum AssociateStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  RETIRED = 'RETIRED',
}

// ==========================================
// DASHBOARD & BI TYPES
// ==========================================

export interface DashboardStats {
  totalAssociates: number;
  activeAssociates: number;
  totalContributions: number;
  recentGrowth: number;
  nextReportDue: string;
  reportCompletionPercentage: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

// ==========================================
// API RESPONSE TYPES
// ==========================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ValidationError[];
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ==========================================
// UTILITY TYPES
// ==========================================

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;
