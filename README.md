# FaciLivre

> **Social platform + educational ecosystem + AI learning assistant + academic productivity system.**

FaciLivre is a scalable social-learning platform designed around short educational content, student interaction, study activities, creators/teachers, AI-assisted learning, live study rooms, quizzes, and analytics.

---

## 🏗️ Architecture Overview

FaciLivre is organized as a Turborepo monorepo with clean separation between client portals, modular backend API, and shared TypeScript packages:

```text
facilivre/
│
├── apps/
│   ├── student/          # Student Portal (Next.js 15, React 19, Tailwind CSS) → http://localhost:3000
│   ├── admin/            # Super Admin Control Center (Next.js 15, Tailwind CSS) → http://localhost:3001
│   └── api/              # Core API Modular Monolith (NestJS 11, PostgreSQL/Prisma) → http://localhost:4000
│
├── packages/
│   ├── types/            # Shared domain types, DTOs, entity definitions & enums
│   ├── ui/               # Reusable UI component library (Tailwind CSS)
│   ├── api-client/       # Typed HTTP client for frontend-to-backend communication
│   ├── auth/             # Shared RBAC roles, permission constants & auth contracts
│   ├── config/           # Shared environment & platform constants
│   ├── tsconfig/         # Shared TypeScript compiler presets
│   └── eslint-config/    # Shared linting configuration
│
├── docs/                 # Architectural decision records, API specs & guides
│   ├── architecture/
│   ├── api/
│   ├── database/
│   ├── decisions/
│   └── development/
│
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: `v18+` (LTS recommended, tested on `v24.x`)
- **npm**: `v9+`
- **PostgreSQL**: (Optional for Phase 0 health checks, required for full DB persistence)

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 3. Run Development Servers

Start all 3 applications simultaneously via Turborepo:

```bash
npm run dev
```

The services will be available at:
* 🎓 **Student App**: [http://localhost:3000](http://localhost:3000)
* 🛡️ **Super Admin**: [http://localhost:3001](http://localhost:3001)
* ⚡ **NestJS API**: [http://localhost:4000](http://localhost:4000) (Health: [http://localhost:4000/health](http://localhost:4000/health))

---

## 📦 Available Scripts

* `npm run dev` — Run all applications in watch mode concurrently.
* `npm run build` — Build all packages and applications.
* `npm run lint` — Lint all packages and applications.
* `npm run typecheck` — Type check all TypeScript workspaces.
* `npm run format` — Format all codebase files with Prettier.

---

## 📜 Documentation

- [Architecture Decisions (ADRs)](./docs/decisions/)
- [System Architecture](./docs/architecture/system-overview.md)
- [Database & Identity Schema](./docs/database/identity-schema.md)
- [API Conventions & Health](./docs/api/health-and-conventions.md)
- [Development Setup Guide](./docs/development/setup-guide.md)

---

## 📄 License

MIT © 2026 FaciLivre
