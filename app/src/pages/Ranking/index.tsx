import React from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonButtons,
  IonToggle
} from '@ionic/react'

import { useDarkTheme } from '../../hooks'
import RankingCard from '../../components/RankingCard'
import './style.css'

const Ranking: React.FC = () => {
  const ranking = [
    {
      id: 1,
      name: 'Pepito Pérez',
      points: 37657625,
      profileImg: require('../../assets/img/character1.png'),
      rankingPosition: 1
    },
    {
      id: 2,
      name: 'Sara Jaramillo',
      points: 62525252,
      profileImg: require('../../assets/img/character5.png'),
      rankingPosition: 2
    },
    {
      id: 3,
      name: 'Lucas Cardona',
      points: 72627862,
      profileImg: require('../../assets/img/character2.png'),
      rankingPosition: 3
    },
    {
      id: 4,
      name: 'Laura B',
      points: 23538694,
      profileImg: require('../../assets/img/character4.png'),
      rankingPosition: 4
    },
    {
      id: 5,
      name: 'Sofia D',
      points: 49386501,
      profileImg: require('../../assets/img/character3.png'),
      rankingPosition: 5
    },
    {
      id: 6,
      name: 'Juliana L',
      points: 34459350,
      profileImg: require('../../assets/img/character6.png'),
      rankingPosition: 6
    }
  ]

  const { enabled, onToggle } = useDarkTheme()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ranking</IonTitle>
          <IonToggle
            slot="end"
            checked={enabled}
            onIonChange={() => onToggle(!enabled)}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {ranking.map((r) => (
              <IonCol key={r.id} size="12" sizeMd="6" sizeLg="4">
                <RankingCard {...r} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Ranking
