import './Ingredients.css';
import { Router, Switch, Route, Link } from "react-router-dom";
import history from '../History';
import { searchOutline, flameOutline, addCircleOutline, cashOutline } from "ionicons/icons";
import {
    IonApp,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonMenuToggle,
    IonPage,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonSearchbar,
    IonCol,
    IonDatetime,
    IonFab,
    IonFabButton,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonRow,
    IonRange,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonText,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonItemDivider
} from '@ionic/react';
import { RangeValue } from '@ionic/core';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { add, menuOutline } from 'ionicons/icons';
import React, {useContext, useEffect, useState} from 'react';
import { Ingredient } from '../models/Ingredient';
import { register } from '../serviceWorkerRegistration';
import IngredientCard from '../components/DashboardCard';
import Header from '../components/Header';
import Context from '../components/Context';
import {toInteger} from "lodash";

interface IngredientProps {
    ingredient: Ingredient,
}
function Ingredients() {
    const context = useContext(Context);
    // console.log(context.currentUser?.email)

    const [ name, setName ] = useState("");
    const [called, setCalled] = useState(0);
    const [alcohol, setAlcohol] = useState(false);

    const [ingredients, setIngredients] = React.useState<[Ingredient]>([{
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
        fetch("https://api.fridger.recipes/v1/ingredient/")
            .then(response => response.json())
            .then(data => setIngredients(data))
    }, [])
    useEffect(() => {
        document.title = "Ingredients";
      }, []);

    let caloriesLower = Math.min.apply(Math, ingredients.map(function(i) { return i.calories;}));
    let caloriesUpper = Math.max.apply(Math, ingredients.map(function(i) { return i.calories;}));

    let carbohydratesLower = Math.min.apply(Math, ingredients.map(function(i) { return i.carbohydrates;}));
    let carbohydratesUpper = Math.max.apply(Math, ingredients.map(function(i) { return i.carbohydrates;}));

    let proteinLower = Math.min.apply(Math, ingredients.map(function(i) { return i.protein;}));
    let proteinUpper = Math.max.apply(Math, ingredients.map(function(i) { return i.protein;}));

    let fatLower = Math.min.apply(Math, ingredients.map(function(i) { return i.fat;}));
    let fatUpper = Math.max.apply(Math, ingredients.map(function(i) { return i.fat;}));

    let costLower = Math.min.apply(Math, ingredients.map(function(i) { return i.cost;}));
    let costUpper = Math.max.apply(Math, ingredients.map(function(i) { return i.cost;}));


    const [calories, setCalories] = useState(9999);
    const [carbohydrates, setCarbohydrates] = useState(9999);
    const [protein, setProtein] = useState(9999);
    const [fat, setFat] = useState(9999);
    const [cost, setCost] = useState(9999);

    return (
        <Router history={history}>
            <Switch>
                <IonApp>
                    <SideBar />
                    <IonPage className="ion-page" id="main-content">
                        <Header />
                        <IonContent className="ion-padding">
                            <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }} data-testid='ingsTitle'>Ingredients</h1></IonText>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonCard style={{marginTop:"30px", marginLeft:"10px", marginRight:"20px", padding:"25px"}} data-testid='ing-card'>
                                            <IonSearchbar placeholder="Search Ingredients" onIonChange={e => e.detail.value ? setName(e.detail.value!) : setName("")} debounce={0} inputmode="search" search-icon={searchOutline}/>

                                            <IonItem>
                                                <IonLabel>Calories</IonLabel>
                                                    <IonRange min={caloriesLower} max={caloriesUpper} value={calories} color="secondary" pin={true} onIonChange={e => setCalories(e.detail.value as number)}>
                                                    <IonLabel slot="start" >{caloriesLower}</IonLabel>
                                                    <IonLabel slot="end">{caloriesUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel data-testid='carbs'>Carbohydrates</IonLabel>
                                                <IonRange min={carbohydratesLower} max={carbohydratesUpper} value={carbohydrates} color="secondary" pin={true} onIonChange={e => setCarbohydrates(e.detail.value as number)}>
                                                    <IonLabel slot="start" >{carbohydratesLower}</IonLabel>
                                                    <IonLabel slot="end">{carbohydratesUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Protein</IonLabel>
                                                <IonRange min={proteinLower} max={proteinUpper} value={protein} color="secondary" pin={true} onIonChange={e => setProtein(e.detail.value as number)}>
                                                    <IonLabel slot="start" >{proteinLower}</IonLabel>
                                                    <IonLabel slot="end">{proteinUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Fat</IonLabel>
                                                <IonRange min={fatLower} max={fatUpper} value={fat} color="secondary" pin={true} onIonChange={e => setFat(e.detail.value as number)}>
                                                    <IonLabel slot="start" >{fatLower}</IonLabel>
                                                    <IonLabel slot="end">{fatUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Cost</IonLabel>
                                                <IonRange min={costLower} max={costUpper} value={cost} color="secondary" pin={true} onIonChange={e => setCost(e.detail.value as number)}>
                                                    <IonLabel slot="start" >{costLower}</IonLabel>
                                                    <IonLabel slot="end">{costUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Alcoholic</IonLabel>
                                                <IonToggle onIonChange={e => {setAlcohol(e.detail.checked); console.log(e.detail.checked)}}>Alcoholic</IonToggle>
                                            </IonItem>

                                        </IonCard>
                                    </IonCol>
                                    <IonCol size="7">
                                        {ingredients.filter(ingredient => (
                                            ingredient.name.toLowerCase().includes(name.toLowerCase()) &&
                                            ingredient.calories <= calories &&
                                            ingredient.carbohydrates <= carbohydrates &&
                                            ingredient.protein <= protein &&
                                            ingredient.fat <= fat &&
                                            ingredient.cost <= cost &&
                                            ingredient.alcohol === alcohol)).map(searchedIngredient => (
                                            <IonCol sizeXs="12" sizeSm="6" key={searchedIngredient.id}>
                                                <Link to={`/ingredient/${searchedIngredient.id}`}>
                                                    <IonCard style={{padding:"10px"}}>
                                                        <img src={searchedIngredient.imgSrc ? searchedIngredient.imgSrc : "https://picsum.photos/1500/800"} style={{ width: '50%', height: "200px", objectFit: 'scale-down', float: "right"}} />
                                                        <IonCardHeader>
                                                            <IonCardTitle data-testid="ingredient-name">{searchedIngredient.name}</IonCardTitle>
                                                            <IonCardSubtitle>{searchedIngredient.calories} kcal<br/></IonCardSubtitle>
                                                        </IonCardHeader>
                                                        <IonCardContent>
                                                            <h3>{searchedIngredient.carbohydrates}g Carbohydrates<br/>{searchedIngredient.protein}g Protein<br/>{searchedIngredient.fat}g Fat</h3>
                                                            <h3><br/>$ {String(searchedIngredient.cost.toFixed(2))}</h3>
                                                        </IonCardContent>
                                                    </IonCard>
                                                </Link>
                                            </IonCol>
                                        ))}
                                    </IonCol>

                                </IonRow>
                            </IonGrid>
                            {context.currentUser ? <IonFab vertical="bottom" horizontal="end" slot="fixed" >
                  <IonFabButton routerLink={`/ingredient/add`}>
                      <IonIcon icon={add} alt-text="add"/>
                    </IonFabButton>
                  </IonFab> : ""}
                        </IonContent>
                    </IonPage>
                </IonApp>
            </Switch>
        </Router>
    );

}

export default Ingredients;