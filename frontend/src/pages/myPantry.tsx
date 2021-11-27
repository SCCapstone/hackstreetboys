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
import { logoYoutube, menuOutline } from 'ionicons/icons';
import React, { Component } from 'react';
import { Pantry } from '../models/Pantry';

let fruits2 = [["apple","2"],["banana","3"],["orange","4"]];

for(let _i=0;_i<fruits2.length;_i++) {
  console.log(fruits2[_i][0]);
  <IonItem>
    <h1>{fruits2[_i][0]}</h1>
  </IonItem>
}

for(let a=0;a<10;a++) {
  // do something
}

<IonApp>
<IonItem>
  {{fruits2}} {{fruits2}}
</IonItem>
</IonApp>

function loopList(data: string[][]) {

}


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
              <IonList>

                <IonItem>
                  {fruits2[0]} {fruits2[1]} {fruits2[2]}
                </IonItem>
              </IonList>
              <h1>Welcome to your pantry! Here you can see what ingredients you have!</h1>
              <IonList>
                <IonHeader><h1>Fruits</h1></IonHeader>
                  {/* <IonItem *ngFor="let frut of fruits">
                    <IonLabel>
                      {{ frut[i][0] }}
                    </IonLabel>
                  </IonItem> */}
                
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