import React from 'react'
import {
  IonCard,
  IonItem,
  IonThumbnail,
  IonLabel
} from '@ionic/react'
import {
  createAnimatableComponent
} from '@proyecto26/animatable-component-react'

interface RankingCardProps {
  id: number
  name: string
  points: number
}

const AnimatableIonCard = createAnimatableComponent(IonCard)

const RankingCard: React.FC<RankingCardProps> = ({
  id
}) => {
  return (
    <AnimatableIonCard
      animation='fadeInUp'
      delay={200*id}
      duration={1000}
      fill='forwards'
      composite='accumulate'
      autoPlay
    >
      <IonItem>
        <IonThumbnail slot="start">
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonThumbnail>
        <IonLabel>Item Thumbnail</IonLabel>
      </IonItem>
    </AnimatableIonCard>
  )
}

export default RankingCard