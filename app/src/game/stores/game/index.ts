import { Display, Scene } from 'phaser'

/**
 * Global Game State
 */
export class GameStore {
  private static currentScene: Scene
  private static maskForBusinessCards: Display.Masks.GeometryMask

  // TODO: Fix configuration to support scaling
  public static get maskBusinessCard () {
    if (!GameStore.maskForBusinessCards) {
      const scene = GameStore.currentScene
      const { width, height } = scene.sys.game.scale.gameSize
      const mask = scene.make.graphics({ fillStyle: { color: 0x000000 }, add: false})
        .fillRect(153, 100, width, height)
        .createGeometryMask()
      mask.invertAlpha = false
      GameStore.maskForBusinessCards = mask
    }
    return GameStore.maskForBusinessCards
  }

  public static setCurrentScene (scene: Scene) {
    GameStore.currentScene = scene
  }
}