# FaciLivre API Conventions & Health Endpoint

## 1. Base URL & Versioning
All API endpoints (except root health check) are versioned:
```
http://localhost:4000/api/v1/
```

## 2. Health Check Endpoint

### `GET /health`
Returns system uptime, environment, version, and PostgreSQL connectivity telemetry.

**Sample Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-09-17T00:30:00.000Z",
  "uptime": 120,
  "environment": "development",
  "version": "0.1.0",
  "database": {
    "status": "connected",
    "latencyMs": 4
  },
  "services": {
    "api": { "status": "healthy", "details": "NestJS core runtime active" },
    "database": { "status": "connected", "details": "Ready" }
  }
}
```

## 3. Standard API Response Wrapper
All endpoints use the standardized `ApiResponse<T>` envelope:
```json
{
  "success": true,
  "data": {},
  "timestamp": "2026-09-17T00:30:00.000Z"
}
```

## 4. Standard Error Response
```json
{
  "success": false,
  "statusCode": 400,
  "error": "BadRequestException",
  "message": ["Validation failed for field email"],
  "timestamp": "2026-09-17T00:30:00.000Z",
  "path": "/api/v1/auth/login"
}
```
