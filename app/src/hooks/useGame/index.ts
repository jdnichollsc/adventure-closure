import { useState, useEffect } from 'react'
import { Game, Types } from 'phaser'

export const useGame = function (
  config: Types.Core.GameConfig,
  parent: HTMLDivElement | null
): Game | undefined {
  const [game, setGame] = useState<Game>()
  useEffect(() => {
    if (!parent) return
    const newGame = new Game({ ...config, parent })
    setGame(newGame)

    return () => newGame.destroy(true)
  }, [config, parent])

  return game
}