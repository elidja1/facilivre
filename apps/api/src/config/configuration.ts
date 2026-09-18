export interface AppConfig {
  nodeEnv: string;
  port: number;
  host: string;
  prefix: string;
  corsOrigins: string[];
  databaseUrl: string;
  jwt: {
    accessSecret: string;
    refreshSecret: string;
    accessExpiresIn: string;
    refreshExpiresIn: string;
  };
}

// All origins that are always allowed regardless of env var.
// Covers local dev + all production Vercel frontends.
const ALWAYS_ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://student-omega-gilt.vercel.app',
  'https://facilivre-admin.vercel.app',
];

export default (): AppConfig => {
  // Merge env-var origins with the always-allowed list
  const envOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
    : [];

  const corsOrigins = Array.from(
    new Set([...ALWAYS_ALLOWED_ORIGINS, ...envOrigins])
  );

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.API_PORT || '4000', 10),
    host: process.env.API_HOST || '0.0.0.0',
    prefix: process.env.API_PREFIX || 'api/v1',
    corsOrigins,
    databaseUrl: process.env.DATABASE_URL || '',
    jwt: {
      accessSecret:
        process.env.JWT_ACCESS_SECRET || 'dev_secret_key_change_me_in_prod',
      refreshSecret:
        process.env.JWT_REFRESH_SECRET ||
        'dev_refresh_secret_key_change_me_in_prod',
      accessExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
  };
};
