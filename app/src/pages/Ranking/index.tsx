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
  IonImg,
  IonLabel,
  IonChip,
  IonCard,
  IonButtons,
  IonToggle
} from '@ionic/react'

import { useDarkTheme } from '../../hooks'
import RankingCard from '../../components/RankingCard'
import './style.scss'

const Ranking: React.FC = () => {
  const ranking = [
    {
      id: 1,
      name: 'Pepito Pérez',
      points: 37657625,
      profileImg: require('../../assets/img/character1.png'),
      rankingPosition: 1,
      capital: 38657
    },
    {
      id: 2,
      name: 'Sara Jaramillo',
      points: 62525252,
      profileImg: require('../../assets/img/character5.png'),
      rankingPosition: 2,
      capital: 56324
    },
    {
      id: 3,
      name: 'Lucas Cardona',
      points: 72627862,
      profileImg: require('../../assets/img/character2.png'),
      rankingPosition: 3,
      capital: 42434
    },
    {
      id: 4,
      name: 'Laura B',
      points: 23538694,
      profileImg: require('../../assets/img/character4.png'),
      rankingPosition: 4,
      capital: 51467
    },
    {
      id: 5,
      name: 'Sofia D',
      points: 49386501,
      profileImg: require('../../assets/img/character3.png'),
      rankingPosition: 5,
      capital: 21467
    },
    {
      id: 6,
      name: 'Juliana L',
      points: 34459350,
      profileImg: require('../../assets/img/character6.png'),
      rankingPosition: 6,
      capital: 39815
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
          <IonRow className="backgnd-ranking">
            <IonCol>
              <IonRow className="header-rank">
                <IonCol className="fst col-rank">
                  <IonRow>
                    <IonImg className="medal" src={require('../../assets/img/first.png')}></IonImg>
                  </IonRow>
                  <IonRow>
                    <IonChip>
                      <IonImg className="coin" src={require('../../assets/img/coin.png')}></IonImg>
                      <IonLabel color="warning" className="label-ranking">546467</IonLabel>
                    </IonChip>
                  </IonRow>
                </IonCol>
                <IonCol className="snd col-rank">
                  <IonImg className="medal" src={require('../../assets/img/second.png')}></IonImg>
                </IonCol>
                <IonCol className="trd col-rank">
                  <IonImg className="medal" src={require('../../assets/img/third.png')}></IonImg>
                </IonCol>
              </IonRow>
              <IonRow>
                {ranking.map((r) => (
                  <IonCol key={r.id} size="12" sizeMd="6" sizeLg="4">
                    <RankingCard {...r} />
                  </IonCol>
                ))}
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Ranking
