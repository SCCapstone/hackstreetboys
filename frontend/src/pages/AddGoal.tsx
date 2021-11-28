import './MyGoals.css';
import { Router, Switch, Route, Link } from "react-router-dom";
import history from '../History';
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
    IonText,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { add, menuOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import GoalForm from '../components/GoalForm';
function AddGoal() {
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
                        <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Add Goal</h1></IonText>
                        <GoalForm/>
                </IonContent>
            </IonPage>
        </IonApp>
    </Switch>
    </Router >
  );
}

export default AddGoal;