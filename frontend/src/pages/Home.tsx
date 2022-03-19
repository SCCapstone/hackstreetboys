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

import { Router, Switch } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard';

import { useContext, useEffect, useState } from 'react';
import Context from '../components/Context';
import React from 'react';
import { Recipe } from '../models/Recipe';


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
    return (
        <Router history={history}>
            <Switch>
                <IonApp>
    <SideBar />
    <IonPage className="ion-page" id="main-content">
      <Header/>
      <IonContent className="ion-padding">
        <h1>Welcome{context.currentUser && ' back, ' + context.currentUser.name}!</h1>
        <h4>You are on the home page</h4>
        <h1>Latest Recipes</h1>
        <IonGrid>
                    <IonRow>
                    {recipes.slice(-4).map(recipe =>
                        <IonCol sizeXs="6" sizeSm="6" key={recipe.id}>
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
      </IonContent>
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default Home;