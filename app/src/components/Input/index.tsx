import React, { useState } from 'react';
import {
  IonItem,
  IonInput,
  IonLabel,
} from '@ionic/react';
import {
  AnimatableComponent,
} from '@proyecto26/animatable-component-react';

interface InputProps {
  label: string
  warning?: string
  type: HTMLIonInputElement['type']
  value: HTMLIonInputElement['value']
  required: HTMLIonInputElement['required']
  onChange: (value: string) => void
}


const Input: React.FC<InputProps> = ({
  type,
  value,
  label,
  warning,
  required,
  children,
  onChange
}) => {
  const [showWarning, setShowWarning] = useState(false)
  return (
    <IonItem>
      <IonLabel
        mode='ios'
        position="floating"
        className='ion-text-left ion-padding-start'
      >
        {label}  
      </IonLabel>
      <IonInput
        required={required}
        type={type || 'text'}
        value={value}
        onIonBlur={() => required && setShowWarning(!value)}
        onIonChange={(e) => onChange(e.detail.value || '')}
      >
        {children}
      </IonInput>
      {showWarning && (
        <AnimatableComponent
          autoPlay
          animation='pulsate-fwd'
          duration={1000}
        >
          <IonLabel
            mode='ios'
            color="danger"
            position="stacked"
            className='ion-text-left ion-padding-start'
          >
            {warning}
          </IonLabel>
        </AnimatableComponent>
      )}
    </IonItem>
  );
};

export default Input;