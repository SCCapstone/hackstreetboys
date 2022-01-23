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
    IonTitle,
    IonToolbar,
  } from '@ionic/react';

import { Router, Switch } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from "../components/Header";
import { logoYoutube, menuOutline } from 'ionicons/icons';
import React, { Component, useEffect } from 'react';
import { Pantry } from '../models/Pantry';
import { Ingredient } from '../models/Ingredient';

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


function IngredientInfo () {
  const [ing, setIngredient] = React.useState<Ingredient>({
    id: 123,
    name: "Apple",
    calories: 70,
    carbohydrates: 2,
    protein: 1,
    fat: 2,
    alcohol: false,
    imgSrc: "",
    cost: .50,
  })
  return (
    console.log(ing)
  )
}

interface PantryExample {
  pantry: Pantry
}

function MyPantry() {
  const [pantry, setPantry] = React.useState<Pantry>({
    id: 1,
    user: "Quinn Biscuit",
    fruits: [["Apple","2","70"],["Banana","3"],["Orange","4"]], //{name,}
    vegetables: [["Lettuce","7 ounces"]],
    meats: [["Chicken","1 lb"]],
    spices: [["Garlic Powder","5 ounces"]],
    description: "This is a basic pantry"  
  })

  // useEffect(() => {
  //   fetch("http://localhost:7999/v1/user/pantries")
  //   .then(res => res.json())
  //   .then(setPantry)
  // }, [])

  IngredientInfo() 

  return (
    <Router history={history}>
      <Switch>
        <IonApp>
        <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header/>
            <IonContent className="ion-padding">
              <h1>Welcome to your pantry, Seongho! Here you can see what ingredients you have!</h1> {/*TODO Chance Seongho to {user.id} */}
              <IonList> {/*FRUIT LIST */}
                <IonListHeader>
                    <h1>Fruits</h1>
                  </IonListHeader>
                    {pantry.fruits.map(fruit => 
                      
                        <IonItem key={fruit[0]} button onClick={ () => {}}> 
                          <IonAvatar slot="start">
                            <img src=""></img>
                          </IonAvatar>
                          <IonLabel>
                            <h2>{fruit[0]}</h2>
                          </IonLabel>
                          <IonLabel slot="end">
                            <h2>Quantity: {fruit[1]}</h2>
                          </IonLabel>
                        </IonItem>
                      
                  ,)}
              </IonList>
              <IonList> {/* VEGETABLE LIST */}
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
              <IonList> {/* MEATS LIST */}
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
              <IonList> {/* SPICES LIST */}
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
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
    );
}

export default MyPantry;