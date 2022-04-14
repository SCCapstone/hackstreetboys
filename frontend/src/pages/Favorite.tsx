import './Recipe.css';
import { Router, Switch, useParams } from "react-router-dom";
import history from '../History';
import { Link } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonPage,
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
  IonRow,
  NavContext,
  IonGrid,
  IonFab,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import React, { useEffect, useState } from 'react';
import { Recipe } from '../models/Recipe';
import RecipeBanner from '../assets/fridger_banner.png'
import Header from '../components/Header';
import { add, heart, pencilSharp, logoFacebook, warningOutline } from 'ionicons/icons';
import { useContext } from 'react';
import Context from '../components/Context';
import { Review } from '../models/Review';
import {Favorite} from '../models/Favorite';
import axios from 'axios';
import {Complaint} from '../models/Complaint';
import { userInfo } from 'os';
import {
  FacebookShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
  HatenaShareCount,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
  HatenaIcon
} from "react-share";
import { Ingredient } from '../models/Ingredient';
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

function FavoritePage() {
  const context = useContext(Context);
  const { id } = useParams<routePrams>();


  const [favorite, setFavorite ] = React.useState<Favorite>({
    id: 1, 
    userId: context.currentUser?.id, 
    recipeId: 1
  });
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/favorites/${id}`)
    .then(response => response.json())
    .then(data => setFavorite(data))
  }, [id])

  const [recipe, setRecipe] = React.useState<Recipe>({
    id: 1,
    title: "",
    author: 0,
    authorName: "",
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
  
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/recipe/${favorite.recipeId}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
  }, [favorite.recipeId])
  // console.log(recipe);


  

  const [favorites, setFavorites ] = React.useState<[Favorite]>([{
    id: 1, 
    userId: context.currentUser?.id, 
    recipeId: 1
  }]);
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/favorites/`)
    .then(response => response.json())
    .then(data => setFavorites(data))
  }, [])

  


  const [reviews, setReview] = React.useState<[Review]>([{
    id: 1,
    rating: 0,
    feedback: "none yet",
    authorId: 0,
    authorName: "",
    recipeId: 0
  }]);
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/review/?recipeId=${id}`)
    .then(response => response.json())
    .then(data => setReview(data))
  }, [])
  // console.log(recipe.id);
console.log(reviews);
  const [complaints, setComplaints] = React.useState<Complaint>({
    id: 1,
    severity: 0,
    reason: "none yet",
    authorId: 0,
    complaintId: 0
  });
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/complaint/`)
    .then(response => response.json())
    .then(data => setComplaints(data))
  }, [])
  const {navigate} = useContext(NavContext);

const[recipes, setAllRecipes] = React.useState<[Recipe]> ([{
  id: 1,
  title: "",
  author: 0,
  authorName: "",
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
}]);
useEffect(() => {
  fetch('https://api.fridger.recipes/v1/recipe/')
  .then(res => res.json())
  .then(data => setAllRecipes(data))
}, [])

const [ingredients, setIngredients] = React.useState<[Ingredient]>([{
  id: 1,
  name: "",
  calories: 0,
  carbohydrates: 0,
  protein: 0,
  fat: 0,
  alcohol: false,
  cost: 0.0,
  imgSrc: ""
}]);
useEffect(() => {
  fetch("https://api.fridger.recipes/v1/ingredient/")
      .then(response => response.json())
      .then(data => setIngredients(data))
}, [])


