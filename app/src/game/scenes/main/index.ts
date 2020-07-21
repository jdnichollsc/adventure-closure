import { Scene, GameObjects } from 'phaser'

import { PlayerCard, BusinessCard } from '../../containers'
import { StateManager, BusinessManager } from '../../managers'

export class MainScene extends Scene {
  private playerCard!: PlayerCard
  private businessCards!: Array<BusinessCard>
  init () {
    this.cameras.main.setBackgroundColor('#24252A')
    // Required to initialize shared resources
    StateManager.setCurrentScene(this)
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

  loadBusinessCards (lastPosition: number) {
    const businesses = BusinessManager.loadBusinesses()
    this.businessCards = businesses.reduce((list, business, index) => {
      const newBusinessCard = new BusinessCard(
        this,
        business
      )
      if (index === 0) {
        newBusinessCard
          .enableRunButton()
          .enablePurchaseButton()
      }
      newBusinessCard.setPosition(50, newBusinessCard.height * index + lastPosition)
      return [
        ...list,
        newBusinessCard
      ]
    }, [] as BusinessCard[])
  }
}
