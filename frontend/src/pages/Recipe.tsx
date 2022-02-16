import './Recipe.css';
import { Router, Switch, Route, useParams, RouteComponentProps, useHistory } from "react-router-dom";
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
  IonFab,
  IonFabButton,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { add, constructOutline, menuOutline, pencil } from 'ionicons/icons';
import React, { useContext, useEffect } from 'react';
import { Recipe } from '../models/Recipe';
import RecipeBanner from '../assets/fridger_banner.png'
import Header from '../components/Header';
import Context from '../components/Context';
interface RecipeProps {
  recipe: Recipe,
}
export interface routePrams {
  id: string;
}
const RecipePage: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
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
  });
  const { id } = useParams<routePrams>();
  const context = useContext(Context);
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/recipe/${id}`)
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
                <img src={recipe.imgSrc ? recipe.imgSrc : RecipeBanner} alt="Recipe Image" style={{ width: '100%', objectFit: 'cover' }} />
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
              {context.currentUser ? <IonFab vertical="bottom" horizontal="end" slot="fixed" >
                    <IonFabButton routerLink={`/recipe/edit/${id}`}>
                      <IonIcon icon={pencil} />
                    </IonFabButton>
                  </IonFab> : ""} 
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default RecipePage;


