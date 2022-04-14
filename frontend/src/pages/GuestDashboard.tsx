import './Home.css';

import {
    IonApp,
    IonButton,
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
import RecipeBanner from '../assets/fridger_banner.png'


function GuestDashboard() {
    const context = useContext(Context);
  //Dummy loading value
    const [recipes, setRecipes] = React.useState<[Recipe]>([{
      id: 1,
      title: "Loading...",
      author: 0,
      authorName: "Loading...",
      description: "Loading...",
      body: "Loading...",
      imgSrc: "",
      totalTime: 55,
      prepTime: 15,
      cookTime: 40,
      yield: 10,
      estimatedCost: 69.42,
      alcoholic: false,
      type: "food",
      tags: "loading,loading",
      ingredientIds: "0",
      rating: 0
    }]);
  
    useEffect(() => {
  //set recipes off of our recipe api endpoint
   fetch(`https://api.fridger.recipes/v1/recipe/`)
        .then(response => response.json())
        .then(data => setRecipes(data))
    }, [])
    //set dummy goal
    useEffect(() => {
      //set document title
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
        <h1>Welcome to Fridger! <a href="/register">Join us today!</a></h1>
        <h1>Latest Recipes</h1>
        {/* If recipes exist... Display them */}
        {(recipes.length) ? (
        <IonGrid>
                    <IonRow>
                      {/* Finds the last four ids (latest entries) in the array and then displays them */}
                    {recipes.sort((a,b) => b.id - a.id).slice(0,4).map(recipe =>
                        <IonCol sizeLg="3" sizeSm='1' key={recipe.id}>
                           {/* <RecipeCard recipe={recipePassed} showLocation routerLink={`/recipe/${recipePassed.id}`} /> */}
                          <IonCard button routerDirection="forward" routerLink={`/recipe/${recipe.id}`}>
                          <img src={recipe.imgSrc ? recipe.imgSrc : RecipeBanner}  style={{ maxHeight:'250px', width:'100%', objectFit: 'cover'}} alt="ion"/>
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
                  ):(
        <p>No recipes in our system!</p>)
                    }
        <h1>Highest Rated Recipes</h1>
                {/* If recipes exist... Display them */}
        {(recipes.length) ? (
        <IonGrid>
                    <IonRow>
                    {/* Finds the top four rated recipes in the array and then displays them */}
                    {recipes.sort((a,b) => b.rating - a.rating).slice(0,4).map(recipe =>
                        <IonCol sizeLg="3" sizeSm='1' key={recipe.id}>
                           {/* <RecipeCard recipe={recipePassed} showLocation routerLink={`/recipe/${recipePassed.id}`} /> */}
                          <IonCard button routerDirection="forward" routerLink={`/recipe/${recipe.id}`}>
                          <img src={recipe.imgSrc ? recipe.imgSrc : RecipeBanner}  style={{ maxHeight:'250px', width:'100%', objectFit: 'cover'}} alt={recipe.title}/>
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
        ):(
        <p>No recipes in our system!</p>)
                    }
                  <h1>Register to get more out of Fridger!</h1>
                  <p>There's so many benefits to registering with Fridger! Add your favorite recipes, add and track your health goals, and review recipes! Join the Fridger family today!</p>
                  <IonButton className="ion-margin-top" color='primary' onClick={()=>history.push("/register")} expand='full'>
                            Join Fridger
                </IonButton>
      </IonContent>
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default GuestDashboard;