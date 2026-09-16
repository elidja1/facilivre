export enum UserRoleType {
  STUDENT = 'STUDENT',
  CREATOR = 'CREATOR',
  TEACHER = 'TEACHER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface IRole {
  id: string;
  name: UserRoleType;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPermission {
  id: string;
  action: string;
  subject: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRole {
  userId: string;
  roleId: string;
  assignedAt: Date;
}

export interface IRolePermission {
  roleId: string;
  permissionId: string;
  assignedAt: Date;
}
