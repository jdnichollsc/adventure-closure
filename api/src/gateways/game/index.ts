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

export enum ClientMessage {
  STATUS = 'Status',
  RUN_BUSINESS = 'RunBusiness',
  PURCHASE_BUSINESS = 'PurchaseBusiness',
  HIRE_MANAGER = 'HireManager',
}

export enum ServerMessage {
  RUN_BUSINESS_UPDATE = 'RunBusinessUpdate',
  RUN_BUSINESS_ERROR = 'RunBusinessError',
  PURCHASE_BUSINESS_UPDATE = 'PurchaseBusinessUpdate',
  PURCHASE_BUSINESS_ERROR = 'PurchaseBusinessError',
  HIRE_MANAGER_UPDATE = 'HireManagerUpdate',
  HIRE_MANAGER_ERROR = 'HireManagerError'
}

export const ERROR_MESSAGE = 'MESSAGE NOT VALID'

@UseInterceptors(ClassSerializerInterceptor)
@WebSocketGateway(WEBSOCKET_PORT)
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private logger: Logger = new Logger(GameGateway.name)

  afterInit(server: Server) {
    this.logger.debug(`Init: ${server}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.debug(`New client connected: ${client.id} args: ${args}`)
    client.emit("connection", "Successfully connected to server")
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage(ClientMessage.STATUS)
  handleStatus(
    @ConnectedSocket() client: Socket,
  ) {
    const statusMessage = `Status Client: ${ client.connected ? 'OK' : 'ERROR' }`
    this.logger.debug(statusMessage)
    return statusMessage
  }

  @SubscribeMessage(ClientMessage.RUN_BUSINESS)
  async handleRunBusiness(
    @MessageBody() business: Business
  ) {
    if (!business) return ERROR_MESSAGE
    try {
      this.logger.warn('BUSINESS: ' + business.id)
    } catch (error) {
      this.logger.error(error)
      this.server.emit(ServerMessage.PURCHASE_BUSINESS_ERROR, error.toString())
    }
  }

  @SubscribeMessage(ClientMessage.PURCHASE_BUSINESS)
  async handlePurchaseBusiness(
    @MessageBody() business: Business
  ) {
    if (!business) return ERROR_MESSAGE
    try {
      this.logger.warn('BUSINESS: ' + business.id)
    } catch (error) {
      this.logger.error(error)
      this.server.emit(ServerMessage.PURCHASE_BUSINESS_ERROR, error.toString())
    }
  }

  @SubscribeMessage(ClientMessage.PURCHASE_BUSINESS)
  async handleHireManager(
    @MessageBody() manager: Manager
  ) {
    try {
      this.logger.warn('MANAGER: ' + manager.id)
    } catch (error) {
      this.logger.error(error)
      this.server.emit(ServerMessage.PURCHASE_BUSINESS_ERROR, error.toString())
    }
  }
}