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
import LoginForm from '../components/LoginForm';

const DOMAIN = "http://localhost:8080";

function Login() {
    useEffect(() => {
        document.title = "Login";
      }, []);
    return (
        <Router history={history}>
            <Switch>
                <IonApp>
                    <SideBar />
                    <IonPage className="ion-page" id="main-content">
                        <Header />
                        <IonContent className="ion-padding">
                            <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Login</h1></IonText>
                            <IonText data-testid="login-register-link"><h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Don't have an account? <Link to="/register">Register</Link></h2></IonText>
                            <LoginForm/>
                    </IonContent>
                </IonPage>
            </IonApp>
        </Switch>
        </Router >
    );
}

export default Login;