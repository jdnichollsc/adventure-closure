import { API_DOMAIN } from '../../../contants'
import { Business } from '../../models'

export class BusinessStore {
  private static businesses: Array<Business>
  public static getBusinesses: () => Promise<Array<Business>> = async () => {
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
          'duration': 5
        },
        {
          'id': 2,
          'name': 'Cars',
          'imageUrl': `${API_DOMAIN}/images/businesses/cars.png`,
          'investment': 50,
          'score': 20,
          'income': 100,
          'duration': 10
        },
        {
          'id': 3,
          'name': 'Space suits',
          'imageUrl': `${API_DOMAIN}/images/businesses/space-suits.png`,
          'investment': 500,
          'score': 30,
          'income': 1000,
          'duration': 20
        }
      ]
    }
    return BusinessStore.businesses
  }
}