const removeFav = async () => {
  // console.log('clicked delete');
  // console.log(favorite);
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      "userId":context.currentUser?.id,
      "recipeId":recipe.id,
      "favoriteId":favorite.id
    }
    const res = await axios.delete(
      `https://api.fridger.recipes/v1/favorites/${favorite.id}`,
      config
      ).then(res=> {
      // console.log("Removed from favorites by" + favorite.id);
      if(res.status == 200){
        console.log("Status is "+res.status);
        navigate('/favorites');
      }

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
let shareUrl = `https://fridger.recipes/recipe/${id}`
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
                <img src={recipe.imgSrc ? recipe.imgSrc : RecipeBanner} alt="Recipe Image" style={{ width: '100%', maxHeight:'400px', objectFit: 'cover'}} />
                <IonCardContent>
          <div className="Demo__container" style={{paddingBottom: '1px', display: 'flex'}}>
            <IonButton color = 'danger' onClick={() => {if(!context.loggedInState) history.push('/register'); else ( removeFav() )}} >     
            Remove from favorites</IonButton>      

          <FacebookShareButton
            url={"https://fridger.recipes/"+recipe.id}
            quote={recipe.title}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <FacebookMessengerShareButton
            url={shareUrl}
            appId="641532566054417"
            className="Demo__some-network__share-button"
          >
            <FacebookMessengerIcon size={40} round />
          </FacebookMessengerShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={recipe.title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <TelegramShareButton
            url={shareUrl}
            title={recipe.title}
            className="Demo__some-network__share-button"
          >
            <TelegramIcon size={40} round />
          </TelegramShareButton>

          <WhatsappShareButton
            url={shareUrl}
            title={recipe.title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>

          <PinterestShareButton
            url={String(window.location)}
            media={recipe.imgSrc}
            className="Demo__some-network__share-button"
          >
            <PinterestIcon size={40} round />
          </PinterestShareButton>

          <VKShareButton
            url={shareUrl}
            image={recipe.imgSrc}
            className="Demo__some-network__share-button"
          >
            <VKIcon size={40} round />
          </VKShareButton>

          <RedditShareButton
            url={shareUrl}
            title={recipe.title}
            windowWidth={660}
            windowHeight={460}
            className="Demo__some-network__share-button"
          >
            <RedditIcon size={40} round />
          </RedditShareButton>
          <TumblrShareButton
            url={shareUrl}
            title={recipe.title}
            className="Demo__some-network__share-button"
          >
            <TumblrIcon size={40} round />
          </TumblrShareButton>

          <EmailShareButton
            url={shareUrl}
            subject={recipe.title}
            body="body"
            className="Demo__some-network__share-button"
          >
            <EmailIcon size={40} round />
          </EmailShareButton>

          <WeiboShareButton
            url={shareUrl}
            title={recipe.title}
            image={recipe.imgSrc}
            className="Demo__some-network__share-button"
          >
            <WeiboIcon size={40} round />
          </WeiboShareButton>
      </div>
      <h1>{recipe.title}</h1>
                  <h2>{recipe.description}</h2>

                  <h2>{recipe.rating ? ("Rating: " + recipe.rating.toFixed(1)) : "No rating"}</h2>
                  <h2>By: {recipe.authorName ? recipe.authorName : "anon"}</h2>
                  <h3>Price: {recipe.estimatedCost > 100 ? "$$$" : recipe.estimatedCost > 50 ? "$$" : "$"} {recipe.estimatedCost}</h3>

                  <h3>Total Time: {recipe.totalTime} mins ({recipe.prepTime > 0 ? "Prep Time: " + recipe.prepTime : ""}{recipe.prepTime > 0 && recipe.cookTime > 0 ? " + ": ""}{recipe.cookTime > 0 ? "Cook Time: " + recipe.cookTime : ""})</h3>
                  <h3>Yield: {recipe.yield} servings</h3>

                </IonCardContent>

              </IonCard>
              <IonCard>
                <IonCardContent>
                  <h2>Ingredients </h2>

                  {ingredients.filter(ingredient => (
                      recipe.ingredientIds.split(",").includes(ingredient.id.toString()))).map(ingredient => (
                      <p>
                        - <a href={`../ingredient/${ingredient.id}`}>{ingredient.name}</a>
                      </p>
                  ))}
                  <br/>

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
                    <h2>Reviews</h2>
                    <IonGrid>
         <IonRow>
            {reviews.slice(-4).map(review => 
               <IonCol sizeLg="3" sizeSm='1'  key={review.id}>
                   <Link to={`/review/${review.id}`}>
                       <IonCard button routerDirection="forward">
                         <IonCardHeader>
                           <IonCardTitle>{review.feedback}</IonCardTitle>
                         <IonCardSubtitle>Rating: {review.rating}<br/>By: {review.authorName}</IonCardSubtitle>
                      </IonCardHeader>
                   </IonCard>
                 </Link>
              </IonCol>
            )}
            
          </IonRow>
        </IonGrid>
                   <div style={{display: 'flex'}}> 
            <Link to={`/recipe/${recipe.id}/review`}>
            <IonFabButton style={{marginRight: '25px'}}>
                      <IonIcon icon={add} />
                    </IonFabButton>
                  </Link>
                  <Link to={`/review/${recipe.id}`}><IonButton>
              See all reviews about this recipe
            </IonButton></Link>
            </div>
            </IonCardContent>
            </IonCard>
            <IonCard>
                  <IonCardContent>
                <Link to={`/recipe/${recipe.id}/complaint`}>
                    <IonButton color="danger" >
                      <IonIcon icon={warningOutline} style={{marginRight: '5px'}} />Report this recipe
                    </IonButton>
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

export default FavoritePage;
