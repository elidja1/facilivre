# FaciLivre System Architecture Overview

## 1. Monorepo Topology

```mermaid
graph TD
    subgraph Client Applications
        StudentApp["Student Web App (Next.js :3000)"]
        AdminApp["Super Admin App (Next.js :3001)"]
        MobileApp["Future Mobile App (React Native)"]
    end

    subgraph Shared Packages
        PkgTypes["@facilivre/types"]
        PkgUI["@facilivre/ui"]
        PkgClient["@facilivre/api-client"]
        PkgAuth["@facilivre/auth"]
        PkgConfig["@facilivre/config"]
    end

    subgraph Backend Core
        NestAPI["NestJS Modular Monolith (:4000)"]
    end

    subgraph Persistence Layer
        PostgresDB[("PostgreSQL")]
    end

    StudentApp --> PkgTypes
    StudentApp --> PkgUI
    StudentApp --> PkgClient
    StudentApp --> PkgAuth

    AdminApp --> PkgTypes
    AdminApp --> PkgUI
    AdminApp --> PkgClient
    AdminApp --> PkgAuth

    MobileApp -.-> PkgTypes
    MobileApp -.-> PkgClient
    MobileApp -.-> PkgAuth

    StudentApp -->|HTTP REST / SSE| NestAPI
    AdminApp -->|HTTP REST / Admin APIs| NestAPI
    MobileApp -.->|HTTP REST| NestAPI

    NestAPI --> PkgTypes
    NestAPI --> PkgAuth
    NestAPI --> PkgConfig
    NestAPI -->|Prisma Client| PostgresDB
```

## 2. Port Allocation
- **Student Portal**: `http://localhost:3000`
- **Super Admin Dashboard**: `http://localhost:3001`
- **NestJS API Core**: `http://localhost:4000`

## 3. Core Principles
1. **Modular Monolith**: Clean boundaries between domain modules (`auth`, `users`, `content`, `feed`, `quizzes`, `study`, `admin`) to simplify early-stage development while ensuring future service extractability.
2. **API Isolation**: Zero direct frontend connection to PostgreSQL. All persistence operations are routed through NestJS controllers, services, and repositories.
3. **Bandwidth Optimization**: Lightweight payload structures, modular tree-shaking, and lazy loading strategies designed for low-bandwidth environments.
