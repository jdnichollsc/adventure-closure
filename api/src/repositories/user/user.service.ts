import { Injectable, Inject } from '@nestjs/common'
import { Repository, QueryRunner } from 'typeorm'
import { get } from 'lodash'

import { REPOSITORIES } from '../../constants'
import { IUser } from '../../types'
import { User, Business } from '../../models'
import { PUBLIC_TABLES } from '../../database'
import { getParamValues, trimStringProps, stringToJSON } from '../utils'

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USER)
    private readonly repository: Repository<User>
  ) { }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  preloadUser(user: IUser) {
    user.role = stringToJSON(user.role)
    const roleId = get(user, 'role.id', user['roleId']) as number
    return {
      ...trimStringProps(user),
      roleId,
    } as User
  }

  async findAll(): Promise<User[]> {
    return await this.repository.query(
      `SELECT * FROM ${PUBLIC_TABLES.USER};`
    )
  }

  async findByRoleIds(
    roles: number[],
    search: string,
    offset: number,
    limit: number
  ): Promise<User[]> {
    return this.repository.query(
      `SELECT u.*,
        row_to_json(r) as "role"
      FROM ${PUBLIC_TABLES.USER} u
      LEFT OUTER JOIN role r ON u."roleId" = r.id
      WHERE u."roleId" IN (${roles.toString()}) AND (
        LOWER(u."id") LIKE LOWER($1)
        OR LOWER(u."email") LIKE LOWER($1)
        OR LOWER(u."firstName") LIKE LOWER($1)
        OR LOWER(u."lastName") LIKE LOWER($1)
      )
      LIMIT $2 OFFSET $3;`,
      [`%${search}%`, limit, offset]
    )
  }

  async findByEmail(email: string): Promise<User> {
    const rawData = await this.repository.query(
      `SELECT * FROM ${PUBLIC_TABLES.USER}
      WHERE email = $1;`,
      [ email ]
    )
    return rawData[0]
  }

  async findByDocument(document: string): Promise<User> {
    const rawData = await this.repository.query(
      `SELECT
          u.*,
          row_to_json(r) as role
        FROM ${PUBLIC_TABLES.USER} u
        LEFT OUTER JOIN role r ON u."roleId" = r.id
        WHERE u.id=$1;`,
      [ document ]
    )
    return rawData?.[0]
  }

  async addUser(
    user: IUser,
    queryRunner?: QueryRunner
  ): Promise<void> {
    const currentDate = new Date().toISOString()
    const newUser = this.preloadUser(user)
    const parameters = [
      newUser.id,
      newUser.email,
      newUser.firstName,
      newUser.lastName,
      newUser.password,
      newUser.roleId,
      newUser.birthdate,
      newUser.address,
      newUser.phoneNumber,
      newUser.termsAndConditions,
      newUser.status,
      currentDate,
      currentDate
    ]
    await (queryRunner || this.repository).query(
      `INSERT INTO ${PUBLIC_TABLES.USER} (
        "id",
        "email",
        "firstName",
        "lastName",
        "password",
        "roleId",
        "birthdate",
        "address",
        "phoneNumber",
        "termsAndConditions",
        "status",
        "createdAt",
        "updatedAt"
      )
      VALUES (${getParamValues(parameters.length)});`,
      parameters
    )
  }

  async updateUser(user: IUser): Promise<User> {
    const updatedAt = new Date().toISOString()
    const newUser = this.preloadUser(user)
    await this.repository.query(
      `UPDATE ${PUBLIC_TABLES.USER}
      SET "email" = $2,
        "firstName" = $3,
        "lastName" = $4,
        "roleId" = $5,
        "birthdate" = $6,
        "address" = $7,
        "phoneNumber" = $8,
        "termsAndConditions" = $9,
        "status" = $10,
        "updatedAt" = $11
      WHERE id = $1;`, [
        newUser.id,
        newUser.email,
        newUser.firstName,
        newUser.lastName,
        newUser.roleId,
        newUser.birthdate,
        newUser.address,
        newUser.phoneNumber,
        newUser.termsAndConditions,
        newUser.status,
        updatedAt
      ]
    )
    return newUser
  }

  delete(id: string): Promise<void> {
    return this.repository.query(
      `DELETE FROM ${PUBLIC_TABLES.USER}
      WHERE id = $1;`,
      [ id ]
    )
  }

  async updatePassword(
    document: string,
    newPassword: string
  ): Promise<void> {
    const updatedAt = new Date().toISOString()
    await this.repository.query(
      `UPDATE ${PUBLIC_TABLES.USER}
      SET "password" = $2,
        "updatedAt" = $3
      WHERE id = $1;`, [
        document,
        newPassword,
        updatedAt
      ]
    )
  }

  async countByRoleId(roleId: number = null): Promise<number> {
    const rawData = await this.repository.query(
      `SELECT COUNT(*) AS count
      FROM ${PUBLIC_TABLES.USER}
      WHERE "roleId" = $1;`,
      [roleId]
    )
    return Number(rawData[0].count)
  }

  async addUsers(users: IUser[]): Promise<void> {
    const queryRunner = this.repository.manager.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      for (const user of users) {
        await this.addUser(user, queryRunner)
      }
      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async incrementAndGetCapital(
    userId: string,
    addToCapital: number
  ): Promise<number> {
    const rawData = await this.repository.query(`
      UPDATE ${PUBLIC_TABLES.USER}
        SET capital = capital + $2
      WHERE id = $1
      RETURNING capital;
    `, [ userId, addToCapital ])
    return get(rawData, '0.0.capital', 0)
  }

  async reduceCapitalAndUpdateBusiness(
    userId: string,
    business: Business,
  ): Promise<number | null> {
    const { connection } = this.repository.manager
    const queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction('READ COMMITTED')
    try {
      const rawData = await queryRunner.query(`
        UPDATE ${PUBLIC_TABLES.USER}
          SET capital = capital - $2
        WHERE id = $1
        RETURNING capital;
      `, [ userId, business.investment ])
      await queryRunner.query(`
        INSERT INTO ${PUBLIC_TABLES.USER_BUSINESS} ("userId", "businessId")
        VALUES ($1, $2)
        ON CONFLICT("userId", "businessId") DO UPDATE
        SET "userId" = excluded."userId",
          "businessId" = excluded."businessId",
          inventory = ${PUBLIC_TABLES.USER_BUSINESS}.inventory + 1;
      `, [ userId, business.id ])
      await queryRunner.commitTransaction()
      const newCapital = get(rawData, '0.0.capital', 0)
      return newCapital
    } catch {
      await queryRunner.rollbackTransaction()
      return null
    } finally {
      await queryRunner.release()
    }
  }
}