import { API_DOMAIN } from '../../../contants'
import { Manager, Business } from '../../models'

export class ManagerStore {
  private static managers: Array<Manager>
  public static getManageres: () => Promise<Array<Manager>> = async () => {
    if (!ManagerStore.managers) {
      // TODO: Load managers info
      ManagerStore.managers = [
        {
          'id': 1,
          'name': 'Pepito Pérez',
          'imageUrl': `${API_DOMAIN}/images/managers/manager1.png`,
          'investment': 1000,
          'business': new Business()
        },
        {
          'id': 2,
          'name': 'Sara Jaramillo',
          'imageUrl': `${API_DOMAIN}/images/managers/manager2.png`,
          'investment': 3000,
          'business': new Business()
        },
        {
          'id': 3,
          'name': 'Lucas Cardona',
          'imageUrl': `${API_DOMAIN}/images/managers/manager3.png`,
          'investment': 5000,
          'business': new Business()
        },
        {
          'id': 4,
          'name': 'Laura B',
          'imageUrl': `${API_DOMAIN}/images/managers/manager4.png`,
          'investment': 7000,
          'business': new Business()
        },
        {
          'id': 5,
          'name': 'Sofia D',
          'imageUrl': `${API_DOMAIN}/images/managers/manager5.png`,
          'investment': 9000,
          'business': new Business()
        }
      ]
    }
    return ManagerStore.managers
  }
}
