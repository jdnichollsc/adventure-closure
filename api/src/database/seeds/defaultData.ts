import { QueryRunner } from 'typeorm'

import { DOMAIN } from '../../constants'
import { encryptPassword } from '../../auth'
import { Role, DefaultRole, User, UserStatus, Manager, Business } from '../../models'
import { PUBLIC_TABLES } from '../utils'
import { businesses } from './businesses.json'
import { managers } from './managers.json'

export const addDefaultData = async (queryRunner: QueryRunner) => {

  const adminRole = new Role(DefaultRole.Admin, 'Admin')
  await queryRunner.manager.save(adminRole)
  await queryRunner.manager.save(new Role(DefaultRole.User, 'User'))

  const encryptedPassword = await encryptPassword('1111')
  const currentdate = new Date()
  const user = new User('1234')
  user.password = encryptedPassword
  user.email = 'jdnichollsc@hotmail.com'
  user.firstName = 'Juan David'
  user.lastName = 'Nicholls Cardona'
  user.address = 'XXX XX XX'
  user.phoneNumber = 'XXX-XX-XX'
  user.birthdate = currentdate.toISOString()
  user.role = adminRole
  user.termsAndConditions = true
  user.status = UserStatus.Active
  user.createdAt = currentdate
  user.updatedAt = currentdate
  await queryRunner.manager.save(user)

  const newBusinesses = (businesses as Business[]).map(business => ({
    ...business,
    imageUrl: DOMAIN + business.imageUrl
  }))

  await queryRunner
    .manager
    .createQueryBuilder()
    .insert()
    .into(PUBLIC_TABLES.BUSINESS)
    .values(newBusinesses)
    .execute()

  const newManagers = (managers as Manager[]).map((manager, index) => ({
    ...manager,
    imageUrl: DOMAIN + manager.imageUrl,
    business: newBusinesses[index]
  }))

  await queryRunner
    .manager
    .createQueryBuilder()
    .insert()
    .into(PUBLIC_TABLES.MANAGER)
    .values(newManagers)
    .execute()
}
