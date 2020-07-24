import { GameObjects, Scene, Tweens } from 'phaser'

import { BUSINESS_SPRITES } from '../../constants'
import { GameStore } from '../../stores'

export class BusinessProgressBar extends GameObjects.Container {
  private progressBar!: GameObjects.Sprite
  private progressTween!: Tweens.Tween
  constructor (
    scene: Scene,
    duration: number
  ) {
    super(scene)
    scene.add.existing(this)
    this.duration = duration

    this.progressBar = scene.add.sprite(0, 0, BUSINESS_SPRITES.PROGRESS_BAR)
      .setOrigin(1, 0)
    this.add(this.progressBar)
    this.setSize(this.progressBar.width, this.progressBar.height)
    this.progressBar.setMask(GameStore.maskBusinessCard)

    const box = scene.add.image(0, 0, BUSINESS_SPRITES.PROGRESS_BAR_BOX)
      .setOrigin(0).setScale(1, 0.8)
    this.add(box)
    // TODO: Review masks from containers for scaling
    // const bounds = box.getBounds()
    // console.log('BOUNDS', bounds, this.getBounds())
    // const mask = scene.add.graphics({ fillStyle: { color: 0xffff00, alpha: 0.5 } })
    //     .fillRect(bounds.x, bounds.y, bounds.width/2, bounds.height)
    //     .createGeometryMask()
    // // this.add(mask)
    // mask.invertAlpha = false
    // this.progressBar.mask = mask

    this.progressTween = scene.tweens.add({
      targets: this.progressBar,
      x: { value: this.width + 4, duration, ease: 'Linear' },
      completeDelay: 10,
      onComplete: () => this.progressBar.x = 0,
      paused: true
    })
  }

  get duration () {
    return this.progressTween.duration
  }

  set duration (value: number) {
    if (this.progressTween)
      this.progressTween.duration = value
  }

  public play() {
    this.progressTween.play(true)
  }

  public getProgress() {
    return this.progressTween.progress
  }
}
