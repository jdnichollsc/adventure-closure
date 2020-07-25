import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { get } from 'lodash'

import { Business, UserBusiness } from '../../models'
import { REPOSITORIES } from '../../constants'
import { PUBLIC_TABLES } from '../../database'

@Injectable()
export class BusinessService {
  constructor(
    @Inject(REPOSITORIES.BUSINESS)
    private readonly repository: Repository<Business>,
    @Inject(REPOSITORIES.USER_BUSINESS)
    private readonly repositoryUB: Repository<UserBusiness>,
  ) { }

  findOne(id: number): Promise<Business> {
    return this.repository.findOneOrFail(id)
  }

  getAll(): Promise<Business[]> {
    return this.repository.find()
  }

  insert(business: Business) {
    return this.repository.insert(business)
  }

  update(business: Business) {
    return this.repository.update(business.id, business)
  }

  delete(businessId: number) {
    return this.repository.delete(businessId)
  }

  async getIfCanRunBusiness(
    userId: string,
    businessId: number,
    currentDate: Date
  ): Promise<Business> {
    const rawData = (await this.repository.query(`
      SELECT b.*, ub."lastRunAt"
      FROM ${PUBLIC_TABLES.BUSINESS} as b
      LEFT OUTER JOIN ${PUBLIC_TABLES.USER_BUSINESS} ub 
        ON b.id = ub."businessId" AND ub."userId" = $1
      WHERE b.id = $2;
    `,
      [ userId, businessId ]
    ))
    const { lastRunAt, ...business } = get(rawData, '0', {})
    if (!lastRunAt) return business as Business
    const lastRunDate = new Date(lastRunAt)
    if (lastRunDate.getTime() + business.duration < currentDate.getTime()) {
      return business as Business
    }
    return null
  }

  async updateUserBusinessAndGetInventory(
    userId: string,
    businessId: number,
    lastRunAt: Date
  ): Promise<number> {
    const rawData = await this.repositoryUB.query(`
      INSERT INTO ${PUBLIC_TABLES.USER_BUSINESS} ("userId", "businessId", "lastRunAt")
      VALUES ($1, $2, $3)
      ON CONFLICT("userId", "businessId") DO UPDATE
      SET "userId" = excluded."userId",
        "businessId" = excluded."businessId",
        "lastRunAt" = excluded."lastRunAt"
      RETURNING inventory;
    `, [userId, businessId, lastRunAt])
    return get(rawData, '0.inventory', 1)
  }

  async getUserBusiness(
    userId: string,
    businessId: number
  ): Promise<UserBusiness> {
    return this.repositoryUB.findOneOrFail({ userId, businessId })
  }
}