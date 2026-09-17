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
    // First test it
    const testResult = await this.prisma.testCustomConnection(dto.databaseUrl);
    if (testResult.status !== 'connected') {
      return {
        success: false,
        message: `Échec de la connexion à Supabase: ${testResult.error || 'Impossible d\'établir la connexion'}`,
        details: testResult,
      };
    }

    // Save to local environment files if present
    try {
      const rootEnvPath = path.resolve(process.cwd(), '../../.env');
      if (fs.existsSync(rootEnvPath)) {
        let content = fs.readFileSync(rootEnvPath, 'utf8');
        if (content.includes('DATABASE_URL=')) {
          content = content.replace(/DATABASE_URL=.*/, `DATABASE_URL="${dto.databaseUrl}"`);
        } else {
          content += `\nDATABASE_URL="${dto.databaseUrl}"\n`;
        }
        fs.writeFileSync(rootEnvPath, content, 'utf8');
        this.logger.log('Updated root .env with new DATABASE_URL');
      }
    } catch (e: any) {
      this.logger.warn(`Could not update .env file: ${e.message}`);
    }

    process.env.DATABASE_URL = dto.databaseUrl;

    return {
      success: true,
      message: 'Connexion Supabase validée et enregistrée avec succès !',
      details: testResult,
    };
  }
}
