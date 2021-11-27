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
import  RecipeBanner from '../assets/fridger_banner.png'
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
                {/* <img src="https://picsum.photos/1000/250" alt="Recipe Image" style={{ width: '100%', maxHeight: 350, objectFit: 'cover' }} /> */}
                                <img src={RecipeBanner} alt="Recipe Image" style={{ width: '100%', objectFit: 'cover' }} />

                <IonCardContent>
                  <h1>{recipe.title}</h1>
                  <p>
                    <h2>{recipe.description}</h2>
                    <h2>By <a href="">{recipe.author}</a> | {recipe.rating ? ("Rating: " + recipe.rating) : "No rating"}</h2>
                    <h3>Price: {recipe.estimatedCost > 100 ? "$$$" : recipe.estimatedCost > 50 ? "$$" : "$"} ({recipe.estimatedCost})</h3>
                    <h3>Total Time: {recipe.totalTime} (Prep Time: {recipe.prepTime} + Cook Time: {recipe.cookTime}) makes {recipe.yield}</h3>
                  </p>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardContent>
                  <p>
                     {recipe.ingredientIds ? ("Ingredients: " + recipe.ingredientIds) : "Ingredients unavailable"}
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo. Mattis enim ut tellus elementum sagittis vitae et leo. Imperdiet proin fermentum leo vel orci porta non pulvinar neque. Diam volutpat commodo sed egestas egestas fringilla. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Augue interdum velit euismod in pellentesque massa placerat duis. Gravida in fermentum et sollicitudin ac orci phasellus. Vel risus commodo viverra maecenas accumsan lacus vel. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum.
                    <br />
                    Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Dui vivamus arcu felis bibendum ut tristique et egestas. Quis commodo odio aenean sed adipiscing. A diam maecenas sed enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. In ante metus dictum at. Mattis nunc sed blandit libero. Bibendum est ultricies integer quis auctor elit sed vulputate mi. Facilisis gravida neque convallis a cras semper. Sit amet massa vitae tortor. Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. At tellus at urna condimentum mattis pellentesque id nibh tortor. Senectus et netus et malesuada fames ac. A erat nam at lectus urna duis convallis convallis tellus. Leo duis ut diam quam nulla porttitor massa id. Amet porttitor eget dolor morbi non arcu risus. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Integer quis auctor elit sed vulputate mi sit amet mauris.
                    <br />
                    Consectetur purus ut faucibus pulvinar elementum integer enim. Nulla at volutpat diam ut venenatis tellus in metus. Leo duis ut diam quam. Volutpat est velit egestas dui id ornare arcu. Tortor vitae purus faucibus ornare suspendisse sed nisi. Lectus quam id leo in vitae turpis massa sed. Adipiscing diam donec adipiscing tristique risus nec. Eget lorem dolor sed viverra ipsum nunc aliquet. Viverra accumsan in nisl nisi. Nunc vel risus commodo viverra maecenas accumsan lacus. Volutpat maecenas volutpat blandit aliquam etiam erat. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Duis tristique sollicitudin nibh sit amet commodo. Ut consequat semper viverra nam. Euismod quis viverra nibh cras pulvinar. Hendrerit gravida rutrum quisque non tellus orci. Id nibh tortor id aliquet lectus. Lacinia at quis risus sed vulputate odio ut. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Massa enim nec dui nunc mattis enim ut tellus.
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