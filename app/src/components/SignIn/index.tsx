import React, { useCallback, useEffect } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonAlert,
  IonLoading,
} from '@ionic/react';
import {
  person,
  key
} from 'ionicons/icons';
import { useDictionary } from 'use-dictionary';

import './style.scss';

interface SignInProps {
  token?: string
  onSignIn: (document: string, password: string) => Promise<void>
  onLoadUser: () => Promise<void>
  onNavigateToRegister: () => void
  onNavigateToHome: () => void
}

const initialState = {
  document: '',
  password: '',
  showAlert: false,
  showSignAlert: false,
  showLoading: false,
}

const SignIn: React.FC<SignInProps> = ({
  token,
  onSignIn,
  onLoadUser,
  onNavigateToHome,
  onNavigateToRegister
}) => {
  const {
    state,
    onUpdateValue
  } = useDictionary(initialState)

  const onAuthenticate = useCallback(async () => {
    if (!state.document || !state.password) return onUpdateValue('showAlert', true);
    onUpdateValue('showLoading', true);
    try {
      await onSignIn(state.document, state.password);
    } catch {
      onUpdateValue('showLoading', false);
      onUpdateValue('showSignAlert', true);
    }
  }, [state.document, state.password, onSignIn, onUpdateValue]);

  useEffect(function() {
    if (token) {
      onLoadUser()
        .then(() => onNavigateToHome())
        .catch(() => {
          onUpdateValue('showLoading', false);
          onUpdateValue('showSignAlert', true);
        })
    }
  }, [token, onLoadUser, onNavigateToHome, onUpdateValue])

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Authenticate user</IonCardTitle>
      </IonCardHeader>
      <IonItem>
        <IonLabel
          mode='ios'
          position="floating"
          className='ion-text-left ion-padding-start'
        >
          Document
        </IonLabel>
        <IonInput
          type='text'
          value={state.document}
          onIonChange={(e) => onUpdateValue('document', e.detail.value || '')}
        >
          <IonIcon icon={person}></IonIcon>
        </IonInput>
      </IonItem>
      <IonItem>
        <IonLabel
          mode='ios'
          position="floating"
          className='ion-text-left ion-padding-start'
        >
          Password
        </IonLabel>
        <IonInput
          type='password'
          value={state.password}
          onIonChange={(e) => onUpdateValue('password', e.detail.value || '')}
        >
          <IonIcon icon={key}></IonIcon>
        </IonInput>
      </IonItem>
      <IonGrid class='ion-padding'>
        <IonRow>
          <IonCol>
            <IonButton
              color="secondary"
              onClick={onAuthenticate}
            >
              Sign In
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              color='light'
              onClick={onNavigateToRegister}
            >
              Register
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonAlert
        isOpen={state.showAlert}
        onDidDismiss={() => onUpdateValue('showAlert', false)}
        header='Missing data'
        message='Document and password are required.'
        buttons={['Okey']}
      />
      <IonAlert
        isOpen={state.showSignAlert}
        onDidDismiss={() => onUpdateValue('showSignAlert', false)}
        header='Error'
        message={'Document/Password is invalid, please try again.'}
        buttons={['Okey']}
      />
      <IonLoading
        isOpen={state.showLoading}
        onDidDismiss={() => onUpdateValue('showLoading', false)}
        message={'Please wait...'}
      />
    </IonCard>
  )
};

export default SignIn;
