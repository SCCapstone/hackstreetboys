import { Router, Switch, Route, useParams } from "react-router-dom";
import history from '../History';
import {
  IonApp,
  IonHeader,
  IonContent,
  IonPage,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import Header from '../components/Header'
import SideBar from '../components/SideBar';
import { menuOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { User } from '../models/User';

import { useContext } from 'react';
import {Context, useGlobalContext} from '../components/Context';

function Loading() {
  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header />
            <IonContent className="ion-padding">
              <IonHeader> Loading... </IonHeader>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default Loading;