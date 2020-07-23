import { Business } from '../models'
import { Scene } from 'phaser'
import { BusinessCard } from '../containers'

const getPrice = (value: number) => {
  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  })
}

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
    newBusinessCard
      .setPosition(x, newBusinessCard.height * index + y)
    return [
      ...list,
      newBusinessCard
    ]
  }, [] as BusinessCard[])
}

export const BusinessUtils = {
  getPrice,
  loadCards,
}