import './Profile.css';
import { Router, Switch, Route, useParams } from "react-router-dom";
import history from '../History';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuToggle,
  IonPage,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonAvatar,
  IonItem
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import Header from '../components/Header'
import SideBar from '../components/SideBar';
import Loading from '../pages/Loading';
import { menuOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { User } from '../models/User';

import { useContext } from 'react';
import {Context, useGlobalContext} from '../components/Context';

import History from '../History';
import Favorites from './Favorites';

import axios, {AxiosError} from 'axios';

import { format, parseISO, formatISO } from 'date-fns';

export interface routeParams {
  id: string;
}

function Users() {
  //const context = useContext(Context);
  const context = useGlobalContext();

  const [user, setUser] = useState<User>();

  const { id } = useParams<routeParams>();

  useEffect(() => {
    if(id) {
      axios.get(`https://api.fridger.recipes/v1/user/${id}`)
      .then(res => {
          setUser(res.data);
      })
      .catch (e => {
        console.log(e)
        history.push('/404')
      })
    } else if (context.id) {
      axios.get(`https://api.fridger.recipes/v1/user/${context.id}`)
        .then(res => {
            setUser(res.data);
        })
    }
  }, [context.loading])

  useEffect(() => {
    document.title = "Profile";
  }, []);

  if (context.loading || user === undefined) {
    return <Loading />
  }

  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header />
            <IonContent className="ion-padding">
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>User Profile</IonCardSubtitle>
                  <IonItem className="ion-padding">
                    <IonCardTitle>{user.name}</IonCardTitle>
                    <IonAvatar slot="start">
                      <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                    </IonAvatar>
                  </IonItem>
                </IonCardHeader>

                <IonCardContent>
                  <IonCard>
                    <IonCardContent>
                      <b>Email:</b> {user.email} <br/>
                      <b>Date of Birth:</b> {format(parseISO(formatISO(new Date(user.dob))), 'MMM d, y')} <br/>
                      <b>Height:</b> {Math.floor(user.height_in / 12)} ft. {user.height_in % 12} in. <br/>
                      <b>Weight:</b> {user.weight_lb} lbs.
                    </IonCardContent>
                  </IonCard>
                  {user.bio}
                </IonCardContent>
              </IonCard>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default Users;