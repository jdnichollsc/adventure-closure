import React, { useCallback } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useHistory } from "react-router-dom";

import { useAuth } from '../../hooks';
import { LoginContainer } from '../../containers';
import './style.scss';

const Login: React.FC = () => {
  const { state, onSignIn, onRegister, onLoadUser } = useAuth()
  const history = useHistory()
  const onNavigateToHome = useCallback(() => {
    history.replace('/game')
  }, [history])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false} fullscreen={true}>
        <LoginContainer
          token={state.token}
          onSignIn={onSignIn}
          onRegister={onRegister}
          onLoadUser={onLoadUser}
          onNavigateToHome={onNavigateToHome}
        />
      </IonContent>
    </IonPage>
  )
}

export default Login
