export enum UserStatus {
  Inactive = 'INACTIVE',
  Active = 'ACTIVE'
}

export class UserBusiness {
  public id!: number

  public userId!: number

  public businessId!: number

  public inventory!: number

  public speed!: number

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

export class User {
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

  capital?: number

  score?: number

  createdAt!: Date

  updatedAt!: Date

  businesses!: UserBusiness[]

  managers?: UserManager[]
}