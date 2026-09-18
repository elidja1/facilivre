import { createApiClient } from '@facilivre/api-client';

/**
 * API base URL — resolved via environment variables.
 *
 * LOCAL:       http://localhost:4000          (from .env NEXT_PUBLIC_API_URL)
 * PRODUCTION:  https://facilivre-api.vercel.app  (set in Vercel Dashboard)
 *
 * Next.js automatically injects NEXT_PUBLIC_* vars at build time.
 * On Vercel, set NEXT_PUBLIC_API_URL = https://facilivre-api.vercel.app
 */
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://facilivre-api.vercel.app';

export const apiClient = createApiClient({
  baseUrl: API_URL,
});
