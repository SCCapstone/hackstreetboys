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
  IonLabel,
  IonRow,
  NavContext,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { constructOutline, menuOutline, navigate } from 'ionicons/icons';
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
import { Review } from '../models/Review';
import {Favorite} from '../models/Favorite';
import axios from 'axios';
import { config } from 'process';
import { useForm } from 'react-hook-form';
import {Complaint} from '../models/Complaint';

interface ComplaintExample {
  complaint: Complaint;
}

interface FavoriteExample {
  favorite: Favorite;
}
interface ReviewExample {
  reviews: Review;
}
interface RecipeProps {
  recipe: Recipe;
}
export interface routePrams {
  id: string;
}

function RecipePage() {
  const context = useContext(Context);
  const [favorites, setFavorite ] = React.useState<Favorite>({
    id: 1, 
    userId: context.currentUser?.id, 
    recipeId: 1
  });
  useEffect(() => {
    //fetch(`http://localhost:8080/v1/reviews`)
    fetch(`http://localhost:8080/v1/reviews`)
    .then(response => response.json())
    .then(data => setFavorite(data))
  }, [])
  
  const [reviews, setReview] = React.useState<Review>({
    id: 1,
    rating: 0,
    feedback: "none yet",
    authorId: 0,
    recipeId: 0
  });
  useEffect(() => {
    fetch(`http://localhost:8080/v1/reviews`)
    //fetch(`http://localhost:8080/v1/reviews`)
    .then(response => response.json())
    .then(data => setReview(data))
  }, [])

  const [complaints, setComplaints] = React.useState<Complaint>({
    id: 1,
    severity: 0,
    reason: "none yet",
    authorId: 0,
    complaintId: 0
  });
  useEffect(() => {
    fetch(`http://localhost:8080/v1/complaints`)
    //fetch(`http://localhost:8080/v1/complaints`)
    .then(response => response.json())
    .then(data => setComplaints(data))
  }, [])
  
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
    //fetch(`http://localhost:8080/v1/recipe/${id}`)
    fetch(`http://localhost:8080/v1/recipe/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
  }, [id])
  console.log(recipe);

  //const [favorites, setFavorites] = useState([] as Array<number>);
  const {navigate} = useContext(NavContext);


const[recipes, setAllRecipes] = React.useState<[Recipe]> ([{
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
}]);
useEffect(() => {
  fetch('http://localhost:8080/v1/recipe/')
  .then(res => res.json())
  .then(data => setAllRecipes(data))
}, [])

//const favs = recipes.find(() => true);

// const addFav = (recipe: any) => {
  
//   favorites.userId = context.currentUser?.id;
//   favorites.recipeId = recipe.id;
//   history.push('/favorites');
// }

const fav = async () => {
  addFav();
  removeFav();
  //history.push(`/favorites/recipe/${id}`);
  //navigate('/favorites');
}

const addFav = async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      "userId":context.currentUser?.id,
      "recipeId":recipe.id
    }
    const res = await axios.post(
      'http://localhost:8080/v1/favorites/',
      body,
      config
    ).then(res=> {
      console.log("Resulting data" + res.data);
      if(res.status == 200){
        console.log("Status is "+res.status);
        navigate('/favorites');
        //history.push(`/favorites/recipe/${id}`);
      }

      
    });
    return res;
  }catch (e) {
    console.error(e);
}
return false;
};

const removeFav = async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // const body = {
    //   "userId":context.currentUser?.id,
    //   "recipeId":recipe.id
    // }
    const res = await axios.delete(
      `http://localhost:8080/v1/favorites/recipe/${recipe.id}`,
      config
      ).then(res=> {
      console.log("Removed from favorites by" + recipe.id);
      // if(res.status == 200){
      //   console.log("Status is "+res.status);
      //   navigate('/favorites');
      // }

    });
    return res;
  }catch (e) {
    console.error(e);
}
return false;
};

const complaintLink = () => {
 if(context.isAdmin) {
    return <>
    <Link to={`/complaint/${complaints.complaintId}`}><IonButton color='danger' expand='full'>
    Click to see Reviews about all recipes
  </IonButton>
  </Link>
    </>
  }
  else {
    return <></>
  }
}
  return (
    
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header />
            <IonContent className="ion-padding">
              {complaintLink()}
              <IonCard>
                {/* <img src="https://picsum.photos/1000/250" alt="Recipe Image" style={{ width: '100%', maxHeight: 350, objectFit: 'cover' }} /> */}
                <img src={RecipeBanner} alt="Recipe Image" style={{ width: '100%', objectFit: 'cover' }} />
               
                          <IonButton onClick={() => {if(!context.loggedInState) history.push('/register'); else ( fav() )}} >
                          {/* <IonButton onClick={() => { fav() }} > */}
                            <IonIcon icon={heart} />
                          </IonButton>

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
                <IonRow>
                {/* {review.map((review) =>
                        <IonCol sizeXs="12" sizeSm="6" key={review.id}>
                         <Link to={`/review/${review.id}`}>
                          <IonCard button routerDirection="forward">
                            <IonCardHeader>

                              <IonCardTitle>{review.id}</IonCardTitle>
                              <IonCardSubtitle>Rating: {review.rating}</IonCardSubtitle>
                            </IonCardHeader>
                          </IonCard>
                          </Link>
                        </IonCol>
                      )} */}
                      </IonRow>
                {/* <Link to={`/recipe/${recipe.id}/addreview`}> */}
               
              </IonCard>

              <IonCard>
                  <IonCardContent>
                    {/* <Link to={`/review/${recipe.id}`}><IonButton> */}
                    <Link to={`/review/${recipe.id}`}><IonButton>
              Click to see Reviews about all recipes
            </IonButton>
            </Link>
            </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent>
            <h2>Add a review:</h2>
                <Link to={`/review/add`}>
                    <IonFabButton >
                      <IonIcon icon={add} />
                    </IonFabButton>
                  </Link>
                  
                  
                  {/* {reviews.map(review =>
                        <IonCol sizeXs="12" sizeSm="6" key={review.id}>
                         <Link to={`/review/${review.id}`}>
                          <IonCard button routerDirection="forward">
                            <IonCardHeader>

                              <IonCardTitle>{review.id}</IonCardTitle>
                              <IonCardSubtitle>Rating: {review.rating}</IonCardSubtitle>
                            </IonCardHeader>
                          </IonCard>
                          </Link>
                        </IonCol>
                      )} */}
                
                  </IonCardContent>
                  <IonCardContent>
            <h2>Submit a Complaint:</h2>
                <Link to={`/complaint/add`}>
                    <IonFabButton >
                      <IonIcon icon={add} />
                    </IonFabButton>
                  </Link>
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