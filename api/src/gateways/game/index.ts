import {
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common'
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

import { WEBSOCKET_PORT } from '../../constants'
import { Business, Manager } from '../../models'
import { BusinessService, UserService } from '../../repositories'

export enum ClientMessage {
  STATUS = 'Status',
  RUN_BUSINESS = 'RunBusiness',
  PURCHASE_BUSINESS = 'PurchaseBusiness',
  HIRE_MANAGER = 'HireManager',
}

export enum ServerMessage {
  GAME_STATE = 'GameState',
  RUN_BUSINESS_UPDATE = 'RunBusinessUpdate',
  RUN_BUSINESS_ERROR = 'RunBusinessError',
  PURCHASE_BUSINESS_UPDATE = 'PurchaseBusinessUpdate',
  PURCHASE_BUSINESS_ERROR = 'PurchaseBusinessError',
  HIRE_MANAGER_UPDATE = 'HireManagerUpdate',
  HIRE_MANAGER_ERROR = 'HireManagerError',
  USER_CAPITAL = 'UserCapital'
}

export const ERROR_MESSAGE = 'MESSAGE NOT VALID'
export const TASK_RUNNING = 'THE TASK IS RUNNING'

@UseInterceptors(ClassSerializerInterceptor)
@WebSocketGateway(WEBSOCKET_PORT)
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private logger: Logger = new Logger(GameGateway.name)

  constructor(
    private readonly userService: UserService,
    private readonly businessService: BusinessService,
  ) { }

  afterInit(server: Server): void {
    this.logger.debug(`Init: ${server}`)
  }

  handleConnection(client: Socket): void {
    const { clientsCount } = client.conn.server
    this.logger.debug(`New client connected: ${client.id}, total users: ${clientsCount}`)
    client.emit("connection", "Successfully connected to server")
  }

  handleDisconnect(client: Socket): void {
    const { clientsCount } = client.conn.server
    this.logger.debug(`Client disconnected: ${client.id}, total users: ${clientsCount}`)
  }

  @SubscribeMessage(ClientMessage.STATUS)
  handleStatus(
    @ConnectedSocket() client: Socket,
  ): string {
    const statusMessage = `Status Client: ${ client.connected ? 'OK' : 'ERROR' }`
    this.logger.debug(statusMessage)
    return statusMessage
  }

  private async incrementCapitalAndUpdateClient(
    userId: string,
    capitalToAdd: number,
    client: Socket,
  ) {
    const newCapital = await this.userService.incrementAndGetCapital(userId, capitalToAdd)
    client.emit(ServerMessage.USER_CAPITAL, newCapital)
  }

  @SubscribeMessage(ClientMessage.RUN_BUSINESS)
  async handleRunBusiness(
    @MessageBody() business: Business,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    if (!business) return ERROR_MESSAGE
    const lastRunAt = new Date()
    try {
      // FIXME: LOAD USER INFO USING JWT TOKEN
      const userId = '1234'
      const businessToProcess = await this.businessService.getIfCanRunBusiness(userId, business.id, lastRunAt)
      if (businessToProcess) {
        client.emit(ServerMessage.RUN_BUSINESS_UPDATE, {
          businessId: business.id,
          lastRunAt
        })
        this.businessService.updateUserBusiness(userId, business.id, lastRunAt)
        // TODO: Use queue for pending tasks instead of timeouts
        setTimeout(
          () => this.incrementCapitalAndUpdateClient(userId, business.income, client),
          businessToProcess.duration
        )
      } else {
        client.emit(ServerMessage.RUN_BUSINESS_ERROR, TASK_RUNNING)
      }
    } catch (error) {
      this.logger.error(error)
      client.emit(ServerMessage.RUN_BUSINESS_ERROR, error.toString())
    }
  }

  @SubscribeMessage(ClientMessage.PURCHASE_BUSINESS)
  async handlePurchaseBusiness(
    @MessageBody() business: Business,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    if (!business) return ERROR_MESSAGE
    try {
      this.logger.warn('BUSINESS: ' + business.id)
    } catch (error) {
      this.logger.error(error)
      client.emit(ServerMessage.PURCHASE_BUSINESS_ERROR, error.toString())
    }
  }

  @SubscribeMessage(ClientMessage.PURCHASE_BUSINESS)
  async handleHireManager(
    @MessageBody() manager: Manager,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    if (!manager) return ERROR_MESSAGE
    try {
      this.logger.warn('MANAGER: ' + manager.id)
    } catch (error) {
      this.logger.error(error)
      client.emit(ServerMessage.HIRE_MANAGER_ERROR, error.toString())
    }
  }
}