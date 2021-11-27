import './MyGoals.css';
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
    IonCard,
    IonCol,
    IonFab,
    IonFabButton,
    IonGrid,
    IonRow,
    IonText,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
  } from '@ionic/react';

import { Router, Switch, Route, Link } from "react-router-dom";
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
import { add, menuOutline } from 'ionicons/icons';
import React from 'react';

//import React from 'react';
//import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';
//import React, { useState, useEffect } from 'react';
import {Goal} from '../Goal';

interface GoalExample {
    goal: Goal,
  }

function MyGoals() {
    const [goals, setGoals] = React.useState([{
        id: 1,
        endGoal: "Lose",
        calories: 500,
        carbohydrates: 500,
        protein: 300,
        fat: 250,
        currentWeight: 400.0,
        goalWeight: 180.0
    }]);
    React.useEffect(() => {
        fetch('http://localhost:8080/v1/user/goals/')
        .then(res => res.json())
        .then(setGoals)
    }, [])
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
            <Link to="/GoalsPage">
            <IonButton>
              Return to Dashboard 
            </IonButton>
            </Link>
        <h1>Here you are able to view your goals!</h1>
            <IonContent className="ion-padding">
                  <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Goals</h1></IonText>
                  <IonGrid>
                    <IonRow>
                      {goals.map(goal =>
                        <IonCol sizeXs="12" sizeSm="6" key={goal.id}>
                         <Link to={`/goal/${goal.id}`}>
                          <IonCard button routerDirection="forward">
                            <IonCardHeader>

                              <IonCardTitle>{goal.id}</IonCardTitle>
                              <IonCardSubtitle>End Goal: {goal.endGoal}</IonCardSubtitle>
                            </IonCardHeader>
                          </IonCard>
                          </Link>
                        </IonCol>
                      )}
                    </IonRow>
                  </IonGrid>
                  <Link to="/goal/add">
                  <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton>
                      <IonIcon icon={add} />
                    </IonFabButton>
                  </IonFab>
                  </Link>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
    );
}

export default MyGoals;