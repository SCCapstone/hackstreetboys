/*
  This file contains the functionality of displaying a user's list of goals. 
  If a logged in user goes to their dashboard, then their goals, a list of their goals will appear.
  This file provides that functionality of being able to view the list of goals a user has.
*/

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
    IonCardContent,
    IonLabel,
  } from '@ionic/react';

  import Minus from '../assets/minus.png';
  import Plus from '../assets/plus.png';
  import Equal from '../assets/equals.png';
  import Workout from '../assets/workout.png'

import history from '../History';
import React, { useContext, useEffect, useState } from 'react';
//import { Router, Switch, Route, Link, useParams, RouteComponentProps, useHistory } from "react-router-dom";
//import SideBar from '../components/SideBar';
import { add, menuOutline, trendingDown } from 'ionicons/icons';
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
       fetch(`https://api.fridger.recipes/v1/user/goals/`)
       .then(response => response.json())
       .then(data => setGoals(data))
    }, [])
  //  console.log(goals);

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
       fetch(`https://api.fridger.recipes/v1/user/goals/userId=${context.currentUser?.id ? context.currentUser?.id : 0}`)
       .then(response => response.json())
       .then(data => setGoal(data))
    }, [])
  //  console.log(goal);

   
   useEffect(() => {
    document.title = "My Goals";
  }, []);
   
  
  
  const userGoalDisplay = () => {
    var image;
      return <>

       <IonGrid>
         <IonRow>

             {goals.filter(rawGoal => (rawGoal.userId == context.currentUser?.id)).map(goal => (
                 <IonCol sizeLg="3" sizeSm='1' key={goal.id}>
                     <IonCard button routerDirection="forward" routerLink={`/goal/${goal.id}`}>
                       {/* <img src="https://picsum.photos/1000/250" alt="Recipe Image" style={{ width: '100%', maxHeight: 350, objectFit: 'cover' }} /> */}
                      <img
                      src={goal.endGoal == "Lose Weight" ? Minus : goal.endGoal == "Gain Weight" ? Plus : Equal}
                      alt="Recipe Image"
                      style={{
                      width: "100%",
                      // maxHeight: "400px",
                      // objectFit: "cover",
                      }}
                      />
                         <IonCardHeader>
                             <IonCardTitle>{goal.endGoal}</IonCardTitle>
                             <IonCardSubtitle>End goal weight {goal.goalWeight}</IonCardSubtitle>
                         </IonCardHeader>
                         <IonCardContent>
                             <IonLabel>Calories {goal.calories} | Carbs {goal.carbohydrates}</IonLabel><br/>
                             <IonLabel>Fat: {goal.fat} | Protein {goal.protein}</IonLabel>
                         </IonCardContent>
                     </IonCard>
                 </IonCol>
             ))}
            
          </IonRow>
        </IonGrid>
      </>
    }
    
    if (goals.length < 1) {
      return (
        <Router history={history}>
        <Switch>
          <IonApp>
            <SideBar />
            <IonPage className="ion-page" id="main-content">
              <Header/>
              <IonContent className="ion-padding">
                      <IonCardTitle>You have no goals!</IonCardTitle> 

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
    else{
    return (
        <Router history={history}>
            <Switch>
                <IonApp>
           <SideBar />
           <IonPage className="ion-page" id="main-content">
           <Header/>
            <Link to="/goals">
            </Link>
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

                  <Link to ="/goals">
                  <IonButton>
              Return to Dashboard 
            </IonButton>
            </Link>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
    );
}
}
export default MyGoals;


