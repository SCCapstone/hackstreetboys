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
                            <h1 id='header'><b>Thank you for registering an account with Fridger!</b></h1>
                
                            <h4 id='header'>Please check your email and click the link to verify it!</h4>
                            <h5 id='header'>We're look forward to having you!</h5>
                          </IonText>                                     
                      </IonContent>
                      </IonPage>
                    </IonApp>
                </Switch>
            </Router>
            )
    
}

export default CheckEmail;
