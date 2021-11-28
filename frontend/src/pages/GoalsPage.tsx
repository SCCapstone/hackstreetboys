import './GoalsPage.css';
//import Chart from "react-google-charts";
import Chart1 from '../components/Chart'
import {
    IonApp,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
  } from '@ionic/react';

import { Router, Switch, Route, Link } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
//import Dashboard from '../components/Dashboard';
import { menuOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
//import {Link } from "react-router-dom";
import Header from '../components/Header';


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
        <p></p>
        <Link to="/mygoals"><IonButton>
              My Goals 
            </IonButton>
            </Link>
      </IonContent> 
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default GoalsPage;