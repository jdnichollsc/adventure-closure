import { User, UserStatus } from '../../models'

export class UserStore {
  private static user: User
  public static currentUser: () => Promise<User> = async () => {
    if (!UserStore.user) {
      // TODO: Load user info
      UserStore.user = {
        id: '1234',
        firstName: 'Juan David',
        lastName: 'Nicholls Cardona',
        birthdate: '26-08-1991',
        address: 'Cra 84b #4a-75 Apto 1523',
        email: 'jdnichollsc@hotmail.com',
        phoneNumber: '232322',
        termsAndConditions: true,
        status: UserStatus.Active,
        capital: 0,
        score: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        businesses: [],
        managers: [],
      }
    }
    return UserStore.user
  }
}