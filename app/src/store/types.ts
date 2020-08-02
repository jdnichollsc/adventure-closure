import { Reducer, Dispatch } from 'react'

export enum Action {
  LoadToken,
  LoadUser,
  ClearTokens
}

export type AuthState = {
  user?: any
  token?: string
}

export type AuthAction = 
  | { type: Action.ClearTokens }
  | { type: Action.LoadToken, value: string }
  | { type: Action.LoadUser, value: any }

export type AuthReducer = Reducer<AuthState, AuthAction>
export type AuthDispatch = Dispatch<AuthAction>

export type ContextProps = [AuthState, AuthDispatch]