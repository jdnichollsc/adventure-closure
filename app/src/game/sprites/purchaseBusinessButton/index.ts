import { GameObjects, Scene } from 'phaser'

import { BUSINESS_SPRITES } from '../../constants'

const {
  PURCHASE_BUSINESS_BUTTON,
  PURCHASE_BUSINESS_OVER_BUTTON,
  PURCHASE_BUSINESS_PRESSED_BUTTON,
  PURCHASE_BUSINESS_DISABLED_BUTTON
} = BUSINESS_SPRITES

export class PurchaseBusinessButton extends GameObjects.Sprite {
  private isPressed = false
  constructor (
    scene: Scene,
    x: number,
    y: number
  ) {
    super(scene, x, y, BUSINESS_SPRITES.PURCHASE_BUSINESS_DISABLED_BUTTON)
    this.scene.add.existing(this)
    this
      .setInteractive({ useHandCursor: true })
      .on('pointermove', this.onPointerOver, this)
      .on('pointerover', this.onPointerOver, this)
      .on('pointerdown', this.onPointerDown, this)
      .on('pointerup', this.onPointerUp, this)
      .on('pointerout', this.onPointerOut, this)
      .on('dragend', this.onPointerUp, this)
    this.disabled = true
  }

  get disabled () {
    return !this.active
  }

  set disabled (value: boolean) {
    this.active = !value
    if (this.active) {
      this.setInteractive()
      this.setTexture(PURCHASE_BUSINESS_BUTTON)
    } else {
      this.disableInteractive()
      this.setTexture(PURCHASE_BUSINESS_DISABLED_BUTTON)
    }
  }

  onPointerDown () {
    if (this.active) {
      this.isPressed = true
      this.setTexture(PURCHASE_BUSINESS_PRESSED_BUTTON)
    }
  }

  onPointerUp () {
    this.isPressed = false
    this.setTexture(PURCHASE_BUSINESS_OVER_BUTTON)
  }

  onPointerOver() {
    this.active && !this.isPressed && this.setTexture(PURCHASE_BUSINESS_OVER_BUTTON)
  }

  onPointerOut() {
    this.setTexture(this.active ? PURCHASE_BUSINESS_BUTTON : PURCHASE_BUSINESS_DISABLED_BUTTON)
  }
}
