export const PermissionActions = {
  MANAGE: 'manage',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  MODERATE: 'moderate',
  PUBLISH: 'publish',
} as const;

export const PermissionSubjects = {
  ALL: 'all',
  USER: 'user',
  CONTENT: 'content',
  POST: 'post',
  VIDEO: 'video',
  COMMENT: 'comment',
  QUIZ: 'quiz',
  STUDY_ROOM: 'study_room',
  REPORT: 'report',
  SETTINGS: 'settings',
  ANALYTICS: 'analytics',
} as const;

export type PermissionAction = typeof PermissionActions[keyof typeof PermissionActions];
export type PermissionSubject = typeof PermissionSubjects[keyof typeof PermissionSubjects];
