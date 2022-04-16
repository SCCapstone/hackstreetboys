import './CheckEmail.css';

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
    IonTitle,
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

const DOMAIN = "https://api.fridger.recipes/" 
// const DOMAIN = "http://localhost:8080/"

//This is the page the email verifiction will send you to
function CheckEmail() {
    const context = useContext(Context);
    

    //this means verifiation is successful!
        return (
            <Router history={history}>
                <Switch>
                  <IonApp>
                      <SideBar/>
                      <IonPage className="ion-page" id="main-content">
                      <Header/>
                      <IonContent className="ion-padding">
                          <IonText>
                            <img className='center' src='https://raw.githubusercontent.com/SCCapstone/hackstreetboys/main/frontend/src/assets/fridger_banner.png?token=GHSAT0AAAAAABQMYJVTGK3BQ2M3GZMTI2QWYS3EGUA'/>
                            <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Thank you for registering an account with Fridger!</h1></IonText>
                
                            <IonText><h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Please check your email and click the link to verify it!</h2></IonText>
                            <IonText><h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>We're look forward to having you!</h2></IonText>
                          </IonText>                                     
                      </IonContent>
                      </IonPage>
                    </IonApp>
                </Switch>
            </Router>
            )
    
}

export default CheckEmail;
