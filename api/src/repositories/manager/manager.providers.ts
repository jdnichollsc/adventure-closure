import { Connection, Repository } from 'typeorm'

import { Manager } from '../../models'
import { DATABASE_CONNECTION, REPOSITORIES } from '../../constants'

export const managerProviders = [
  {
    provide: REPOSITORIES.MANAGER,
    useFactory: (connection: Connection): Repository<Manager> => connection.getRepository(Manager),
    inject: [DATABASE_CONNECTION],
  }
]