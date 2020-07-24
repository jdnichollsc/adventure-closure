import { Connection, Repository } from 'typeorm'

import { Business, UserBusiness } from '../../models'
import { DATABASE_CONNECTION, REPOSITORIES } from '../../constants'

export const businessProviders = [
  {
    provide: REPOSITORIES.BUSINESS,
    useFactory: (connection: Connection): Repository<Business> => connection.getRepository(Business),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: REPOSITORIES.USER_BUSINESS,
    useFactory: (connection: Connection): Repository<UserBusiness> => connection.getRepository(UserBusiness),
    inject: [DATABASE_CONNECTION],
  }
]