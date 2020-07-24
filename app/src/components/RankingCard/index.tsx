import React from 'react'
import {
  IonCard,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonImg,
  IonChip
} from '@ionic/react'
import {
  createAnimatableComponent
} from '@proyecto26/animatable-component-react'

import './style.scss'

interface RankingCardProps {
  id: number
  name: string
  points: number
  profileImg: string
  rankingPosition: number,
  capital: number
}

const AnimatableIonCard = createAnimatableComponent(IonCard)

const RankingCard: React.FC<RankingCardProps> = ({
  id,
  name,
  points,
  profileImg,
  rankingPosition,
  capital
}) => {
  return (
    <AnimatableIonCard
      animation='fadeInUp'
      delay={200 * id}
      duration={1000}
      fill='forwards'
      composite='accumulate'
      autoPlay
      className='ranking-card'
    >
      <IonItem className="item">
        <div className="ranking" slot="start">
          <IonLabel color="danger" className="label-ranking">{rankingPosition}.</IonLabel>
          {/**
           * <IonImg className="badge-img" src={require('../../assets/img/medal.png')}>
          </IonImg> */}
        </div>

        <IonThumbnail>
          <img src={profileImg} alt='Profile' />
        </IonThumbnail>
        <div>
          <IonLabel color="primary" className="label-name">{name}</IonLabel>
          <IonLabel color="primary" className="label-points">Score: {points} pts</IonLabel>
        </div>
        <IonChip slot="end">
          <IonImg className="coin" src={'/assets/img/coin.png'}>
          </IonImg>
          <IonLabel color="warning" className="label-ranking">{capital}</IonLabel>
        </IonChip>
      </IonItem>
    </AnimatableIonCard>
  )
}

export default RankingCard