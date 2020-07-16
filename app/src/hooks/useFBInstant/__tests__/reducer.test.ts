import { reducer, initialState } from '../reducer'
import { Action, FBInstantState } from '../types'

describe('FBInstant reducer', () => {
  it('should return the initial state', () => {
    expect(reducer()).toEqual(initialState)
  })

  it('should handle Initialize action', () => {
    const newState: FBInstantState = {
      ...initialState,
      initialized: true
    }

    expect(reducer(undefined, { type: Action.Initialize })).toEqual(newState)
  })
})