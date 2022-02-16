import './Recipes.css';
import { Router, Switch, Link, RouteComponentProps } from "react-router-dom";
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
  IonSearchbar,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { add } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import { Recipe } from '../models/Recipe';
import Header from '../components/Header';
import Context from '../components/Context';
interface RecipeProps {
  recipe: Recipe,
}
const Recipes: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

  const [ searchText, setSearchText ] = useState("");


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
    alcoholic: false,
    type: "food",
    tags: "test,string",
    ingredientIds: "2929, 29292",
    rating: 4.2
  }]);
  const context = useContext(Context);

  useEffect(() => {

 fetch(`https://api.fridger.recipes/v1/recipe/`)
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
                  <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
                  <IonGrid>
                    <IonRow>
                      {recipes.filter(recipe => (recipe.title.toLowerCase().includes(searchText.toLowerCase())) || (recipe.tags.toLowerCase().includes(searchText.toLowerCase()))).map(fRecipe => (
                        <IonCol sizeXs="16" sizeSm="4" key={fRecipe.id}>
                           {/* <RecipeCard recipe={recipePassed} showLocation routerLink={`/recipe/${recipePassed.id}`} /> */}
                          <IonCard button routerDirection="forward" routerLink={`/recipe/${fRecipe.id}`}>
                          <img src={fRecipe.imgSrc ? fRecipe.imgSrc : "https://picsum.photos/1500/800"} alt="ion"/>
                            <IonCardHeader>
                              <IonCardTitle>{fRecipe.title}</IonCardTitle>
                              <IonCardSubtitle>By {fRecipe.author ? (fRecipe.author) : "Anonymous"}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                              <IonLabel>{fRecipe.rating ? ("Rating: " + fRecipe.rating) : "No rating"}</IonLabel><br/>
                              <IonLabel>Time: {fRecipe.totalTime}m</IonLabel>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      ))}
                    </IonRow>
                  </IonGrid>
                  {context.currentUser ? <IonFab vertical="bottom" horizontal="end" slot="fixed" >
                  <IonFabButton routerLink={`/recipe/add`}>
                      <IonIcon icon={add} />
                    </IonFabButton>
                  </IonFab> : ""}
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default Recipes;