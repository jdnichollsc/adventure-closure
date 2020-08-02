import { useEffect } from 'react'
import { Types } from 'phaser'

import { RealTimeGame } from '../../models'
import { useGame } from '../useGame'
import { useSocket } from '../useSocket'

export function useRealtimeGame (
  config: Types.Core.GameConfig,
  containerRef: React.RefObject<HTMLDivElement>
) {
  const game = useGame(config, containerRef)
  const { socket } = useSocket()
  useEffect(() => {
    if (game && socket) {
      (game as RealTimeGame).socket = socket
    }
  }, [game, socket])
}
