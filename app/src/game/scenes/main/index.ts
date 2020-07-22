import { Scene } from 'phaser'
import { find } from 'lodash'

import { RealTimeGame, ServerMessage, ClientMessage, UserBusiness } from '../../models'
import { PlayerCard, BusinessCard } from '../../containers'
import { GameStore, BusinessStore } from '../../stores'
import { BusinessUtils } from '../../utils'

export class MainScene extends Scene {
  private playerCard!: PlayerCard
  private businessCards!: Array<BusinessCard>
  init () {
    this.cameras.main.setBackgroundColor('#24252A')
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
  }

  create () {
    const player = {
      name: 'Eliana Musk',
      capital: 0
    }
    this.playerCard = new PlayerCard(this, player)
    this.loadBusinessCards(this.playerCard.y + this.playerCard.height)
  }

  update () {
    
  }

  onStatus = (data: any) => {
    console.debug(data)
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

  async loadBusinessCards (lastPosition: number) {
    const businesses = await BusinessStore.getBusinesses()
    this.businessCards = await BusinessUtils.loadCards(this, lastPosition, businesses)
  }
}
