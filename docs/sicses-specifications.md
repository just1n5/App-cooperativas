# SICSES Report Specifications

## Overview

SICSES (Sistema Integrado de Captura de Información del Sector Solidario) is the integrated information capture system used by the Superintendencia de la Economía Solidaria (Supersolidaria) in Colombia for regulatory compliance reporting.

This document outlines the specifications for the priority report formats that need to be implemented in the MVP.

---

## Report Formats

### 1. F9998 - Identificación

**Purpose**: Entity identification and general information

**Reporting Frequency**: Annually or when changes occur

**File Format**: Plain text (.txt) with pipe-separated values (|)

**Key Fields**:
- NIT (Tax ID)
- Legal name
- Commercial name
- Legal representative
- Address
- City/Department
- Phone/Email
- Economic activity (CIIU code)
- Type of cooperative
- Founding date
- License/Resolution number

**Validation Rules**:
- NIT must be valid Colombian format (9 digits + verification digit)
- Email must be valid format
- Phone must be Colombian format
- CIIU code must exist in official catalog
- All mandatory fields must be filled

**Example Record**:
```
900123456|7|COOPERATIVA EJEMPLO LTDA|COOPEJEMPLO|1234567890|CC|JUAN PEREZ GOMEZ|Calle 123 #45-67|11001|Bogotá D.C.|Cundinamarca|+57 1 2345678|info@coopejemplo.com|6419|Cooperativa de Ahorro y Crédito|2020-01-15|Resolución 001 de 2020
```

---

### 2. F9999 - Base Social

**Purpose**: Cooperative member (associate) information

**Reporting Frequency**: Quarterly

**File Format**: Plain text (.txt) with pipe-separated values (|)

**Key Fields**:
- Document type (CC, CE, TI, NIT, etc.)
- Document number
- First name
- Middle name (optional)
- Last name
- Second last name (optional)
- Birth date
- Gender (M/F)
- Address
- City
- Phone
- Email
- Member number
- Join date
- Status (Active/Inactive/Retired)
- Total contributions (aportes)

**Validation Rules**:
- Document number must be unique per type
- Birth date must be valid and person must be 18+ for regular members
- Email format validation
- Member number must be unique
- Join date cannot be in the future
- Contributions must be >= 0
- Status must be from valid list
- Total associates count must match header

**Record Format**:
```
CC|1234567890|JUAN|CARLOS|PEREZ|GOMEZ|1980-05-15|M|Calle 123|Bogotá|+57 300 1234567|juan.perez@example.com|A001|2020-01-15|ACTIVO|5000000
```

**File Structure**:
```
[Header Line with metadata]
[Record 1]
[Record 2]
...
[Record N]
[Footer with totals]
```

---

### 3. F8888 - Órganos de Dirección y Control

**Purpose**: Information about governance bodies (Board of Directors, Oversight Committee, etc.)

**Reporting Frequency**: Annually or when changes occur

**File Format**: Plain text (.txt) with pipe-separated values (|)

**Key Fields**:
- Body type (Consejo de Administración, Junta de Vigilancia, etc.)
- Position (Presidente, Secretario, Vocal, etc.)
- Member document type
- Member document number
- Full name
- Start date
- End date (if applicable)
- Status (Active/Inactive)
- Educational level
- Professional profile

**Validation Rules**:
- Document number must exist in F9999 (Base Social)
- Start date cannot be in the future
- End date must be after start date
- Same person cannot hold multiple positions in same body simultaneously
- Educational level from valid catalog
- Body composition must meet legal requirements (minimum number of members)

**Record Format**:
```
CONSEJO_ADMINISTRACION|PRESIDENTE|CC|1234567890|JUAN CARLOS PEREZ GOMEZ|2024-01-01|2025-12-31|ACTIVO|PROFESIONAL|Administrador de Empresas
```

**Body Types** (Mandatory):
- Consejo de Administración (Board of Directors) - Minimum 3 members
- Junta de Vigilancia (Oversight Committee) - Minimum 3 members
- Gerencia General (General Management) - 1 person

