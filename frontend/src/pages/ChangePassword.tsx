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
    IonText
} from '@ionic/react';

/* Theme variables */
import '../theme/variables.css';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { add, menuOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';

const DOMAIN = "http://localhost:8080";

function Login() {
    useEffect(() => {
        document.title = "Change Password";
      }, []);
    return (
        <Router history={history}>
            <Switch>
                <IonApp>
                    <SideBar />
                    <IonPage className="ion-page" id="main-content">
                        <Header />
                        <IonContent className="ion-padding">
                            <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Password Reset</h1></IonText>
                            <ChangePasswordForm/>
                    </IonContent>
                </IonPage>
            </IonApp>
        </Switch>
        </Router >
    );
}

export default Login;