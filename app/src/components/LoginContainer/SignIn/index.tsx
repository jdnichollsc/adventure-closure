import React, { useRef, useState, useCallback, useEffect } from 'react';
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
  const mounted = useRef(false)
  const [document, setDocument] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [showSignAlert, setShowSignAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const onAlertDismiss = useCallback(() => {
    if (mounted.current) setShowAlert(false)
  }, [mounted]) 
  const onSignAlertDismiss = useCallback(() => {
    if (mounted.current) setShowSignAlert(false)
  }, [mounted])
  const onLoadingDismiss = useCallback(() => {
    if (mounted.current) setShowLoading(false)
  }, [mounted])

  const onAuthenticate = useCallback(async () => {
    if (!document || !password)
      return setShowAlert(true);
    setShowLoading(true);
    try {
      await onSignIn(document, password);
    } catch {
      setShowSignAlert(true);
    }
  }, [document, password, onSignIn]);

  useEffect(function() {
    if (token) {
      onLoadUser()
        .then(() => onNavigateToHome())
        .catch(() => {
          setShowLoading(false);
          setShowSignAlert(true);
        })
    }
  }, [token, onLoadUser, onNavigateToHome])

  useEffect(function() {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [mounted])

  return (
    <form>
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
          onDidDismiss={onAlertDismiss}
          header='Missing data'
          message='Document and password are required.'
          buttons={['Okey']}
        />
        <IonAlert
          isOpen={showSignAlert}
          onDidDismiss={onSignAlertDismiss}
          header='Error'
          message={'Document/Password is invalid, please try again.'}
          buttons={['Okey']}
        />
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={onLoadingDismiss}
          message={'Please wait...'}
        />
      </IonCard>
    </form>
  )
};

export default SignIn;
