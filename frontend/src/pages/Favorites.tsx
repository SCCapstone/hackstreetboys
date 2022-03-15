import './Favorites.css';
import {
  IonApp,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
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
     fetch(`https://api.fridger.recipes/v1/favorites/`)
    //fetch(`https://localhost:8080/recipes/v1/favorites`)
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
    alcoholic: false,
    type: "",
    tags: "",
    ingredientIds: "", 
    rating: 0
  })

  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/recipe/${fav.id}`)
    //fetch(`https://localhost:8080/recipes/v1/recipe/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
  }, [id])
  console.log(recipe);

  const removeFav = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // const body = {
      //   "userId":context.currentUser?.id,
      //   "recipeId":recipe.id
      // }
      const res = await axios.delete(
        `https://api.fridger.recipes/v1/favorites/${recipe.id}`,
        //`https://localhost:8080/recipes/v1/favorites/${recipe.id}`,
        config
        ).then(res=> {
        console.log("Removed from favorites by" + recipe.id);
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

  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header />
            <IonContent className="ion-padding">
              <h1>A log of all your favorite recipes!</h1>
                  <IonCard>
                  <IonRow>
                      {favorites.map(favorite =>
                        <IonCol sizeXs="12" sizeSm="6" key={favorite.id}>
                         {/* <Link to={`/favorite/${favorite.recipeId}`}> */}
                          <IonCard>
                            <IonCardHeader>

                              <IonCardTitle>Favorited recipe #{favorite.id}</IonCardTitle>
                              <IonCardSubtitle>Recipe ID: {favorite.recipeId}</IonCardSubtitle>
                              <IonButton color='danger' onClick={() => removeFav()}>DELETE</IonButton>
                              <Link to={`/favorite/${favorite.recipeId}`}>
                              <IonButton>See More</IonButton>
                              </Link>
                            </IonCardHeader>
                          </IonCard>
                          {/* </Link> */}
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