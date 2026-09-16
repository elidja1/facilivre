# FaciLivre Development Setup Guide

## 1. Prerequisites
- **Node.js**: `v18+` (Tested on `v24.x LTS`)
- **npm**: `v9+`
- **PostgreSQL**: (Required for persistent identity storage; health check functions in ready/awaiting state without it)

## 2. Installation & Bootstrap

1. Install dependencies from root:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   ```

3. Generate Prisma client:
   ```bash
   npm run prisma:generate --workspace=@facilivre/api
   ```

4. Start all applications concurrently:
   ```bash
   npm run dev
   ```

## 3. Workspaces & Ports

| Application / Package | Directory | Dev URL / Output |
| :--- | :--- | :--- |
| **Student Web App** | `apps/student` | `http://localhost:3000` |
| **Super Admin** | `apps/admin` | `http://localhost:3001` |
| **Backend API** | `apps/api` | `http://localhost:4000` |
| **Types Package** | `packages/types` | Compiled types / DTOs |
| **UI Components** | `packages/ui` | Shared React/Tailwind UI |
| **API Client** | `packages/api-client` | Typed client wrapper |
| **Auth Package** | `packages/auth` | RBAC & constants |
