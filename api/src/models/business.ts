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

  @ApiProperty({ description: 'The cost of purchasing the business' })
  @Column('int')
  investment!: number

  @ApiProperty({ description: 'The score for purchasing the business' })
  @Column('int', { default: 0 })
  score!: number

  @ApiProperty({ description: 'The income for running the business' })
  @Column('int', { default: 0 })
  income!: number

  @ApiProperty({ description: 'Time needed to gain the capital' })
  @Column('int', { default: 0 })
  duration!: number

  @OneToMany('Manager', 'business')
  managers?: Manager[]

  @OneToMany('UserBusiness', 'business')
  userBusinesses!: UserBusiness[]
}