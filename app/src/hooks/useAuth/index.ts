import {
  useCallback,
} from 'react';
import axios, { AxiosError } from 'axios';
import { isArray } from 'lodash';

import { API_DOMAIN } from '../../contants';
import { Action, useStore } from '../../store';
import { IUser } from '../../models';

const authEndpoint = `${API_DOMAIN}/auth`;
const userEndpoint = `${API_DOMAIN}/users`;

export function useAuth () {
  const [state, dispatch] = useStore();

  const onSignIn = useCallback(async (
    document: string,
    password: string,
  ) => {
    const { data: { access_token: accessToken } } = await axios.post(
      authEndpoint,
      { document, password }
    );
    dispatch({ type: Action.LoadToken, value: accessToken });
  }, [dispatch]);

  const onSignOut = useCallback(async () => {
    dispatch({ type: Action.ClearTokens })
  }, [dispatch]);

  const onRegister = useCallback(async (user: IUser) => {
    try {
      await axios.post(userEndpoint, user)
    } catch (error) {
      const { message } = (error as AxiosError).response?.data || {}
      const errorMessage = isArray(message) ? message[0] : message
      throw new Error(errorMessage)
    }
  }, []);

  const onLoadUser = useCallback(async () => {
    const { data: user } = await axios.get(`${userEndpoint}/me`, {
      headers: { 'Authorization': `Bearer ${state.token}` }
    });
    dispatch({
      type: Action.LoadUser,
      value: user
    });
  }, [state.token, dispatch]);

  return {
    state,
    onSignIn,
    onSignOut,
    onLoadUser,
    onRegister
  };
};
