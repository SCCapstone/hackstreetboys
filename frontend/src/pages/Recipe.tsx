import './Recipe.css';
import { Router, Switch, Route, useParams } from "react-router-dom";
import history from '../History';
import { Link } from 'react-router-dom';
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
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonCardContent,
  IonBadge,
  IonFabButton,
  IonFab,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { constructOutline, menuOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Recipe } from '../models/Recipe';
import RecipeBanner from '../assets/fridger_banner.png'
import Header from '../components/Header';
import { add, heart, thumbsUp } from 'ionicons/icons';
import Favorites from './Favorites';
import { useContext } from 'react';
import Context from '../components/Context';
import App from '../App';
import { User } from '../models/User';

interface RecipeProps {
  recipe: Recipe,
}
export interface routePrams {
  id: string;
}//this: any
function RecipePage() {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ user, setUser ] = useState<User>();
  const globals = {
    loggedInState: loggedIn,
    currentUser: user,
    setLoggedIn,
    setUser
  }
  const context = useContext(Context);
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
    type: "",
    tags: "",
    ingredientIds: "",
    rating: 0
  });
  const { id } = useParams<routePrams>();
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/recipe/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
  }, [])
  console.log(recipe);

  const [favorites, setFavorites] = useState([] as Array<number>);

  
useEffect(() => {
  const loggedInUser = localStorage.getItem('user')
  if (loggedInUser) {
    console.log(loggedInUser)
    const foundUser = JSON.parse(loggedInUser);
    setUser(foundUser);
    setLoggedIn(true);
  }
}, []);


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
               
                  {/* <Link to="/favorites"> */}
                    {/* <IonFab vertical="bottom" horizontal="end" slot="fixed"> */}
                          <IonButton onClick={() => {if(!loggedIn) history.push('/register'); else history.push('/favorites')}} >
                            <IonIcon icon={heart} />
                          </IonButton>
                      {/* </IonFab> */}
                  {/* </Link> */}

                <IonCardContent>
                  <h1>{recipe.title}</h1>
                  <h2>{recipe.description}</h2>
                  <h2>{recipe.rating ? ("Rating: " + recipe.rating) : "No rating"}</h2>
                  <h2>By: <a href="">{recipe.author}</a></h2>
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
                {/* <Link to={`/recipe/${recipe.id}/addreview`}> */}
                <Link to={`/review/add`}>
                  <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton>
                      <IonIcon icon={add} />
                    </IonFabButton>
                  </IonFab>
                  </Link>
              </IonCard>
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default RecipePage;