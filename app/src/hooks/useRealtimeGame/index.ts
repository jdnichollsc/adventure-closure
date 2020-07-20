import { useEffect } from 'react'
import { Types } from 'phaser'

import { RealTimeGame } from '../../models'
import { useGame } from '../useGame'
import { useSocket } from '../useSocket'

export function useRealtimeGame (
  config: Types.Core.GameConfig,
  container: HTMLDivElement | null
) {
  const game = useGame(config, container)
  const { socket } = useSocket()
  useEffect(() => {
    if (game && socket) {
      (game as RealTimeGame).socket = socket
    }
  }, [game, socket])
}
