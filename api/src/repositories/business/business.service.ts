import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { get } from 'lodash'

import { Business, UserBusiness } from '../../models'
import { REPOSITORIES } from '../../constants'
import { getTableName } from '../utils'

@Injectable()
export class BusinessService {
  constructor(
    @Inject(REPOSITORIES.BUSINESS)
    private readonly repository: Repository<Business>,
  ) { }

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
    const businessTableName = getTableName(Business)
    const userBusinessTableName = getTableName(UserBusiness)
    const rawData = (await this.repository.query(`
      SELECT b.*, ub."lastRunAt"
      FROM ${businessTableName} as b
      LEFT OUTER JOIN ${userBusinessTableName} ub 
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

  async updateUserBusiness(
    userId: string,
    businessId: number,
    lastRunAt: Date
  ): Promise<void> {
    const userBusinessTableName = getTableName(UserBusiness)
    return this.repository.query(`
      INSERT INTO ${userBusinessTableName} ("userId", "businessId", "lastRunAt")
      VALUES ($1, $2, $3)
      ON CONFLICT("userId", "businessId") DO UPDATE
      SET "userId" = excluded."userId",
        "businessId" = excluded."businessId",
        "lastRunAt" = excluded."lastRunAt";
    `, [userId, businessId, lastRunAt])
  }
}