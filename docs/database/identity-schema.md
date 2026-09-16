# FaciLivre Database & Identity Schema

## 1. Conceptual ERD

```mermaid
erDiagram
    User ||--o{ UserRole : has
    Role ||--o{ UserRole : assigned_to
    Role ||--o{ RolePermission : contains
    Permission ||--o{ RolePermission : granted_in

    User {
        uuid id PK
        string email UK
        string username UK
        string passwordHash
        string firstName
        string lastName
        string avatarUrl
        string bio
        enum status
        boolean emailVerified
        datetime createdAt
        datetime updatedAt
    }

    Role {
        uuid id PK
        enum name UK
        string description
        datetime createdAt
        datetime updatedAt
    }

    Permission {
        uuid id PK
        string action
        string subject
        string description
        datetime createdAt
        datetime updatedAt
    }

    UserRole {
        uuid userId FK
        uuid roleId FK
        datetime assignedAt
    }

    RolePermission {
        uuid roleId FK
        uuid permissionId FK
        datetime assignedAt
    }
```

## 2. Default Roles
- `STUDENT`: Default platform user with access to consume content, participate in study rooms, take quizzes, like/comment/follow.
- `CREATOR`: Verified student or educator authorized to publish micro-learning videos and educational posts.
- `TEACHER`: Verified academic instructor with course curation and quiz authoring privileges.
- `MODERATOR`: Platform safety operator with report triage and content moderation capabilities.
- `ADMIN`: Administrator managing platform entities, categories, and creators.
- `SUPER_ADMIN`: Full system governance, settings, user role elevation, and audit log inspection.
