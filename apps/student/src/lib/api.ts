import { createApiClient } from '@facilivre/api-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const apiClient = createApiClient({
  baseUrl: API_URL,
});
