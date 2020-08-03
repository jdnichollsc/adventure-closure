import React, { useCallback } from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { logOutOutline } from 'ionicons/icons'

import { useFBInstant, useAuth } from '../../hooks'
import { GameContainer } from '../../containers'
import './style.scss'

const Game: React.FC = () => {
  const {
    onStartGame,
    onLoadingProgress,
  } = useFBInstant()
  const { onSignOut } = useAuth()
  const history = useHistory()

  const onLogOut = useCallback(async () => {
    await onSignOut()
    history.replace('/login')
  }, [onSignOut, history])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Adventure Closure</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onLogOut}>
              <IonIcon size='large' icon={logOutOutline} />
            </IonButton>
          </IonButtons>
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
