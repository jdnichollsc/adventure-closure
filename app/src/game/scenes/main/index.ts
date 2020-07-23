import { Scene, Cameras } from 'phaser'
import { find } from 'lodash'

import { RealTimeGame, ServerMessage, ClientMessage, UserBusiness, User } from '../../models'
import { PlayerCard, BusinessCard } from '../../containers'
import { GameStore, BusinessStore } from '../../stores'
import { BusinessUtils } from '../../utils'

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
    const { socket } = (this.game as RealTimeGame)
    // TODO: Validate retry connection
    if (!socket) throw new Error('Socket not initialized')
    socket.emit(ClientMessage.STATUS, null, this.onStatus)
    socket.on(ServerMessage.RUN_BUSINESS_UPDATE, this.onRunBusinessUpdate)
    socket.on(ServerMessage.RUN_BUSINESS_ERROR, this.onRunBusinessError)
    socket.on(ServerMessage.PURCHASE_BUSINESS_UPDATE, this.onPurchaseBusinessUpdate)
    socket.on(ServerMessage.PURCHASE_BUSINESS_ERROR, this.onPurchaseBusinessError)
    socket.on(ServerMessage.HIRE_MANAGER_UPDATE, this.onHireManagerUpdate)
    socket.on(ServerMessage.HIRE_MANAGER_ERROR, this.onHireManagerError)
    socket.on(ServerMessage.USER_CAPITAL, this.onUpdateCapital)
  }

  create () {
    const player = new User()
    player.firstName = 'Eliana'
    player.lastName = 'Mask'
    player.capital = 0
    this.playerCard = new PlayerCard(this, player)
    const carPosition = {
      x: 25,
      y: this.playerCard.y + this.playerCard.height
    }
    this.loadBusinessCards(carPosition.x, carPosition.y)
    
    this.input
      .on('wheel', this.onWhell, this)
      .on('pointermove', this.onPointerMove, this)
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

  update () {
    
  }

  onStatus = (data: any) => {
    console.debug(data)
  }

  onUpdateCapital = (newCapital: number) => {
    this.playerCard.player.capital = newCapital
    this.playerCard.setCapital(newCapital)
    this.businessCards.forEach((card) => {
      card.enablePurchaseButton(card.business.investment <= newCapital)
    })
  }

  onRunBusinessUpdate = (ub: UserBusiness) => {
    const card = find(this.businessCards, { business: {id: ub.businessId}})
    card?.playProgressBar()
  }

  onRunBusinessError = () => {
    console.error('RUN_BUSINESS_ERROR')
  }

  onPurchaseBusinessUpdate = () => {
    alert('PURCHASE_BUSINESS_UPDATE')
  }

  onPurchaseBusinessError = () => {
    console.error('PURCHASE_BUSINESS_ERROR')
  }

  onHireManagerUpdate = () => {
    alert('HIRE_MANAGER_UPDATE')
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
  }
}
