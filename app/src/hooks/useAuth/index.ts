import {
  useCallback,
} from 'react';
import axios from 'axios';

import { API_DOMAIN } from '../../contants';
import { Action, useStore } from '../../context';

const authEndpoint = `${API_DOMAIN}/auth`;
const userEndpoint = `${API_DOMAIN}/users`;

export function useAuth () {
  const [state, dispatch] = useStore();

  const onSignIn = useCallback(async (
    document: string,
    password: string
  ) => {
    const { access_token: accessToken } = (await axios.post(
      authEndpoint,
      { document, password }
    )).data;
    dispatch({ type: Action.LoadToken, value: accessToken });
  }, []);

  const onSignOut = useCallback(async () => {
    dispatch({ type: Action.ClearTokens })
  }, []);

  const onRegister = useCallback(async (user: any) => {
    alert('register user')
  }, []);

  const onLoadUser = useCallback(async () => {
    const user = (await axios.get(`${userEndpoint}/me`, {
      headers: { 'Authorization': `Bearer ${state.token}` }
    })).data;
    dispatch({
      type: Action.LoadUser,
      value: user
    });
  }, [state.token]);

  return {
    state,
    onSignIn,
    onSignOut,
    onLoadUser,
    onRegister
  };
};
