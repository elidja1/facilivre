import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { TestDatabaseDto } from './dto/test-db.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getDatabaseStatus() {
    return this.prisma.checkHealth();
  }

  async testConnection(dto: TestDatabaseDto) {
    this.logger.log(`Testing custom database connection to: ${this.prisma.maskUrl(dto.databaseUrl)}`);
    return this.prisma.testCustomConnection(dto.databaseUrl);
  }

  async saveDatabaseConfig(dto: TestDatabaseDto) {
    // 1. First test the PostgreSQL connection if provided
    let testResult;
    if (dto.databaseUrl) {
      testResult = await this.prisma.testCustomConnection(dto.databaseUrl);
      if (testResult.status !== 'connected') {
        return {
          success: false,
          message: `Échec du test de connexion PostgreSQL : ${testResult.error || 'Impossible d\'établir la connexion'}`,
          details: testResult,
        };
      }
    }

    // 2. Save all keys to root .env
    try {
      const rootEnvPath = path.resolve(process.cwd(), '../../.env');
      if (fs.existsSync(rootEnvPath)) {
        let content = fs.readFileSync(rootEnvPath, 'utf8');

        const updateKey = (key: string, val?: string) => {
          if (!val) return;
          const reg = new RegExp(`^${key}=.*$`, 'm');
          if (reg.test(content)) {
            content = content.replace(reg, `${key}="${val}"`);
          } else {
            content += `\n${key}="${val}"\n`;
          }
        };

        updateKey('DATABASE_URL', dto.databaseUrl);
        updateKey('NEXT_PUBLIC_SUPABASE_URL', dto.supabaseUrl);
        updateKey('NEXT_PUBLIC_SUPABASE_ANON_KEY', dto.supabaseAnonKey);
        updateKey('SUPABASE_SERVICE_ROLE_KEY', dto.supabaseServiceRoleKey);

        fs.writeFileSync(rootEnvPath, content, 'utf8');
        this.logger.log('Updated root .env with Supabase configuration keys');
      }
    } catch (e: any) {
      this.logger.warn(`Could not update .env file: ${e.message}`);
    }

    if (dto.databaseUrl) {
      process.env.DATABASE_URL = dto.databaseUrl;
    }
    if (dto.supabaseUrl) {
      process.env.NEXT_PUBLIC_SUPABASE_URL = dto.supabaseUrl;
    }
    if (dto.supabaseAnonKey) {
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = dto.supabaseAnonKey;
    }
    if (dto.supabaseServiceRoleKey) {
      process.env.SUPABASE_SERVICE_ROLE_KEY = dto.supabaseServiceRoleKey;
    }

    return {
      success: true,
      message: 'Toutes les clés Supabase (PostgreSQL URI, Project URL, Anon Key) ont été enregistrées avec succès !',
      details: testResult,
    };
  }
}
