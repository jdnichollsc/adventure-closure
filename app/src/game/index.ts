import { Types } from 'phaser'

import { BootScene } from './scenes'

const gameConfig: Types.Core.GameConfig = {
  width: "100%",
  height: "100%",
  type: Phaser.CANVAS,
  scale: {
    // mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    // TODO: With RESIZE mode width/height are zero
    // mode: Phaser.Scale.RESIZE,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 440,
    // height: '100%'
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    antialias: false,
    pixelArt: false,
    roundPixels: false
  },
  scene: BootScene
}

export default gameConfig
