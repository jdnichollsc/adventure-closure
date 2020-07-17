import React from 'react'
import {
  IonCard,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonImg
} from '@ionic/react'
import {
  createAnimatableComponent
} from '@proyecto26/animatable-component-react'

import './style.css'

interface RankingCardProps {
  id: number
  name: string
  points: number
  profileImg: string
  rankingPosition: number
}

const AnimatableIonCard = createAnimatableComponent(IonCard)

const RankingCard: React.FC<RankingCardProps> = ({
  id,
  name,
  points,
  profileImg,
  rankingPosition
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
        <IonThumbnail slot="start">
          <img src={profileImg} />
        </IonThumbnail>
        <div>
          <IonLabel className="label-name">{name}</IonLabel>
          <IonLabel className="label-points">{points}</IonLabel>
        </div>
        <div className="ranking" slot="end">
          <IonImg slot="end" className="badge-img" src={require('../../assets/img/medal.png')}>
          </IonImg>
          <IonLabel className="label-ranking">{rankingPosition}</IonLabel>
        </div>
      </IonItem>
    </AnimatableIonCard>
  )
}

export default RankingCard