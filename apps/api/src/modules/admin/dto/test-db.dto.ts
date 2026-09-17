import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class TestDatabaseDto {
  @ApiProperty({
    example: 'postgresql://postgres.xxx:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
    description: 'Supabase PostgreSQL Connection URI (nécessaire pour Prisma & Migrations)',
  })
  @IsString()
  @IsNotEmpty()
  databaseUrl!: string;

  @ApiProperty({
    example: 'https://xxxxxxxx.supabase.co',
    description: 'Supabase Project URL (pour API, Auth et Storage)',
    required: false,
  })
  @IsString()
  @IsOptional()
  supabaseUrl?: string;

  @ApiProperty({
    example: 'eyJhbGciOi...',
    description: 'Supabase Public Anon Key',
    required: false,
  })
  @IsString()
  @IsOptional()
  supabaseAnonKey?: string;

  @ApiProperty({
    example: 'eyJhbGciOi...',
    description: 'Supabase Secret Service Role Key (Backend uniquement)',
    required: false,
  })
  @IsString()
  @IsOptional()
  supabaseServiceRoleKey?: string;
}
