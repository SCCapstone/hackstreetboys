/*
    This file contains part of the functionality for the exercise tracker. 
    It is what displays the actual exercise tracker on the goals dashboard. 
    It holds most of the actual functionality, calling upon other functions for the tracker.
    This tracker is not mean to be a permanent, long-time tracker, rather it is more like a calculator and will
    not keep exercises across different sign on sessions - thus we decided to use local storage.
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
import ExerciseCounter from '../components/ExerciseCounter';
import DeleteExercise from '../components/DeleteExercise';
import ExerciseInput from '../components/ExerciseInput';
import ExerciseList from '../components/ExerciseList';
import axios from 'axios';
import Chart from "react-google-charts";

const Exercise = () => {
    const[exercise, setExercise] = useState([]);
    const[activity, setActivity] = useState("");
    const[time, setTime] = useState();
    const[openModel, setOpenModel] = useState(false);
  
    const addItemHandler = () => {
       
      const prevItems = exercise ? [...exercise] : [];

      const anExercise = {
        activity,
        time,
        id:Math.floor(Math.random()*10000),      
      };
  
      //const item = itemName;
      const newItems = prevItems.concat(anExercise);
      //const newItems = [...prevItems, item];
  
      if(time <= 0 || activity === "") {
        alert("Please enter all the fields")
      }else {
          setExercise(newItems);
          localStorage.setItem("exercise", JSON.stringify(newItems));
         
        }

        setActivity();
        setTime();
        localStorage.setItem("time", JSON.stringify(time));
        localStorage.setItem("activity", JSON.stringify(activity));
  
    };

    const deleteItemHandler = (id) => {
        
        const oldItems = [...exercise];
        const newItems = oldItems.filter((anExercise)=>anExercise.id !==id);

        setExercise(newItems);
        localStorage.setItem("exercise", JSON.stringify(newItems));
    }

    const deleteAllHandler = () => {
        setActivity([]);
        localStorage.clear();
    }

    useEffect(() => {
        const localStorageExercise = JSON.parse(localStorage.getItem("exercise"));
        setExercise(localStorageExercise);

        const localStorageTime = JSON.parse(localStorage.getItem("time"));
        setTime(localStorageTime);

        const localStorageActivity = JSON.parse(localStorage.getItem("activity"));
        setActivity(localStorageActivity);
  
      }, [setExercise], [setTime], [setActivity]);

    const total = exercise?.map((anExercise)=>anExercise.time).reduce((acc,value)=>acc+ +value, 0);
  
      return (
   <>
              <IonCard color='primary'>
              <IonCardContent >
                <h1 align-iems='center'>Personal Exercise Logger!</h1>
                <h2 align-iems='center'> Please enter the name of your exercise activity and the amount of time you exercised for, in minutes!</h2>
                <ExerciseCounter total={total}/>
                <DeleteExercise deleteAllHandler={deleteAllHandler}/>
                {/* <IonCard color="light"> */}
                <ExerciseInput addItemHandler = {addItemHandler} activity = {activity} time = {time}
                setActivity = {setActivity} setTime = {setTime}/>
                {/* </IonCard> */}
                <ExerciseList exercise={exercise} deleteItemHandler={deleteItemHandler}/>
                </IonCardContent>
              </IonCard>

               
                
           </>   

              
  
     
      );
  }
  
  export default Exercise;