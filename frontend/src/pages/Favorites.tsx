import './Favorites.css';

import {
  IonApp,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonPage,
  IonRow,
} from '@ionic/react';

import { Link, Router, Switch, useParams } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { User } from '../models/User';
import React, { useEffect, useState } from 'react';
import {Recipe} from "../models/Recipe";
import { routePrams } from './MyGoal';
import {Favorite} from '../models/Favorite';

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
  // const [favorites, setFavorites ] = React.useState<[Favorite]>([{
  //   id: 1, 
  //   userId: 1, 
  //   recipeId: 1
  // }]);
  const [favorite, setFavorite ] = React.useState<Favorite>({
    id: 1, 
    userId: 1, 
    recipeId: 1
  });
  // useEffect(() => {
  //   fetch(`https://api.fridger.recipes/v1/favorites/${id}/`)
  //   //fetch(`https://api.fridger.recipes/v1/favorites`)
  //   .then(response => response.json())
  //   .then(data => setFavorite(data))
  // }, [])

  const [favorites, setFavorites ] = React.useState<[Favorite]>([{
    id: 1, 
    userId: 1, 
    recipeId: 1
  }]);
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/favorites/`)
    //fetch(`https://api.fridger.recipes/v1/favorites`)
    .then(response => response.json())
    .then(data => setFavorites(data))
  }, [])

  const [recipe, setRecipe] = React.useState<Recipe>({
    id: 1,
    title: "",
    author: "",
    description: "",
    body: "",
    imgSrc: "",
    totalTime: 0,
    prepTime: 0,
    cookTime: 0,
    yield: 0,
    estimatedCost: 0,
    type: "",
    tags: "",
    ingredientIds: "", 
    rating: 0
  })

  useEffect(() => {
    //fetch(`https://api.fridger.recipes/v1/recipe/${id}`)
    fetch(`https://api.fridger.recipes/v1/recipe/`)
      .then(response => response.json())
      .then(data => setRecipe(data))
  }, [id])
  console.log(recipe);

  

  // useEffect(() => {
  //   fetch('https://api.fridger.recipes/v1/recipe/')
  //   .then(res => res.json())
  //   .then(data => setRecipe(data))
  // }, [])

  
  // const [ user, setUser ] = React.useState<User>({
  //   id: 1,
  //   type: 'NORMAL',
  //   email: 'seonghopark@gmail.com',
  //   password: 'this probably shoudn\'t be here',
  //   name: 'Seongho Park',
  //   bio: `Hi.`,
  //   dob: 'Mar. 20, 1987',
  //   height_in: 85,
  //   weight_lb: 600,
  //   favorites: ""
  // });
  

  //const favRecipes = recipes.sort(() => Math.random() - Math.random()).find(() => true);

  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header />
            <IonContent className="ion-padding">
              <h1>A log of all your favorite recipes!</h1>
                    {/* <p>
                    {user.favorites ? ("" + user.favorites) : "Favorites unavailable"}
                    <br />
                  </p> */}
                  <IonCard>
                  <IonRow>
                      {favorites.map(favorite =>
                        <IonCol sizeXs="12" sizeSm="6" key={favorite.id}>
                         <Link to={`/recipe/${favorite.recipeId}`}>
                          <IonCard button routerDirection="forward">
                            <IonCardHeader>

                              <IonCardTitle>Favorited recipe #{favorite.id}</IonCardTitle>
                              <IonCardSubtitle>Recipe ID: {favorite.recipeId}</IonCardSubtitle>
                              <IonCardSubtitle></IonCardSubtitle>
                            </IonCardHeader>
                          </IonCard>
                          </Link>
                        </IonCol>
                      )}
                    </IonRow>
                    </IonCard>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default Favorites;