---

### 4. F3 - Catálogo Único de Cuentas (Chart of Accounts)

**Purpose**: Standardized chart of accounts with balances

**Reporting Frequency**: Quarterly

**File Format**: Plain text (.txt) with pipe-separated values (|)

**Key Fields**:
- Account code (hierarchical: 1 = Assets, 2 = Liabilities, etc.)
- Account name
- Account type (ASSET, LIABILITY, EQUITY, INCOME, EXPENSE)
- Nature (DEBIT or CREDIT)
- Level (1-6, hierarchical depth)
- Parent account code
- Balance (period-end)
- Period (YYYY-MM or YYYY-QX)

**Validation Rules**:
- Account codes must follow Supersolidaria standard catalog
- Balances must match nature (debit/credit)
- Hierarchical integrity (parent must exist)
- Total assets = Total liabilities + Total equity
- Level must be consistent with code length
- All required accounts must be present

**Account Code Structure**:
```
1     = ACTIVO (Assets)
11    = Disponible (Cash and cash equivalents)
1105  = Caja (Cash)
110505 = Caja General (General cash)
```

**Record Format**:
```
1105|CAJA|ASSET|DEBIT|2|11|50000000|2024-Q1
```

**Key Validations**:
- Sum of all level 2 accounts must equal level 1 balance
- Accounting equation must balance: Assets = Liabilities + Equity
- All accounts with movements must have parent accounts
- Credit accounts must have credit balance, debit accounts must have debit balance

---

### 5. F130 - Información Estadística

**Purpose**: Statistical information about operations

**Reporting Frequency**: Quarterly

**File Format**: Plain text (.txt) with pipe-separated values (|)

**Key Fields**:
- Total active members
- New members (period)
- Retired members (period)
- Total contributions (capital social)
- Total savings
- Total loans portfolio
- Overdue loans
- Number of active loans
- Number of savers
- Total assets
- Total liabilities
- Total equity
- Net income (period)
- Number of employees
- Number of agencies/branches

**Validation Rules**:
- All counts must be non-negative integers
- All monetary values must be >= 0
- Active members = Previous active + New - Retired
- Total assets must match F3 report
- Overdue loans <= Total loans
- Statistical consistency with other reports

**Record Format**:
```
2024-Q1|500|25|10|5000000000|3000000000|10000000000|500000000|150|450|15000000000|10000000000|5000000000|200000000|25|3
```

---

### 6. F9013 - Informe Individual de Aportes

**Purpose**: Individual member contributions report

**Reporting Frequency**: Annually

**File Format**: Plain text (.txt) with pipe-separated values (|)

**Key Fields**:
- Document type
- Document number
- Member name
- Member number
- Initial balance (year start)
- Contributions (period)
- Withdrawals (period)
- Final balance (year end)
- Contribution date (last)

**Validation Rules**:
- Member must exist in F9999
- Final balance = Initial + Contributions - Withdrawals
- All amounts >= 0
- Total contributions sum must match F130 statistics
- Document number unique per type

**Record Format**:
```
CC|1234567890|JUAN CARLOS PEREZ GOMEZ|A001|4500000|500000|0|5000000|2024-12-31
```

---

## Common Validation Rules (All Reports)

### File Structure
1. **Header Line**: Contains report code, period, generation date, cooperative NIT
2. **Data Lines**: Actual report data
3. **Footer Line**: Contains totals and record count

**Example Header**:
```
F9999|2024-Q1|2024-04-15|900123456|500
```
*(Report code | Period | Generation date | NIT | Record count)*

**Example Footer**:
```
TOTAL_REGISTROS|500|TOTAL_APORTES|2500000000
```

### Data Quality Rules
- No null values in mandatory fields
- Dates in ISO format (YYYY-MM-DD)
- Monetary values without currency symbols or thousand separators
- Text fields without special characters that could break parsing
- Encoding: UTF-8 without BOM

