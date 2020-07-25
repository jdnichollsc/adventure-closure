import { QueryRunner } from 'typeorm'

import { DOMAIN } from '../../constants'
import { encryptPassword } from '../../auth'
import { Role, DefaultRole, User, UserStatus } from '../../models'
import { PUBLIC_TABLES } from '../utils'
import { businesses } from './businesses.json'
import { managers } from './managers.json'

export const addDefaultData = async (queryRunner: QueryRunner): Promise<void> => {

  const adminRole = new Role(DefaultRole.Admin, 'Admin')
  await queryRunner.manager.save(adminRole)
  await queryRunner.manager.save(new Role(DefaultRole.User, 'User'))

  const encryptedPassword = await encryptPassword('1111')
  const user = new User('1234')
  user.password = encryptedPassword
  user.email = 'jdnichollsc@hotmail.com'
  user.firstName = 'Juan David'
  user.lastName = 'Nicholls Cardona'
  user.address = 'XXX XX XX'
  user.phoneNumber = 'XXX-XX-XX'
  user.birthdate = new Date(1991, 7, 26).toISOString()
  user.role = adminRole
  user.termsAndConditions = true
  user.status = UserStatus.Active
  await queryRunner.manager.save(user)

  await queryRunner
    .manager
    .createQueryBuilder()
    .insert()
    .into(PUBLIC_TABLES.BUSINESS)
    .values(businesses)
    .execute()

  const newManagers = managers.map((manager, index) => ({
    ...manager,
    business: businesses[index]
  }))

  await queryRunner
    .manager
    .createQueryBuilder()
    .insert()
    .into(PUBLIC_TABLES.MANAGER)
    .values(newManagers)
    .execute()
}
