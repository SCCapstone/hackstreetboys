import "./Recipe.css";
import { Router, Switch, useParams } from "react-router-dom";
import history from "../History";
import { Link } from "react-router-dom";
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
} from "@ionic/react";
/* Theme variables */
import "../theme/variables.css";
import SideBar from "../components/SideBar";
import React, { useEffect } from "react";
import { Recipe } from "../models/Recipe";
import RecipeBanner from "../assets/fridger_banner.png";
import Header from "../components/Header";
import { add, heart, pencilSharp, warningOutline, openOutline } from 'ionicons/icons';
import { useContext } from "react";
import Context from "../components/Context";
import { Review } from "../models/Review";
import { Favorite } from "../models/Favorite";
import axios from "axios";
import { Complaint } from "../models/Complaint";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  PinterestShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  EmailIcon,
} from "react-share";
import { Ingredient } from "../models/Ingredient";
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
  const { id } = useParams<routePrams>();
  const [favorite, setFavorite] = React.useState<Favorite>({
    id: 1,
    userId: context.currentUser?.id,
    recipeId: 1,
  });
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/favorites/?recipeId=${id}`)
      .then((response) => response.json())
      .then((data) => setFavorite(data));
  }, []);

  const [favorites, setFavorites] = React.useState<[Favorite]>([
    {
      id: 1,
      userId: context.currentUser?.id ? context.currentUser?.id : 0,
      recipeId: 1,
    },
  ]);
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/favorites/?recipeId=${id}`)
      .then((response) => response.json())
      .then((data) => setFavorites(data));
  }, []);

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
    rating: 0,
  });
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/recipe/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data));
  }, [id]);
  console.log(recipe);

  const [reviews, setReview] = React.useState<[Review]>([
    {
      id: 1,
      rating: 0,
      feedback: "none yet",
      authorId: 0,
      authorName: "",
      recipeId: 0,
    },
  ]);
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/review/?recipeId=${id}`)
      .then((response) => response.json())
      .then((data) => setReview(data));
  }, []);
  console.log(recipe.id);
  console.log(reviews);
  const [complaints, setComplaints] = React.useState<Complaint>({
    id: 1,
    severity: 0,
    reason: "none yet",
    authorId: 0,
    complaintId: 0,
  });

  const { navigate } = useContext(NavContext);
//set the recipes
  const [recipes, setAllRecipes] = React.useState<[Recipe]>([
    {
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
      rating: 0,
    },
  ]);
  useEffect(() => {
    fetch("https://api.fridger.recipes/v1/recipe/")
      .then((res) => res.json())
      .then((data) => setAllRecipes(data));
  }, []);
//check if the recipe is already a user favorite
  const checkFav = async () => {
    favorites.filter(
      (recipe) =>
        favorite.recipeId == Number(id) &&
        favorite.userId == context.currentUser?.id
    ).length === 0
      ? addFav()
      : removeFav();
  };
//add favorite
  const addFav = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.token}`,
        },
      };
      const body = {
        userId: context.currentUser?.id,
        recipeId: recipe.id,
      };
      console.log("trigger");
      const res = await axios
        .post("https://api.fridger.recipes/v1/favorites/", body, config)
        .then((res) => {
          console.log("Resulting data" + res.data);
          if (res.status == 200) {
            console.log("Status is " + res.status);
            history.push("/favorites");
            //history.push(`/favorites/recipe/${id}`);
          }
        });
      return res;
    } catch (e) {
      console.error(e);
    }
    return false;
  };
  //set titles
  useEffect(() => {
    document.title = recipe.title;
  }, [recipe.title]);
  //set ingredients
  const [ingredients, setIngredients] = React.useState<[Ingredient]>([
    {
      id: 1,
      name: "Recipe not found",
      calories: 0,
      carbohydrates: 0,
      protein: 0,
      fat: 0,
      alcohol: false,
      cost: 0.0,
      imgSrc: "",
    },
  ]);
  //fetch ingredients
  useEffect(() => {
    fetch("https://api.fridger.recipes/v1/ingredient/")
      .then((response) => response.json())
      .then((data) => setIngredients(data));
  }, []);
//Remove favorite method
  const removeFav = async () => {
    console.log("clicked delete");
    console.log(favorite);
    if (favorites[0].recipeId == Number(id)) {
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        userId: context.currentUser?.id,
        recipeId: recipe.id,
        favoriteId: favorite.id,
      };
      const res = await axios
        .delete(
          `https://api.fridger.recipes/v1/favorites/${favorite.id}`,
          config
        )
        .then((res) => {
          console.log("Removed from favorites by" + favorite.id);
          if (res.status == 200) {
            console.log("Status is " + res.status);
            navigate("/favorites");
          }
        });
      return res;
    } catch (e) {
      console.error(e);
    }
    return false;
  };
