import { Connection, Repository } from 'typeorm'

import { Business } from '../../models'
import { DATABASE_CONNECTION, REPOSITORIES } from '../../constants'

export const businessProviders = [
  {
    provide: REPOSITORIES.BUSINESS,
    useFactory: (connection: Connection): Repository<Business> => connection.getRepository(Business),
    inject: [DATABASE_CONNECTION],
  }
]