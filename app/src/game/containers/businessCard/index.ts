import { GameObjects, Scene } from 'phaser'

import { BUSINESS_SPRITES, BUSINESS_CARD_SIZE } from '../../constants'
import { RunBusinessButton, PurchaseBusinessButton, HireManagerButton } from '../../sprites'
import { BusinessProgressBar } from '../businessProgressBar'
import { Business } from '../../models'

export class BusinessCard extends GameObjects.Container {
  private background!: GameObjects.Image
  private runButton!: RunBusinessButton
  private purchaseButton!: PurchaseBusinessButton
  private hireButton!: HireManagerButton
  private progressBar!: GameObjects.Container
  constructor (
    scene: Scene,
    business: Business,
    width = BUSINESS_CARD_SIZE.width,
    height = BUSINESS_CARD_SIZE.height
  ) {
    super(scene)
    this.scene.add.existing(this)

    const hitArea = new Phaser.Geom.Rectangle(0, 0, width, height)
    this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains)
    this.setSize(width, height)

    // TESTING
    // const debug = this.scene.add.graphics()
    //   .fillStyle(0xff00ff, 0.4)
    //   .fillRect(0, 0, this.width, this.height)
    // this.add(debug)

    this.background = this.scene.add.image(0, 0, BUSINESS_SPRITES.CARD_BG)
    this.background.setDisplaySize(width, height).setOrigin(0)
    this.add(this.background)

    this.runButton = new RunBusinessButton(this.scene, width - 20, height/2, business)
      .setOrigin(1, 0.5)
    this.add(this.runButton)

    this.purchaseButton = new PurchaseBusinessButton(this.scene, width/2, height - 26)
      .setOrigin(0.5, 1)
      .setScale(0.4)
    this.add(this.purchaseButton)

    this.hireButton = new HireManagerButton(this.scene, width - 20, height/2)
      .setOrigin(1, 0.5)
      .setScale(0.5)
    this.add(this.hireButton)

    this.progressBar = new BusinessProgressBar(this.scene)
      .setPosition(80, 26)
    this.add(this.progressBar)
  }
}
