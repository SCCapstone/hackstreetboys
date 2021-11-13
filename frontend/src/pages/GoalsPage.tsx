import './GoalsPage.css';
//import Chart from "react-google-charts";

import Chart1 from '../components/Chart'

import {
    IonApp,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonMenuToggle,
    IonPage,
    IonButtons,
    IonButton,
    IonIcon,
  } from '@ionic/react';

import { Router, Switch, Route } from "react-router-dom";
import history from '../History';

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
import '../theme/variables.css';
import SideBar from '../components/SideBar';
//import Dashboard from '../components/Dashboard';
import { menuOutline } from 'ionicons/icons';

//import React from 'react';
//import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';


function GoalsPage() {
    return (
        <Router history={history}>
            <Switch>
                <IonApp>


    <SideBar />
    <IonPage className="ion-page" id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuToggle>
              <IonButton>
                <IonIcon icon={menuOutline} slot="start" />
              </IonButton>
            </IonMenuToggle>
          </IonButtons>
          <IonTitle>Fridger</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Welcome to your dashboard, Seongho!</h1>

        <Chart1 />

      </IonContent>
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default GoalsPage;