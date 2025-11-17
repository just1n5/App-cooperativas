import { IsEmail, IsString, MinLength, IsEnum, IsOptional, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'Cooperativa Ejemplo',
    description: 'Cooperative name',
  })
  @IsString()
  tenantName: string;

  @ApiProperty({
    example: '900123456-7',
    description: 'Cooperative NIT (Tax ID)',
  })
  @IsString()
  @Matches(/^\d{9}-\d$/, {
    message: 'NIT must be in format: 123456789-0',
  })
  tenantNit: string;

  @ApiProperty({
    example: 'admin@cooperativa-demo.com',
    description: 'Admin user email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Admin123!',
    description: 'Admin user password (min 8 characters, must include uppercase, lowercase, number)',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Admin first name',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Admin last name',
  })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    example: 'Bogotá',
    description: 'Cooperative city',
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    example: '+57 1 234 5678',
    description: 'Cooperative phone',
  })
  @IsString()
  @IsOptional()
  phone?: string;
}
