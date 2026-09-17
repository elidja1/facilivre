import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export interface DatabaseStatus {
  status: 'connected' | 'disconnected' | 'awaiting_configuration';
  latencyMs?: number;
  databaseUrlMasked?: string;
  tablesCount?: number;
  postgresVersion?: string;
  error?: string;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;

  async onModuleInit() {
    try {
      await this.$connect();
      this.isConnected = true;
      this.logger.log('Successfully connected to PostgreSQL / Supabase via Prisma');
    } catch (error: any) {
      this.isConnected = false;
      this.logger.warn(`PostgreSQL connection postponed or unavailable: ${error.message}`);
    }
  }

  async onModuleDestroy() {
    if (this.isConnected) {
      await this.$disconnect();
      this.logger.log('Disconnected from PostgreSQL');
    }
  }

  public maskUrl(url?: string): string {
    if (!url) return 'Non configuré';
    try {
      return url.replace(/:([^@]+)@/, ':••••••••@');
    } catch {
      return '••••••••';
    }
  }

  async checkHealth(): Promise<DatabaseStatus> {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl || dbUrl.includes('postgres:postgres@localhost') || dbUrl.includes('awaiting_configuration')) {
      return {
        status: 'awaiting_configuration',
        databaseUrlMasked: this.maskUrl(dbUrl),
        error: 'DATABASE_URL Supabase en attente de configuration.',
      };
    }

    const start = Date.now();
    try {
      const versionResult: any[] = await this.$queryRaw`SELECT version()`;
      const tablesResult: any[] = await this.$queryRaw`
        SELECT COUNT(*)::int as count 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;

      this.isConnected = true;
      return {
        status: 'connected',
        latencyMs: Date.now() - start,
        databaseUrlMasked: this.maskUrl(dbUrl),
        tablesCount: Number(tablesResult?.[0]?.count ?? 0),
        postgresVersion: versionResult?.[0]?.version ?? 'PostgreSQL / Supabase',
      };
    } catch (error: any) {
      this.isConnected = false;
      return {
        status: 'disconnected',
        databaseUrlMasked: this.maskUrl(dbUrl),
        error: error.message,
      };
    }
  }

  async testCustomConnection(customUrl: string): Promise<DatabaseStatus> {
    const tempClient = new PrismaClient({
      datasources: {
        db: {
          url: customUrl,
        },
      },
    });

    const start = Date.now();
    try {
      await tempClient.$connect();
      const versionResult: any[] = await tempClient.$queryRaw`SELECT version()`;
      const tablesResult: any[] = await tempClient.$queryRaw`
        SELECT COUNT(*)::int as count 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      await tempClient.$disconnect();

      return {
        status: 'connected',
        latencyMs: Date.now() - start,
        databaseUrlMasked: this.maskUrl(customUrl),
        tablesCount: Number(tablesResult?.[0]?.count ?? 0),
        postgresVersion: versionResult?.[0]?.version ?? 'PostgreSQL / Supabase',
      };
    } catch (error: any) {
      await tempClient.$disconnect().catch(() => {});
      return {
        status: 'disconnected',
        databaseUrlMasked: this.maskUrl(customUrl),
        error: error.message,
      };
    }
  }
}
