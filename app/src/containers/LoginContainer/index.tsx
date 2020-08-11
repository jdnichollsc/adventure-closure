import React, { useRef, useState, useCallback } from 'react';
import {
  IonSlides,
  IonSlide,
} from '@ionic/react';

import { IUser } from '../../models';
import { SignIn, Register } from '../../components';
import './style.scss';

interface LoginContainerProps {
  token?: string
  onSignIn: (document: string, password: string) => Promise<void>
  onLoadUser: () => Promise<void>
  onRegister: (user: IUser) => Promise<void>
  onScrollToTop: () => void
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
  margin: '0 auto',
}

const LoginContainer: React.FC<LoginContainerProps> = ({
  token,
  onSignIn,
  onRegister,
  onLoadUser,
  onScrollToTop,
  onNavigateToHome,
}) => {
  const slidesRef = useRef<HTMLIonSlidesElement>(null)
  const [slidesHeight, setSlidesHeight] = useState('100%')

  const onNavigateToSignIn = useCallback(() => {
    onScrollToTop()
    setSlidesHeight('100%')
    slidesRef.current?.slideTo(0)
  }, [onScrollToTop, slidesRef])

  const onNavigateToRegister = useCallback(() => {
    onScrollToTop()
    setSlidesHeight('auto')
    slidesRef.current?.slideTo(1)
  }, [onScrollToTop, slidesRef])

  return (
    <IonSlides
      options={slideOptions}
      style={{
        ...slideStyle,
        height: slidesHeight
      }}
      scrollbar={true}
      ref={slidesRef}
    >
      <IonSlide>
        <SignIn
          token={token}
          onSignIn={onSignIn}
          onLoadUser={onLoadUser}
          onNavigateToHome={onNavigateToHome}
          onNavigateToRegister={onNavigateToRegister}
        />
      </IonSlide>
      <IonSlide>
        <Register
          onRegister={onRegister}
          onNavigateToSignIn={onNavigateToSignIn}
        />
      </IonSlide>
    </IonSlides>
  );
};

export default LoginContainer;
