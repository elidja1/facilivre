# ADR 001: Monorepo Architecture with Turborepo

## Status
Accepted

## Context
FaciLivre consists of multiple client applications (Student Web Portal, Super Admin Dashboard, and a future Mobile App) as well as a centralized NestJS backend. Maintaining independent repositories would lead to significant code duplication (types, auth contracts, API clients, UI components) and fragmented dependency management.

## Decision
We adopt a Monorepo architecture managed with **Turborepo** and npm workspaces:
- `apps/` contains deployable applications (`student`, `admin`, `api`).
- `packages/` contains shared libraries (`types`, `ui`, `api-client`, `auth`, `config`, `tsconfig`, `eslint-config`).

## Consequences
- **Pros:**
  - Single source of truth for TypeScript types and interfaces.
  - Zero-drift API client contracts.
  - Reusable UI component library shared between frontends.
  - Simplified CI/CD with Turborepo caching and parallelized task pipelines.
- **Cons:**
  - Workspace management overhead requires clear discipline around package boundaries.
