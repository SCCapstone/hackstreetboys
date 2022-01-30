import './Recipes.css';
import { Router, Switch, Link } from "react-router-dom";
import history from '../History';
import {
  IonApp,
  IonContent,
  IonPage,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonLabel,
  IonRow,
  IonText,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { add } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { Recipe } from '../models/Recipe';
import Header from '../components/Header';
interface RecipeProps {
  recipe: Recipe,
}
function Recipes() {
  const [recipes, setRecipes] = React.useState<[Recipe]>([{
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
  }]);
  useEffect(() => {

 fetch("https://api.fridger.recipes/v1/recipe/")
      .then(response => response.json())
      .then(data => setRecipes(data))
  }, [])
  console.log(recipes);
  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
          <Header />
            <IonContent className="ion-padding">
                  <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Recipes</h1></IonText>
                  <IonGrid>
                    <IonRow>
                      {recipes.map(recipe =>
                        <IonCol sizeXs="16" sizeSm="4" key={recipe.id}>
                           {/* <RecipeCard recipe={recipePassed} showLocation routerLink={`/recipe/${recipePassed.id}`} /> */}
                           <Link to={`/recipe/${recipe.id}`}>
                          <IonCard button routerDirection="forward">
                          <img src="https://picsum.photos/1500/800" alt="ion"/>
                            <IonCardHeader>
                              <IonCardTitle>{recipe.title}</IonCardTitle>
                              <IonCardSubtitle>By {recipe.author ? (recipe.author) : "Anonymous"}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                              <IonLabel>{recipe.rating ? ("Rating: " + recipe.rating) : "No rating"}</IonLabel><br/>
                              <IonLabel>Time: {recipe.totalTime}m</IonLabel>
                            </IonCardContent>
                          </IonCard>
                          </Link>
                        </IonCol>
                      )}
                    </IonRow>
                  </IonGrid>
                  <Link to="/recipe/add">
                  <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton>
                      <IonIcon icon={add} />
                    </IonFabButton>
                  </IonFab>
                  </Link>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default Recipes;