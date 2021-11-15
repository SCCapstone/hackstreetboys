import './Profile.css';
import { Router, Switch, Route } from "react-router-dom";
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
import SideBar from '../components/SideBar';
import { menuOutline } from 'ionicons/icons';
import React from 'react';
import { User } from '../models/User';

function Users() {
  const [user, setUser] = React.useState<User>({
    id: 1,
    type: 'User',
    email: 'seonghopark@gmail.com',
    password: 'this probably shoudn\'t be here', // This probably shouldn't be here
    name: 'Seongho Park',
    bio: `Hi, I'm Seongho Park, a recent MIT doctoral candidate, and now magnet high-school
          mathematics teacher. I'm new to teaching, but I now understand that spending time
          on work outside of school hours is par for the course. However, this leaves me with
          little free time during the week, so I've been looking for a way to streamline my
          daily tasks. I'm a married man in a double-income household, so money isn't a main
          concern for me. However, as my wife is also busy, grocery shopping and cooking
          becomes a major chore for both of us. If we could find some way to take that burden
          off our shoulders, spending time with family and friends would become easier.`,
    dob: 'Mar. 20, 1987',
    height_in: 85, // Perhaps these shouldn't be publicly displayed?
    weight_lb: 600 // Perhaps these shouldn't be publicly displayed?
  });

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
                      <b>Date of Birth:</b> {user.dob} <br/>
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