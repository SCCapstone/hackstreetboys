import { Router, Switch, Route, Link, useParams } from "react-router-dom";
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
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { constructOutline, menuOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { Goal } from '../Goal';
import Header from "../components/Header";

interface GoalExample {
  recipe: Goal,
}
export interface routePrams {
  id: string;
}
function RecipePage(this: any) {
  const [goal, setGoal] = React.useState<Goal>({
    id: 1,
    endGoal: "Lose",
    calories: 500,
    carbohydrates: 500,
    protein: 300,
    fat: 250,
    currentWeight: 400.0,
    goalWeight: 180.0
  });
  const { id } = useParams<routePrams>();
  useEffect(() => {
    fetch(`http://localhost:8080/v1/user/goal/${id}/`)
      .then(response => response.json())
      .then(data => setGoal(data))
  }, [])
  console.log(goal);
  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header/>
            <IonContent className="ion-padding">
              <IonCard>
                <IonCardContent>
                <Link to="/goals">
            <IonButton>
              Return to Dashboard 
            </IonButton>
            </Link>
                  <h1>{goal.id}</h1>
                  <p>
                    <h2>End Goal:{goal.endGoal}</h2>
                    <h2>Calories:{goal.calories}</h2>
                    <h2>Carbohydrates: {goal.carbohydrates}</h2>
                    <h2>Protein: {goal.protein}</h2>
                    <h2>Fat: {goal.fat}</h2>
                    <h2>CurrentWeight: {goal.currentWeight}</h2>
                    <h2>GoalWeight: {goal.goalWeight}</h2>  
                  </p>
                </IonCardContent>
              </IonCard>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default RecipePage;