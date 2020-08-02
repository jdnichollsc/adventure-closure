import { AuthState, AuthAction, Action } from './types'

const { localStorage } = window

const TOKEN_KEY = 'token'
const USER_STORAGE_KEY = 'user'

export const initialState = {
  token: localStorage.getItem(TOKEN_KEY) || null,
  user: JSON.parse(localStorage.getItem(USER_STORAGE_KEY) as string) || null
} as any;

export const reducer = (
  state = initialState,
  action?: AuthAction,
): AuthState => {
  switch (action?.type) {
    case Action.ClearTokens:
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_STORAGE_KEY)
      return { ...state, token: null, user: null };
    case Action.LoadToken: {
      const { value: token } = action
      localStorage.setItem(TOKEN_KEY, token);
      return { ...state, token };
    }
    case Action.LoadUser: {
      const { value: user } = action
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      return { ...state, user };
    }
    default:
      return state;
  };
};