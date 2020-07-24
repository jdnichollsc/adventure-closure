import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { User } from './user'
import { Business } from './business'

@Entity({ schema: 'public', name: 'user_business' })
export class UserBusiness {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column('text')
    public userId!: string

    @Column('int')
    public businessId!: number

    @Column('int', { default: 1 })
    public inventory!: number

    @Column('int', { default: 1 })
    public speed!: number

    @Column({ type: 'timestamp without time zone', nullable: true })
    lastRunAt!: Date

    @ManyToOne('User', 'businesses')
    public user!: User

    @ManyToOne('Business', 'userBusinesses')
    public business!: Business

    @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
    createdAt!: Date

    @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
    updatedAt!: Date
}