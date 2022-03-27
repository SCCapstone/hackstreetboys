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
     fetch(`https://api.fridger.recipes/v1/favorites/`)
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
    console.log(favorites.length);
    var i = 0;
    while( i< favorites.length) {
    if(context.id == favorites[i].userId) {
      return (
        <>
      <h1>A log of all your favorite recipes!</h1>
      <IonCard>
      <IonRow>
          {favorites.map(favoriteKey =>
            <IonCol sizeXs="12" sizeSm="6" key={favoriteKey.id}>
             {/* <Link to={`/favorite/${favorite.recipeId}`}> */}
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Recipe ID: {favoriteKey.recipeId}</IonCardTitle>
                  <IonCardSubtitle>Fav ID: {favoriteKey.id}</IonCardSubtitle>
                  {/* <IonButton color='danger' onClick={() => removeFav()}>DELETE</IonButton> */}
                  <Link to={`/favorite/${favoriteKey.id}`}>
                  <IonButton>View/edit</IonButton>
                  </Link>
                </IonCardHeader>
              </IonCard>
              {/* </Link> */}
            </IonCol>
          )}
        </IonRow>
        </IonCard>
        </>
      );
    }

    else if (!context.loggedInState){
      return (
      <>
        <IonCardHeader>Please log in to see your favorties. </IonCardHeader>
      </>
      );
    }

    else {
      return (
        <>
          <IonCardHeader>Please add a recipe to your favorites in order to see them!</IonCardHeader>
        </>
      )
      
    }
  }
    
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