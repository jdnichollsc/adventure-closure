import { Scene, GameObjects } from 'phaser'

import { IMAGES_PATH, SCENES, PROGRESS_BAR, PROGRESS_BG } from '../../constants'
import { LoadScene } from '../load'
import { MainScene } from '../main'
import { MenuScene } from '../menu'

export class BootScene extends Scene {
  preload () {
    this.load.image(PROGRESS_BAR, `${IMAGES_PATH}/${PROGRESS_BAR}.png`)
    this.load.image(PROGRESS_BG, `${IMAGES_PATH}/${PROGRESS_BG}.png`)
  }

  init () {
    this.scale.on('resize', this.resize, this)
  }

  create () {
    // TODO: Configure scaling

    this.scene.add(SCENES.LOAD, LoadScene, false)
    this.scene.add(SCENES.MAIN, MainScene, false)
    this.scene.add(SCENES.MENU, MenuScene, false)

    this.scene.start(SCENES.LOAD)
  }

  resize (gameSize: GameObjects.Components.Size) {
    this.cameras.resize(gameSize.width, gameSize.height)
  }
}
