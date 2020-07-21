import { GameObjects, Scene } from 'phaser'

import { BUSINESS_SPRITES, BUSINESS_CARD_SIZE } from '../../constants'
import { RunBusinessButton, PurchaseBusinessButton, HireManagerButton } from '../../sprites'
import { BusinessProgressBar } from '../businessProgressBar'
import { Business } from '../../models'

export class BusinessCard extends GameObjects.Container {
  private background!: GameObjects.Image
  private progressBar!: GameObjects.Container
  private runButton!: RunBusinessButton
  private purchaseButton!: PurchaseBusinessButton
  private hireButton!: HireManagerButton
  private purchaseLabel: GameObjects.Text
  constructor (
    scene: Scene,
    business: Business,
    width = BUSINESS_CARD_SIZE.width,
    height = BUSINESS_CARD_SIZE.height
  ) {
    super(scene)
    this.scene.add.existing(this)

    // const hitArea = new Phaser.Geom.Rectangle(0, 0, width, height)
    // this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains)
    this.setSize(width, height)

    // TESTING
    // const debug = this.scene.add.graphics()
    //   .fillStyle(0xff00ff, 0.4)
    //   .fillRect(0, 0, this.width, this.height)
    // this.add(debug)

    this.background = this.scene.add.image(0, 0, BUSINESS_SPRITES.CARD_BG)
    this.background.setDisplaySize(width, height).setOrigin(0)
    this.add(this.background)

    this.runButton = new RunBusinessButton(this.scene, 20, height/2, business)
      .setOrigin(0, 0.5)
      .on('pointerdown', this.runBusiness, this)
    this.add(this.runButton)

    this.progressBar = new BusinessProgressBar(this.scene)
      .setPosition(100, 26)
      .setScale(0.9)
    this.add(this.progressBar)

    this.purchaseButton = new PurchaseBusinessButton(this.scene, width/2, height)
      .setOrigin(0.5, 1.3)
      .setScale(0.5)
      .on('pointerdown', this.purchaseBusiness, this)
    this.add(this.purchaseButton)

    this.hireButton = new HireManagerButton(this.scene, width - 20, height/2)
      .setOrigin(1, 0.5)
      .on('pointerdown', this.hireManager, this)
    this.add(this.hireButton)

    // LABELS
    this.purchaseLabel = this.scene.add.text(
      width/2 - 40,
      height - 28,
      `Buy`, {
      fontFamily: 'Rancho',
      fontSize: 30
    }).setOrigin(0.5, 1)
    this.add(this.purchaseLabel)
  }

  public enableRunButton() {
    this.runButton.disabled = false
    this.runButton.setDisplaySize(20, 20)
    return this
  }

  public enablePurchaseButton() {
    this.purchaseButton.disabled = false
    return this
  }

  runBusiness () {
    console.log('TODO: Run business!')
  }

  purchaseBusiness () {
    console.log('TODO: Buy business!')
  }

  hireManager () {
    console.log('TODO: Hire manager!')
  }
}
