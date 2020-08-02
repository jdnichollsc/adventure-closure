import { IUser, UserStatus } from '../../models'

export class UserBusiness {
  public id!: number

  public userId!: number

  public businessId!: number

  public inventory!: number

  public speed!: number

  public lastRunAt!: Date

  createdAt!: Date

  updatedAt!: Date
}

export class UserManager {
  public id!: number

  public userId!: number

  public managerId!: number

  createdAt!: Date

  updatedAt!: Date
}

export class User implements IUser {
  id!: string

  firstName!: string

  lastName!: string

  birthdate?: string

  address?: string

  email!: string

  password?: string

  phoneNumber?: string

  termsAndConditions?: boolean

  status!: UserStatus

  capital!: number

  score!: number

  createdAt!: Date

  updatedAt!: Date

  businesses!: UserBusiness[]

  managers?: UserManager[]
}