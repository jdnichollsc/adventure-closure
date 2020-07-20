import { GameObjects, Scene } from 'phaser'

import { BUSINESS_SPRITES } from '../../constants'
import { Business } from '../../models'

export class RunBusinessButton extends GameObjects.Sprite {
  private business!: Business
  constructor (
    scene: Scene,
    x: number,
    y: number,
    business: Business
  ) {
    super(scene, x, y, BUSINESS_SPRITES.MANAGER_DISABLED_BUTTON)
    console.log('RUN BUSINESS', business)
    this.business = business
    this.scene.add.existing(this)
    const hitArea = new Phaser.Geom.Rectangle(0, 0, this.width, this.height)
    this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains)
      .on('pointerdown', this.runBusiness)

    // Use frames for button states
    // https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
    this.disabled = true

    // scene.load.crossOrigin = 'anonymous'
    scene.load.once('filecomplete', this.loadImage, this)
    // scene.load.once('complete', this.loadImage, this)
    scene.load.image(this.imageKey, business.imageUrl)
    scene.load.start()
  }

  get imageKey () {
    return `business_${this.business.name.toLowerCase()}`
  }

  loadImage () {
    alert('File loaded!')
  }

  runBusiness () {
    // if (!this.active) return
    alert('TODO: Buy business!')
  }

  get disabled () {
    return !this.active
  }

  set disabled (value: boolean) {
    this.active = !value
    if (this.active) {
      this.setInteractive()
      this.setTexture(BUSINESS_SPRITES.MANAGER_BUTTON)
    } else {
      this.disableInteractive()
      this.setTexture(BUSINESS_SPRITES.MANAGER_DISABLED_BUTTON)
    }
  }
}
