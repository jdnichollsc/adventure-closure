import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database'
import { userProviders } from './user.providers'
import { UserService } from './user.service'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    UserService,
  ],
  exports: [UserService]
})
export class UserModule {}