import { Module } from '@nestjs/common'

import { DatabaseModule } from '../../database'
import { managerProviders } from './manager.providers'
import { ManagerService } from './manager.service'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...managerProviders,
    ManagerService,
  ],
  exports: [ManagerService]
})
export class ManagerModule {}