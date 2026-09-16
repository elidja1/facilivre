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
