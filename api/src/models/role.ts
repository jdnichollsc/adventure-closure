import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

import { IRole } from '../types'
import { User } from './user'

@Entity({ schema: 'public' })
export class Role implements IRole {

  constructor(id?: number, name?: string) {
    this.id = id
    this.name = name
  }

  @ApiProperty({ description: 'Id of the role', required: false })
  @PrimaryGeneratedColumn()
  id!: number

  @ApiProperty({ description: 'Name of the role' })
  @IsNotEmpty({
    message: 'The name is required'
  })
  @Column({ length: 50, type: 'varchar' })
  name!: string

  @OneToMany('User', 'role')
  users?: User[]
}

export enum DefaultRole {
  User = 1,
  Admin = 2
}