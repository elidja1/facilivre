export const APP_CONFIG = {
  name: 'FaciLivre',
  version: '0.1.0',
  description: 'Social platform + educational ecosystem + AI learning assistant',
  defaultApiPort: 4000,
  defaultStudentPort: 3000,
  defaultAdminPort: 3001,
  defaultApiPrefix: 'api/v1',
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// -- Production Vercel URLs -----------------------------------------------
export const PRODUCTION_URLS = {
  api: 'https://facilivre-api.vercel.app',
  admin: 'https://facilivre-admin.vercel.app',
  student: 'https://student-omega-gilt.vercel.app',
} as const;

// -- Local Development URLs -----------------------------------------------
export const LOCAL_URLS = {
  api: 'http://localhost:4000',
  admin: 'http://localhost:3001',
  student: 'http://localhost:3000',
} as const;

/**
 * Returns the correct set of URLs depending on where the app is running.
 * Priority for apiUrl:
 *   1. NEXT_PUBLIC_API_URL env var  (explicit override always wins)
 *   2. VERCEL=1 or NODE_ENV=production  -> production URLs
 *   3. Fallback to localhost
 */
export function getAppUrls() {
  const isProduction =
    process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

  return {
    apiUrl:
      process.env.NEXT_PUBLIC_API_URL ||
      (isProduction ? PRODUCTION_URLS.api : LOCAL_URLS.api),

    studentUrl:
      process.env.NEXT_PUBLIC_STUDENT_URL ||
      (isProduction ? PRODUCTION_URLS.student : LOCAL_URLS.student),

    adminUrl:
      process.env.NEXT_PUBLIC_ADMIN_URL ||
      (isProduction ? PRODUCTION_URLS.admin : LOCAL_URLS.admin),

    isProduction,
  };
}

/**
 * All CORS origins the NestJS API should accept.
 * Covers both local dev and all Vercel frontends automatically.
 */
export const ALL_CORS_ORIGINS = [
  LOCAL_URLS.student,
  LOCAL_URLS.admin,
  PRODUCTION_URLS.student,
  PRODUCTION_URLS.admin,
];
