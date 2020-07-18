import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { User } from './user'
import { Manager } from './manager'

@Entity({ schema: 'public', name: 'user_manager' })
export class UserManager {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column('text')
    public userId!: number

    @Column('int')
    public managerId!: number

    @ManyToOne('User', 'managers')
    public user!: User

    @ManyToOne('Manager', 'userManagers')
    public manager!: Manager

    @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
    updatedAt: Date
}