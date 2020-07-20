import { IRole } from './role'

export type UserStatus = 'INACTIVE' | 'ACTIVE'

/**
 * An interface to extend the user with different models
 * depending of the role
 */
export interface IUser {
  id: string
  firstName: string
  lastName: string
  status: UserStatus
  email: string
  role: IRole
  createdAt: Date
  updatedAt: Date
}