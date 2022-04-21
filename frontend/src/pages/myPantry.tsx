import './myPantry.css';

import {
  IonAlert,
    IonApp,
    IonAvatar,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonFab,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonPage,
    IonPopover,
    IonRow,
    IonSplitPane,
    IonText,
    IonTitle,
    IonToolbar,
  } from '@ionic/react';
  import RecipeBanner from '../assets/fridger_banner.png'
import { removeCircle } from 'ionicons/icons';
import { addCircle } from 'ionicons/icons';
import { Link, Router, Switch, useParams } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from "../components/Header";
import { image, logoYoutube, menuOutline } from 'ionicons/icons';
import React, { Component, useContext, useEffect, useState } from 'react';
import { Pantry } from '../models/Pantry';
import { Ingredient } from '../models/Ingredient';
import { Recipe } from '../models/Recipe';
import AddIngredient from './AddIngredient';
import Context from '../components/Context';
import axios from 'axios';
import { stringify } from 'querystring';
import RecipePage from './Recipe';
import { remove } from 'lodash';

let fruits2 = [["apple", "2"], ["banana", "3"], ["orange", "4"]];

const DOMAIN = "https://api.fridger.recipes"
// const DOMAIN = "https://api.fridger.recipes"

let refresh: number = 1;


// function delay(ms: number) {
//   return new Promise( resolve => setTimeout(resolve, ms) );
// }

// function IngredientInfo () {
//   const [ing, setIngredient] = React.useState<Pantry>({
//     id: 99,
//     userID: 2,
//     ingredientName: "273",
//     numIngredient: 34,
//     description: "kdajfkldaj"
//   })
//   return (
//     console.log(ing)
//   )
// }


