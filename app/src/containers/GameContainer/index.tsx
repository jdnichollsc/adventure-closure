import React, { useRef } from 'react'

import { useRealtimeGame } from '../../hooks'
import gameConfig from '../../game'

interface ContainerProps {
  onStartGame: () => void
  onLoadingProgress: (percentage: number) => void
}

const GameContainer: React.FC<ContainerProps> = () => {
  const parentEl = useRef<HTMLDivElement>(null)
  useRealtimeGame(gameConfig, parentEl)

  return (
    <div ref={parentEl} className="container">
    </div>
  );
};

export default GameContainer
