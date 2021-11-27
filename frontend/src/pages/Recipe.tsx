import './Recipe.css';
import { Router, Switch, Route, useParams } from "react-router-dom";
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
  IonBadge,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { constructOutline, menuOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { Recipe } from '../models/Recipe';
import RecipeBanner from '../assets/fridger_banner.png'
import Header from '../components/Header';
interface RecipeProps {
  recipe: Recipe,
}
export interface routePrams {
  id: string;
}
function RecipePage(this: any) {
  const [recipe, setRecipe] = React.useState<Recipe>({
    id: 1,
    title: "Biscuits and Jam",
    author: "Quinn Biscuit",
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
    ingredientIds: "2929, 29292",
    rating: 4.2
  });
  const { id } = useParams<routePrams>();
  useEffect(() => {
    fetch(`http://localhost:7999/v1/recipe/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
  }, [])
  console.log(recipe);
  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header />
            <IonContent className="ion-padding">
              <IonCard>
                {/* <img src="https://picsum.photos/1000/250" alt="Recipe Image" style={{ width: '100%', maxHeight: 350, objectFit: 'cover' }} /> */}
                <img src={RecipeBanner} alt="Recipe Image" style={{ width: '100%', objectFit: 'cover' }} />

                <IonCardContent>
                  <h1>{recipe.title}</h1>
                  <h2>{recipe.description}</h2>
                  <h2>By <a href="">{recipe.author}</a> | {recipe.rating ? ("Rating: " + recipe.rating) : "No rating"}</h2>
                  <h3>Price: {recipe.estimatedCost > 100 ? "$$$" : recipe.estimatedCost > 50 ? "$$" : "$"} ({recipe.estimatedCost})</h3>
                  <h3>Total Time: {recipe.totalTime} (Prep Time: {recipe.prepTime} + Cook Time: {recipe.cookTime}) makes {recipe.yield}</h3>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardContent>
                  <h2>Ingredients </h2>
                  <p>
                    {recipe.ingredientIds ? ("" + recipe.ingredientIds) : "Ingredients unavailable"}
                    <br />
                  </p>
                  <h2>Instructions</h2>
                  <p>
                    {recipe.body}
                  </p>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardContent>

                  Type: <IonBadge color="primary">{recipe.type}</IonBadge>
                  <br />
                  Tags: {recipe.tags}
                </IonCardContent>
              </IonCard>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default RecipePage;