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
  } from '@ionic/react';


import history from '../History';
import React, { useContext, useEffect, useState } from 'react';
//import { Router, Switch, Route, Link, useParams, RouteComponentProps, useHistory } from "react-router-dom";
//import SideBar from '../components/SideBar';
import { add, menuOutline } from 'ionicons/icons';
//import {Goal} from '../Goal';
//import Header from '../components/Header';
//import { routeParams } from './Profile';
import { User } from '../models/User';
//import Context from '../components/Context';
//import axios from 'axios';
//import {NavContext} from '@ionic/react';

import '../theme/variables.css';
import { useForm, Controller } from 'react-hook-form';
import { Link, RouteComponentProps, Router, Switch, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { routePrams } from './MyGoal';
import SideBar from '../components/SideBar';
import { Goal } from '../models/Goal';
import {NavContext} from '@ionic/react';
import Context from '../components/Context';

  interface UserProps {
    user: User;
  }
  // interface GoalExample {
  //   goal: Goal;
  // }

  // export interface routePrams {
  //   id: string;
  // }
  

const MyGoals: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const context = useContext(Context);
  const {navigate} = useContext(NavContext);
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const {id} = useParams<routePrams>();

  const [goal, setGoal] = React.useState<Goal>({
    id: 1,
    endGoal: "Lose",
    calories: 500,
    carbohydrates: 500,
    protein: 300,
    fat: 250,
    currentWeight: 400.0,
    goalWeight: 180.0,
    userId: Number(context.currentUser?.id)
});

    useEffect(() => {
       //fetch("https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/user/goals/")
       //fetch('https://api.fridger.recipes/v1/user/goals/')
       fetch(`https://api.fridger.recipes/v1/user/goal/${id}/`)
       .then(response => response.json())
       .then(data => setGoal(data))
    }, [])
   console.log(goal);
 
  const [goals, setGoals] = React.useState<[Goal]>([{
        id: 1,
        endGoal: "Lose",
        calories: 500,
        carbohydrates: 500,
        protein: 300,
        fat: 250,
        currentWeight: 400.0,
        goalWeight: 180.0,
        userId: Number(context.currentUser?.id)
    }]);
   // const {id} = useParams<routeParams>();
   
   
    useEffect(() => {


       //fetch("https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/user/goals/")
       //fetch('https://api.fridger.recipes/v1/user/goals/')
       //fetch("https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/user/goals/")
       //fetch(`https://api.fridger.recipes/v1/user/goals/`)

       //fetch("https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/user/goals/")
       //fetch('https://api.fridger.recipes/v1/user/goals/')
       fetch(`https://api.fridger.recipes/v1/user/goals/`)
       .then(response => response.json())
       .then(data => setGoals(data))
    }, [])
   console.log(goals);
   console.log(goal.userId);


  //   const [ loggedIn, setLoggedIn ] = useState(false);
  //   const [ user, setUser ] = useState<User>();
  //   const globals = {
  //   loggedInState: loggedIn,
  //   currentUser: user,
  //   setLoggedIn,
  //   setUser
  // }
   
  const userGoalDisplay = () => {
    if(context.currentUser?.id == goal.userId) {
      return <>
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
      </>
    }
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
                 {userGoalDisplay()}
                  {/* <IonGrid>
                    <IonRow>
                      {userGoalDisplay()}
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
                  </IonGrid> */}
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


