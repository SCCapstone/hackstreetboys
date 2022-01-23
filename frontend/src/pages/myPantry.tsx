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
import Header from '../components/Header';
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
    fetch(`http://localhost:7999/v1/user/pantry/`) //pass in user id
    .then(res => res.json())
    .then(data => setPantry(data)) //set pantry is the method that updates and calls and changes pantry
  }, [])
  //Grab ingredient!
  const [ingredients, setIngredients] = React.useState<Ingredient>({
    id: 99,
    name: "Biscuit",
    calories: 273,
    carbohydrates: 34,
    protein: 14,
    fat: 9,
    alcohol: false,
    cost: 9.69,
    imgSrc: ""
  });
  useEffect(() => {
    fetch(`http://localhost:7999/v1/ingredient/${pan.map(myIng=> myIng.id)}`) //need this id to be the same as whats in the pantry
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
                {pan.map(myIng =>
                  <IonItem key={myIng.id}> 
                    <IonAvatar slot="start">
                        <img src=""></img>
                    </IonAvatar>
                    <IonLabel>
                      <h2>Ingredient ID: {myIng.ingredientID}</h2>
                    </IonLabel>
                    <IonLabel slot="end">
                      <h2>Quantity: {myIng.numIngredient}</h2>
                    </IonLabel>
                    <IonButton onClick={(e) => setPop({open: true, event: e.nativeEvent})}>Description</IonButton>
                    <IonPopover
                      isOpen={showPop.open}
                      event={showPop.event}
                      onDidDismiss={e => setPop({open: false, event: undefined})}
                    >
                      <p>{myIng.description}</p>
                    </IonPopover>
                  </IonItem>
                )}
              </IonList> { /*
              <IonList> {/* VEGETABLE LIST    }
                <IonListHeader>
                    <h1>Vegetables</h1>
                </IonListHeader>
                  {pantry.vegetables.map(veg => {
                    return (
                      <IonItem key={veg[0]} button onClick={() => {}}>
                        <IonAvatar slot="start">
                          <img src=""></img>
                        </IonAvatar>
                        <IonLabel>
                          <h2>{veg[0]}</h2>
                        </IonLabel>
                        <IonLabel slot="end">
                          <h2>Quantity: {veg[1]}</h2>
                        </IonLabel>
                      </IonItem>
                    )
                  })}
              </IonList>
              <IonList> {/* MEATS LIST }
                <IonListHeader>
                    <h1>Meats</h1>
                </IonListHeader>
                  {pantry.meats.map(meat => {
                    return (
                      <IonItem key={meat[0]} button onClick={() => {}}>
                        <IonAvatar slot="start">
                          <img src=""></img>
                        </IonAvatar>
                        <IonLabel>
                          <h2>{meat[0]}</h2>
                        </IonLabel>
                        <IonLabel slot="end">
                          <h2>Quantity: {meat[1]}</h2>
                        </IonLabel>
                      </IonItem>
                  )
                })}
              </IonList>
              <IonList> {/* SPICES LIST }
                <IonListHeader>
                      <h1>Spices</h1>
                  </IonListHeader>
                    {pantry.spices.map(spi => {
                      return (
                        <IonItem key={spi[0]} button onClick={() => {}}>
                          <IonAvatar slot="start">
                            <img src=""></img>
                          </IonAvatar>
                          <IonLabel>
                            <h2>{spi[0]}</h2>
                          </IonLabel>
                          <IonLabel slot="end">
                            <h2>Quantity: {spi[1]}</h2>
                          </IonLabel>
                        </IonItem>
                    )
                  })}
              </IonList>
              </IonPage>
                */}
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