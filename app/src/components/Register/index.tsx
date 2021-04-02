import React, { useCallback } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonAlert,
  IonLoading,
} from '@ionic/react';
import {
  key,
  mailOutline,
  documentTextOutline,
  personCircleOutline,
  peopleCircleOutline,
  lockClosedOutline
} from 'ionicons/icons';
import { useDictionary } from 'use-dictionary';

import { IUser, UserStatus } from '../../models';
import Input from '../Input';
import TermsAndConditions from '../TermsAndConditions';
import './style.scss';

interface RegisterProps {
  onRegister: (user: IUser) => Promise<void>
  onNavigateToSignIn: () => void
}

const newUser = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: '',
}

const initialState = {
  showAlert: false,
  showLoading: false,
  alertHeader: 'Error',
  alertMessage: '',
  termsAndConditions: false,
  showTermsAndConditions: false
}

const Register: React.FC<RegisterProps> = ({
  onRegister,
  onNavigateToSignIn
}) => {
  const {
    state: user,
    onUpdateValue: onUpdateUserValue,
    onClear: onClearUser
  } = useDictionary(newUser)
  const {
    state,
    onUpdateValue
  } = useDictionary(initialState)

  const onConfirmTerms = useCallback(async (confirm: boolean) => {
    onUpdateValue('showTermsAndConditions', false)
    if (!confirm) {
      onUpdateValue(
        'alertMessage',
        'Please read and accept the terms and conditions to proceed with your new account'
      )
      return onUpdateValue('showAlert', true)
    }
    onUpdateValue('termsAndConditions', true)
    try {
      onUpdateValue('showLoading', true)
      await onRegister({
        ...user as any,
        termsAndConditions: true,
        status: UserStatus.Active
      })
      onUpdateValue('alertHeader', 'Success')
      onUpdateValue('alertMessage', 'User created successfully')
      onUpdateValue('showAlert', true)
      onNavigateToSignIn()
      onClearUser()
    } catch (error) {
      onUpdateValue('alertMessage', error.message || 'Error creating user')
      onUpdateValue('showAlert', true)
    } finally {
      onUpdateValue('showLoading', false)
    }
  }, [user, onRegister, onUpdateValue, onNavigateToSignIn, onClearUser])

  const onCreate = useCallback(() => {
    if (state.termsAndConditions) {
      onConfirmTerms(true)
    } else {
      onUpdateValue('showTermsAndConditions', true)
    }
  }, [state, onConfirmTerms, onUpdateValue])

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Create user</IonCardTitle>
        </IonCardHeader>
        <IonGrid class='fields ion-padding'>
          <IonRow>
            <IonCol size='12' sizeMd='6'>
              <Input
                required
                type='text'
                label='Document'
                value={user.id}
                warning='Document is required *'
                onChange={(value) => onUpdateUserValue('id', value)}
              >
                <IonIcon icon={documentTextOutline}></IonIcon>
              </Input>
            </IonCol>
            <IonCol size='12' sizeMd='6'>
              <Input
                required
                type='text'
                label='First name'
                autocomplete='given-name'
                value={user.firstName}
                warning='First name is required *'
                onChange={(value) => onUpdateUserValue('firstName', value)}
              >
                <IonIcon icon={personCircleOutline}></IonIcon>
              </Input>
            </IonCol>
            <IonCol size='12' sizeMd='6'>
              <Input
                required
                type='text'
                label='Last name'
                autocomplete='family-name'
                value={user.lastName}
                warning='Last name is required *'
                onChange={(value) => onUpdateUserValue('lastName', value)}
              >
                <IonIcon icon={peopleCircleOutline}></IonIcon>
              </Input>
            </IonCol>
            <IonCol size='12' sizeMd='6'>
              <Input
                required
                type='email'
                label='Email'
                value={user.email}
                autocomplete='email'
                warning='Email is required *'
                onChange={(value) => onUpdateUserValue('email', value)}
              >
                <IonIcon icon={mailOutline}></IonIcon>
              </Input>
            </IonCol>
            <IonCol size='12' sizeMd='6'>
              <Input
                required
                type='password'
                label='Password'
                value={user.password}
                warning='Password is required *'
                onChange={(value) => onUpdateUserValue('password', value)}
              >
                <IonIcon icon={key}></IonIcon>
              </Input>
            </IonCol>
            <IonCol size='12' sizeMd='6'>
              <Input
                required
                type='password'
                label='Repeat password'
                value={user.repeatPassword}
                warning='Repeat password is required *'
                onChange={(value) => onUpdateUserValue('repeatPassword', value)}
              >
                <IonIcon icon={lockClosedOutline}></IonIcon>
              </Input>
            </IonCol>
          </IonRow>
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
      <IonAlert
        isOpen={state.showAlert}
        onDidDismiss={() => onUpdateValue('showAlert', false)}
        header={state.alertHeader}
        message={state.alertMessage}
        buttons={['Okey']}
      />
      <IonLoading
        isOpen={state.showLoading}
        onDidDismiss={() => onUpdateValue('showLoading', false)}
        message={'Creating user...'}
      />
      <TermsAndConditions
        onClosed={onConfirmTerms}
        isOpen={state.showTermsAndConditions}
      />
    </>
  );
};

export default Register;
