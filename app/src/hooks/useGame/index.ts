import { useState, useEffect } from 'react'
import { Game, Types } from 'phaser'

export function useGame (
  config: Types.Core.GameConfig,
  container: HTMLDivElement | null
): Game | undefined {
  const [game, setGame] = useState<Game>()
  useEffect(() => {
    if (container) {
      const newGame = new Game({ ...config, parent: container })
      setGame(newGame)

      return () => newGame.destroy(true)
    }
  }, [config, container])

  return game
}