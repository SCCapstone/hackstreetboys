import './GoalsPage.css';
import Chart from '../components/Chart'
import LineChart from '../components/LineChart'
import PieChart from '../components/PieChartFilterable';
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
import SideBar from '../components/SideBar';

import Header from '../components/Header';
import CaloriesCounter from '../components/CaloriesCounter';
import DeleteCalories from '../components/DeleteCalories';
import CalorieInput from '../components/CalorieInput';
import ItemList from '../components/ItemList';
import Calories from '../components/Calories';

const GoalsPage = () => {
  const[items, setItems] = useState([""]);
  const[itemName, setItemName] = useState("");
  const[calories, setCalories] = useState(0);
  const[openModel, setOpenModel] = useState(false);

  const addItemHandler = () => {
    console.log(itemName);
    console.log(calories);

    const prevItems = [...items];
    // const item = {
    //   itemName,
    //   calories,
    //   id:Math.floor(Math.random()*10000),      
    // };

    const item = itemName;
    const newItems = prevItems.concat(item);
    //const newItems = [...prevItems, item];

    if(calories <= 0 || itemName === "") {
      alert("Please enter all the fields")
    }else {
        setItems(newItems);
      }
    setItemName("");
    setCalories(0);

  };

    return (
        <Router history={history}>
            <Switch>
                <IonApp>
    <SideBar />
    <IonPage className="ion-page" id="main-content">
     <Header/>
      <IonContent className="ion-padding">
        <h1>Welcome to your dashboard, Seongho!</h1>
        <Link to="/mygoals"><IonButton>
              My Goals 
            </IonButton>
            </Link>
            <Calories/>
            <IonCardContent >
              <IonGrid>
                <IonRow>
                  <IonCol size-xs="12" size-md="6">
                    <IonCard>
                      <Chart ></Chart>
                    </IonCard>
                  </IonCol>
                  <IonCol size-xs="12" size-md="6">
                    <IonCard>
                    <LineChart ></LineChart>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
            <IonCard >
            <IonCardContent>
              <PieChart ></PieChart>
            </IonCardContent>
            </IonCard>
          

            {/* <IonCard color='primary'>
            <IonCardContent >
          
              <h1 align-iems='center'>Here is your personal Calorie Tracker!</h1>
              <CaloriesCounter/>
              <DeleteCalories/>
             
              <CalorieInput addItemHandler = {addItemHandler} itemName = {itemName} calories = {calories}
              setItemName = {setItemName} setCalories = {setCalories}/>
            
              <ItemList items={items}/>
            </IonCardContent>
            </IonCard> */}
            

          </IonContent> 
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default GoalsPage;