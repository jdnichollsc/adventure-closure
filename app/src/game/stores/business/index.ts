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
          'imageUrl': `/assets/businesses/solar-panels.png`,
          'investment': 5,
          'score': 1,
          'income': 10,
          'duration': 1000
        },
        {
          'id': 2,
          'name': 'Cars',
          'imageUrl': `/assets/businesses/cars.png`,
          'investment': 50,
          'score': 20,
          'income': 100,
          'duration': 4000
        },
        {
          'id': 3,
          'name': 'Space suits',
          'imageUrl': `/assets/businesses/space-suits.png`,
          'investment': 500,
          'score': 30,
          'income': 1000,
          'duration': 8000
        },
        {
          "id": 4,
          "name": "Satellites",
          "imageUrl": `/assets/businesses/satellites.png`,
          "investment": 50000,
          "score": 40,
          "income": 100000,
          "duration": 12000
        },
        {
          "id": 5,
          "name": "Rockets",
          "imageUrl": `/assets/businesses/rockets.png`,
          "investment": 5000000,
          "score": 50,
          "income": 10000000,
          "duration": 20000
        }
      ]
    }
    return BusinessStore.businesses
  }

  public static runBusiness(business: Business) {
    const { socket } = GameStore.currentScene.game as RealTimeGame
    if (socket) socket.emit(ClientMessage.RUN_BUSINESS, business)
  }

  public static purchaseBusiness(business: Business) {
    const { socket } = GameStore.currentScene.game as RealTimeGame
    if (socket) socket.emit(ClientMessage.PURCHASE_BUSINESS, business)
  }
}
