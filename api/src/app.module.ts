import { Logger, Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { AuthModule } from './auth'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { NotificationsService } from './tasks'
import { GameGateway } from './gateways'

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
    ScheduleModule.forRoot()
  ],
  controllers: [
    AuthController,
    AppController,
    UserController,
    RoleController,
  ],
  providers: [
    Logger,
    AppService,
    NotificationsService,
    GameGateway
  ],
})
export class AppModule {}
