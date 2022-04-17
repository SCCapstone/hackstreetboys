/*
    This file contains part of the functionality for the calorie tracker. 
    It is what displays the actual calorie tracker on the goals dashboard. 
    It holds most of the actual functionality, calling upon other functions for the tracker.
    This tracker is not mean to be a permanent, long-time tracker, rather it is more like a calculator and will
    not keep calories across different sign on sessions - thus we decided to use local storage.
*/

import {
    IonApp,
    IonContent,
    IonPage,
    IonButton,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonInput,
    IonAlert,
    useIonAlert,
  } from '@ionic/react';
import React, {useState, useEffect} from 'react';
import { Router, Switch, Route, Link } from "react-router-dom";
import history from '../History';
import CaloriesCounter from './CaloriesCounter';
import DeleteCalories from './DeleteCalories';
import CalorieInput from './CalorieInput';
import ItemList from './ItemList';
import axios from 'axios';
import Calorie from '../models/Calorie';



const Calories = () => {
    const[items, setItems] = useState([]);
    const[itemName, setItemName] = useState("");
    const[calories, setCalories] = useState();
    const[openModel, setOpenModel] = useState(false);
  
    const addItemHandler = () => {
       
      const prevItems = items ? [...items] : [];

      const item = {
        itemName,
        calories,
        id:Math.floor(Math.random()*10000),      
      };

      const newItems = prevItems.concat(item);
  
      if(calories <= 0 || itemName === "") {
        alert("Please enter all the fields")
      }else {
          setItems(newItems);
          localStorage.setItem("items", JSON.stringify(newItems))
        }

      setItemName("");
      setCalories(0);
    };

    const deleteItemHandler = (id) => {
        const oldItems = [...items];
        const newItems = oldItems.filter((item)=>item.id !==id);

        setItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
    }

    const deleteAllHandler = () => {
        setItems([]);
        localStorage.clear();
    }
   
    useEffect(() => {
      const localStorageMeals = JSON.parse(localStorage.getItem("items"));
      setItems(localStorageMeals);

    }, [setItems]);
      

    const total = items?.map((item)=>item.calories).reduce((acc,value)=>acc+ +value, 0);
  
      return (
              <IonCard color='primary'>
              <IonCardContent >
                <h1 align-iems='center'>Here is your personal Calorie Tracker!</h1>
                <h2 align-iems='center'> Please enter the name of your food item and its number of calories!</h2>
                <CaloriesCounter total={total}/>
                <DeleteCalories deleteAllHandler={deleteAllHandler}/>
                <CalorieInput addItemHandler = {addItemHandler} itemName = {itemName} calories = {calories}
                setItemName = {setItemName} setCalories = {setCalories}/>
                <ItemList items={items} deleteItemHandler={deleteItemHandler}/>
              </IonCardContent>
              </IonCard>
  
     
      );
  }
  
  export default Calories;