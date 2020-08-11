import React, { useRef, useCallback } from 'react';
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
  const contentRef = useRef<HTMLIonContentElement>(null)
  const { state, onSignIn, onRegister, onLoadUser } = useAuth()
  const history = useHistory()
  const onNavigateToHome = useCallback(() => {
    history.replace('/game')
  }, [history])
  const onScrollToTop = useCallback(() => {
    contentRef.current?.scrollToTop(200)
  }, [contentRef])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} fullscreen>
        <LoginContainer
          token={state.token}
          onSignIn={onSignIn}
          onRegister={onRegister}
          onLoadUser={onLoadUser}
          onScrollToTop={onScrollToTop}
          onNavigateToHome={onNavigateToHome}
        />
      </IonContent>
    </IonPage>
  )
}

export default Login
