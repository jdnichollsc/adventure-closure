import { API_DOMAIN } from '../../../contants'
import { Business, RealTimeGame, ClientMessage } from '../../models'
import { GameStore } from '../game'

export class BusinessStore {
  private static businesses: Array<Business>
  public static async getBusinesses(): Promise<Array<Business>> {
    if (!BusinessStore.businesses) {
      // TODO: Load businesses info
      BusinessStore.businesses = [
        {
          'id': 1,
          'name': 'Solar panels',
          'imageUrl': `${API_DOMAIN}/images/businesses/solar-panels.png`,
          'investment': 5,
          'score': 1,
          'income': 10,
          'duration': 5000
        },
        {
          'id': 2,
          'name': 'Cars',
          'imageUrl': `${API_DOMAIN}/images/businesses/cars.png`,
          'investment': 50,
          'score': 20,
          'income': 100,
          'duration': 10000
        },
        {
          'id': 3,
          'name': 'Space suits',
          'imageUrl': `${API_DOMAIN}/images/businesses/space-suits.png`,
          'investment': 500,
          'score': 30,
          'income': 1000,
          'duration': 20000
        }
      ]
    }
    return BusinessStore.businesses
  }

  public static async runBusiness(business: Business) {
    const { socket } = GameStore.currentScene.game as RealTimeGame
    if (socket) {
      socket.emit(ClientMessage.RUN_BUSINESS, business)
    }
  }
}
