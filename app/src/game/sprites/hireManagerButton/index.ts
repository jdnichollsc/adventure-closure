import { GameObjects, Scene } from 'phaser'

import { BUSINESS_SPRITES } from '../../constants'

export class HireManagerButton extends GameObjects.Sprite {
  constructor (
    scene: Scene,
    x: number,
    y: number
  ) {
    super(scene, x, y, BUSINESS_SPRITES.MANAGER_DISABLED_BUTTON)
    this.scene.add.existing(this)
    this.setInteractive({ useHandCursor: true })

    // Use frames for button states
    // https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
    this.disabled = true
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
