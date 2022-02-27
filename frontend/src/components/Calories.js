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
import CaloriesCounter from '../components/CaloriesCounter';
import DeleteCalories from '../components/DeleteCalories';
import CalorieInput from '../components/CalorieInput';
import ItemList from '../components/ItemList';
import axios from 'axios';

const Calories = () => {
    const[items, setItems] = useState([]);
    const[itemName, setItemName] = useState("");
    const[calories, setCalories] = useState();
    const[openModel, setOpenModel] = useState(false);
  
    const addItemHandler = () => {
       
      const prevItems = [...items];

      const item = {
        itemName,
        calories,
        id:Math.floor(Math.random()*10000),      
      };
  
      //const item = itemName;
      const newItems = prevItems.concat(item);
      //const newItems = [...prevItems, item];
  
      if(calories <= 0 || itemName === "") {
        alert("Please enter all the fields")
      }else {
          setItems(newItems);
         
            //  const article = { title: 'React PUT Request' };
            //  axios.put('https://api.fridger.recipes/v1/user/mygoals/')
            // .then(response => this.setState({ updatedAt: response.data.updatedAt }));
        }

      setItemName();
      setCalories();
  
    };

    const deleteItemHandler = (id) => {
        
        const oldItems = [...items];
        const newItems = oldItems.filter((item)=>item.id !==id);

        setItems(newItems);
      
    }

    const deleteAllHandler = () => {
        setItems([]);
    }

    const total = items.map((item)=>item.calories).reduce((acc,value)=>acc+ +value, 0);
  
      return (
   
              <IonCard color='primary'>
              <IonCardContent >
                {/* calorie tracker! */}
                <h1 align-iems='center'>Here is your personal Calorie Tracker!</h1>
                <CaloriesCounter total={total}/>
                <DeleteCalories deleteAllHandler={deleteAllHandler}/>
                {/* <IonCard color="light"> */}
                <CalorieInput addItemHandler = {addItemHandler} itemName = {itemName} calories = {calories}
                setItemName = {setItemName} setCalories = {setCalories}/>
                {/* </IonCard> */}
                <ItemList items={items} deleteItemHandler={deleteItemHandler}/>
              </IonCardContent>
              </IonCard>
  
     
      );
  }
  
  export default Calories;