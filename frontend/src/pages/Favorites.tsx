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

  const [favorites, setFavorites ] = React.useState<[Favorite]>([{
    id: 1, 
    userId: 1, 
    recipeId: 1
  }]);
  useEffect(() => {
    fetch(`http://localhost:8080/v1/favorites/`)
    //fetch(`http://localhost:8080/v1/favorites`)
    .then(response => response.json())
    .then(data => setFavorites(data))
  }, [])

  const [recipes, setRecipe] = React.useState<[Recipe]>([{
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
  }])
  // const { id } = useParams<routePrams>();
  // useEffect(() => {
  //   //fetch(`http://localhost:8080/v1/recipe/${id}`)
  //   fetch(`http://localhost:8080/v1/recipe/${id}`)
  //     .then(response => response.json())
  //     .then(data => setRecipe(data))
  // }, [id])
  // console.log(recipes);

  useEffect(() => {
    fetch('http://localhost:8080/v1/recipe/')
    .then(res => res.json())
    .then(data => setRecipe(data))
  }, [])

  
  const [ user, setUser ] = React.useState<User>({
    id: 1,
    type: 'NORMAL',
    email: 'seonghopark@gmail.com',
    password: 'this probably shoudn\'t be here',
    name: 'Seongho Park',
    bio: `Hi.`,
    dob: 'Mar. 20, 1987',
    height_in: 85,
    weight_lb: 600,
    favorites: ""
  });
  

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

                  <IonRow>
                      {favorites.map(favorite =>
                        <IonCol sizeXs="12" sizeSm="6" key={favorite.id}>
                         <Link to={`/favorite/${favorite.id}`}>
                          <IonCard button routerDirection="forward">
                            <IonCardHeader>

                              <IonCardTitle>{favorite.id}</IonCardTitle>
                              <IonCardSubtitle>Recipe: {favorite.recipeId}</IonCardSubtitle>
                            </IonCardHeader>
                          </IonCard>
                          </Link>
                        </IonCol>
                      )}
                    </IonRow>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default Favorites;