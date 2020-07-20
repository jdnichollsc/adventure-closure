import { GameObjects, Scene, Tweens } from 'phaser'

import { BUSINESS_SPRITES } from '../../constants'
import { StateManager } from '../../managers'

export class BusinessProgressBar extends GameObjects.Container {
  private progressBar!: GameObjects.Sprite
  private progressTween!: Tweens.Tween
  constructor (
    scene: Scene
  ) {
    super(scene)
    scene.add.existing(this)
    this.duration = 2000

    this.progressBar = scene.add.sprite(0, 0, BUSINESS_SPRITES.PROGRESS_BAR)
      .setOrigin(1, 0)
    this.add(this.progressBar)
    this.setSize(this.progressBar.width, this.progressBar.height)
    this.progressBar.setMask(StateManager.maskBusinessCard)
    // TODO: Review masks from containers for scaling
    // const mask = scene.add.graphics()
    //   .fillStyle(0xff00ff, 0.2)
    //   .fillRect(0, 0, this.width, this.height)
    // this.mask = new Phaser.Display.Masks.GeometryMask(scene, mask)
    // this.mask.invertAlpha = true

    const box = scene.add.image(0, 0, BUSINESS_SPRITES.PROGRESS_BAR_BOX)
      .setOrigin(0).setScale(1, 0.8)
    this.add(box)
    // this.mask = new Phaser.Display.Masks.BitmapMask(scene, box);

    this.progressTween = scene.tweens.add({
      targets: this.progressBar,
      x: { value: this.width + 4, duration: 2000, ease: 'Linear' },
      repeat: -1,
      completeDelay: 200,
      onComplete: () => this.progressBar.x = 0,
      // paused: false
    })
  }

  play() {
    this.progressTween.play(true)
  }

  get duration () {
    return this.progressTween.duration
  }

  set duration (value: number) {
    if (this.progressTween)
      this.progressTween.duration = value
  }
}