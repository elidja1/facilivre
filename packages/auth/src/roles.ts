import { UserRoleType } from '@facilivre/types';

export const ROLE_HIERARCHY: Record<UserRoleType, number> = {
  [UserRoleType.STUDENT]: 10,
  [UserRoleType.CREATOR]: 20,
  [UserRoleType.TEACHER]: 30,
  [UserRoleType.MODERATOR]: 50,
  [UserRoleType.ADMIN]: 80,
  [UserRoleType.SUPER_ADMIN]: 100,
};

export function hasMinimumRole(userRole: UserRoleType, requiredRole: UserRoleType): boolean {
  return (ROLE_HIERARCHY[userRole] ?? 0) >= (ROLE_HIERARCHY[requiredRole] ?? 0);
}

export function hasAnyRole(userRoles: UserRoleType[], targetRoles: UserRoleType[]): boolean {
  return userRoles.some((role) => targetRoles.includes(role));
}

export function isStaffOrAdmin(role: UserRoleType): boolean {
  return [UserRoleType.MODERATOR, UserRoleType.ADMIN, UserRoleType.SUPER_ADMIN].includes(role);
}