// Complaint link for admins
  const complaintLink = () => {
    if (context.isAdmin) {
      return (
        <>
          <Link to={`/complaint/${id}`}>
            <IonButton color="danger" expand="full">
              See complaints about this recipe.
            </IonButton>
          </Link>
        </>
      );
    } else {
      return <></>;
    }
  };
    //fetch complaints
    useEffect(() => {
      fetch(`https://api.fridger.recipes/v1/complaint/?recipeId=${recipe.id}`)
        .then((response) => response.json())
        .then((data) => setComplaints(data));
    }, []);
  let shareUrl = `https://fridger.recipes/recipe/${id}`;
  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header />
            <IonContent className="ion-padding">
              {/* If complaints exist and user is admin. They will appear at the top */}
              {complaintLink()}
              <IonCard>
                {/* <img src="https://picsum.photos/1000/250" alt="Recipe Image" style={{ width: '100%', maxHeight: 350, objectFit: 'cover' }} /> */}
                <img
                  src={recipe.imgSrc ? recipe.imgSrc : RecipeBanner}
                  alt="Recipe Image"
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "cover",
                  }}
                />
                {/* Favorite and share buttons. Share buttons use library which props are passed */}
                <IonCardContent>
                  <div
                    className="Demo__container"
                    style={{ paddingBottom: "1px", display: "flex" }}
                  >
                    <IonButton
                      color="danger"
                      onClick={() => {
                        if (!context.loggedInState) history.push("/register");
                        else checkFav();
                      }}
                    >
                      {/* <IonButton onClick={() => { fav() }} > */}
                      <IonIcon icon={heart} alt-text="add" />
                    </IonButton>
                    <FacebookShareButton
                      url={"https://fridger.recipes/" + recipe.id}
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

                    <PinterestShareButton
                      url={String(window.location)}
                      media={recipe.imgSrc}
                      className="Demo__some-network__share-button"
                    >
                      <PinterestIcon size={40} round />
                    </PinterestShareButton>

                    <RedditShareButton
                      url={shareUrl}
                      title={recipe.title}
                      windowWidth={660}
                      windowHeight={460}
                      className="Demo__some-network__share-button"
                    >
                      <RedditIcon size={40} round />
                    </RedditShareButton>

                    <EmailShareButton
                      url={shareUrl}
                      subject={recipe.title}
                      body="body"
                      className="Demo__some-network__share-button"
                    >
                      <EmailIcon size={40} round />
                    </EmailShareButton>
                  </div>
                  <h1>{recipe.title
                      ?  recipe.title
                      : "Recipe not found"}</h1>

                  <h2>{recipe.description}</h2>

                  <h2>
                    {recipe.rating
                      ? "Rating: " + recipe.rating.toFixed(1)
                      : "No rating"}
                  </h2>
                  <h2>By: {recipe.authorName ? recipe.authorName : "anon"}</h2>
                  <h3>
                    {/* Calculates the price sign */}
                    Price:{" "}
                    {recipe.estimatedCost > 100
                      ? "$$$"
                      : recipe.estimatedCost > 50
                      ? "$$"
                      : "$"}{" "}
                    {recipe.estimatedCost}
                  </h3>

                  <h3>
                    {/* Total time method */}
                    Total Time: {recipe.totalTime} mins (
                    {recipe.prepTime > 0 ? "Prep Time: " + recipe.prepTime : ""}
                    {recipe.prepTime > 0 && recipe.cookTime > 0 ? " + " : ""}
                    {recipe.cookTime > 0 ? "Cook Time: " + recipe.cookTime : ""}
                    )
                  </h3>
                  <h3>Yield: {recipe.yield} servings</h3>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardContent>
                  <h2>Ingredients </h2>
                      {/* Get ingredients from array */}
                  {ingredients
                    .filter((ingredient) =>
                      recipe.ingredientIds
                        .split(",")
                        .includes(ingredient.id.toString())
                    )
                    .map((ingredient) => (
                      <p>
                        -{" "}
                        <a href={`../ingredient/${ingredient.id}`}>
                          {ingredient.name}
                        </a>
                      </p>
                    ))}
                  <br />

                  <h2>Instructions</h2>
                  <p>{recipe.body}</p>
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
                  {/* Gets user reviews and ratings for this recipe. Gets the last four and then has a button to add or view the other reviews for that recipe */}
                  <h2>Reviews</h2>
                  <IonGrid>
                    <IonRow>
                      {reviews.slice(-4).map((review) => (
                        <IonCol sizeLg="3" sizeSm="1" key={review.id}>
                          <Link to={`/review/${review.id}`}>
                            <IonCard button routerDirection="forward">
                              <IonCardHeader>
                                <IonCardTitle>{review.feedback}</IonCardTitle>
                                <IonCardSubtitle>
                                  Rating: {review.rating}
                                  <br />
                                  By: {review.authorName}
                                </IonCardSubtitle>
                              </IonCardHeader>
                            </IonCard>
                          </Link>
                        </IonCol>
                      ))}
                    </IonRow>
                  </IonGrid>
                  <div style={{ display: "flex" }}>
                    <Link to={`/recipe/${recipe.id}/review`}>
                      <IonFabButton style={{ marginRight: "25px" }}>
                        <IonIcon icon={add} />
                      </IonFabButton>
                    </Link>
                    <Link to={`/review/recipe/${recipe.id}`}>
                      <IonButton>
                        <IonIcon
                          icon={openOutline}
                          style={{ marginRight: "5px" }}
                        />
                        View more
                      </IonButton>
                    </Link>
                  </div>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardContent>
                  {/* Links to recipe complaint form */}
                  <Link to={`/recipe/${recipe.id}/complaint`}>
                    <IonButton color="danger">
                      <IonIcon
                        icon={warningOutline}
                        style={{ marginRight: "5px" }}
                      />
                      Report this recipe
                    </IonButton>
                  </Link>
                </IonCardContent>
              </IonCard>
            </IonContent>
                        {/* If the user is the author or an admin they can edit or delete the recipe by going to the edit page */}
            {recipe.author === context.currentUser?.id || context.isAdmin ? (
              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton routerLink={`/recipe/edit/${recipe.id}`}>
                  <IonIcon icon={pencilSharp} alt-text="edit" />
                </IonFabButton>
              </IonFab>
            ) : (
              ""
            )}
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default RecipePage;
