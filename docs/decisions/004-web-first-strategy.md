# ADR 004: Web-First Strategy and API-First Mobile Readiness

## Status
Accepted

## Context
FaciLivre will eventually support mobile applications (e.g. React Native). However, rapid initial product validation, accessibility across laptops and desktops, and creator/admin workflows necessitate a web-first strategy.

## Decision
- Develop the **Student Web App** (`apps/student`) and **Super Admin Dashboard** (`apps/admin`) using Next.js App Router and Tailwind CSS.
- Enforce an **API-First Architecture**: all frontend functionality communicates with the NestJS API via standard JSON REST endpoints and `@facilivre/api-client`.
- When the Mobile App is introduced in later phases, it will consume the exact same backend endpoints and contracts.

## Consequences
- Business logic is never duplicated in frontend codebases.
- Seamless parity when expanding to mobile and tablet platforms.
