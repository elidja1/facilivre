# ADR 002: Modular Monolith NestJS Backend

## Status
Accepted

## Context
FaciLivre requires strong domain segregation (Authentication, Users, Content, Social Interactions, Study Rooms, Quizzes, Moderation, and AI integration), but early adoption of microservices introduces excessive networking, latency, deployment complexity, and synchronization overhead.

## Decision
We adopt **NestJS** structured as a **Modular Monolith**:
- Business logic is partitioned into dedicated feature modules (`AuthModule`, `UsersModule`, `ContentModule`, `FeedModule`, `StudyModule`, `AdminModule`).
- Clear dependency injection and internal interfaces allow clean boundaries.
- Should scale demand it in the future, individual modules can be extracted into standalone microservices with minimal refactoring.

## Consequences
- Single codebase to test, deploy, and monitor.
- Transactional integrity preserved with ease.
- High developer productivity without distributed system pitfalls.
