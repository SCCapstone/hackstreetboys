/*
  Not used.
*/

import './myReviews.css';

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
import SideBar from '../components/SideBar';
import { menuOutline } from 'ionicons/icons';
import { useEffect } from 'react';


const DOMAIN = "http://localhost:8080";

function MyReviews() {
  useEffect(() => {
    document.title = "My Reviews";
  }, []);
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
        <h1>Create your own reviews, or search for others'! Coming soon!</h1>
      </IonContent>
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default MyReviews;