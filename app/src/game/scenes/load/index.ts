import { Scene } from 'phaser'

import { PROGRESS_BAR, IMAGES_PATH, MAIN_SPRITES, SCENES } from '../../constants'
import { WebFontFile } from '../../loaders'

export class LoadScene extends Scene {
  private progressBar!: Phaser.GameObjects.Sprite

  preload () {
    const { centerX, centerY } = this.cameras.main
    this.progressBar = this.add.sprite(centerX, centerY, PROGRESS_BAR)
    this.progressBar.setOrigin(0)
    this.load.setPath(IMAGES_PATH)
    this.load.on('progress', this.onLoadProgress, this)
    this.load.once('complete', this.onLoadComplete, this)

    // TODO: Use Facebook Instant Games
    // this.facebook.showLoadProgress(this);
    // this.facebook.once('startgame', this.onLoadComplete, this);

    /**
     * Load assets
     */
    for (const key in MAIN_SPRITES) {
      const sprite = (MAIN_SPRITES as Record<string, string>)[key]
      this.load.image(sprite, `${sprite}.png`)
    }

    /**
     * Load fonts
     */
    this.load.addFile(new WebFontFile(this.load, 'Rancho'))
  }

  onLoadProgress (value: number) {
    this.progressBar.setScale(value, 1)
  }

  onLoadComplete () {
    this.load.off('progress', this.onLoadProgress)
    this.scene.start(SCENES.MAIN)
  }
}
