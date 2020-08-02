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
  IonThumbnail,
  IonToggle
} from '@ionic/react'

import { useDarkTheme } from '../../hooks'
import { RankingCard } from '../../components'
import './style.scss'

const Ranking: React.FC = () => {
  const ranking = [
    {
      id: 1,
      name: 'Pepito Pérez',
      points: 37657625,
      profileImg: '/assets/img/character1.png',
      rankingPosition: 1,
      capital: 38657
    },
    {
      id: 2,
      name: 'Sara Jaramillo',
      points: 62525252,
      profileImg: '/assets/img/character5.png',
      rankingPosition: 2,
      capital: 56324
    },
    {
      id: 3,
      name: 'Lucas Cardona',
      points: 72627862,
      profileImg: '/assets/img/character2.png',
      rankingPosition: 3,
      capital: 42434
    },
    {
      id: 4,
      name: 'Laura B',
      points: 23538694,
      profileImg: '/assets/img/character4.png',
      rankingPosition: 4,
      capital: 51467
    },
    {
      id: 5,
      name: 'Sofia D',
      points: 49386501,
      profileImg: '/assets/img/character3.png',
      rankingPosition: 5,
      capital: 21467
    },
    {
      id: 6,
      name: 'Juliana L',
      points: 34459350,
      profileImg: '/assets/img/character6.png',
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
                <IonCol className="space-img" size="2">
                  <IonThumbnail>
                    <IonImg src={'/assets/img/planet.png'}></IonImg>
                  </IonThumbnail>
                </IonCol>
                <IonCol className="col-rank">
                  <IonRow>
                    <IonImg className="medal" src={'/assets/img/second.png'}></IonImg>
                    <IonThumbnail className="character-img">
                      <img src={'/assets/img/character1.png'} alt='Second position' />
                    </IonThumbnail>
                  </IonRow>
                  <IonRow>
                    <IonLabel className="name-rank" color="light">#2 - Pepito Pérez</IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonChip className="ranking-chip">
                      <IonLabel color="light">546467 pts - </IonLabel>
                      <IonImg className="coin" src={'/assets/img/coin.png'}></IonImg>
                      <IonLabel color="light">546467</IonLabel>
                    </IonChip>
                  </IonRow>
                </IonCol>
                <IonCol className="col-rank">
                  <IonRow>
                    <IonImg className="medal first" src={'/assets/img/first.png'}></IonImg>
                    <IonThumbnail className="character-img">
                      <img src={'/assets/img/character2.png'} alt='First position' />
                    </IonThumbnail>
                  </IonRow>
                  <IonRow>
                    <IonLabel className="name-rank" color="light">#1 - Pepito Pérez</IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonChip className="ranking-chip">
                      <IonLabel color="light">546467 pts - </IonLabel>
                      <IonImg className="coin" src={'/assets/img/coin.png'}></IonImg>
                      <IonLabel color="light">546467</IonLabel>
                    </IonChip>
                  </IonRow>
                </IonCol>
                <IonCol className="col-rank">
                  <IonRow>
                    <IonImg className="medal" src={'/assets/img/third.png'}></IonImg>
                    <IonThumbnail className="character-img">
                      <img src={'/assets/img/character3.png'} alt='Third position' />
                    </IonThumbnail>
                  </IonRow>
                  <IonRow>
                    <IonLabel className="name-rank" color="light">#3 -Pepito Pérez</IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonChip className="ranking-chip">
                      <IonLabel color="light">546467 pts - </IonLabel>
                      <IonImg className="coin" src={'/assets/img/coin.png'}></IonImg>
                      <IonLabel color="light">546467</IonLabel>
                    </IonChip>
                  </IonRow>
                </IonCol>
                <IonCol className="space-img" size="2">
                  <IonThumbnail>
                    <IonImg src={'/assets/img/rocket.png'}></IonImg>
                  </IonThumbnail>
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
