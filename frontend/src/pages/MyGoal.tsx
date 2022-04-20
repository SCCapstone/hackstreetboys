/*
  This file contains the functionality of displaying a user's goal.
  If a user clicks on one of their goals from their list of goals, this file provides the functionality for
  them to view it individually.
*/

import { Router, Switch, Route, Link, useParams } from "react-router-dom";
import history from '../History';
import {
  IonApp,
  IonContent,
  IonPage,
  IonButton,
  IonCard,
  IonCardContent,
  IonTitle,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonLabel,
  IonFab,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import React, { useContext, useEffect } from 'react';
import { Goal } from '../models/Goal';
import Header from "../components/Header";
import {Recipe} from '../models/Recipe';
import RecipeBanner from '../assets/fridger_banner.png'
import TrendingDown from '../assets/trendingdown.jpg';
  import TrendingUp from '../assets/trendingup.png';
  import Equal from '../assets/equal.jpg';
  import Context from '../components/Context';
interface GoalExample {
  goal: Goal,
}

interface RecipeExample {
  recipe: Recipe,
}


export interface routePrams {
  id: string;
}
function GoalPage(this: any) {
  const context = useContext(Context);
  const [goal, setGoal] = React.useState<Goal>({
    id: 1,
    endGoal: "Lose",
    calories: 500,
    carbohydrates: 500,
    protein: 300,
    fat: 250,
    currentWeight: 400.0,
    goalWeight: 180.0,
    userId: 1
  });
  const { id } = useParams<routePrams>();
  useEffect(() => {
    fetch(`http://localhost:8080/v1/user/goal/${id}/`)
      .then(response => response.json())
      .then(data => setGoal(data))
  }, [id])


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
   fetch(`http://localhost:8080/v1/user/goals/`)
   .then(response => response.json())
   .then(data => setGoals(data))
}, [])

  //Grab all recipes for the current ingredients
  const [recipes, setRecipes] = React.useState<[Recipe]>([{
    id: 1,
    title: "Loading Recipes...",
    author: 0,
    authorName: "",
    description: "What do you think? It's biscuits dummy.",
    body: "Well, here's the sauce.",
    imgSrc: "",
    totalTime: 55,
    prepTime: 15,
    cookTime: 40,
    yield: 10,
    estimatedCost: 69.42,
    type: "food",
    tags: "test,string",
    alcoholic: false,
    ingredientIds: "2929, 29292",
    rating: 4.2
  }]);
  useEffect(() => {
    fetch("https://api.fridger.recipes/v1/recipe/")
      .then(response => response.json())
      .then(data => setRecipes(data))
  }, [])

  console.log(goal);
  useEffect(() => {
    document.title = "My Goal";
  }, []);

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
              <Link to="/goals">
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

  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header/>
            <IonContent className="ion-padding">
              <IonCard>
              <img
                      src={goal.endGoal == "Lose Weight" ? TrendingDown : goal.endGoal == "Gain Weight" ? TrendingUp : Equal}
                      alt="Recipe Image"
                      style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "cover",
                      }}
                      />
                <IonCardContent>
                    <IonTitle>End Goal: {goal.endGoal}</IonTitle>
                    <IonCardSubtitle> Calories: {goal.calories}</IonCardSubtitle>
                    <IonCardSubtitle> Carbohydrates: {goal.carbohydrates}</IonCardSubtitle>
                    <IonCardSubtitle> Protein: {goal.protein}</IonCardSubtitle>
                    <IonCardSubtitle> Fat: {goal.fat}</IonCardSubtitle>
                    <IonCardSubtitle> Current Weight: {goal.currentWeight}</IonCardSubtitle>
                    <IonCardSubtitle >  Goal Weight: {goal.goalWeight}</IonCardSubtitle>
                    </IonCardContent>
                    </IonCard>

                   <IonCard>
                    <IonCardContent>
                    <IonTitle>Here are the top 3 quickest recipes for your convience!</IonTitle> 
                
                    {(recipes.length) ? (
                      
                    <IonGrid>
                    <IonRow>
                 
                    {recipes.sort((a,b) => a.totalTime - b.totalTime).slice(0,3).map(recipe =>
                        <IonCol >
                          
                          <IonCard button routerDirection="forward" routerLink={`/recipe/${recipe.id}`}>
                          <img src={recipe.imgSrc ? recipe.imgSrc : RecipeBanner}  style={{ maxHeight:'250px', width:'100%', objectFit: 'cover'}} alt={recipe.title}/>
                            <IonCardHeader>
                              <IonCardTitle>{recipe.title}</IonCardTitle>
                              <IonCardSubtitle>By {recipe.authorName ? (recipe.authorName) : "Anonymous"}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                              <IonLabel>{recipe.rating ? ("Rating: " + recipe.rating.toFixed(1)) : "No rating"}</IonLabel><br/>
                              <IonLabel>Time: {Math.floor(recipe.totalTime / 60) != 0 ? Math.floor(recipe.totalTime / 60) + "h" : ""} {recipe.totalTime % 60}m</IonLabel>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      )}
                     
                    </IonRow>
                  </IonGrid>
                  
                  
        ):(
        <p>No recipes in our system!</p>)
                    }
                    </IonCardContent>
                     </IonCard>
                    
                      
                <Link to="/goals">
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

export default GoalPage;