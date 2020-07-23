import { GameObjects, Scene } from 'phaser'

import { PLAYER_SPRITES } from '../../constants'
import { User } from '../../models'

const {
  PROFILE_IMG
} = PLAYER_SPRITES

export class PlayerCard extends GameObjects.Container {
  private profileImg!: GameObjects.Image
  private fullName!: GameObjects.Text
  private capital!: GameObjects.Text
  public player!: User
  constructor (
    scene: Scene,
    player: User
  ) {
    super(scene)
    this.player = player
    this.scene.add.existing(this)

    this.profileImg = this.scene.add.image(20, 20, PROFILE_IMG).setOrigin(0).setScale(0.8)
    this.add(this.profileImg)
    this.height = this.profileImg.height

    const name = [player.firstName, player.lastName].filter(Boolean).join(' ')
    this.fullName = this.scene.add.text(this.profileImg.width + 10, 20, name, {
      fontFamily: 'Rancho',
      fontSize: 40
    }).setShadow(5, 5, "#5588EE", 0, true, true)
    this.add(this.fullName)

    this.capital = this.scene.add.text(
      this.profileImg.width + 10,
      this.fullName.y + this.fullName.height + 20,
      `$${player.capital}`, {
      fontFamily: 'Rancho',
      fontSize: 30
    })
    this.add(this.capital)
  }

  setCapital(capital: number) {
    this.capital.text = '$' + capital
  }
}
