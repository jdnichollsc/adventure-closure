import { Scene } from 'phaser'

import { SCENES } from '../../common'
import { MainScene } from '../main'
import { MenuScene } from '../menu'

export class BootScene extends Scene {
  create () {
    this.scene.add(SCENES.MAIN, MainScene, true)
    this.scene.add(SCENES.MENU, MenuScene, false)

    this.scene.run(SCENES.MAIN)
  }
}
