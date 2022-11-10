import './Verify.css';

import {
    IonApp,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonLabel,
    IonPage,
    IonRouterLink,
    IonRow,
    IonText,
  } from '@ionic/react';

import { Link, Router, Switch } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from '../components/Header';

import { useContext, useEffect, useState } from 'react';
import Context from '../components/Context';
import React from 'react';
import { verify } from 'crypto';
import axios from 'axios';

const DOMAIN = "http://localhost:8080";
// const DOMAIN = DOMAIN+"/"

//This is the page the email verifiction will send you to
function Verify() {
    const context = useContext(Context);
    
    const queryParam = new URLSearchParams(window.location.search);
    const code = queryParam.get("code");

    let runIt = 0;
    console.log(code);

    let hasChanged = false;

    interface retString {
        success: boolean
    }

    //D7dsErtnwX2OhXKPSCNtKquf57WLGL53ILolnoEFRCgPIfVaY34UqFjyjbswsvsQ

    function reDirect(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    const [stringBody, setStringBody] = React.useState<retString>({
        success: false
    });
    // useEffect(() => {
    // The link you are emailed will send you here
    const getVerified = () => {
        fetch(DOMAIN+`/v1/auth/verify?code=${code}`)
        .then(data => data.json())
        .then(yo => setStringBody(yo));
        console.log(stringBody)
        
    }
    useEffect(() => {
        getVerified();
    }, [hasChanged])

    //this means verifiation is successful!
        return (
            <Router history={history}>
                <Switch>
                  <IonApp>
                      <SideBar/>
                      <IonPage className="ion-page" id="main-content">
                      <Header/>
                      <IonContent className="ion-padding">
                        <h1>Thank you for verifiying your account! Your account has now been activated!</h1>                                               
                      </IonContent>
                      </IonPage>
                    </IonApp>
                </Switch>
            </Router>
            )
    
}

export default Verify;
