import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';
import { IHealthStatus } from '@facilivre/types';

@Injectable()
export class HealthService {
  private readonly startTime = Date.now();

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  async check(): Promise<IHealthStatus> {
    const dbHealth = await this.prisma.checkHealth();
    const isDegraded = dbHealth.status === 'disconnected';

    return {
      status: isDegraded ? 'degraded' : 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      environment: this.configService.get<string>('nodeEnv') || 'development',
      version: '0.1.0',
      database: dbHealth,
      services: {
        api: { status: 'healthy', details: 'NestJS core runtime active' },
        database: {
          status: dbHealth.status,
          details: dbHealth.error || (dbHealth.latencyMs !== undefined ? `${dbHealth.latencyMs}ms` : 'Ready'),
        },
      },
    };
  }
}
