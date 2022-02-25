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

let fruits2 = [["apple","2"],["banana","3"],["orange","4"]];

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
    ingredientID: "273",
    numIngredient: 34,
    description: "kdajfkldaj"
  })
  return (
    console.log(ing)
  )
}

//useState returns a pair of values:
  //[0]the current State
  //[1]function to update it
  

  // const userID = 1;


  // const { id } = useParams<PantryExample>();

  
  //we need to pull ingredients from the list of ingredients that the user has
  //need to access APIs of ingredients
  //IngredientInfo()
  // console.log(pantry);

function MyPantry() {
  //Grab pantry
  const [pan, setPantry] = React.useState<[Pantry]>([{ //makes pantry a variable containing ingredient
    id: 99,
    userID: 2,
    ingredientID: "99",
    numIngredient: 2,
    description: "This is a description of the food"
  }]);
  useEffect(() => {
    fetch(`http://localhost:8080/v1/user/pantry/`) //pass in user id
    .then(res => res.json())
    .then(data => setPantry(data)) //set pantry is the method that updates and calls and changes pantry
  }, [])
  //Grab ingredient!
  const [ingredient, setIngredients] = React.useState<Ingredient>({
    id: 99,
    name: "Biscuit",
    calories: 273,
    carbohydrates: 34,
    protein: 14,
    fat: 9,
    alcohol: true,
    cost: 9.69,
    imgSrc: "https://www.seriouseats.com/thmb/FHtNoz4Uyi3bCwV9rc6JDgpBXbI=/1500x1125/filters:fill(auto,1)/20210510-The-Food-Labs-Buttermilk-Biscuits-liz-voltz-seriouseats-16-8a0c924e4c9440088e073c67ed77d3c1.jpg"
  });
  useEffect(() => {
    fetch(`http://localhost:8080/v1/ingredient/${pan.map(myIng=> myIng.id)}`) //need this id to be the same as whats in the pantry
    .then(response => response.json())
    .then(data => setIngredients(data))
  }, [])
  
  // TODO Number Increment GET AND POST
  const [quant, setQuant] = useState(0); //set quant to 0 initally


  //Ionic Popover testing
  const [showPop, setPop] = useState<{open: boolean, event: Event | undefined}>({
    open: false,
    event: undefined
  });


  console.log(pan);
  return (
    <Router history={history}>
      <Switch>
        <IonApp>
        <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header/>
            <IonContent className="ion-padding">
              <h1>Welcome to your pantry, Seongho! Here you can see what ingredients you have!</h1> {/*TODO Chance Seongho to {user.id} */}
                    
              <IonList>
                <h2>Ingredients</h2> 
                {pan.map(myIng =>
                  <IonItem key={myIng.id}> 
                    <IonAvatar slot="start">
                        <img src={ingredient.imgSrc}></img>
                    </IonAvatar>
                    <IonLabel>
                      <h2>{ingredient.name}</h2>
                    </IonLabel>
                    <IonLabel slot="end">
                      <h2>Quantity: {myIng.numIngredient}</h2>
                    </IonLabel>
                    <IonButton onClick={(e) => setPop({open: true, event: e.nativeEvent})}>{ingredient.name} Facts</IonButton>
                    <IonPopover
                      isOpen={showPop.open}
                      event={showPop.event}
                      onDidDismiss={e => setPop({open: false, event: undefined})}
                    >
                      <IonList>
                        <IonItem>
                          Calories: {ingredient.calories}
                        </IonItem>
                        <IonItem>Carbs: {ingredient.carbohydrates} g</IonItem>
                        <IonItem>Protein: {ingredient.protein} g</IonItem>
                        <IonItem>Fat: {ingredient.fat} g</IonItem>
                        <IonItem>Contains alcohol? {ingredient.alcohol}</IonItem>
                        <IonItem>Estimated Cost: ${ingredient.cost}</IonItem>
                      </IonList>
                    </IonPopover>
                  </IonItem>
                )}
              </IonList>
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