# ADR 003: PostgreSQL and Prisma ORM

## Status
Accepted

## Context
FaciLivre deals with deeply relational data: Users, Roles, Permissions, Course Curricula, Quizzes, Follows, Comments, and Audit Logs. Strong ACID guarantees, rich indexing, and relational integrity are paramount.

## Decision
We choose **PostgreSQL** as the primary datastore, paired with **Prisma ORM**:
- Strict boundary: The database is strictly behind the NestJS API layer. Neither the Student portal nor the Super Admin portal directly queries PostgreSQL.
- Initial schema handles Identity, RBAC (Role-Based Access Control), and User management (`User`, `Role`, `Permission`, `UserRole`, `RolePermission`).
- Future domains (Content, Quizzes, Progress) will be layered progressively.

## Consequences
- Full type safety from database schema through Prisma Client to NestJS services.
- Clean database migrations and schema evolution tracking.