function MyPantry() {

  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [user, setUser] = useState("");
  const [clearPantryAlert, setClearPantryAlert] = useState(false);

  const context = useContext(Context)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${context.token}`
    },
  };

  let thisUserID = 0;

  console.log(context)
  if (context.currentUser != undefined) {
    thisUserID = context.currentUser!.id;
    console.log("USERID: " + thisUserID);
  }

  //Recipe Display

  //Grab all ingredient for bottom section
  const [ingredientArray, setAllIngredients] = React.useState<[Ingredient]>([{
    id: 1,
    name: "Loading Ingredients...",
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    alcohol: false,
    cost: 0.0,
    imgSrc: ""
  }]);
  useEffect(() => {
    fetch(DOMAIN + '/v1/ingredient/')
      .then(ingResp => ingResp.json())
      .then(ingData => setAllIngredients(ingData))
  }, []) //i only want this to refresh at start or when ingredientArray changes

  //Grab all recipes for the current ingredients
  const [recipes, setRecipes] = React.useState<[Recipe]>([{
    id: 1,
    title: "Loading Recipes...",
    author: 0,
    authorName: "",
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
    alcoholic: false,
    ingredientIds: "2929, 29292",
    rating: 4.2
  }]);
  useEffect(() => {
    fetch(DOMAIN + "/v1/recipe/")
      .then(response => response.json())
      .then(data => setRecipes(data))
  }, [])

  // useEffect(() => {
  //   document.title = "My Pantry";
  // }, []);
  //This will refresh pantry with current user
  //   +thisUserID.toString()

  const refreshPantry = () => {
    fetch(DOMAIN + '/v1/user/pantry/' + context.currentUser!.id
      , config)
      // fetch(DOMAIN+'/v1/user/pantry',config)
      .then(res => res.json())
      .then(data => setPantry(data)) //set pantry is the method that updates and calls and changes pantry
    console.log("Refreshing Pantry")
    console.log(pan);
    //refresh = refresh+1;
  }

  //Grab pantry at start
  //This will reload EVERY time setPantry is called
  const [pan, setPantry] = React.useState<[Pantry]>([{
    id: 0,
    userID: 0,
    ingredientName: "Loading Pantry Items...",
    numIngredient: 0,
    description: ""
  }]);
  useEffect(() => { //doesn't pull and log right at the start!
    console.log("HELLO");
    console.log(pan);
    refreshPantry();
    console.log(pan);

    // fetch(DOMAIN+'/v1/ingredient/')
    //   .then(ingResp => ingResp.json())
    //   .then(ingData => setAllIngredients(ingData))
  }, [refresh])

  //Base Ingredient to be edited to add to pantry

  //IngredientToPantry
  const givePantryVersionFromName = (ingPanName: string) => {
    for (let i = 0; i < pan.length; i++) {
      if (pan[i].ingredientName === ingPanName) {
        console.log("FOUND ITEM in pantry")
        return pan[i];
      }
    }
    //we did not find the pantry item currently in pantry. Give new version of it
    return {
      id: 0,//this will get reassigned in backend
      userID: thisUserID,
      ingredientName: ingPanName,
      numIngredient: 1,
      description: "This is a description of the pantryitem"
    }

  }

  //PantryToIngredient
  const giveIngredientVersionFromName = (ingPanName: string) => {
    for (let i = 0; i < ingredientArray.length; i++) {
      if (ingredientArray[i].name === ingPanName) {
        return ingredientArray[i];
      }
    }
    return null;
  }
  const [currIng, setCurrIng] = useState<Ingredient>({
    id: 1000,
    name: "test",
    calories: 1000,
    carbohydrates: 1000,
    protein: 1000,
    fat: 1000,
    alcohol: true,
    cost: 1000.0,
    imgSrc: ""
  })

  const canMakeRecipe = (recipeIng: string[]) => {
    let panIngredientIDS = pantryIngredientIDs();
    for (let i = 0; i < recipeIng.length; i++) {
      if (!panIngredientIDS.includes(recipeIng[i]))
        return false;
    }
    return true;
  }

  //This method will populate all ingredientIDs in Pantry
  const pantryIngredientIDs = () => {
    let panIngredientIDS: string[] = [];
    pan.map(panItem => {
      if (giveIngredientVersionFromName(panItem.ingredientName) != null) {
        var tempIngID: string = ((giveIngredientVersionFromName(panItem.ingredientName))!.id).toString(); //! = strict null check
        panIngredientIDS.push(tempIngID) //this will hold the ingredient IDs from Pantry.
      }
    }
    )
    // console.log("panIngredientIDS: ");
    // console.log(panIngredientIDS);
    return panIngredientIDS;
  }

  //Add new item to pantry
  const addToPantry = (newPan: Pantry) => {
    console.log(newPan);
    refreshPantry();
    //if pantry includes the item
    if (containsPantryItem(newPan, pan)) {
      console.log("Incrementing by 1 " + newPan.ingredientName)
      console.log(newPan);
      axios.put(DOMAIN + '/v1/user/pantry/increase/' + newPan.id,
        newPan.id,
        config
      )
        .then(response => { 
          console.log(response); 
        }).catch(error => {
          console.error("error: "+error);
          console.error(newPan);
        });
      //console.log(response);)
    } else { //If Pantry does not include item
      console.log("Adding Fresh " + newPan.ingredientName)
      axios.post(
        DOMAIN + '/v1/user/pantry/',
        newPan,
        config
      )
        .then(res => {
          console.log("Status: ", res.status);
          console.log("Data:", res.data);
        }).catch(error => {
          console.error('Something went wrong!', error);
          console.error(newPan);
        });
    }
    refresh = refresh + 1; //this causes useeffect to reload
  }

  //Clear the pantry
  const clearPantry = () => {
    refreshPantry();
    console.log("Clearing Pantry");
    axios.delete(
      DOMAIN + '/v1/user/pantry/clear-pantry/' + context.currentUser!.id,
      config);
    refresh = refresh + 1; //this causes useeffect to reload
  }

  //Remove an item from pantry
  const removeFromPantry = (removePan: Pantry) => {
    console.log(removePan);
    refreshPantry();
    //if pantry includes the item
    if (containsPantryItem(removePan, pan)) {
      console.log(removePan);
      if (removePan.numIngredient > 1) {
        axios.put(DOMAIN + '/v1/user/pantry/decrease/' + removePan.id,
          removePan.id,
          config)
          .then(response => { 
            console.log(response); 
          }).catch(error => {
            console.error("something went wrong", error);
            console.error(removePan);
          });
      }
      else { //pan.numIngredient == 1
        axios.delete(DOMAIN + '/v1/user/pantry/' + removePan.id,
          config
          )
          .then(response => { 
            console.log(response); 
          });
      }

      //console.log(response);)

    } else { //If Pantry does not include item
      console.log("Item does not exist. Can not delete a non-existent item");
    }
    refresh = refresh + 1; //this causes useeffect to reload
  }

  //This will check to see if the name of the ingredient is already in pantry
  const containsPantryItem = (panItem: Pantry, pantry: [Pantry]) => {
    for (let i = 0; i < pantry.length; i++) {
      if (pantry[i].ingredientName === panItem.ingredientName) {
        return true; //in pantry
      }
    }
    return false; //not in pantry
  }

  //Grab ingredient!
  const setIngFromPantry = (pantryName: String) => {
    for (let i = 0; i < ingredientArray.length; i++) {
      if (ingredientArray[i].name === pantryName) {
        //setCurrIng(ingredientArray[i]);
      }
    }
  }

  //Grab ingredient stats for mapping
  const ingredientStatsImgSrc = (pantryName: string, ingArray: [Ingredient]) => {
    for (let i = 0; i < ingArray.length; i++) {
      if (ingArray[i].name === pantryName) {
        return ingArray[i].imgSrc;
      }
    }
    return "";
  }
  const ingredientStatsAlcohol = (pantryName: string, ingArray: [Ingredient]) => {
    for (let i = 0; i < ingArray.length; i++) {
      if (ingArray[i].name === pantryName) {
        return ingArray[i].alcohol;
      }
    }
    return "";
  }
  const ingredientStatsCalories = (pantryName: string, ingArray: [Ingredient]) => {
    for (let i = 0; i < ingArray.length; i++) {
      if (ingArray[i].name === pantryName) {
        return ingArray[i].calories;
      }
    }
    return "";
  }
  const ingredientStatsCarbs = (pantryName: string, ingArray: [Ingredient]) => {
    for (let i = 0; i < ingArray.length; i++) {
      if (ingArray[i].name === pantryName) {
        return ingArray[i].carbohydrates;
      }
    }
    return "";
  }
  const ingredientStatsProtein = (pantryName: string, ingArray: [Ingredient]) => {
    for (let i = 0; i < ingArray.length; i++) {
      if (ingArray[i].name === pantryName) {
        return ingArray[i].protein;
      }
    }
    return "";
  }
  const ingredientStatsFat = (pantryName: string, ingArray: [Ingredient]) => {
    for (let i = 0; i < ingArray.length; i++) {
      if (ingArray[i].name === pantryName) {
        return ingArray[i].fat;
      }
    }
    return "";
  }
  const ingredientStatsCost = (pantryName: string, ingArray: [Ingredient]) => {
    for (let i = 0; i < ingArray.length; i++) {
      if (ingArray[i].name === pantryName) {
        return ingArray[i].cost;
      }
    }
    return "";
  }

  // const sleep = (milliseconds) => {
  //   return new Promise(resolve => setTimeout(resolve, milliseconds))
  // }


  // useEffect(() => {
  //   fetch(DOMAIN+'/v1/ingredient/${pan.map(myIng=> myIng.name)}') //need this id to be the same as whats in the pantry
  //   .then(response => response.json())
  //   .then(data => setIngredients(data))
  // }, [])
  // console.log(ingredient)

  //Ingredient popup
  const [showPop, setPop] = useState<{ open: boolean, event: Event | undefined }>({
    open: false,
    event: undefined
  });

  const [showAddIngredient, setAddIngredient] = useState<{ open: boolean, event: Event | undefined }>({
    open: false,
    event: undefined
  });

  const logRecipes = () => {
    console.log("RECIPES");
    console.log(recipes);
  }
  if (!(context.currentUser && context.currentUser.id)) {
    return (
      <Router history={history}>
        <Switch>
          <IonApp>
            <SideBar />
            <IonPage className="ion-page" id="main-content">
              <Header />
              <IonContent className="ion=page" id="main-content">
                <h2>You must be signed in to use 'Your Pantry'</h2>
              </IonContent>
            </IonPage>
          </IonApp>
        </Switch>
      </Router>
    )
  } else { //This is what shows up once the user is signed in
    return (
      <Router history={history}>
        <Switch>
          <IonApp>
            <SideBar />
            <IonPage className="ion-page" id="main-content">
              <Header />
              <IonContent className="ion-padding">
                <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>{context.currentUser.name}'s Pantry!</h1></IonText>

                {/* <IonPage id="main-content"> */}
                {/* <IonSplitPane when="sm" contentId="right"> */}
                <IonGrid>
                  {/* Start Of Left Section */}
                  <IonRow>
                    <IonCol>
                      <IonContent>
                        <div>
                        <h1>Your Ingredients are stored here</h1>
                        </div>

                        <IonList>
                          <IonItem>
                            PANTRY ITEMS
                            <IonButton slot="end" color="warning" onClick={(e) =>
                              setClearPantryAlert(true)

                              }>Clear Pantry</IonButton>
                            <IonAlert isOpen={clearPantryAlert}
                              message="
                              <center>
                              Are you sure that you want to clear your pantry?<br/>
                              All of the items in your pantry will be deleted.
                              </center>"
                              onDidDismiss={() => setClearPantryAlert(false)}
                              buttons = {['CANCEL',{ cssClass: 'cancelButton', text: 'CLEAR PANTRY',handler: (d) => clearPantry()}]}
                              />
                          </IonItem>
                          {pan.map(myPan =>
                            <IonItem key={myPan.id}>
                              {setIngFromPantry(myPan.ingredientName)}
                              <IonAvatar slot="start">
                                <img src={ingredientStatsImgSrc(myPan.ingredientName, ingredientArray)}></img>
                              </IonAvatar>
                              <IonLabel>
                                <h2>{myPan.ingredientName}</h2>
                              </IonLabel>
                              <IonIcon icon={removeCircle} color="danger" size="large" slot="end" onClick={(e) => {
                                removeFromPantry(myPan)
                              }}>
                              </IonIcon>
                              <IonLabel slot="end">
                                <h2>Servings: {myPan.numIngredient}</h2>
                              </IonLabel>
                              <IonIcon icon={addCircle} color="success" size="large" slot="end" onClick={(e) => {
                                addToPantry(myPan)
                              }}>
                              </IonIcon>
                              {/* <IonButton onClick={(e) => setPop({open: true, event: e.nativeEvent})}>{myPan.ingredientName} Facts</IonButton> */}
                              {/* <IonPopover
                              isOpen={showPop.open}
                              event={showPop.event}
                              onDidDismiss={e => setPop({open: false, event: undefined})}
                            >
                              <IonList>
                                <IonItem>
                                  Calories: {ingredientStatsCalories(myPan.ingredientName,ingredientArray)}
                                </IonItem>
                                <IonItem>Carbs: {ingredientStatsCarbs(myPan.ingredientName,ingredientArray)} g</IonItem>
                                <IonItem>Protein: {ingredientStatsProtein(myPan.ingredientName,ingredientArray)} g</IonItem>
                                <IonItem>Fat: {ingredientStatsFat(myPan.ingredientName,ingredientArray)} g</IonItem>
                                <IonItem>Contains alcohol? {ingredientStatsAlcohol(myPan.ingredientName,ingredientArray)}</IonItem>
                                <IonItem>Estimated Cost: ${ingredientStatsCost(myPan.ingredientName,ingredientArray)}</IonItem>
                              </IonList>
                            </IonPopover> */}
                            </IonItem>
                          )}
                        </IonList>
                      </IonContent>
                    </IonCol>
                    <IonCol>
                      <div>
                        <h2>Add Some Ingredients to your pantry!</h2>
                      </div>
                      <IonList>
                        {ingredientArray.map(ing =>
                          <IonItem key={ing.id}>
                            <IonAvatar slot="start">
                              <img src={ing.imgSrc}></img>
                            </IonAvatar>
                            <IonLabel>
                              <h2>{ing.name}</h2>
                            </IonLabel>
                            <IonButton color="success" onClick={(e) => {
                              console.log("button clicks")
                              console.log(givePantryVersionFromName(ing.name))
                              addToPantry(givePantryVersionFromName(ing.name))
                            }
                            }>
                              ADD {ing.name}</IonButton>
                          </IonItem>
                        )}
                      </IonList>
                    </IonCol>
                    <IonCol>
                      <h2>You Can Make these recipes with your ingredients!</h2>
                      {recipes.map(recipe => {
                        let ids = recipe.ingredientIds.split(",")
                        if (canMakeRecipe(ids)) {
                          return (
                            <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                              <IonCard button routerDirection='forward'>
                              <img src={recipe.imgSrc ? recipe.imgSrc : RecipeBanner}  style={{ maxHeight:'250px', width:'100%', objectFit: 'cover'}} alt={recipe.title}/>
                                <IonCardHeader>
                                  <IonCardTitle>{recipe.title}</IonCardTitle>
                                  <IonCardSubtitle>By {recipe.authorName ? (recipe.authorName) : "Anonymous"}</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>
                                  <IonLabel>{recipe.rating ? ("Rating: " + recipe.rating.toFixed(1)) : "No rating"}</IonLabel><br />
                                  <IonLabel>Time: {Math.floor(recipe.totalTime / 60) != 0 ? Math.floor(recipe.totalTime / 60) + "h" : ""} {recipe.totalTime % 60}m</IonLabel>
                                  <IonFab vertical="bottom" horizontal="end" slot="fixed">
                                    <Link to={`/recipe/${recipe.id}`}>
                                    </Link>
                                  </IonFab>
                                </IonCardContent>
                              </IonCard>
                            </Link>
                          )
                        }
                      }
                      )}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonContent>
            </IonPage>
          </IonApp>
        </Switch>
      </Router>
    );
  }
}

export default MyPantry;
