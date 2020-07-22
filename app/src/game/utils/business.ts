import { Business } from '../models'
import { Scene } from 'phaser'
import { BusinessCard } from '../containers'

const loadCards = async (
  scene: Scene,
  initialPosition: number,
  businesses: Array<Business>
) => {
  return businesses.reduce((list, business, index) => {
    const newBusinessCard = new BusinessCard(
      scene,
      business
    )
    if (index === 0) {
      newBusinessCard
        .enableRunButton()
        .enablePurchaseButton()
    }
    newBusinessCard
      .setPosition(50, newBusinessCard.height * index + initialPosition)
    return [
      ...list,
      newBusinessCard
    ]
  }, [] as BusinessCard[])
}

export const BusinessUtils = {
  loadCards
}