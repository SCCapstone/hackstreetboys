import './Ingredient.css';
import {Router, Switch, Route, useParams, Link} from "react-router-dom";
import history from '../History';
import {
    IonApp,
    IonContent,
    IonPage,
    IonCard,
    IonCardContent,
    IonBadge, IonCol, IonCardHeader, IonCardTitle, IonCardSubtitle, IonLabel, IonRow, IonButton
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import React, {useEffect, useContext} from 'react';
import {Ingredient} from '../models/Ingredient';
import Header from '../components/Header';
import {Recipe} from "../models/Recipe";
import Context from '../components/Context';

import {some} from "lodash";

interface IngredientProps {
    ingredient: Ingredient,
}

export interface routeParams {
    id: string;
}

function IngredientPage(this: any) {
    const context = useContext(Context);

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

    const {id} = useParams<routeParams>();
    useEffect(() => {
        fetch(`http://localhost:8080/v1/ingredient/${id}`)
            .then(response => response.json())
            .then(data => setIngredient(data))
    }, [id])

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
        alcoholic: false,
        type: "",
        tags: "",
        ingredientIds: "1,2",
        rating: 5.0
    }]);
    useEffect(() => {
        fetch("http://localhost:8080/v1/recipe/")
            .then(response => response.json())
            .then(data => setRecipes(data))
    }, [])

    function chooseSome() {
        // HOW MANY RECIPES TO SELECT
        const wantedNumber = 3;

        // DETERMINES WHICH RECIPES INCLUDE THE CURRENT INGREDIENT
        const inclusiveRecipes = [];
        for (let i = 0; i < recipes.length; i += 1) {
            if (recipes[i].ingredientIds.split(",").includes(ingredient.id.toString())) {
                const tempRec = recipes[i];
                inclusiveRecipes.push(tempRec);
            }
        }

        // MAXIMUM OF wantedNumber RECIPES TO BE CHOSEN
        let curr;
        inclusiveRecipes.length < wantedNumber ? curr = inclusiveRecipes.length : curr = wantedNumber;

        const elementIndex = [curr];
        const len = curr;

        curr--;

        // RANDOM RECIPE INDICES SELECTED
        while (curr >= 0) {
            const num = Number((Math.random() * inclusiveRecipes.length).toFixed(0));
            if (!elementIndex.includes(num)) {
                elementIndex[curr] = num;
                curr--;
            }
        }

        // RANDOM RECIPES ASSIGNED
        const someRecipes = [];
        for (let i = 0; i < len; i += 1) {
            someRecipes.push(inclusiveRecipes[elementIndex[i]]);
        }
        return someRecipes;
    }

    const someRecipes = chooseSome();
    // console.log("SOME RECIPES");
    // console.log(someRecipes);


    return (
        <Router history={history}>
            <Switch>
                <IonApp>
                    <SideBar/>
                    <IonPage className="ion-page" id="main-content">
                        <Header/>
                        <IonContent className="ion-padding">
                            <IonCard style={{height:"400px"}}>
                                <img src={ingredient.imgSrc}
                                     style={{width: '50%', height: "100%", objectFit: 'scale-down', float: "right"}}/>
                                <IonCardContent>
                                    <h1>{ingredient.name} is about <b>{ingredient.calories}</b> kcal per serving.<br/>
                                    </h1>
                                </IonCardContent>

                                <IonCardContent>
                                    <p>
                                        One serving of <b>{ingredient.name.toLowerCase()}</b> contains <br/>
                                        {ingredient.carbohydrates}g of carbohydrates,<br/>
                                        {ingredient.protein}g of protein, and<br/>
                                        {ingredient.fat}g of fat.<br/><br/>
                                    </p>
                                    <h3>The estimated cost of one serving of {ingredient.name.toLowerCase()} is about
                                        ${ingredient.cost.toFixed(2)}<br/></h3>
                                </IonCardContent>

                                <IonCardContent>
                                    <IonBadge style={{padding:"5px"}} color={ingredient.alcohol ? 'danger' : 'secondary'}>{ingredient.alcohol ? "Alcoholic" : !ingredient.alcohol ? "Not Alcoholic" : ""}</IonBadge>
                                </IonCardContent>
                                <IonCardContent>
                                    {context.currentUser ?
                                        <Link to={`/ingredient/edit/${id}`}>
                                            <IonBadge style={{paddingLeft:"25px", paddingRight:"25px", padding:"10px"}} color="success">
                                                Edit {ingredient.name}
                                            </IonBadge>
                                        </Link>
                                         : ""}
                                </IonCardContent>
                            </IonCard>


                            <IonCard>
                                <IonCardTitle className="ion-margin-top, ion-text-center" style={{
                                    paddingTop: "20px",
                                    paddingBottom: "10px",
                                    fontSize: "25px",
                                    fontStyle: "italic"
                                }}>Check out some recipes that contain {ingredient.name.toLowerCase()}!</IonCardTitle>
                                <IonRow>
                                    {someRecipes.map(recipe => {
                                        // console.log(recipe);
                                        if (recipe != null) {
                                            if (recipe.ingredientIds != null) {
                                                return (
                                                    <IonCol sizeXs="20" sizeSm="4" key={recipe.id}>
                                                        <Link to={`/recipe/${recipe.id}`}>
                                                            <IonCard button routerDirection="forward">
                                                                {/*<img src={recipe.imgSrc ? recipe.imgSrc : "https://picsum.photos/1500/800"} alt="recipePhoto"/>*/}
                                                                <img src={"https://picsum.photos/1500/800"} alt="recipePhoto"/>

                                                                <IonCardHeader>
                                                                    <IonCardTitle>{recipe.title}</IonCardTitle>
                                                                    <IonCardSubtitle>By {recipe.author ? (recipe.author) : "Anonymous"}</IonCardSubtitle>
                                                                </IonCardHeader>

                                                                <IonCardContent>
                                                                    <IonLabel>{recipe.rating ? ("Rating: " + recipe.rating.toFixed(1)) : "No rating"}</IonLabel><br/>
                                                                    <IonLabel>Time: {Math.floor(recipe.totalTime / 60) != 0 ? Math.floor(recipe.totalTime / 60) + "h" : ""} {recipe.totalTime % 60}m</IonLabel>
                                                                </IonCardContent>
                                                            </IonCard>
                                                        </Link>
                                                    </IonCol>
                                                )
                                            }
                                        }
                                    })}

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