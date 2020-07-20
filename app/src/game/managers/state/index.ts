import { Display, Scene } from 'phaser'

/**
 * Global Game State
 * Relative to the world
 */
export class StateManager {
  private static CURRENT_SCENE: Scene
  private static MASK_BUSINESS_CARD: Display.Masks.GeometryMask

  // TODO: Fix configuration to support scaling
  public static get maskBusinessCard () {
    if (!this.MASK_BUSINESS_CARD) {
      const scene = this.CURRENT_SCENE
      const { width, height } = scene.sys.game.scale.gameSize
      const mask = scene.make.graphics({ fillStyle: { color: 0x000000 }, add: false})
        .fillRect(135, 100, width, height)
        .createGeometryMask()
      mask.invertAlpha = false
      this.MASK_BUSINESS_CARD = mask
    }
    return this.MASK_BUSINESS_CARD
  }

  public static setCurrentScene (scene: Scene) {
    this.CURRENT_SCENE = scene
  }
}