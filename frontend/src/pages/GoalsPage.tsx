import './GoalsPage.css';
//import Chart from "react-google-charts";
import Chart from '../components/Chart'
import LineChart from '../components/LineChart'
import PieChart from '../components/PieChartFilterable';
import {
    IonApp,
    IonContent,
    IonPage,
    IonButton,
    IonCardContent,
  } from '@ionic/react';

import { Router, Switch, Route, Link } from "react-router-dom";
//import { Router, Switch, Route, useParams } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
//import Dashboard from '../components/Dashboard';
import { menuOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';

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
        <Link to="/mygoals"><IonButton>
              My Goals 
            </IonButton>
            </Link>

            <IonCardContent>
              <Chart ></Chart>
            </IonCardContent>

            <IonCardContent>
              <LineChart ></LineChart>
            </IonCardContent>

            <IonCardContent>
              <PieChart ></PieChart>
            </IonCardContent>

      </IonContent> 
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default GoalsPage;