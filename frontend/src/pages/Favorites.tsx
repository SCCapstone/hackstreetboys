import './Favorites.css';

import {
  IonApp,
  IonContent,
  IonPage,
} from '@ionic/react';

import { Router, Switch } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { User } from '../models/User';
import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
interface UserProps {
  user: User,
}

function Favorites() {
  const [ user, setUser ] = React.useState<User>({
    id: 1,
    type: 'NORMAL',
    email: 'seonghopark@gmail.com',
    password: 'this probably shoudn\'t be here',
    name: 'Seongho Park',
    bio: `Hi.`,
    dob: 'Mar. 20, 1987',
    height_in: 85,
    weight_lb: 600,
    favorites: ""
  });
  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header />
            <IonContent className="ion-padding">
              <h1>A log of all your favorite recipes! Coming soon!</h1>
              <p>
                    {user.favorites ? ("" + user.favorites) : "Favorites unavailable"}
                    <br />
                  </p>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default Favorites;