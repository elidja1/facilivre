export type DatabaseStatus = 'connected' | 'disconnected' | 'awaiting_configuration';

export interface IHealthStatus {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  database: {
    status: DatabaseStatus;
    latencyMs?: number;
    error?: string;
  };
  services?: Record<string, { status: string; details?: string }>;
}
