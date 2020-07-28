import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { gameControllerOutline, golfOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import { StoreProvider } from './context';
import { PrivateRoute } from './components'; 
import { Login, Game, Ranking } from './pages';


const App: React.FC = () => {
  return (
    <StoreProvider>
      <IonApp>
        <IonReactRouter>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/" render={() => <Redirect to="/login" />} exact />
            <IonTabs>
              <IonRouterOutlet>
                <PrivateRoute path="/game" component={Game} exact />
                <PrivateRoute path="/ranking" component={Ranking} exact />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="game" href="/game">
                  <IonIcon icon={gameControllerOutline} />
                  <IonLabel>Game</IonLabel>
                </IonTabButton>
                <IonTabButton tab="ranking" href="/ranking">
                  <IonIcon icon={golfOutline} />
                  <IonLabel>Ranking</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </Switch>
        </IonReactRouter>
      </IonApp>
    </StoreProvider>
  );
};

export default App;
