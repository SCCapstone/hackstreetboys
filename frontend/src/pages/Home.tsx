import './Home.css';

import {
    IonApp,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonLabel,
    IonPage,
    IonRow,
  } from '@ionic/react';

import { Link, Router, Switch } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from '../components/Header';

import { useContext, useEffect, useState } from 'react';
import Context from '../components/Context';
import React from 'react';
import { Recipe } from '../models/Recipe';
import { Goal } from '../models/Goal';
import { Favorite } from '../models/Favorite';


function Home() {
    const context = useContext(Context);
    const [ searchText, setSearchText ] = useState("");

    const [recipes, setRecipes] = React.useState<[Recipe]>([{
      id: 1,
      title: "Biscuits and Jam",
      author: 0,
      authorName: "Quinn Biscuit",
      description: "What do you think? It's biscuits dummy.",
      body: "Well, here's the sauce.",
      imgSrc: "",
      totalTime: 55,
      prepTime: 15,
      cookTime: 40,
      yield: 10,
      estimatedCost: 69.42,
      alcoholic: false,
      type: "food",
      tags: "test,string",
      ingredientIds: "2929, 29292",
      rating: 4.2
    }]);
  
    useEffect(() => {
  
   fetch(`https://api.fridger.recipes/v1/recipe/`)
        .then(response => response.json())
        .then(data => setRecipes(data))
    }, [])
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
 let forcedID = context.currentUser?.id ? context.currentUser?.id : 1;
  useEffect(() => {
     //fetch("https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/user/goals/")
     //fetch('https://api.fridger.recipes/v1/user/goals/')
    //  fetch(`https://api.fridger.recipes/v1/user/goals/?userId=${context.currentUser?.id}`)
     fetch(`https://api.fridger.recipes/v1/user/goals/?userId=${forcedID}`)

     .then(response => response.json())
     .then(data => setGoals(data))
  }, [])
 console.log(goals);

 const [favorites, setFavorites ] = React.useState<[Favorite]>([{
  id: 1, 
  userId: 1, 
  recipeId: 1
}]);
useEffect(() => {
  //  fetch(`https://api.fridger.recipes/v1/favorites/?userId=${context.currentUser?.id}`)
    fetch(`https://api.fridger.recipes/v1/favorites/?userId=${forcedID}`)
  .then(response => response.json())
  .then(data => setFavorites(data))
}, [])
    useEffect(() => {
      document.title = "Fridger Dashboard";
    }, []);
    return (
        <Router history={history}>
            <Switch>
                <IonApp>
    <SideBar />
    <IonPage className="ion-page" id="main-content">
      <Header/>
      <IonContent className="ion-padding">
        <h1>Welcome{context.currentUser && ' back, ' + context.currentUser.name}!</h1>
        <h1>Latest Recipes</h1>
        <IonGrid>
                    <IonRow>
                    {recipes.slice(-4).map(recipe =>
                        <IonCol sizeLg="3" sizeSm='1' key={recipe.id}>
                           {/* <RecipeCard recipe={recipePassed} showLocation routerLink={`/recipe/${recipePassed.id}`} /> */}
                          <IonCard button routerDirection="forward" routerLink={`/recipe/${recipe.id}`}>
                          <img src={recipe.imgSrc ? recipe.imgSrc : "https://picsum.photos/1500/800"} alt="ion"/>
                            <IonCardHeader>
                              <IonCardTitle>{recipe.title}</IonCardTitle>
                              <IonCardSubtitle>By {recipe.authorName ? (recipe.authorName) : "Anonymous"}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                              <IonLabel>{recipe.rating ? ("Rating: " + recipe.rating.toFixed(1)) : "No rating"}</IonLabel><br/>
                              <IonLabel>Time: {recipe.totalTime}m</IonLabel>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      )}
                    </IonRow>
                  </IonGrid>
        <h1>Highest Rated Recipes</h1>
        <IonGrid>
                    <IonRow>
                    {recipes.sort((a,b) => b.rating - a.rating).slice(-4).map(recipe =>
                        <IonCol sizeLg="3" sizeSm='1' key={recipe.id}>
                           {/* <RecipeCard recipe={recipePassed} showLocation routerLink={`/recipe/${recipePassed.id}`} /> */}
                          <IonCard button routerDirection="forward" routerLink={`/recipe/${recipe.id}`}>
                          <img src={recipe.imgSrc ? recipe.imgSrc : "https://picsum.photos/1500/800"} alt="ion"/>
                            <IonCardHeader>
                              <IonCardTitle>{recipe.title}</IonCardTitle>
                              <IonCardSubtitle>By {recipe.authorName ? (recipe.authorName) : "Anonymous"}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                              <IonLabel>{recipe.rating ? ("Rating: " + recipe.rating.toFixed(1)) : "No rating"}</IonLabel><br/>
                              <IonLabel>Time: {recipe.totalTime}m</IonLabel>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      )}
                    </IonRow>
                  </IonGrid>
                  <h1>Your Goals</h1>
                  {(goals.length > 0 && context.currentUser !== undefined)? (
                  <IonGrid>
                    <IonRow>
                    {goals.slice(-4).map(goal =>
                        <IonCol sizeLg="3" sizeSm='1' key={goal.id}>
                          <IonCard button routerDirection="forward" routerLink={`/goal/${goal.id}`}>
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
                      )}
                    </IonRow>
                    </IonGrid>):
                  (context.currentUser !== undefined ?
                    (<p>You don't have any goals yet! Go <Link to="/goals">add some!</Link></p>)
                    :(<p><Link to="/login">Login </Link> to see your goals!</p>))}
                    
                  <h1>Your Favorites</h1>
                  {(goals.length > 0 && context.currentUser !== undefined)? (
                  <IonGrid>
                    <IonRow>
                    {favorites.slice(-4).map(fav =>
                        <IonCol sizeLg="3" sizeSm='1' key={fav.id}>
                          <IonCard button routerDirection="forward" routerLink={`/recipe/${fav.recipeId}`}>
                          <img src={recipes.find(rec => rec.id === fav.recipeId)?.imgSrc ? recipes.find(rec => rec.id === fav.recipeId)?.imgSrc : "https://picsum.photos/1500/800"} alt="ion"/>
                            <IonCardHeader>
                              <IonCardTitle>{recipes.find(rec => rec.id === fav.recipeId)?.title}</IonCardTitle>
                              <IonCardSubtitle>By {recipes.find(rec => rec.id === fav.recipeId)?.authorName ? (recipes.find(rec => rec.id === fav.recipeId)?.authorName) : "Anonymous"}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                              <IonLabel>{recipes.find(rec => rec.id === fav.recipeId)?.rating ? ("Rating: " + recipes.find(rec => rec.id === fav.recipeId)?.rating.toFixed(1)) : "No rating"}</IonLabel><br/>
                              <IonLabel>Time: {recipes.find(rec => rec.id === fav.recipeId)?.totalTime}m</IonLabel>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      )}
                    </IonRow>
                  </IonGrid>) : 
                  (context.currentUser !== undefined ?
                (<p>You don't have any favorites yet! See our recipes and go <Link to="/favorites">add some!</Link></p>)
                :(<p><Link to="/login">Login </Link> to see your favorites!</p>))}
      </IonContent>
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default Home;