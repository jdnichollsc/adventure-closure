import {
  Entity,
  Index,
  Column,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

import { Role } from './role'
import { UserBusiness } from './userBusiness'
import { UserManager } from './userManager'

export enum UserStatus {
  Inactive = 'INACTIVE',
  Active = 'ACTIVE'
}

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
  role: Role
  createdAt: Date
  updatedAt: Date
}

@Entity({ schema: 'public' })
export class User implements IUser {
  constructor (id?: string) {
    this.id = id
  }

  @ApiProperty({ description: 'Id of the user' })
  @PrimaryColumn('text')
  @IsNotEmpty({
    message: 'Identification number is required'
  })
  id!: string

  @ApiProperty({ description: 'First name' })
  @Column('varchar', { length: 50, name: 'firstName' })
  @IsNotEmpty({
    message: 'First name is required'
  })
  firstName!: string

  @ApiProperty({ description: 'Last name' })
  @Column('varchar', { length: 50, name: 'lastName' })
  @IsNotEmpty({
    message: 'Last name is required'
  })
  lastName!: string

  @ApiProperty({ description: 'Birthday' })
  @Column({ type: 'timestamp without time zone' })
  @IsNotEmpty({
    message: 'Date of birth is required'
  })
  birthdate?: string

  @ApiProperty({ description: 'Address' })
  @Column('varchar', { length: 50, nullable: true })
  @IsNotEmpty({
    message: 'Address is required'
  })
  address?: string

  @ApiProperty({ description: 'Email' })
  @Column('varchar', { length: 50 })
  @Index('IDX_USER_EMAIL', { unique: true })
  @IsEmail(null, {
    message: 'The email is not valid'
  })
  @IsNotEmpty({
    message: 'Email is required'
  })
  email!: string

  @ApiProperty({ description: 'Password' })
  @Column('text', { nullable: true })
  password?: string

  @ApiProperty({ description: 'Phone number' })
  @Column('varchar', { length: 20, nullable: true })
  phoneNumber?: string

  @ApiProperty({ description: 'Authorize terms and conditions' })
  @Column('boolean', { default: false })
  termsAndConditions?: boolean

  @ApiProperty({ description: 'Status' })
  @Column('text', { default: UserStatus.Active })
  @IsNotEmpty({
    message: 'The user status is required'
  })
  status!: UserStatus

  @ApiProperty({ description: 'Money obtained from business sales' })
  @Column('int', { default: 0 })
  capital?: number

  @ApiProperty({ description: 'A value to determine the level of the player' })
  @Column('int', { default: 0 })
  score?: number

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
  updatedAt!: Date

  @Column('int')
  roleId!: number

  @ApiProperty({ description: 'Role associated with the user', example: null })
  @ManyToOne('Role', 'users')
  role!: Role

  @ApiProperty({ description: 'Business associated with the user' })
  @OneToMany('UserBusiness', 'user')
  businesses!: UserBusiness[]

  @ApiProperty({ description: 'Managers associated with the user' })
  @OneToMany('UserManager', 'user')
  managers?: UserManager[]
}

export class UserPasswords {
  @ApiProperty({ description: 'User password' })
  @IsNotEmpty({
    message: 'The password is required'
  })
  password!: string

  @ApiProperty({ description: 'Repeat user password' })
  @IsNotEmpty({
    message: 'Repeat password is required'
  })
  repeatPassword!: string
}