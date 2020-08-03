import {
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
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
import { Business, Manager, AuthPayload } from '../../models'
import { BusinessService, UserService } from '../../repositories'
import { WsGuard } from '../../auth/guards'

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
  USER_CAPITAL = 'UserCapital',
}

export const ERROR_MESSAGE = 'MESSAGE NOT VALID'
export const TASK_RUNNING = 'THE TASK IS RUNNING'

type AuthSocket = Socket & { user: AuthPayload }

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
    this.logger.debug(`Init: ${server.path()}`)
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

  @UseGuards(WsGuard)
  @SubscribeMessage(ClientMessage.STATUS)
  handleStatus(
    @ConnectedSocket() client: AuthSocket,
  ): string {
    const userId = client.user.sub
    const statusMessage = `Client: ${userId}, Status: ${ client.connected ? 'OK' : 'ERROR' }`
    this.logger.debug(statusMessage)
    return statusMessage
  }

  private async incrementCapitalAndUpdateClient(
    client: AuthSocket,
    capitalToAdd: number,
  ) {
    const newCapital = await this.userService.incrementAndGetCapital(client.user.sub, capitalToAdd)
    client.emit(ServerMessage.USER_CAPITAL, newCapital)
  }

  @UseGuards(WsGuard)
  @SubscribeMessage(ClientMessage.RUN_BUSINESS)
  async handleRunBusiness(
    @MessageBody() { id: businessId } = new Business(),
    @ConnectedSocket() client: AuthSocket,
  ): Promise<string> {
    if (!businessId) return ERROR_MESSAGE
    const lastRunAt = new Date()
    try {
      const userId = client.user.sub
      const business = await this.businessService.getIfCanRunBusiness(userId, businessId, lastRunAt)
      if (business) {
        client.emit(ServerMessage.RUN_BUSINESS_UPDATE, {
          businessId,
          lastRunAt
        })
        const inventory = await this.businessService.updateUserBusinessAndGetInventory(userId, business.id, lastRunAt)
        // TODO: Use queue for pending tasks instead of timeouts
        setTimeout(
          () => this.incrementCapitalAndUpdateClient(client, business.income * inventory),
          business.duration
        )
      } else {
        client.emit(ServerMessage.RUN_BUSINESS_ERROR, TASK_RUNNING)
      }
    } catch (error) {
      this.logger.error(error)
      client.emit(ServerMessage.RUN_BUSINESS_ERROR, error.toString())
    }
  }

  @UseGuards(WsGuard)
  @SubscribeMessage(ClientMessage.PURCHASE_BUSINESS)
  async handlePurchaseBusiness(
    @MessageBody() { id: businessId } = new Business(),
    @ConnectedSocket() client: AuthSocket,
  ): Promise<string> {
    if (!businessId) return ERROR_MESSAGE
    try {
      const userId = client.user.sub
      const business = await this.businessService.findOne(businessId)
      const newCapital = await this.userService.reduceCapitalAndUpdateBusiness(userId, business)
      if (newCapital !== null) {
        client.emit(ServerMessage.USER_CAPITAL, newCapital)
        const userBusiness = await this.businessService.getUserBusiness(userId, businessId)
        client.emit(ServerMessage.PURCHASE_BUSINESS_UPDATE, userBusiness)
      }
    } catch (error) {
      this.logger.error(error)
      client.emit(ServerMessage.PURCHASE_BUSINESS_ERROR, error.toString())
    }
  }

  @UseGuards(WsGuard)
  @SubscribeMessage(ClientMessage.HIRE_MANAGER)
  async handleHireManager(
    @MessageBody() manager: Manager,
    @ConnectedSocket() client: AuthSocket,
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