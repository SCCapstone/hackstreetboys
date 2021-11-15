import './Recipes.css';
<<<<<<< HEAD

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
  } from '@ionic/react';

import { Router, Switch, Route } from "react-router-dom";
import history from '../History';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

=======
import { Router, Switch, Route } from "react-router-dom";
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
>>>>>>> 432e6b5f621843637b7bd9a63701c6258b23fed0
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { menuOutline } from 'ionicons/icons';
<<<<<<< HEAD


function Recipes() {
    return (
        <Router history={history}>
            <Switch>
                <IonApp>
    <SideBar />
    <IonPage className="ion-page" id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuToggle>
              <IonButton>
                <IonIcon icon={menuOutline} slot="start" />
              </IonButton>
            </IonMenuToggle>
          </IonButtons>
          <IonTitle>Fridger</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Search for a recipe, or browse! Coming soon!</h1>
      </IonContent>
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
=======
import React from 'react';
import { Recipe } from '../models/Recipe';
interface RecipeProps {
  recipe: Recipe,
}
function Recipes() {
  const [recipes, setRecipes] = React.useState<Recipe>({
    id: 1,
    title: "Biscuits and Jam",
    author: "Quinn Biscuit",
    description: "What do you think? It's biscuits dummy.",
    totalTime: 55,
    prepTime: 15,
    cookTime: 40,
    yield: 10,
    estimatedCost: 69.42,
    type: "food",
    tags: ["stupid", "food", "quinn biscuit"],
    ingredients: ["Bread", "Love", "Passion", "Destiny", "A dash of sadness"],
    rating: 4.2
  });
  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuToggle>
                    <IonButton>
                      <IonIcon icon={menuOutline} slot="start" />
                    </IonButton>
                  </IonMenuToggle>
                </IonButtons>
                <IonTitle>Fridger</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonCard>
                <IonCardContent>
                  <h1>{recipes.title}</h1>
                  <p>
                  <h2>{recipes.description}</h2>
                    <h2>By <a href="">{recipes.author}</a> | Rating: {recipes.rating}</h2>
                    <h3>{recipes.estimatedCost > 100 ? "$$$" : recipes.estimatedCost > 50 ? "$$" : "$"} ({recipes.estimatedCost})</h3>
                    <h3>Total Time: {recipes.totalTime} (Prep Time: {recipes.prepTime} + Cook Time: {recipes.cookTime}) makes {recipes.yield}</h3>
                  </p>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardContent>
                <p>
                {/* Needs to be blown out.. I'm too lazy to bother with this rn bc we'll be using ingredient objects later*/}
                Ingreidents needed: {recipes.ingredients}
                <br />
                Type: {recipes.type}
                <br />
                {/* Needs to be blown out... Yeah I'll deall with that once we actually know what what we want to do with tags... Might become an object of it's own */}
                Tags: {recipes.tags}
              </p>
                </IonCardContent>
              </IonCard>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
>>>>>>> 432e6b5f621843637b7bd9a63701c6258b23fed0
}

export default Recipes;