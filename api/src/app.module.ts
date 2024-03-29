import { Logger, Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { AuthModule } from './auth'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { TasksService } from './tasks'
import { GameGateway } from './gateways'

import {
  UserModule,
  RoleModule,
  BusinessModule,
  ManagerModule
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
    BusinessModule,
    ManagerModule,
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
    TasksService,
    GameGateway
  ],
})
export class AppModule {}
