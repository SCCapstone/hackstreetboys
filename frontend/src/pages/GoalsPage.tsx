import './GoalsPage.css';
//import Chart from "react-google-charts";

import Chart1 from '../components/Chart'

import {
    IonApp,
    IonContent,
    IonPage,
  } from '@ionic/react';

import { Router, Switch } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
//import Dashboard from '../components/Dashboard';
import Header from '../components/Header';

//import React from 'react';
//import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';


function GoalsPage() {
    return (
        <Router history={history}>
            <Switch>
                <IonApp>
    <SideBar />
    <IonPage className="ion-page" id="main-content">
     <Header/>
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