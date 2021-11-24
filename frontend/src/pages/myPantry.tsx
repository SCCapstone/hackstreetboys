import './myPantry.css';


import {
    IonApp,
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonPage,
    IonTitle,
    IonToolbar,
  } from '@ionic/react';

import { Router, Switch } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { menuOutline } from 'ionicons/icons';
import React from 'react';
import { Pantry } from '../models/Pantry';

function MyPantry() {
  const [pantry, setPantry] = React.useState<Pantry>({
    id: 1,
    user: "Quinn Biscuit",
    fruits: ["Apple"],
    vegetables: ["Lettuce"],
    meats: ["Chicken"],
    spices: ["Garlic Powder"],
    description: "This is a basic pantry"  
  })
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
              <h1>Welcome to your pantry! Here you can see what ingredients you have!</h1>
              <IonList> {/* FRUIT LIST */}
                <IonListHeader>
                  <h1>Fruits</h1>
                </IonListHeader>
                <IonItem>
                  <IonAvatar slot="start">
                    <img src=""></img>
                  </IonAvatar>
                  <IonLabel>
                    <h2>{pantry.fruits}</h2>
                  </IonLabel>
                </IonItem>
              </IonList>
              <IonList> {/* VEGETABLE LIST */}
                <IonListHeader>
                  <h1>Vegetables</h1>
                </IonListHeader>
                <IonItem>
                  <IonAvatar slot="start">
                    <img src=""></img>
                  </IonAvatar>
                  <IonLabel>
                    <h2>{pantry.vegetables}</h2>
                  </IonLabel>
                </IonItem>
              </IonList>
              <IonList> {/* MEATS LIST */}
                <IonListHeader>
                  <h1>Meats</h1>
                </IonListHeader>
                <IonItem>
                  <IonAvatar slot="start">
                    <img src=""></img>
                  </IonAvatar>
                  <IonLabel>
                    <h2>{pantry.meats}</h2>
                  </IonLabel>
                </IonItem>
              </IonList>
              <IonList> {/* VEGETABLE LIST */}
                <IonListHeader>
                  <h1>Spices</h1>
                </IonListHeader>
                <IonItem>
                  <IonAvatar slot="start">
                    <img src=""></img>
                  </IonAvatar>
                  <IonLabel>
                    <h2>{pantry.spices}</h2>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
    );
}

export default MyPantry;