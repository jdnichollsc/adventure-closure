import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { useFBInstant } from '../../hooks/useFBInstant';
import GameContainer from '../../components/GameContainer';
import './style.scss';

const Game: React.FC = () => {
  const {
    initialized,
    started,
    error,
    progress,
    onStartGame,
    onLoadingProgress,
  } = useFBInstant()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Adventure Closure</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">The game</IonTitle>
          </IonToolbar>
        </IonHeader>
        <GameContainer
          onStartGame={onStartGame}
          onLoadingProgress={onLoadingProgress}
        />
      </IonContent>
    </IonPage>
  );
};

export default Game;
