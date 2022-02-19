import './myPantry.css';

import {
    IonApp,
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonPage,
    IonPopover,
    IonTitle,
    IonToolbar,
  } from '@ionic/react';

import { Router, Switch, useParams } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from "../components/Header";
import { image, logoYoutube, menuOutline } from 'ionicons/icons';
import React, { Component, useEffect, useState } from 'react';
import { Pantry } from '../models/Pantry';
import { Ingredient } from '../models/Ingredient';
import { Recipe } from '../models/Recipe';
import AddIngredient from './AddIngredient';
import axios from 'axios';
import { stringify } from 'querystring';

let fruits2 = [["apple","2"],["banana","3"],["orange","4"]];

const DOMAIN = "http://localhost:8080" 
// DOMAIN options:
// https://api.fridger.recipes  -> web server testing
// http://localhost:8080        -> mySQL + Springboot test

const userID = 11;//TODO change this
let refresh: number = 1;


function IngredientInfo () {
  const [ing, setIngredient] = React.useState<Pantry>({
    id: 99,
    userID: 2,
    ingredientName: "273",
    numIngredient: 34,
    description: "kdajfkldaj"
  })
  return (
    console.log(ing)
  )
}

function MyPantry() {
  
  //Grab all ingredient for bottom section
  const [ingredientArray, setAllIngredients] = React.useState<[Ingredient]>([{
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
      fetch(DOMAIN+'/v1/ingredient/')
          .then(ingResp => ingResp.json())
          .then(ingData => setAllIngredients(ingData))
  }, [])

  //Grab all recipes for the current ingredients
  const [recipeArray, setAllRecipes] = React.useState<[Recipe]>([{
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
    fetch(DOMAIN+'/v1/recipes/')
      .then(recResp => recResp.json())
      .then(recData => setAllRecipes(recData))
  }, [])


  //This will refresh pantry with current
   const refreshPantry = async () => {
    fetch(DOMAIN+'/v1/user/pantry/') //pass in user id
    .then(res => {
      return res.json();
    })
    .then((data) => setPantry(data)) //set pantry is the method that updates and calls and changes pantry
  }

  //Grab pantry at start
  //This will reload EVERY time setPantry is called
  const [pan, setPantry] = React.useState<[Pantry]>([{ 
    id: 99,
    userID: 2,
    ingredientName: "99",
    numIngredient: 2,
    description: "This is a description of the food"
  }]);
  useEffect(() => { //doesn't pull and log right at the start!
    console.log("HELLO");
    console.log(pan);
    refreshPantry();
    console.log(pan);
    fetch(DOMAIN+'/v1/ingredient/')
          .then(ingResp => ingResp.json())
          .then(ingData => setAllIngredients(ingData))
  }, [refresh])
  
  //Base Ingredient to be edited to add to pantry

  //IngredientToPantry
  const givePantryVersionFromName = (ingPanName: string) => {
    for(let i=0;i<pan.length;i++) {
      if(pan[i].ingredientName === ingPanName) {
        console.log("FOUND ITEM in pantry")
        return pan[i];
      }
    }
    //we did not find the pantry item currently in pantry. Give new version of it
    return {
      id: 0,//this will get reassigned in backend
      userID: userID,
      ingredientName: ingPanName,
      numIngredient: 1,
      description: "This is a description of the pantryitem"
    }

  }
  const [currPan, setCurrPan] = useState<Pantry>({
    id: 3,
    userID: 1,
    ingredientName: "REFRESHING RANDY",
    numIngredient: 1,
    description: "This is a test of the food"
  })

  //PantryToIngredient
  const giveIngredientVersionFromName = (ingPanName: string) => {
    for(let i=0;i<ingredientArray.length;i++) {
      if(ingredientArray[i].name === ingPanName) {
        setCurrIng(ingredientArray[i]);
      }
    }
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
  


  //Add new item to pantry
  const addToPantry = (newPan: Pantry) => {
    console.log(newPan);
    refreshPantry();
    //if pantry includes the item
    if(containsPantryItem(newPan,pan)) {
      console.log(newPan);
      axios.put(DOMAIN+'/v1/user/pantry/'+newPan.id+'/increase')
        .then(response => 
          {console.log(response);}
      );
          //console.log(response);)
    } else { //If Pantry does not include item
      axios.post(DOMAIN+'/v1/user/pantry/', newPan).then(res => {
        console.log("Status: ", res.status);
        console.log("Data:", res.data);
      }).catch(error => {
        console.error('Something went wrong!', error);
        console.error(newPan);
      });
    }
    refresh = refresh+1; //this causes useeffect to reload
  }

  //Clear the pantry
  const clearPantry = () => {
    refreshPantry();
    axios.delete(DOMAIN+'/v1/user/pantry/');
    console.log("Clearing Pantry");
    refresh = refresh+1; //this causes useeffect to reload
  }

  //Remove an item from pantry
  const removeFromPantry = (removePan: Pantry) => {
    console.log(removePan);
    refreshPantry();
    //if pantry includes the item
    if(containsPantryItem(removePan,pan)) {
      console.log(removePan);
      axios.put(DOMAIN+'/v1/user/pantry/'+removePan.id+'/decrease')
        .then(response => 
          {console.log(response);}
      );
          //console.log(response);)
    } else { //If Pantry does not include item
      console.log("Item does not exist. Can not delete a non-existent item");
    }
    refresh = refresh+1; //this causes useeffect to reload
  }
    
  //This will check to see if the name of the ingredient is already in pantry
  const containsPantryItem = (panItem: Pantry, pantry: [Pantry]) => {
    for(let i=0;i<pantry.length;i++) {
      if(pantry[i].ingredientName === panItem.ingredientName) {
        return true; //in pantry
      }  
    }
    return false; //not in pantry
  }

  //Grab ingredient!
  const setIngFromPantry = (pantryName: String) => {
    for(let i=0;i<ingredientArray.length;i++) {
      if(ingredientArray[i].name === pantryName) {
        //setCurrIng(ingredientArray[i]);
      }
    }
  }

  //Grab ingredient stats for mapping
  const ingredientStatsImgSrc = (pantryName: string, ingArray: [Ingredient]) => {
    for(let i=0;i<ingArray.length;i++) {
      if(ingArray[i].name === pantryName) {
        return ingArray[i].imgSrc;
      }
    }
    return "";
  }
  const ingredientStatsAlcohol = (pantryName: string, ingArray: [Ingredient]) => {
    for(let i=0;i<ingArray.length;i++) {
      if(ingArray[i].name === pantryName) {
        return ingArray[i].alcohol;
      }
    }
    return "";
  }
  const ingredientStatsCalories = (pantryName: string, ingArray: [Ingredient]) => {
    for(let i=0;i<ingArray.length;i++) {
      if(ingArray[i].name === pantryName) {
        return ingArray[i].calories;
      }
    }
    return "";
  }
  const ingredientStatsCarbs= (pantryName: string, ingArray: [Ingredient]) => {
    for(let i=0;i<ingArray.length;i++) {
      if(ingArray[i].name === pantryName) {
        return ingArray[i].carbohydrates;
      }
    }
    return "";
  }
  const ingredientStatsProtein = (pantryName: string, ingArray: [Ingredient]) => {
    for(let i=0;i<ingArray.length;i++) {
      if(ingArray[i].name === pantryName) {
        return ingArray[i].protein;
      }
    }
    return "";
  }
  const ingredientStatsFat = (pantryName: string, ingArray: [Ingredient]) => {
    for(let i=0;i<ingArray.length;i++) {
      if(ingArray[i].name === pantryName) {
        return ingArray[i].fat;
      }
    }
    return "";
  }
  const ingredientStatsCost = (pantryName: string, ingArray: [Ingredient]) => {
    for(let i=0;i<ingArray.length;i++) {
      if(ingArray[i].name === pantryName) {
        return ingArray[i].cost;
      }
    }
    return "";
  }


  // useEffect(() => {
  //   fetch(DOMAIN+'/v1/ingredient/${pan.map(myIng=> myIng.name)}') //need this id to be the same as whats in the pantry
  //   .then(response => response.json())
  //   .then(data => setIngredients(data))
  // }, [])
  // console.log(ingredient)

  //Ingredient popup
  const [showPop, setPop] = useState<{open: boolean, event: Event | undefined}>({
    open: false,
    event: undefined
  });

  const [showAddIngredient, setAddIngredient] = useState<{open: boolean, event: Event | undefined}>({
    open: false,
    event: undefined
  });

  return (
    <Router history={history}>
      <Switch>
        <IonApp>
        <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header/>
            <h2>PANTRY</h2> 
            <IonButton onClick={(e) => clearPantry()}>CLEAR PANTRY</IonButton>
            <IonContent className="ion-padding"> 
              <h1>Welcome to your pantry, Seongho! Here you can see what ingredients you have!</h1> {/*TODO Chance Seongho to {user.id} */}
              <IonList>
                
                {pan.map(myPan =>
                  <IonItem key={myPan.id}> 
                    {setIngFromPantry(myPan.ingredientName)}
                    <IonAvatar slot="start">
                      <img src={ingredientStatsImgSrc(myPan.ingredientName,ingredientArray)}></img>
                    </IonAvatar>
                    <IonLabel>
                      <h2>{myPan.ingredientName}</h2>
                    </IonLabel>
                    <IonButton slot="end" color="danger" onClick={(e) => {
                        removeFromPantry(myPan);
                      }}>Remove {myPan.ingredientName}
                    </IonButton>
                    <IonLabel slot="end">
                      <h2>Quantity: {myPan.numIngredient}</h2>
                    </IonLabel>
                    <IonButton slot="end" color="success" onClick={(e) => {
                        addToPantry(myPan);
                      }}>ADD {myPan.ingredientName}
                    </IonButton>
                    <IonButton onClick={(e) => setPop({open: true, event: e.nativeEvent})}>{myPan.ingredientName} Facts</IonButton>
                    <IonPopover
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
                    </IonPopover>
                  </IonItem>
                )}
              </IonList>
            </IonContent>
            <h2>Add Ingredients To Your Pantry</h2>
            <IonContent className="ion-padding">
              <IonList>
                {ingredientArray.map(ing => 
                  <IonItem key={ing.id}>
                    <IonAvatar slot="start">
                      <img src={ing.imgSrc}></img>
                    </IonAvatar>
                    <IonLabel>
                      <h2>{ing.name}</h2>
                    </IonLabel>
                    {/* <IonButton onClick={(e) => setAddIngredient({open: true, event: e.nativeEvent})}>
                      Add 1 {ing.name}
                    </IonButton> */}
                    {/* <IonButton onClick={(e) => setNewPantry({id: 3,
                      userID: 3,
                      ingredientName: "3",
                      numIngredient: 3,
                      description: "3"})}>
                      Add 1 {ing.name}
                    </IonButton> */}
                    <IonButton onClick={(e) => {
                        console.log("button clicks")
                        console.log(givePantryVersionFromName(ing.name))
                        addToPantry(givePantryVersionFromName(ing.name))
                      }
                    }>
                    ADD {ing.name}</IonButton>
                  </IonItem>
                )}
              </IonList>
              {/* <IonButton onClick={(e) => setAddIngredient({open: true, event: e.nativeEvent})}> Add An Ingredient </IonButton>
              <IonPopover
                isOpen={showAddIngredient.open}
                event={showAddIngredient.event}
                onDidDismiss={e => setAddIngredient({open: false, event: undefined})}
              >
                <IonList>
                  {ingredientArray.map(ing => 
                    <IonItem key={ing.id}>
                      <IonAvatar slot="start">
                        <img src={ing.imgSrc}></img>
                      </IonAvatar>
                      <IonLabel>
                        <h2>{ing.name}</h2>
                      </IonLabel>
                    </IonItem>
                  )}
                </IonList>
              </IonPopover> */}
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
    );
}

export default MyPantry;
{/* //<IonButton onClick={(e) => removeFromPantry(ing.name)}>REMOVE {ing.name}</IonButton>


 {/* /* <IonAvatar slot="start">
      <img src=""></img>
    </IonAvatar>
    <IonLabel>
      <h2>{myIng.name}</h2>
    </IonLabel><IonButton
      onClick= { () => setQuant(quant + 1) }
      slot="end"
      size="default">
      Add {myIng.name} 
    </IonButton>
    <IonLabel slot="end">
      <h2>Quanity: { quant }</h2>
    </IonLabel>
    <IonButton
      onClick= { () => setQuant(quant - 1) }
      slot="end"
      size="default">
      Remove {myIng.name} 
</IonButton> */}