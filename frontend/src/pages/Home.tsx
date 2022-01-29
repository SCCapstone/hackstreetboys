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
import DashboardCard from '../components/DashboardCard';

import { useContext } from 'react';
import Context from '../components/Context';


function Home() {
    const context = useContext(Context);

    return (
        <Router history={history}>
            <Switch>
                <IonApp>
    <SideBar />
    <IonPage className="ion-page" id="main-content">
      <Header/>
      <IonContent className="ion-padding">
        <h1>Welcome{context.currentUser && ' back, ' + context.currentUser.name}!</h1>
        <h4>You are on the home page</h4>
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </IonContent>
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default Home;