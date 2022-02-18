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
import { logoYoutube, menuOutline } from 'ionicons/icons';
import React, { Component, useEffect, useState } from 'react';
import { Pantry } from '../models/Pantry';
import { Ingredient } from '../models/Ingredient';
import { Recipe } from '../models/Recipe';
import AddIngredient from './AddIngredient';
import axios from 'axios';

let fruits2 = [["apple","2"],["banana","3"],["orange","4"]];

const DOMAIN = "http://localhost:8080" 
// DOMAIN options:
// https://api.fridger.recipes  -> web server testing
// http://localhost:8080        -> mySQL + Springboot test

// const [pantry, setPantry] = React.useState<Pantry>({
//     id: 1,
//     user: "Quinn Biscuit",
//     fruits: [["Apple","2","70"],["Banana","3"],["Orange","4"]], //{name,}
//     vegetables: [["Lettuce","7 ounces"]],
//     meats: [["Chicken","1 lb"]],
//     spices: [["Garlic Powder","5 ounces"]],
//     description: "This is a basic pantry"  
//   })

interface PantryProps {
  pantry: Pantry,
}

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
  //Grab pantry at start
  //this will reload EVERY time setPantry is called
  const [pan, setPantry] = React.useState<[Pantry]>([{ 
    id: 99,
    userID: 2,
    ingredientName: "99",
    numIngredient: 2,
    description: "This is a description of the food"
  }]);
  useEffect(() => {
    fetch(DOMAIN+'/v1/user/pantry/') //pass in user id
    .then(res => res.json())
    .then(data => setPantry(data)) //set pantry is the method that updates and calls and changes pantry
  }, [])
  console.log(pan)

  //Add Ingredient to Pantry
  //base ingredient for testing
  const [newPantry, setNewPantry] = useState<Pantry>({
    id: 3,
    userID: 1,
    ingredientName: "REFRESHING RANDY",
    numIngredient: 1,
    description: "This is a test of the food"
  });
  useEffect(() => {
    addToPantry()
    fetch(DOMAIN+'/v1/user/pantry/') //pass in user id
    .then(res => res.json())
    .then(data => setPantry(data)) //set pantry is the method that updates and calls and changes pantry
     //this essentially forces a refresh? idk tbh
  }, [])


  const addToPantry = () => {
    axios.post(DOMAIN+'/v1/user/pantry/', newPantry).then(res => {
      console.log("Status: ", res.status);
      console.log("Data:", res.data);
    }).catch(error => {
      console.error('Something went wrong!', error);
    });
  }

  const [count, setCount] = useState(0);

  // //Grab ingredient!
  // const [ingredient, setIngredients] = React.useState<Ingredient>({
  //   id: 99,
  //   name: "Biscuit",
  //   calories: 273,
  //   carbohydrates: 34,
  //   protein: 14,
  //   fat: 9,
  //   alcohol: true,
  //   cost: 9.69,
  //   imgSrc: "https://www.seriouseats.com/thmb/FHtNoz4Uyi3bCwV9rc6JDgpBXbI=/1500x1125/filters:fill(auto,1)/20210510-The-Food-Labs-Buttermilk-Biscuits-liz-voltz-seriouseats-16-8a0c924e4c9440088e073c67ed77d3c1.jpg"
  // });
  // useEffect(() => {
  //   fetch(DOMAIN+'/v1/ingredient/${pan.map(myIng=> myIng.name)}') //need this id to be the same as whats in the pantry
  //   .then(response => response.json())
  //   .then(data => setIngredients(data))
  // }, [])
  // console.log(ingredient)

  //Grab All Ingredients
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
  
  // TODO Number Increment GET AND POST
  const [quant, setQuant] = useState(0); //set quant to 0 initally

  //Ingredient popup
  const [showPop, setPop] = useState<{open: boolean, event: Event | undefined}>({
    open: false,
    event: undefined
  });

  const [showAddIngredient, setAddIngredient] = useState<{open: boolean, event: Event | undefined}>({
    open: false,
    event: undefined
  });

  //const [articleId, setArticleId] = useState(null);

  // const addIngredient = () => {
  //   const newIng = { 
  //     id: 99,
  //     userID: 777,
  //     ingredientID: "2",
  //     numIngredient: 1,
  //     description: "This is a test of the food"
  //   };
  //   axios.post('https://api.fridger.recipes/v1/user/pantry/', newIng)
  //     .then(response => addIngredient(response.data.id));
  // }
  // POST request using axios inside useEffect React hook

  

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
 

  // const postIngredient = {
  //   url: 'https://api.fridger.recipes/v1/user/pantry/',
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json'
  //   },
  //   data: {
  //     id: 99,
  //     userID: 2,
  //     ingredientID: "23",
  //     numIngredient: 2,
  //     description: "This is a description of the food"
  //   }
  // };

  // axios(postIngredient)
  //   .then(postIngResp => 
  //     {console.log(postIngResp);
  //   });

  return (
    <Router history={history}>
      <Switch>
        <IonApp>
        <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header/>
            <h2>PANTRY</h2> 
            <IonContent className="ion-padding"> 
              <h1>Welcome to your pantry, Seongho! Here you can see what ingredients you have!</h1> {/*TODO Chance Seongho to {user.id} */}
              <IonList>
                
                {pan.map(myIng =>
                  <IonItem key={myIng.id}> 
                    <IonAvatar slot="start">
                      {/* <img src={ingredient.imgSrc}></img> */}
                    </IonAvatar>
                    <IonLabel>
                      <h2>{myIng.ingredientName}</h2>
                    </IonLabel>
                    <IonLabel slot="end">
                      <h2>Quantity: {myIng.numIngredient}</h2>
                    </IonLabel>
                    {/* <IonButton onClick={(e) => setPop({open: true, event: e.nativeEvent})}>{ingredient.name} Facts</IonButton> */}
                    <IonPopover
                      isOpen={showPop.open}
                      event={showPop.event}
                      onDidDismiss={e => setPop({open: false, event: undefined})}
                    >
                      <IonList>
                        {/* <IonItem>
                          Calories: {ingredient.calories}
                        </IonItem>
                        <IonItem>Carbs: {ingredient.carbohydrates} g</IonItem>
                        <IonItem>Protein: {ingredient.protein} g</IonItem>
                        <IonItem>Fat: {ingredient.fat} g</IonItem>
                        <IonItem>Contains alcohol? {ingredient.alcohol}</IonItem>
                        <IonItem>Estimated Cost: ${ingredient.cost}</IonItem> */}
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
                    <IonButton onClick={(e) => setNewPantry({id: 3,
                      userID: 3,
                      ingredientName: "3",
                      numIngredient: 3,
                      description: "3"})}>
                      Add 1 {ing.name}
                    </IonButton>
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



 /* <IonAvatar slot="start">
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
    </IonButton> */