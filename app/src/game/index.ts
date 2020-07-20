import { Types } from 'phaser'

import { BootScene } from './scenes'

const gameConfig: Types.Core.GameConfig = {
  width: "100%",
  height: "100%",
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    // TODO: With RESIZE mode width/height are zero
    // mode: Phaser.Scale.RESIZE,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    width: '100%',
    height: '100%'
  },
  render: {
    antialias: false,
    pixelArt: false,
    roundPixels: false
  },
  scene: BootScene
}

export default gameConfig
