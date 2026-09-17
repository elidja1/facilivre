import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class TestDatabaseDto {
  @ApiProperty({
    example: 'postgresql://postgres.xxx:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
    description: 'Supabase PostgreSQL Connection URI',
  })
  @IsString()
  @IsNotEmpty()
  databaseUrl!: string;

  @ApiProperty({
    example: 'https://xxx.supabase.co',
    description: 'Optional Supabase Project URL',
    required: false,
  })
  @IsString()
  @IsOptional()
  supabaseUrl?: string;

  @ApiProperty({
    example: 'eyJhbGciOi...',
    description: 'Optional Supabase Anon Key',
    required: false,
  })
  @IsString()
  @IsOptional()
  supabaseAnonKey?: string;
}
