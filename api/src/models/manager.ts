import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { Business } from './business'
import { UserManager } from './userManager'

@Entity({ schema: 'public' })
export class Manager {

  constructor(id?: number) {
    this.id = id
  }

  @ApiProperty({ description: 'Id of the manager', required: false })
  @PrimaryGeneratedColumn()
  id!: number

  @ApiProperty({ description: 'Name of the manager' })
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

  @ApiProperty({ description: 'The cost of hiring the manager' })
  @Column('int')
  investment!: number

  @ApiProperty({ description: 'Business associated with the manager' })
  @ManyToOne(() => Business, business => business.managers)
  business!: Business

  @OneToMany(() => UserManager, userManager => userManager.manager)
  userManagers!: UserManager[]
}