import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'superadmin',
    description: 'Email or username (e.g. superadmin)',
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    example: 'superadmin',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
