import { Scene, Cameras } from 'phaser'
import { find } from 'lodash'

import { RealTimeGame, ServerMessage, ClientMessage, UserBusiness, User } from '../../models'
import { PlayerCard, BusinessCard } from '../../containers'
import { GameStore, BusinessStore } from '../../stores'
import { BusinessUtils, sleep } from '../../utils'

const SOCKET_ERROR = 'WebSockets not initialized'
type GameState = { user: User }

export class MainScene extends Scene {
  private playerCard!: PlayerCard
  private businessCards: Array<BusinessCard> = []
  private camera!: Cameras.Scene2D.Camera
  private LIMIT_CAMERA_SIZE = 200
  init () {
    this.camera = this.cameras.main
    this.camera.setBackgroundColor('#24252A')
    // Required to initialize shared resources
    GameStore.setCurrentScene(this)

    const { socket } = this.game as RealTimeGame
    if (!socket) throw new Error(SOCKET_ERROR)
    socket.on(ServerMessage.GAME_STATE, this.onGameState)
    socket.on(ServerMessage.RUN_BUSINESS_UPDATE, this.onRunBusinessUpdate)
    socket.on(ServerMessage.RUN_BUSINESS_ERROR, this.onRunBusinessError)
    socket.on(ServerMessage.PURCHASE_BUSINESS_UPDATE, this.onPurchaseBusinessUpdate)
    socket.on(ServerMessage.PURCHASE_BUSINESS_ERROR, this.onPurchaseBusinessError)
    socket.on(ServerMessage.HIRE_MANAGER_UPDATE, this.onHireManagerUpdate)
    socket.on(ServerMessage.HIRE_MANAGER_ERROR, this.onHireManagerError)
    socket.on(ServerMessage.USER_CAPITAL, this.onUpdateCapital)
  }

  create () {
    this.playerCard = new PlayerCard(this, new User())
    const carPosition = {
      x: 25,
      y: this.playerCard.y + this.playerCard.height
    }
    this.loadBusinessCards(carPosition.x, carPosition.y)
    
    this.input
      .on('wheel', this.onWhell, this)
      .on('pointermove', this.onPointerMove, this)
    
    // INITIALIZE GAME STATE
    const game = (this.game as RealTimeGame)
    game.socket?.emit(ClientMessage.STATUS, null, this.onStatus)
  }

  onScrollCamera(newScrollY: number, camera = this.camera) {
    if (newScrollY < 0)
      camera.scrollY = 0
    else if (newScrollY > this.LIMIT_CAMERA_SIZE)
      camera.scrollY = this.LIMIT_CAMERA_SIZE
    else camera.scrollY = newScrollY
  }

  onWhell({ deltaY }: { deltaY: number }) {
    const newScrollY = this.camera.scrollY + deltaY / this.camera.zoom
    this.onScrollCamera(newScrollY)
  }

  onPointerMove({ isDown, y, prevPosition }: any) {
    if (!isDown) return
    const newScrollY = this.camera.scrollY - (y - prevPosition.y) / this.camera.zoom
    this.onScrollCamera(newScrollY)
  }

  onStatus = (data: any) => console.debug(data)

  onGameState = ({ user }: GameState) => {
    this.playerCard.setPlayer(user)
  } 

  onUpdateCapital = (newCapital: number) => {
    this.playerCard.setCapital(newCapital)
    this.businessCards.forEach((card) => {
      card.enablePurchaseButton(card.business.investment <= newCapital)
    })
  }

  onRunBusinessUpdate = (ub: UserBusiness) => {
    const card = find(this.businessCards, { business: {id: ub.businessId}})
    card?.playProgressBar()
  }

  onPurchaseBusinessUpdate = (ub: UserBusiness) => {
    const card = find(this.businessCards, { business: {id: ub.businessId}})
    if (card) {
      card
        .enableRunButton()
        .setInventory(ub.inventory)
    }
    this.playerCard.onUpdateBusiness(ub)
  }

  onHireManagerUpdate = () => {
    console.debug('HIRE_MANAGER_UPDATE')
  }

  onRunBusinessError = () => {
    console.error('RUN_BUSINESS_ERROR')
  }

  onPurchaseBusinessError = () => {
    console.error('PURCHASE_BUSINESS_ERROR')
  }

  onHireManagerError = () => {
    console.error('HIRE_MANAGER_ERROR')
  }

  async loadBusinessCards (x: number, y: number) {
    const businesses = await BusinessStore.getBusinesses()
    this.businessCards = await BusinessUtils.loadCards(this, businesses, x, y)
    const firstBusinessCard = this.businessCards[0]
    firstBusinessCard
      .enableRunButton()
      .setInventory(1)
  }
}
