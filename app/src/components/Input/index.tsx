import React, { useState } from 'react';
import {
  IonItem,
  IonInput,
  IonLabel,
} from '@ionic/react';
import {
  createAnimatableComponent,
} from '@proyecto26/animatable-component-react';

interface InputProps {
  label: string
  warning?: string,
  type: HTMLIonInputElement['type'],
  value: HTMLIonInputElement['value'],
  required: HTMLIonInputElement['required'],
  autocomplete?: HTMLIonInputElement['autocomplete'],
  onChange: (value: string) => void
}

const AnimatableIonLabel = createAnimatableComponent(IonLabel)

const Input: React.FC<InputProps> = ({
  type,
  value,
  label,
  warning,
  required,
  children,
  autocomplete,
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
        autocomplete={autocomplete}
        onIonBlur={() => required && setShowWarning(!value)}
        onIonChange={(e) => onChange(e.detail.value || '')}
      >
        {children}
      </IonInput>
      {showWarning && (
        <AnimatableIonLabel
          autoPlay
          animation='pulsate-fwd'
          duration={1000}
          mode='ios'
          color="danger"
          position="stacked"
          className='ion-text-left ion-padding-start'
        >
          {warning}
        </AnimatableIonLabel>
      )}
    </IonItem>
  );
};

export default Input;