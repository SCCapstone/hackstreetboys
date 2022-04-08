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


    const [caloriesRange, setCaloriesRange] = useState<{ lower: number; upper: number;}>({lower: 0, upper: 9999});
    const [carbohydratesRange, setCarbohydratesRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [proteinRange, setProteinRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [fatRange, setFatRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [costRange, setCostRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});

    return (
        <Router history={history}>
            <Switch>
                <IonApp>
                    <SideBar />
                    <IonPage className="ion-page" id="main-content">
                        <Header />
                        <IonContent className="ion-padding">
                            <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Ingredients</h1></IonText>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonCard style={{marginTop:"30px", marginLeft:"10px", marginRight:"20px", padding:"25px"}}>
                                            <IonSearchbar placeholder="Search Ingredients" onIonChange={e => e.detail.value ? setName(e.detail.value!) : setName("")} debounce={0} inputmode="search" search-icon={searchOutline}/>
                                            {/*<IonSearchbar placeholder="Calories" onIonChange={e => e.detail.value ? setCalories(parseInt(e.detail.value!)) : setCalories(10000)} debounce={200} inputmode="numeric" search-icon={flameOutline}/>*/}

                                            <IonItem>
                                                <IonLabel>Calories</IonLabel>
                                                {/*<IonRange dualKnobs={true} min={caloriesLower} max={caloriesUpper} step={5} snaps={true} color="secondary" pin={true} onIonChange={e => caloriesRange.upper===1000 && caloriesRange.lower===0 ? setCaloriesRange({lower: caloriesLower, upper: caloriesUpper}) : setCaloriesRange(e.detail.value as any)}>*/}
                                                <IonRange dualKnobs={true} min={caloriesLower} max={caloriesUpper} value={caloriesRange} step={5} snaps={true} color="secondary" pin={true} onIonChange={e => setCaloriesRange(e.detail.value as any)}>
                                                    <IonLabel slot="start" >{caloriesLower}</IonLabel>
                                                    <IonLabel slot="end">{caloriesUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Carbohydrates</IonLabel>
                                                <IonRange dualKnobs={true} min={carbohydratesLower} max={carbohydratesUpper} value={carbohydratesRange} color="secondary" pin={true} onIonChange={e => setCarbohydratesRange(e.detail.value as any)}>
                                                    <IonLabel slot="start" >{carbohydratesLower}</IonLabel>
                                                    <IonLabel slot="end">{carbohydratesUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Protein</IonLabel>
                                                <IonRange dualKnobs={true} min={proteinLower} max={proteinUpper} value={proteinRange} color="secondary" pin={true} onIonChange={e => setProteinRange(e.detail.value as any)}>
                                                    <IonLabel slot="start" >{proteinLower}</IonLabel>
                                                    <IonLabel slot="end">{proteinUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Fat</IonLabel>
                                                <IonRange dualKnobs={true} min={fatLower} max={fatUpper} value={fatRange} color="secondary" pin={true} onIonChange={e => setFatRange(e.detail.value as any)}>
                                                    <IonLabel slot="start" >{fatLower}</IonLabel>
                                                    <IonLabel slot="end">{fatUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Cost</IonLabel>
                                                <IonRange dualKnobs={true} min={costLower} max={costUpper} value={costRange} color="secondary" pin={true} onIonChange={e => setCostRange(e.detail.value as any)}>
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
                                            ingredient.calories <= caloriesRange.upper &&
                                            ingredient.calories >= caloriesRange.lower &&
                                            ingredient.carbohydrates <= carbohydratesRange.upper &&
                                            ingredient.carbohydrates >= carbohydratesRange.lower &&
                                            ingredient.protein <= proteinRange.upper &&
                                            ingredient.protein >= proteinRange.lower &&
                                            ingredient.fat <= fatRange.upper &&
                                            ingredient.fat >= fatRange.lower &&
                                            ingredient.cost <= costRange.upper &&
                                            ingredient.cost >= costRange.lower &&
                                            ingredient.alcohol === alcohol)).map(searchedIngredient => (
                                            <IonCol sizeXs="12" sizeSm="6" key={searchedIngredient.id}>
                                                <Link to={`/ingredient/${searchedIngredient.id}`}>
                                                    <IonCard style={{padding:"10px"}}>
                                                        <img src={searchedIngredient.imgSrc ? searchedIngredient.imgSrc : "https://picsum.photos/1500/800"} style={{ width: '50%', height: "200px", objectFit: 'scale-down', float: "right"}} />
                                                        {/*<img src={"https://picsum.photos/1500/800"} style={{ width: '50%', height: "200px", objectFit: 'scale-down', float: "right"}} />*/}
                                                        <IonCardHeader>
                                                            <IonCardTitle>{searchedIngredient.name}</IonCardTitle>
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
                            <Link to="/ingredient/add">
                                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                                    <IonFabButton>
                                        <IonIcon icon={add} alt-text="add"/>
                                    </IonFabButton>
                                </IonFab>
                            </Link>
                        </IonContent>
                    </IonPage>
                </IonApp>
            </Switch>
        </Router>
    );

}

export default Ingredients;