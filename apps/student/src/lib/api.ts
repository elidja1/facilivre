import { createApiClient } from '@facilivre/api-client';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://facilivre-ad7je7o65-makouelijah2-1845.vercel.app';

export const apiClient = createApiClient({
  baseUrl: API_URL,
});
