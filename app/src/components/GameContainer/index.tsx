import React, { useRef } from 'react'

import { useGame } from '../../hooks/useGame'
import { gameConfig } from '../../game'

interface ContainerProps {
  onStartGame: () => void
  onLoadingProgress: (percentage: number) => void
}

const GameContainer: React.FC<ContainerProps> = () => {
  const parentEl = useRef<HTMLDivElement>(null)
  useGame(gameConfig, parentEl.current)

  return (
    <div ref={parentEl} className="container">
    </div>
  );
};

export default GameContainer;
