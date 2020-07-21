import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { User } from './user'
import { Business } from './business'

@Entity({ schema: 'public', name: 'user_business' })
export class UserBusiness {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column('text')
    public userId!: number

    @Column('int')
    public businessId!: number

    @Column('int')
    public inventory!: number

    @Column('int')
    public speed!: number

    @ManyToOne('User', 'businesses')
    public user!: User

    @ManyToOne('Business', 'userBusinesses')
    public business!: Business

    @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
    createdAt!: Date

    @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
    updatedAt!: Date
}