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
import { UserBusiness, UserManager, Business } from '../../models'

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
    this.logger.log(`Init: ${server}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`New client connected: ${client.id} args: ${args}`)
    client.emit("connection", "Successfully connected to server")
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage(ClientMessage.STATUS)
  handleStatus(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    this.logger.log(`Client: ${client.connected}, Status: OK`)
    return data;
  }

  @SubscribeMessage(ClientMessage.RUN_BUSINESS)
  async handleRunBusiness(
    @MessageBody() data: string
  ) {
    if (!data) return ERROR_MESSAGE
    try {
      const { businessId }: UserBusiness = JSON.parse(data)
    } catch (error) {
      this.server.emit(ServerMessage.PURCHASE_BUSINESS_ERROR, error.toString());
    }
  }

  @SubscribeMessage(ClientMessage.PURCHASE_BUSINESS)
  async handlePurchaseBusiness(
    @MessageBody() data: string
  ) {
    if (!data) return ERROR_MESSAGE
    try {
      const { id }: Business = JSON.parse(data)
    } catch (error) {
      this.server.emit(ServerMessage.PURCHASE_BUSINESS_ERROR, error.toString());
    }
  }

  @SubscribeMessage(ClientMessage.PURCHASE_BUSINESS)
  async handleHireManager(
    @MessageBody() data: string
  ) {
    try {
      const { managerId }: UserManager = JSON.parse(data)
    } catch (error) {
      this.server.emit(ServerMessage.PURCHASE_BUSINESS_ERROR, error.toString());
    }
  }
}