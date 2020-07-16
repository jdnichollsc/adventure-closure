import {
  Action,
  FBInstantAction,
  FBInstantState
} from './types'

export const initialState: FBInstantState = {
  initialized: false,
  started: false,
  progress: 0
}

export function reducer (
  state = initialState,
  action?: FBInstantAction
): FBInstantState {
  switch (action?.type) {
    case Action.Initialize:
      return { ...state, initialized: true }
    case Action.Start:
      return { ...state, started: true }
    case Action.Progress:
      return { ...state, progress: action.value }
    case Action.Error:
      return { ...state, error: action.value }
    default:
      return state
  }
}
