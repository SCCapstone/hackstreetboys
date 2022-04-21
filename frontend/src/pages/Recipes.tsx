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
    IonButton,
    IonAlert,
    IonRippleEffect,
    IonCardSubtitle, IonSearchbar, IonItem, IonRange, IonToggle,

} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { add, searchOutline, arrowBack, colorFill, heart, thumbsDown, thumbsUp } from 'ionicons/icons';
import React, {useContext, useEffect, useState} from 'react';
import { Recipe } from '../models/Recipe';
import Header from '../components/Header';
import { State } from 'ionicons/dist/types/stencil-public-runtime';
import { open } from 'fs';
import Context from '../components/Context';
import RecipeBanner from '../assets/fridger_banner.png'

interface RecipeProps {
  recipe: Recipe,
}
const Recipes: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

  const [ searchText, setSearchText ] = useState("");


  const [recipes, setRecipes] = React.useState<[Recipe]>([{
    id: 1,
    title: "Biscuits and Jam",
    author: 0,
    authorName: "Quinn Biscuit",
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
    document.title="Recipes";
 fetch('https://api.fridger.recipes/v1/recipe/')
      .then(response => response.json())
      .then(data => setRecipes(data))
  }, [])
  console.log(recipes);
  
  var color = "gray";
 var liked = false;

 const toggle = () => {
  let localLiked = liked;
  localLiked = !localLiked;
  liked = localLiked;
 };

    let totalTimeLower = Math.min.apply(Math, recipes.map(function(r) { return r.totalTime;}));
    let totalTimeUpper = Math.max.apply(Math, recipes.map(function(r) { return r.totalTime;}));

    let yieldLower = Math.min.apply(Math, recipes.map(function(r) { return r.yield;}));
    let yieldUpper = Math.max.apply(Math, recipes.map(function(r) { return r.yield;}));

    let costLower = Math.min.apply(Math, recipes.map(function(r) { return r.estimatedCost;}));
    let costUpper = Math.max.apply(Math, recipes.map(function(r) { return r.estimatedCost;}));

    let ratingLower = Math.min.apply(Math, recipes.map(function(r) { return r.rating;}));
    let ratingUpper = Math.max.apply(Math, recipes.map(function(r) { return r.rating;}));

    const [title, setTitle] = useState("");
    const [totalTime, setTotalTime] = useState(9999);
    const [servingYield, setServingsYield] = useState(9999);
    const [cost, setCost] = useState(9999);
    const [rating, setRating] = useState(5);


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
                        <IonCol>
                            <IonCard style={{marginTop:"30px", marginLeft:"10px", marginRight:"20px", padding:"25px"}}>
                                <IonSearchbar placeholder="Search Recipes" onIonChange={e => e.detail.value ? setTitle(e.detail.value!) : setTitle("")} debounce={0} inputmode="search" search-icon={searchOutline}/>

                                <IonItem>
                                    <IonLabel>Total Time</IonLabel>
                                    <IonRange min={totalTimeLower} max={totalTimeUpper} value={totalTime} color="secondary" pin={true} onIonChange={e => setTotalTime(e.detail.value as any)}>
                                        <IonLabel slot="start" >{totalTimeLower}</IonLabel>
                                        <IonLabel slot="end">{totalTimeUpper}</IonLabel>
                                    </IonRange>
                                </IonItem>

                                <IonItem>
                                    <IonLabel>Servings Yield</IonLabel>
                                    <IonRange min={yieldLower} max={yieldUpper} value={servingYield} color="secondary" pin={true} onIonChange={e => setServingsYield(e.detail.value as any)}>
                                        <IonLabel slot="start" >{yieldLower}</IonLabel>
                                        <IonLabel slot="end">{yieldUpper}</IonLabel>
                                    </IonRange>
                                </IonItem>

                                <IonItem>
                                    <IonLabel>Cost</IonLabel>
                                        <IonRange min={costLower} max={costUpper} value={cost} color="secondary" pin={true} onIonChange={e => setCost(e.detail.value as any)}>
                                        <IonLabel slot="start" >{costLower}</IonLabel>
                                        <IonLabel slot="end">{costUpper}</IonLabel>
                                    </IonRange>
                                </IonItem>

                                <IonItem>
                                    <IonLabel>Rating</IonLabel>
                                        <IonRange min={ratingLower} max={ratingUpper} value={rating} color="secondary" pin={true} onIonChange={e => setRating(e.detail.value as any)}>
                                        <IonLabel slot="start" >{ratingLower.toFixed(1)}</IonLabel>
                                        <IonLabel slot="end">{ratingUpper.toFixed(1)}</IonLabel>
                                    </IonRange>
                                </IonItem>

                            </IonCard>
                        </IonCol>

                        <IonCol size={"7"}>
                            {recipes.filter(recipe => (
                                recipe.title.toLowerCase().includes(title.toLowerCase()) &&
                                recipe.totalTime <= totalTime &&
                                recipe.yield <= servingYield &&
                                recipe.rating <= rating &&
                                recipe.estimatedCost <= cost
                            )).map(recipe =>
                           <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                          <IonCard button routerDirection="forward">
                          <img src={recipe.imgSrc ? recipe.imgSrc : RecipeBanner} style={{ maxHeight:'250px', width:'100%', objectFit: 'cover'}} alt="ion"/>

                            <IonCardHeader>
                              <IonCardTitle>{recipe.title}</IonCardTitle>
                              <IonCardSubtitle>By {recipe.authorName ? (recipe.authorName) : "Anonymous"}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                              <IonLabel>{recipe.rating ? ("Rating: " + recipe.rating.toFixed(1)) : "No rating"}</IonLabel><br/>
                              <IonLabel>Time: {Math.floor(recipe.totalTime / 60) != 0 ? Math.floor(recipe.totalTime / 60) + "h" : ""} {recipe.totalTime % 60}m</IonLabel>
                            </IonCardContent>
                          </IonCard>
                          </Link>
                            )}
                        </IonCol>

                    </IonRow>
                  </IonGrid>
                  {context.currentUser ? <IonFab vertical="bottom" horizontal="end" slot="fixed" >
                  <IonFabButton routerLink={`/recipe/add`}>
                      <IonIcon icon={add} alt-text="add"/>
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