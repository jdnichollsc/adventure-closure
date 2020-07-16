import { act, renderHook } from '@testing-library/react-hooks'

import { useFBInstant } from '..'

describe('useFBInstant hook', () => {
  it('should handle useEffect hook', async () => {
    const spyInitialize = jest.spyOn(global.FBInstant, 'initializeAsync').mockResolvedValueOnce()
    const spyQuit = jest.spyOn(global.FBInstant, 'quit').mockReturnValueOnce()
    const { result, waitForNextUpdate, unmount } = renderHook(() => useFBInstant())

    await waitForNextUpdate()

    expect(spyInitialize).toHaveBeenCalled()
    expect(result.current.initialized).toBeTruthy()

    unmount()

    expect(spyQuit).toHaveBeenCalled()
  })

  it('should handle onLoadingProgress', () => {
    const newProgress = 50
    const { result } = renderHook(() => useFBInstant())

    act(() => result.current.onLoadingProgress(newProgress))
    expect(result.current.progress).toBe(newProgress)
  })

  it('should handle onStartGame', async () => {
    const spyStartGame = jest.spyOn(global.FBInstant, 'startGameAsync').mockResolvedValueOnce()
    const { result } = renderHook(() => useFBInstant({
      initialized: true
    }))

    await act(() => result.current.onStartGame())
    expect(spyStartGame).toHaveBeenCalled()
  })
})
