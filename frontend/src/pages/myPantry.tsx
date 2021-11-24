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
    fruits: [["Apple","2"]],
    vegetables: [["Lettuce","7 ounces"]],
    meats: [["Chicken","1 lb"]],
    spices: [["Garlic Powder","5 ounces"]],
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
                    <h2>{pantry.fruits[0][0]}</h2>
                  </IonLabel>
                  <IonLabel slot="end">
                    <h2>Quantity: {pantry.fruits[0][1]}</h2>
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
                    <h2>{pantry.vegetables[0][0]}</h2>
                  </IonLabel>
                  <IonLabel slot="end">
                    <h2>Quantity: {pantry.vegetables[0][1]}</h2>
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
                    <h2>{pantry.meats[0][0]}</h2>
                  </IonLabel>
                  <IonLabel slot="end">
                    <h2>Quantity: {pantry.meats[0][1]}</h2>
                  </IonLabel>
                </IonItem>
              </IonList>
              <IonList> {/* SPICES LIST */}
                <IonListHeader>
                  <h1>Spices</h1>
                </IonListHeader>
                <IonItem>
                  <IonAvatar slot="start">
                    <img src=""></img>
                  </IonAvatar>
                  <IonLabel>
                    <h2>{pantry.spices[0][0]}</h2>
                  </IonLabel>
                  <IonLabel slot="end">
                    <h2>Quantity: {pantry.spices[0][1]}</h2>
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