import React, { useState, useCallback, useEffect } from 'react';
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

interface SignInProps {
  token?: string
  onSignIn: (document: string, password: string) => Promise<void>
  onLoadUser: () => Promise<void>
  onNavigateToRegister: () => void
  onNavigateToHome: () => void
}

const SignIn: React.FC<SignInProps> = ({
  token,
  onSignIn,
  onLoadUser,
  onNavigateToHome,
  onNavigateToRegister
}) => {
  const [document, setDocument] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [showSignAlert, setShowSignAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const loadUserInfo = async () => {
    try {
      await onLoadUser();
      onNavigateToHome();
    } catch {
      setShowLoading(false);
      setShowSignAlert(true);
    }
  };

  const onAuthenticate = useCallback(async () => {
    if (!document || !password)
      return setShowAlert(true);
    setShowLoading(true);
    try {
      await onSignIn(document, password);
    } catch {
      setShowSignAlert(true);
    }
  }, [document, password]);

  useEffect(function() {
    if (token)
      loadUserInfo();
  }, [token])

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
          value={document}
          onIonChange={(e) => setDocument(e.detail.value || '')}
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
          value={password}
          onIonChange={(e) => setPassword(e.detail.value || '')}
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
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header='Missing data'
        message='Document and password are required.'
        buttons={['Okey']}
      />
      <IonAlert
        isOpen={showSignAlert}
        onDidDismiss={() => setShowSignAlert(false)}
        header='Error'
        message={'Document/Password is invalid, please try again.'}
        buttons={['Okey']}
      />
      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
      />
    </IonCard>
  )
};

export default SignIn;
