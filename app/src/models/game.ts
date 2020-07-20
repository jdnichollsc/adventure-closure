import { Game } from 'phaser'
import { Socket } from 'socket.io-client'

export interface RealTimeGame extends Game {
  socket?: typeof Socket
}