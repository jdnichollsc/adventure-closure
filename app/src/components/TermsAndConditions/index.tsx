import React from 'react';
import {
  IonAlert
} from '@ionic/react'

interface TermsAndConditionsProps {
  isOpen: boolean
  onClosed: (value: boolean) => void
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  isOpen,
  onClosed,
}) => {
  return (
    <IonAlert
      isOpen={isOpen}
      cssClass='termsAndConditions'
      header={'Confirm Terms and Conditions'}
      message={'Message <strong>text</strong>!!!'}
      buttons={[
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => onClosed(false)
        },
        {
          text: 'Confirm',
          handler: () => onClosed(true)
        }
      ]}
    />
  )
}

export default TermsAndConditions