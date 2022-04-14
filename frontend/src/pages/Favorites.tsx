import './Favorites.css';
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
  IonLabel,
  IonPage,
  IonRow,
  NavContext,
} from '@ionic/react';

import { Link, Router, Switch, useParams } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { User } from '../models/User';
import React, { useContext, useEffect, useState } from 'react';
import {Recipe} from "../models/Recipe";
import { routePrams } from './MyGoal';
import {Favorite} from '../models/Favorite';
import axios from 'axios';
import Context from '../components/Context';
import { toNumber } from 'lodash';

interface FavoriteExample {
  favorite: Favorite;
}

interface UserProps {
  user: User;
}

interface RecipeExample{
  recipe: Recipe;
}

function Favorites() {
  const {id} = useParams<routePrams>();
  const {navigate} = useContext(NavContext);
  const context = useContext(Context);
  const [favorite, setFavorite ] = React.useState<Favorite>({
    id: 1, 
    userId: 1, 
    recipeId: 1
  });

  const [fav, setFav ] = React.useState<Favorite>({
    id: 1, 
    userId: 1, 
    recipeId: 1
  });

  const [favorites, setFavorites ] = React.useState<[Favorite]>([{
    id: 1, 
    userId: 1, 
    recipeId: 1
  }]);
  useEffect(() => {
     fetch(`https://api.fridger.recipes/v1/favorites/?userId=${context.currentUser?.id ? context.currentUser?.id : 0}`)
    .then(response => response.json())
    .then(data => setFavorites(data))
  }, [])

  const [recipe, setRecipe] = React.useState<Recipe>({
    id: 1,
    title: "",
    author: 0,
    authorName: "",
    description: "",
    body: "",
    imgSrc: "",
    totalTime: 0,
    prepTime: 0,
    cookTime: 0,
    yield: 0,
    estimatedCost: 0,
    alcoholic: false,
    type: "",
    tags: "",
    ingredientIds: "", 
    rating: 0
  })

  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/recipe/${favorite.recipeId}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
  }, [favorite.recipeId])

  
  console.log(recipe);
  useEffect(() => {
    document.title = "Favorites";
  }, []);

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
 fetch('https://api.fridger.recipes/v1/recipe/')
      .then(response => response.json())
      .then(data => setRecipes(data))
  }, [])


  const removeFav = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
     
      const res = await axios.delete(
        `https://api.fridger.recipes/v1/favorites/${favorite.id}`,
        config
        ).then(res=> {
        console.log("Removed from favorites by" + favorite.id);
        if(res.status == 200){
          console.log("Status is "+res.status);
          navigate('/favorites');
        }
  
      });
      return res;
    }catch (e) {
      console.error(e);
  }
  return false;
  };


  const seeFavorites = () => {
      return (
      (context.currentUser) ? (
          <>
      <h1>A log of all your favorite recipes!</h1>
      <IonCard>
      <IonRow>
          {favorites.map(fav =>
                        <IonCol sizeLg="3" sizeSm='1' key={fav.id}>
                        {/* <Link to={`/favorite/${favorite.recipeId}`}> */}
                        <IonCard button routerDirection="forward" routerLink={`/favorite/${fav.id}`}>
                          <img src={recipes.find(rec => rec.id === fav.recipeId)?.imgSrc ? recipes.find(rec => rec.id === fav.recipeId)?.imgSrc : "https://picsum.photos/1500/800"} alt="ion"/>
                            <IonCardHeader>
                              <IonCardTitle>{recipes.find(rec => rec.id === fav.recipeId)?.title}</IonCardTitle>
                              <IonCardSubtitle>By {recipes.find(rec => rec.id === fav.recipeId)?.authorName ? (recipes.find(rec => rec.id === fav.recipeId)?.authorName) : "Anonymous"}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                              <IonLabel>{recipes.find(rec => rec.id === fav.recipeId)?.rating ? ("Rating: " + recipes.find(rec => rec.id === fav.recipeId)?.rating.toFixed(1)) : "No rating"}</IonLabel><br/>
                              <IonLabel>Time: {recipes.find(rec => rec.id === fav.recipeId)?.totalTime}m</IonLabel>
                              <IonLabel>Time: {Math.floor(recipe.totalTime / 60) != 0 ? Math.floor(recipe.totalTime / 60) + "h" : ""} {recipe.totalTime % 60}m</IonLabel>
                            </IonCardContent>
                          </IonCard>
              {/* </Link> */}
            </IonCol>
          )}
        </IonRow>
        </IonCard>
        </>)
     :
       ( <>
        <IonCardHeader>Add a favorite by <Link to="/recipes">checking out our recipes</Link></IonCardHeader>
      </>)
      
      )

  }
    

  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header />
            <IonContent className="ion-padding">
             {seeFavorites()}
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default Favorites;