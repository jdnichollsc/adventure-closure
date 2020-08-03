export enum UserStatus {
  Inactive = 'INACTIVE',
  Active = 'ACTIVE'
}

export interface IUser {
  id: string
  firstName: string
  lastName: string
  birthdate?: string
  address?: string
  email: string
  password?: string
  phoneNumber?: string
  termsAndConditions?: boolean
  status: UserStatus
  capital: number
  score: number
  createdAt: Date
  updatedAt: Date
}
