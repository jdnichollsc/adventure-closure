import { GameObjects, Scene } from 'phaser'
import { unionBy } from 'lodash'

import { PLAYER_SPRITES } from '../../constants'
import { User, UserBusiness } from '../../models'
import { concatStrings } from '../../utils'

const {
  PROFILE_IMG
} = PLAYER_SPRITES

export class PlayerCard extends GameObjects.Container {
  private profileImg!: GameObjects.Image
  private fullName!: GameObjects.Text
  private capital!: GameObjects.Text
  private user!: User
  constructor (
    public readonly scene: Scene,
    private player: User,
  ) {
    super(scene)
    this.user = player
    this.scene.add.existing(this)

    this.profileImg = this.scene.add.image(20, 20, PROFILE_IMG).setOrigin(0).setScale(0.8)
    this.add(this.profileImg)
    this.height = this.profileImg.height

    const name = concatStrings([player.firstName, player.lastName])
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
    this.user.capital = capital
    this.capital.text = '$' + capital
  }

  onUpdateBusiness(userBusiness: UserBusiness) {
    this.user.businesses = unionBy([userBusiness], this.user.businesses, 'id')
  }

  setPlayer(player: Partial<User>) {
    if (player.firstName && player.lastName) {
      this.fullName.text = concatStrings([player.firstName, player.lastName])
    }
    if (player.capital !== undefined) {
      this.capital.text = `$${player.capital}`
    }
    this.user = {
      ...this.user,
      ...player
    }
  }
}
