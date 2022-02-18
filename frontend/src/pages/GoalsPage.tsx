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
  } from '@ionic/react';
import React, {useState, useEffect} from 'react';
import { Router, Switch, Route, Link } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';

import Header from '../components/Header';
import CaloriesCounter from '../components/CaloriesCounter';
import DeleteCalories from '../components/DeleteCalories';
import CalorieInput from '../components/CalorieInput';

function GoalsPage() {
  const[items, setItems] = useState([]);
  const[itemName, setItemName] = useState("");
  const[calories, setCalories] = useState();
  const[openModel, setOpenModel] = useState(false);

  const addItemHandler = () => {
    console.log(itemName);
    console.log(calories);

    const prevItems = [...items];
    const item = {
      itemName,
      calories,
      id:Math.floor(Math.random()*10000),      
    };

    // const newItems = prevItems.concat(item);

    // setItems(newItems);

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
            <IonCard>
            <IonCardContent>
              <PieChart ></PieChart>
            </IonCardContent>
            </IonCard>

            <IonCard color='primary'>
            <IonCardContent >
              {/* calorie tracker! */}
              <h1 align-iems='center'>Here is your personal Calorie Tracker!</h1>
              <CaloriesCounter/>
              <DeleteCalories/>
              {/* <IonCard color="light"> */}
              <CalorieInput addItemHandler = {addItemHandler} itemName = {itemName} calories = {calories}
              setItemName = {setItemName} setCalories = {setCalories}/>
              {/* </IonCard> */}
            </IonCardContent>
            </IonCard>

          </IonContent> 
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default GoalsPage;