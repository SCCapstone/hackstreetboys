import './MyGoals.css';
import {
    IonApp,
    IonContent,
    IonPage,
    IonButton,
    IonIcon,
    IonCard,
    IonCol,
    IonFab,
    IonFabButton,
    IonGrid,
    IonRow,
    IonText,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    NavContext,
  } from '@ionic/react';

//import { Router, Switch, Route, Link } from "react-router-dom";
import history from '../History';
import React, { useEffect, useState } from 'react';
import { Router, Switch, Route, Link, useParams } from "react-router-dom";
import SideBar from '../components/SideBar';
import { add, menuOutline } from 'ionicons/icons';
//import React from 'react';
//import { useContext } from 'react';
import {Goal} from '../Goal';
import Header from '../components/Header';
import { routeParams } from './Profile';
import { User } from '../models/User';
import Context from '../components/Context';
  interface UserProps {
    user: User;
  }
  interface GoalExample {
    goal: Goal;
  }

  export interface routePrams {
    id: string;
  }
  

function MyGoals() {
  const context = useContext(Context);
 
  const [goals, setGoals] = React.useState<[Goal]>([{
        id: 1,
        endGoal: "Lose",
        calories: 500,
        carbohydrates: 500,
        protein: 300,
        fat: 250,
        currentWeight: 400.0,
        goalWeight: 180.0,
        userId: 1
    }]);
    const {id} = useParams<routeParams>();
    useEffect(() => {
       //fetch("https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/user/goals/")
       //fetch('http://localhost:8080/v1/user/goals/')
       fetch(`http://localhost:8080/v1/user/goals/`)
       .then(response => response.json())
       .then(data => setGoals(data))
    }, [])
   console.log(goals);

    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ user, setUser ] = useState<User>();
    const globals = {
    loggedInState: loggedIn,
    currentUser: user,
    setLoggedIn,
    setUser
  }
   
  
  
    return (
        <Router history={history}>
            <Switch>
                <IonApp>
           <SideBar />
           <IonPage className="ion-page" id="main-content">
           <Header/>
            <Link to="/goals">
            <IonButton>
              Return to Dashboard 
            </IonButton>
            </Link>
        <h1>Here you are able to view your goals!</h1>
            <IonContent className="ion-padding">
                  <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Goals</h1></IonText>
                  <IonGrid>
                    <IonRow>
                      {goals.map(goal =>
                        <IonCol sizeXs="12" sizeSm="6" key={goal.id}>
                         <Link to={`/goal/${goal.id}`}>
                          <IonCard button routerDirection="forward">
                            <IonCardHeader>

                              <IonCardTitle>{goal.id}</IonCardTitle>
                              <IonCardSubtitle>End Goal: {goal.endGoal}</IonCardSubtitle>
                            </IonCardHeader>
                          </IonCard>
                          </Link>
                        </IonCol>
                      )}
                    </IonRow>
                  </IonGrid>
                  <Link to="/mygoals/add">
                  <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton>
                      <IonIcon icon={add} />
                    </IonFabButton>
                  </IonFab>
                  </Link>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
    );
}

export default MyGoals;

function useContext(Context: any) {
  throw new Error('Function not implemented.');
}
