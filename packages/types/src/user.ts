import { IRole } from './roles';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
  DEACTIVATED = 'DEACTIVATED',
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  bio?: string;
  status: UserStatus;
  roles?: IRole[];
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type SafeUser = Omit<IUser, 'passwordHash'>;
