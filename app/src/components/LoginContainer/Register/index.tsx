import React, { useCallback } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonInput,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/react';

interface RegisterProps {
  onRegister: (user: any) => Promise<void>
  onNavigateToSignIn: () => void
}

const Register: React.FC<RegisterProps> = ({
  onNavigateToSignIn
}) => {
  const onCreate = useCallback(() => {

  }, [])

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Register user</IonCardTitle>
      </IonCardHeader>
      <IonItem class='ion-margin'>
        <IonInput
          placeholder='Document'
          type='text'
        >
          <IonIcon name='person'></IonIcon>
        </IonInput>
      </IonItem>
      <IonItem class='ion-margin'>
        <IonInput
          placeholder='Password'
          type='password'
        >
          <IonIcon name='key'></IonIcon>
        </IonInput>
      </IonItem>
      <IonGrid class='ion-padding'>
        <IonRow>
          <IonCol>
            <IonButton
              color="light"
              onClick={onNavigateToSignIn}
            >
              Cancel
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              color='secondary'
              onClick={onCreate}
            >
              Create
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default Register;
