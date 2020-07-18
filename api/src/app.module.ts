import { Logger, Module } from '@nestjs/common'

import { AuthModule } from './auth'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import {
  UserModule,
  RoleModule,
} from './repositories'
import {
  AuthController,
  UserController,
  RoleController,
} from './controllers'

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
  ],
  controllers: [
    AuthController,
    AppController,
    UserController,
    RoleController,
  ],
  providers: [Logger, AppService],
})
export class AppModule {}
