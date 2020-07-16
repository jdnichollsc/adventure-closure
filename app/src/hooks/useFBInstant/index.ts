import { Reducer, useEffect, useReducer, useCallback } from 'react'

import { FBInstantState, FBInstantAction, Action } from './types';
import { reducer, initialState } from './reducer';

const ERROR_NOT_INITIALIZED = 'FBInstant is not initialized'

export function useFBInstant (initState = initialState) {
  const [state, dispatch] = useReducer<Reducer<FBInstantState, FBInstantAction>>(reducer, initState)

  useEffect(function() {
    FBInstant.initializeAsync()
      .then(function() {
        dispatch({ type: Action.Initialize })
      });
    return FBInstant.quit
  }, [])

  const onLoadingProgress = useCallback((percentage: number) => {
    FBInstant.setLoadingProgress(percentage)
    dispatch({ type: Action.Progress, value: percentage })
  }, [])

  const onStartGame = useCallback(async () => {
    if (state.initialized) {
      try {
        await FBInstant.startGameAsync()
      } catch (error) {
        dispatch({ type: Action.Error, value: error })
      }
    } else {
      throw new Error(ERROR_NOT_INITIALIZED)
    }
  }, [state.initialized])

  return {
    ...state,
    onLoadingProgress,
    onStartGame,
  }
}
