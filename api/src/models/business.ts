import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { Manager } from './manager'
import { UserBusiness } from './userBusiness'

@Entity({ schema: 'public' })
export class Business {

  constructor(id?: number) {
    this.id = id
  }

  @ApiProperty({ description: 'Business identifier', required: false })
  @PrimaryGeneratedColumn()
  id!: number

  @ApiProperty({ description: 'Business name' })
  @IsNotEmpty({
    message: 'The name is required'
  })
  @Column({ length: 50, type: 'varchar' })
  name!: string

  @ApiProperty({ description: 'The url of the image' })
  @IsNotEmpty({
    message: 'The url of the image is required'
  })
  @Column({ length: 50, type: 'varchar' })
  imageUrl!: string

  @ApiProperty({ description: 'The score to obtain for purchase this business' })
  @Column('int', { default: 0 })
  score!: number

  @ApiProperty({ description: 'The income to obtain from the business' })
  @Column('int', { default: 0 })
  income!: number

  @ApiProperty({ description: 'Time needed to earn an income' })
  @Column('int', { default: 0 })
  duration!: number

  @OneToMany('Manager', 'business')
  managers?: Manager[]

  @OneToMany('UserBusiness', 'business')
  userBusinesses!: UserBusiness[]
}