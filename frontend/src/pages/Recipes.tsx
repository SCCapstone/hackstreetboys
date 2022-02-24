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
    IonCardSubtitle, IonSearchbar, IonItem, IonRange, IonToggle,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import {add, searchOutline} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
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

    let totalTimeLower = Math.min.apply(Math, recipes.map(function(r) { return r.totalTime;}));
    let totalTimeUpper = Math.max.apply(Math, recipes.map(function(r) { return r.totalTime;}));

    let yieldLower = Math.min.apply(Math, recipes.map(function(r) { return r.yield;}));
    let yieldUpper = Math.max.apply(Math, recipes.map(function(r) { return r.yield;}));

    let costLower = Math.min.apply(Math, recipes.map(function(r) { return r.estimatedCost;}));
    let costUpper = Math.max.apply(Math, recipes.map(function(r) { return r.estimatedCost;}));

    let ratingLower = Math.min.apply(Math, recipes.map(function(r) { return r.rating;}));
    let ratingUpper = Math.max.apply(Math, recipes.map(function(r) { return r.rating;}));

    const [title, setTitle] = useState("");
    const [totalTimeRange, setTotalTimeRange] = useState<{ lower: number; upper: number;}>({lower: 0, upper: 9999});
    const [yieldRange, setYieldRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [costRange, setCostRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [ratingRange, setRatingRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 5});


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
                                {/*<IonSearchbar placeholder="Calories" onIonChange={e => e.detail.value ? setCalories(parseInt(e.detail.value!)) : setCalories(10000)} debounce={200} inputmode="numeric" search-icon={flameOutline}/>*/}

                                <IonItem>
                                    <IonLabel>Total Time</IonLabel>
                                    {/*<IonRange dualKnobs={true} min={caloriesLower} max={caloriesUpper} step={5} snaps={true} color="secondary" pin={true} onIonChange={e => caloriesRange.upper===1000 && caloriesRange.lower===0 ? setCaloriesRange({lower: caloriesLower, upper: caloriesUpper}) : setCaloriesRange(e.detail.value as any)}>*/}
                                    <IonRange dualKnobs={true} min={totalTimeLower} max={totalTimeUpper} step={5} snaps={true} color="secondary" pin={true} onIonChange={e => setTotalTimeRange(e.detail.value as any)}>
                                        <IonLabel slot="start" >{totalTimeLower}</IonLabel>
                                        <IonLabel slot="end">{totalTimeUpper}</IonLabel>
                                    </IonRange>
                                </IonItem>

                                <IonItem>
                                    <IonLabel>Servings Yield</IonLabel>
                                    <IonRange dualKnobs={true} min={yieldLower} max={yieldUpper} color="secondary" pin={true} onIonChange={e => setYieldRange(e.detail.value as any)}>
                                        <IonLabel slot="start" >{yieldLower}</IonLabel>
                                        <IonLabel slot="end">{yieldUpper}</IonLabel>
                                    </IonRange>
                                </IonItem>

                                <IonItem>
                                    <IonLabel>Cost</IonLabel>
                                    <IonRange dualKnobs={true} min={costLower} max={costUpper} color="secondary" pin={true} onIonChange={e => setCostRange(e.detail.value as any)}>
                                        <IonLabel slot="start" >{costLower}</IonLabel>
                                        <IonLabel slot="end">{costUpper}</IonLabel>
                                    </IonRange>
                                </IonItem>

                                <IonItem>
                                    <IonLabel>Rating</IonLabel>
                                    <IonRange dualKnobs={true} min={ratingLower} max={ratingUpper} color="secondary" pin={true} onIonChange={e => setRatingRange(e.detail.value as any)}>
                                        <IonLabel slot="start" >{ratingLower.toFixed(1)}</IonLabel>
                                        <IonLabel slot="end">{ratingUpper.toFixed(1)}</IonLabel>
                                    </IonRange>
                                </IonItem>

                            </IonCard>
                        </IonCol>

                        <IonCol size={"7"}>
                            {recipes.filter(recipe => (
                                recipe.title.toLowerCase().includes(title.toLowerCase()) &&
                                recipe.totalTime >= totalTimeRange.lower && recipe.totalTime <= totalTimeRange.upper &&
                                recipe.yield >= yieldRange.lower && recipe.yield <= yieldRange.upper &&
                                recipe.rating >= ratingRange.lower && recipe.rating <= ratingRange.upper &&
                                recipe.estimatedCost >= costRange.lower && recipe.estimatedCost <= costRange.upper
                            )).map(recipe =>
                           <Link to={`/recipe/${recipe.id}`}>
                          <IonCard button routerDirection="forward">
                          <img src="https://picsum.photos/1500/800" alt="ion"/>
                            <IonCardHeader>
                              <IonCardTitle>{recipe.title}</IonCardTitle>
                              <IonCardSubtitle>By {recipe.author ? (recipe.author) : "Anonymous"}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                              <IonLabel>{recipe.rating ? ("Rating: " + recipe.rating.toFixed(1)) : "No rating"}</IonLabel><br/>
                              <IonLabel>Time: {recipe.totalTime}m</IonLabel>
                            </IonCardContent>
                          </IonCard>
                          </Link>
                            )}
                        </IonCol>

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