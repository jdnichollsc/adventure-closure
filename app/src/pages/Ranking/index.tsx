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
  IonCard
} from '@ionic/react'

import RankingCard from '../../components/RankingCard'
import './style.css'

const Ranking: React.FC = () => {
  const ranking = [
    {
      id: 1,
      name: 'Pepito',
      points: 223537657625
    },
    {
      id: 2,
      name: 'Sara',
      points: 2262525252
    },
    {
      id: 3,
      name: 'Lucas',
      points: 2272627862
    }
  ]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ranking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            { ranking.map((r) => (
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
