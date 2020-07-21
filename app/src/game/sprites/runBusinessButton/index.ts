import { GameObjects, Scene } from 'phaser'

import { BUSINESS_SPRITES } from '../../constants'
import { Business } from '../../models'

export class RunBusinessButton extends GameObjects.Sprite {
  private textureLoaded = false
  private business!: Business
  constructor (
    scene: Scene,
    x: number,
    y: number,
    business: Business
  ) {
    super(scene, x, y, BUSINESS_SPRITES.RUN_BUSINESS_DISABLED_BUTTON)
    this.business = business
    this.scene.add.existing(this)
    const hitArea = new Phaser.Geom.Rectangle(0, 0, 250, 250)
    this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains)
    this.disabled = true

    scene.load.once('complete', this.loadImage, this)
    scene.load.image(this.imageKey, business.imageUrl)
    scene.load.start()
  }

  loadImage () {
    this.textureLoaded = true
    if (this.active) {
      this.setInteractive()
      this.setTexture(this.imageKey)
    }
  }

  get imageKey () {
    return `business_${this.business.name.toLowerCase()}`
  }

  get disabled () {
    return !this.active
  }

  set disabled (value: boolean) {
    this.active = !value
    if (this.active && this.textureLoaded) {
      this.setInteractive()
      this.setTexture(this.imageKey)
    } else {
      this.disableInteractive()
      this.setTexture(BUSINESS_SPRITES.RUN_BUSINESS_DISABLED_BUTTON)
    }
  }
}
