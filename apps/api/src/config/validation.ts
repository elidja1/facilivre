export function validateEnv(config: Record<string, unknown>) {
  const nodeEnv = (config.NODE_ENV as string) || 'development';
  if (!['development', 'production', 'test'].includes(nodeEnv)) {
    throw new Error(`Invalid NODE_ENV: ${nodeEnv}`);
  }
  return config;
}
