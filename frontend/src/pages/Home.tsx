import './Home.css';

import {
    IonApp,
    IonContent,
    IonPage,
  } from '@ionic/react';

import { Router, Switch } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';


function Home() {
    return (
        <Router history={history}>
            <Switch>
                <IonApp>
    <SideBar />
    <IonPage className="ion-page" id="main-content">
      <Header/>
      <IonContent className="ion-padding">
        <h1>Welcome back, Seongho!</h1>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </IonContent>
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default Home;