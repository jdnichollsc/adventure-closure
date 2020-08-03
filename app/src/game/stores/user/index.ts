import { User } from '../../models'

const USER_STORAGE_KEY = 'user'

export class UserStore {
  private static user: User
  public static currentUser(): User {
    if (!UserStore.user) {
      UserStore.user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) as string) || null
    }
    return UserStore.user
  }
}