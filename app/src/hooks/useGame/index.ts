import { useState, useEffect } from 'react'
import { Game, Types } from 'phaser'

export function useGame (
  config: Types.Core.GameConfig,
  container: HTMLDivElement | null
): Game | undefined {
  const [game, setGame] = useState<Game>()
  useEffect(function () {
    if (container && !game) {
      const newGame = new Game({ ...config, parent: container })
      setGame(newGame)
    }
    return () => {
      game?.destroy(false)
    }
  }, [config, container, game])

  return game
}