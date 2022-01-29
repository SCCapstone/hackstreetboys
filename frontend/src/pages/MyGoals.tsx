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

//import { Router, Switch, Route, Link } from "react-router-dom";
import history from '../History';
import React, { useEffect } from 'react';
import { Router, Switch, Route, Link, useParams } from "react-router-dom";
import SideBar from '../components/SideBar';
import { add, menuOutline } from 'ionicons/icons';
//import React from 'react';

import {Goal} from '../Goal';
import Header from '../components/Header';

  interface GoalExample {
    goal: Goal,
  }

function MyGoals() {
    const [goals, setGoals] = React.useState<[Goal]>([{
        id: 1,
        endGoal: "Lose",
        calories: 500,
        carbohydrates: 500,
        protein: 300,
        fat: 250,
        currentWeight: 400.0,
        goalWeight: 180.0
    }]);
    
    useEffect(() => {
       //fetch("https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/user/goals/")
       fetch(`https://api.fridger.recipes/v1/user/goals/`)
       //fetch("https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/user/goals/")
       .then(response => response.json())
       .then(data => setGoals(data))
    }, [])
   //console.log(goals);

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