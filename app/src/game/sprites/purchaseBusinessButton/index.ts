import { GameObjects, Scene } from 'phaser'

import { BUSINESS_SPRITES } from '../../constants'

export class PurchaseBusinessButton extends GameObjects.Sprite {
  constructor (
    scene: Scene,
    x: number,
    y: number
  ) {
    super(scene, x, y, BUSINESS_SPRITES.BUY_DISABLED_BUTTON)
    this.scene.add.existing(this)
    const hitArea = new Phaser.Geom.Rectangle(0, 0, this.width, this.height)
    this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains)
      .on('pointerdown', this.purchaseBusiness)

    this.disabled = true
  }

  purchaseBusiness () {
    alert('TODO: Buy business!')
  }

  get disabled () {
    return !this.active
  }

  set disabled (value: boolean) {
    this.active = !value
    if (this.active) {
      this.setInteractive()
      this.setTexture(BUSINESS_SPRITES.BUY_BUTTON)
    } else {
      this.disableInteractive()
      this.setTexture(BUSINESS_SPRITES.BUY_DISABLED_BUTTON)
    }
  }
}
