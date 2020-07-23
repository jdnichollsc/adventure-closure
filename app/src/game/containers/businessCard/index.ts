import { GameObjects, Scene } from 'phaser'

import { Business } from '../../models'
import { BusinessStore } from '../../stores'
import { BusinessUtils } from '../../utils'
import { BUSINESS_SPRITES, BUSINESS_CARD_SIZE } from '../../constants'
import { RunBusinessButton, PurchaseBusinessButton, HireManagerButton } from '../../sprites'
import { BusinessProgressBar } from '../businessProgressBar'

export class BusinessCard extends GameObjects.Container {
  private background!: GameObjects.Image
  private progressBar!: BusinessProgressBar
  private runButton!: RunBusinessButton
  private purchaseButton!: PurchaseBusinessButton
  private hireButton!: HireManagerButton
  private purchaseLabel!: GameObjects.Text
  private incomeLabel!: GameObjects.Text
  private durationLabel!: GameObjects.Text
  private investmentLabel!: GameObjects.Text
  public business!: Business
  constructor (
    scene: Scene,
    business: Business,
    width = BUSINESS_CARD_SIZE.width,
    height = BUSINESS_CARD_SIZE.height
  ) {
    super(scene)
    this.scene.add.existing(this)
    this.business = business
    this.setSize(width, height)

    // TESTING
    // const debug = this.scene.add.graphics()
    //   .fillStyle(0xff00ff, 0.4)
    //   .fillRect(0, 0, this.width, this.height)
    // this.add(debug)

    this.background = this.scene.add.image(0, 0, BUSINESS_SPRITES.CARD_BG)
    this.background.setDisplaySize(width, height).setOrigin(0)
    this.add(this.background)

    this.progressBar = new BusinessProgressBar(this.scene, business.duration)
      .setPosition(100, 26)
      .setScale(0.9)
    this.add(this.progressBar)

    this.runButton = new RunBusinessButton(this.scene, 20, height/2, business)
      .setOrigin(0, 0.5)
      .on('pointerdown', this.onRunBusiness, this)
    this.add(this.runButton)

    this.purchaseButton = new PurchaseBusinessButton(this.scene, width/2, height)
      .setOrigin(0.65, 1.3)
      .setScale(0.5)
      .on('pointerdown', this.onPurchaseBusiness, this)
    this.add(this.purchaseButton)

    this.hireButton = new HireManagerButton(this.scene, width - 20, height/2)
      .setOrigin(1, 0.5)
      .on('pointerdown', this.onHireManager, this)
    this.add(this.hireButton)

    // LABELS
    this.purchaseLabel = this.scene.add.text(
      width/2 - 85,
      height - 28,
      `Buy x1`, {
      fontFamily: 'Rancho',
      fontSize: 26
    }).setOrigin(0, 1)
    this.add(this.purchaseLabel)

    this.incomeLabel = this.scene.add.text(
      width/2,
      30,
      BusinessUtils.getPrice(business.income), {
      fontFamily: 'Rancho',
      fontSize: 20
    }).setOrigin(0.5, 0)
    this.add(this.incomeLabel)

    this.durationLabel = this.scene.add.text(
      width/2 + 70,
      height - 28,
      `${business.duration/1000}s`, {
      fontFamily: 'Rancho',
      fontSize: 30
    }).setOrigin(0, 1)
    this.add(this.durationLabel)

    this.investmentLabel = this.scene.add.text(
      width/2 + 40,
      height - 28,
      BusinessUtils.getPrice(business.investment), {
      fontFamily: 'Rancho',
      fontSize: 16
    }).setOrigin(1, 1)
    this.add(this.investmentLabel)
  }

  public enableRunButton() {
    this.runButton.disabled = false
    this.runButton.setDisplaySize(20, 20)
    this.runButton.input.hitArea.setTo(0, 0, 250, 250)
    // TESTING
    // this.scene.input.enableDebug(this.runButton, 0xff00ff)
    return this
  }

  preUpdate() {
    if (this.runButton.active) {
      const { duration } = this.business
      const progress = duration * this.progressBar.getProgress()
      if (progress !== duration) {
        const newDuration = ((duration - progress)/1000).toFixed(0)
        this.durationLabel.text = `${newDuration}s`
      } else {
        this.durationLabel.text = `${duration/1000}s`
      }
    }
  }

  public enablePurchaseButton(enable = true) {
    this.purchaseButton.disabled = !enable
    return this
  }

  public playProgressBar() {
    this.progressBar.play()
  }

  onRunBusiness () {
    BusinessStore.runBusiness(this.business)
  }

  onPurchaseBusiness () {
    BusinessStore.purchaseBusiness(this.business)
  }

  onHireManager () {
    console.warn('TODO: Hire manager!')
  }
}
