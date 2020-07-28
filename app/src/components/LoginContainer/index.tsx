import React, { useRef, useCallback } from 'react';
import {
  IonSlides,
  IonSlide,
} from '@ionic/react';

import SignIn from './SignIn';
import Register from './Register';
import './style.scss';

interface LoginContainerProps {
  token?: string
  onSignIn: (document: string, password: string) => Promise<void>
  onLoadUser: () => Promise<void>
  onRegister: (user: any) => Promise<void>
  onNavigateToHome: () => void
}

// https://swiperjs.com/
const slideOptions = {
  direction: 'horizontal',
  // autoHeight: true,
  slidesPerView: 1,
  allowTouchMove: false
};

const slideStyle = {
  width: '100%',
  height: '100%',
  margin: '0 auto',
}

const LoginContainer: React.FC<LoginContainerProps> = ({
  token,
  onSignIn,
  onRegister,
  onLoadUser,
  onNavigateToHome,
}) => {
  const slidesRef = useRef<HTMLIonSlidesElement>(null)

  const slideTo = useCallback(
    (slide: number) => {
      slidesRef.current?.slideTo(slide)
    },
    [slidesRef],
  )

  return (
    <IonSlides
      options={slideOptions}
      style={slideStyle}
      scrollbar={true}
      ref={slidesRef}
    >
      <IonSlide>
        <SignIn
          token={token}
          onSignIn={onSignIn}
          onLoadUser={onLoadUser}
          onNavigateToHome={onNavigateToHome}
          onNavigateToRegister={() => slideTo(1)}
        />
      </IonSlide>
      <IonSlide>
        <Register
          onRegister={onRegister}
          onNavigateToSignIn={() => slideTo(0)}
        />
      </IonSlide>
    </IonSlides>
  );
};

export default LoginContainer;
