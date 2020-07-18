import { Module } from '@nestjs/common'

import { DatabaseModule } from '../../database'
import { businessProviders } from './business.providers'
import { BusinessService } from './business.service'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...businessProviders,
    BusinessService,
  ],
  exports: [BusinessService]
})
export class BusinessModule {}