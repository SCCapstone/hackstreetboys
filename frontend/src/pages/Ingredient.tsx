import './Ingredient.css';
import {Router, Switch, Route, useParams, Link} from "react-router-dom";
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
    IonBadge, IonCol, IonCardHeader, IonCardTitle, IonCardSubtitle, IonLabel, IonRow,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { constructOutline, menuOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { Ingredient } from '../models/Ingredient';
import IngredientBanner from '../assets/fridger_banner.png'
import Header from '../components/Header';
import {Recipe} from "../models/Recipe";
import {routePrams} from "./Recipe";
import RecipeBanner from "../assets/fridger_banner.png";
interface IngredientProps {
    ingredient: Ingredient,
}
export interface routeParams {
    id: string;
}
function IngredientPage(this: any) {
    const [ingredient, setIngredient] = React.useState<Ingredient>({
        id: 1,
        name: "",
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        alcohol: false,
        cost: 0.0,
        imgSrc: ""
    });
    const { id } = useParams<routeParams>();
    useEffect(() => {
        fetch(`https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/ingredient/${id}`)
            .then(response => response.json())
            .then(data => setIngredient(data))
    }, [])
    console.log(ingredient);

    const [recipes, setRecipes] = React.useState<[Recipe]>([{
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
        estimatedCost: 0.0,
        type: "",
        tags: "",
        ingredientIds: "1,2",
        rating: 5.0
    }]);
    useEffect(() => {
        fetch("https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/recipe/")
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
                            <IonCard>
                                {/*<img src={IngredientBanner} alt="IngredientImage" style={{ width: '100%', objectFit: 'cover' }} />*/}
                                <img src="https://picsum.photos/2000/1000" style={{ width: '50%', height: "100%", objectFit: 'scale-down', float: "right"}} />
                                <IonCardContent>
                                    <h1>{ingredient.name} is about <b>{ingredient.calories}</b> kcal per serving.<br/></h1>
                                </IonCardContent>

                                <IonCardContent>
                                    <p>
                                        One serving of <b>{ingredient.name.toLowerCase()}</b> contains <br/>
                                        {ingredient.carbohydrates}g of carbohydrates,<br/>
                                        {ingredient.protein}g of protein, and<br/>
                                        {ingredient.fat}g of fat.<br/><br/>
                                    </p>
                                    <h3>The estimated cost of one serving of {ingredient.name.toLowerCase()} is about ${ingredient.cost.toFixed(2)}<br/></h3>
                                </IonCardContent>

                                <IonCardContent>
                                    <IonBadge color={ingredient.alcohol == true ? 'danger' : 'secondary'}>{ingredient.alcohol == true ? "Alcoholic" : ingredient.alcohol == false ? "Not Alcoholic" : ""}</IonBadge>
                                </IonCardContent>




                            </IonCard>



                            <IonCard>
                                <IonCardTitle className="ion-margin-top, ion-text-center" style={{paddingTop:"15px", paddingBottom:"10px"}}>Check out some recipes that contain {ingredient.name.toLowerCase()}s!</IonCardTitle>
                                <IonRow>
                                    { recipes.map(recipe =>
                                        { if(recipe.ingredientIds != null) {
                                            let ids = recipe.ingredientIds.split(",");
                                            if(ids.includes(ingredient.id.toString())) {
                                                return(
                                                    <IonCol sizeXs="16" sizeSm="4" key={recipe.id}>
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
                                                )
                                            }
                                        }}
                                    )}
                                </IonRow>
                            </IonCard>

                        </IonContent>
                    </IonPage>
                </IonApp>
            </Switch>
        </Router>
    );
}

export default IngredientPage;