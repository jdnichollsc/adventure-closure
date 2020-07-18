import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Manager } from '../../models'
import { REPOSITORIES } from '../../constants'

@Injectable()
export class ManagerService {
  constructor(
    @Inject(REPOSITORIES.MANAGER)
    private readonly repository: Repository<Manager>,
  ) { }

  getAll(): Promise<Manager[]> {
    return this.repository.find()
  }

  insert(manager: Manager) {
    return this.repository.insert(manager)
  }

  update(manager: Manager) {
    return this.repository.update(manager.id, manager)
  }

  delete(managerId: number) {
    return this.repository.delete(managerId)
  }
}