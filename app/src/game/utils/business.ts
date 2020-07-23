import { Business } from '../models'
import { Scene } from 'phaser'
import { BusinessCard } from '../containers'

const loadCards = async (
  scene: Scene,
  businesses: Array<Business>,
  x: number,
  y: number
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
      .setPosition(x, newBusinessCard.height * index + y)
    return [
      ...list,
      newBusinessCard
    ]
  }, [] as BusinessCard[])
}

export const BusinessUtils = {
  loadCards
}