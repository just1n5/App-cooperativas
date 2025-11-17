import { ApiProperty } from '@nestjs/swagger';

export class UserPayload {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  tenantId: string;

  @ApiProperty()
  tenantName: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
  })
  access_token: string;

  @ApiProperty({
    description: 'JWT refresh token',
  })
  refresh_token: string;

  @ApiProperty({
    description: 'User information',
    type: UserPayload,
  })
  user: UserPayload;
}
