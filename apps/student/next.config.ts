import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@facilivre/ui', '@facilivre/types', '@facilivre/api-client', '@facilivre/auth', '@facilivre/config'],
};

export default nextConfig;
