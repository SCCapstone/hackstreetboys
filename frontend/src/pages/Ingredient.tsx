import './Ingredient.css';
import '../theme/variables.css';
import { Link, Router, Switch , useParams} from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import { add, menuOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Recipe } from '../models/Recipe';
import { register } from '../serviceWorkerRegistration';
import RecipeCard from '../components/DashboardCard';
import Header from '../components/Header';
import { Ingredient } from '../models/Ingredient';
import { IonApp, IonPage, IonContent, IonCard } from '@ionic/react';

export interface routePrams {
    id: string;
  }

function IngredientPage(this: any) {
    const [ing,setIngred] = React.useState<Ingredient>({
        id: 1,
        name: "Apple",
        calories: 70,
        carbohydrates: 2,
        protein: 1,
        fat: 2,
        alcohol: false,
        cost: .50,
    });
    const {id} = useParams<routePrams>();
    useEffect(() => {
        fetch(`http;//localhost:7999/v1/ingredient/${id}`)
        .then(response => response.json())
        .then(data => setIngred(data))
    }, [])
    console.log(ing)
    return (
        <Router history={history}>
          <Switch>
            <IonApp>
              <SideBar />
              <IonPage className="ion-page" id="main-content">
                <Header/>
                <IonContent className="ion-padding">
                  <IonCard>
                    <h1>{ing.name}</h1>
                    <h2>Calories: {ing.calories}</h2>
                    <h2>Carbs: {ing.carbohydrates} grams</h2>
                    <h2>Protein: {ing.protein} grams</h2>
                    <h2>Fat: {ing.fat} grams</h2>
                    <h2>Cost: {ing.cost}</h2>
                    <h2>Contains alcohol: {ing.alcohol}</h2>
                  </IonCard>
                </IonContent>
              </IonPage>
            </IonApp>
          </Switch>
        </Router>
      );
}
export default Ingredient;