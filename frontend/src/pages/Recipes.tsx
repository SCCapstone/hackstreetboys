import './Recipes.css';

import {
    IonApp,
    IonContent,
    IonPage,
  } from '@ionic/react';

import { Router, Switch } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from '../components/Header';

function Recipes() {
    return (
        <Router history={history}>
            <Switch>
                <IonApp>
    <SideBar />
    <IonPage className="ion-page" id="main-content">
      <Header/>
      <IonContent className="ion-padding">
        <h1>Search for a recipe, or browse! Coming soon!</h1>
      </IonContent>
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default Recipes;