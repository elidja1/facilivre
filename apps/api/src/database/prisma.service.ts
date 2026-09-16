import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;

  async onModuleInit() {
    try {
      await this.$connect();
      this.isConnected = true;
      this.logger.log('Successfully connected to PostgreSQL via Prisma');
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

  async checkHealth(): Promise<{ status: 'connected' | 'disconnected' | 'awaiting_configuration'; latencyMs?: number; error?: string }> {
    if (!process.env.DATABASE_URL) {
      return { status: 'awaiting_configuration' };
    }
    const start = Date.now();
    try {
      await this.$queryRaw`SELECT 1`;
      this.isConnected = true;
      return {
        status: 'connected',
        latencyMs: Date.now() - start,
      };
    } catch (error: any) {
      this.isConnected = false;
      return {
        status: 'disconnected',
        error: error.message,
      };
    }
  }
}
