import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Business } from '../../models'
import { REPOSITORIES } from '../../constants'

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
}