### Cross-Report Validations
- F9999 total members must match F130 active members
- F8888 members must exist in F9999
- F3 total assets must match F130 total assets
- F9013 total contributions must match F130 total contributions
- All reports for same period must have consistent data

---

## File Naming Convention

Format: `{REPORT_CODE}_{NIT}_{PERIOD}.txt`

Examples:
- `F9998_900123456_2024.txt`
- `F9999_900123456_2024Q1.txt`
- `F8888_900123456_2024.txt`
- `F3_900123456_2024Q1.txt`
- `F130_900123456_2024Q1.txt`
- `F9013_900123456_2024.txt`

---

## Submission Package

Reports must be submitted as a **ZIP file** containing all required reports for the period.

**ZIP Structure**:
```
SICSES_900123456_2024Q1.zip
├── F9998_900123456_2024.txt
├── F9999_900123456_2024Q1.txt
├── F8888_900123456_2024.txt
├── F3_900123456_2024Q1.txt
├── F130_900123456_2024Q1.txt
└── validation_report.pdf (generated by our system)
```

---

## Implementation Priority (MVP)

### Phase 1 (MVP Core)
1. ✅ **F9998** - Identificación (simplest, one record per cooperative)
2. ✅ **F9999** - Base Social (core data, medium complexity)
3. ✅ **F8888** - Órganos de Dirección (governance, medium complexity)

### Phase 2 (Post-MVP)
4. ⏳ **F130** - Información Estadística (requires aggregations)
5. ⏳ **F3** - Catálogo de Cuentas (complex validations)
6. ⏳ **F9013** - Aportes Individuales (requires financial integration)

---

## Error Codes

Our validation engine will return standardized error codes:

| Code | Category | Severity | Description |
|------|----------|----------|-------------|
| E001 | FORMAT | CRITICAL | Invalid file format |
| E002 | FORMAT | CRITICAL | Missing header |
| E003 | FORMAT | CRITICAL | Invalid field count |
| E101 | VALIDATION | ERROR | Missing mandatory field |
| E102 | VALIDATION | ERROR | Invalid data type |
| E103 | VALIDATION | ERROR | Invalid date format |
| E104 | VALIDATION | ERROR | Invalid email format |
| E201 | BUSINESS | ERROR | Duplicate document number |
| E202 | BUSINESS | ERROR | Document not found in Base Social |
| E203 | BUSINESS | ERROR | Accounting equation doesn't balance |
| E301 | CONSISTENCY | WARNING | Cross-report inconsistency |
| E302 | CONSISTENCY | WARNING | Statistical outlier detected |

---

## Testing Strategy

### Unit Tests
- Test each validator independently
- Test each generator with sample data
- Test edge cases (empty fields, special characters, etc.)

### Integration Tests
- Test complete report generation flow
- Test cross-report validations
- Test ZIP package creation

### Validation Test Cases
- Valid data (should pass)
- Missing mandatory fields (should fail)
- Invalid formats (should fail)
- Duplicate records (should fail)
- Cross-report inconsistencies (should warn/fail)

### Sample Data
Maintain a set of realistic sample data for:
- Valid cooperative (passes all validations)
- Edge cases (minimum members, single branch, etc.)
- Invalid cases (for negative testing)

---

## References

- [Supersolidaria Official Site](https://www.supersolidaria.gov.co/)
- SICSES User Manual (request from Supersolidaria)
- Colombian Chart of Accounts for Cooperatives (PUC Cooperativas)
- Resolution 011 of 2021 (SICSES regulations)

---

## Notes for Developers

1. **Start Simple**: Begin with F9998 (identification) as it's the simplest
2. **Build Reusable Components**: Create abstract base classes for generators and validators
3. **Test Thoroughly**: Financial compliance is critical - test extensively
4. **Use Sample Files**: Request sample SICSES files from real cooperatives
5. **Document Assumptions**: If spec is unclear, document your assumptions
6. **Version Control**: Keep track of specification versions and changes

---

**Last Updated**: 2025-11-11
**Version**: 1.0
**Status**: Ready for Implementation
