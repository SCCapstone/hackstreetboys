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
    const [ calories, setCalories ] = useState(10000);
    const [ carbohydrates, setCarbohydrates ] = useState(10000);
    const [ protein, setProtein ] = useState(10000);
    const [ fat, setFat ] = useState(10000);
    const [ alcohol, setAlcohol ] = useState(false);
    const [ cost, setCost ] = useState(1000.00);

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

    const [value, setValue] = useState(0);

    const [rangeValue, setRangeValue] = useState<{
        lower: number;
        upper: number;
    }>({ lower: 0, upper: 0 });

    const customFormatter = (value: number) => `${value}%`;

    const [caloriesRange, setCaloriesRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [carbohydratesRange, setCarbohydratesRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [proteinRange, setProteinRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [fatRange, setFatRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [costRange, setCostRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});

        // setCaloriesRange({lower: caloriesLower, upper: caloriesUpper})
        console.log("CALORIES: CALCULATED");
        console.log(caloriesLower);
        console.log(caloriesUpper);
        console.log("CALORIES: RANGE");
        console.log(caloriesRange.lower);
        console.log(caloriesRange.upper);

    // setCaloriesRange({lower: caloriesLower, upper: caloriesUpper});
    // setCarbohydratesRange({lower: carbohydratesLower, upper: carbohydratesUpper});
    // setProteinRange({lower: proteinLower, upper: proteinUpper});
    // setFatRange({lower: fatLower, upper: fatUpper});
    // setCostRange({lower: costLower, upper: costUpper});


        // console.log("CARBOHYDRATES: CALCULATED");
        // console.log(carbohydratesLower);
        // console.log(carbohydratesUpper);
        // console.log("CARBOHYDRATES: RANGE");
        // console.log(carbohydratesRange.lower);
        // console.log(carbohydratesRange.upper);
        //
        // console.log("PROTEIN: CALCULATED");
        // console.log(proteinLower);
        // console.log(proteinUpper);
        // console.log("PROTEIN: RANGE");
        // console.log(proteinRange.lower);
        // console.log(proteinRange.upper);
        //
        // console.log("FAT: CALCULATED");
        // console.log(fatLower);
        // console.log(fatUpper);
        // console.log("FAT: RANGE");
        // console.log(fatRange.lower);
        // console.log(fatRange.upper);
        //
        // console.log("COST: CALCULATED");
        // console.log(costLower);
        // console.log(costUpper);
        // console.log("COST: RANGE");
        // console.log(costRange.lower);
        // console.log(costRange.upper);

    return (
        <Router history={history}>
            <Switch>
                <IonApp>
                    <SideBar />
                    <IonPage className="ion-page" id="main-content">
                        <Header />
                        <IonContent className="ion-padding">
                            <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Ingredients</h1></IonText>
                            {/*<IonCard>*/}
                            {/*    <IonSearchbar placeholder="Search Ingredients" onIonChange={e => e.detail.value ? setName(e.detail.value!) : setName("")} debounce={0} inputmode="search" search-icon={searchOutline}/>*/}
                            {/*    /!*<IonSearchbar placeholder="Calories" onIonChange={e => e.detail.value ? setCalories(parseInt(e.detail.value!)) : setCalories(10000)} debounce={200} inputmode="numeric" search-icon={flameOutline}/>*!/*/}

                            {/*    <IonItem>*/}
                            {/*        <IonLabel>Calories</IonLabel>*/}
                            {/*        /!*<IonRange dualKnobs={true} min={caloriesLower} max={caloriesUpper} step={5} snaps={true} color="secondary" pin={true} onIonChange={e => caloriesRange.upper===1000 && caloriesRange.lower===0 ? setCaloriesRange({lower: caloriesLower, upper: caloriesUpper}) : setCaloriesRange(e.detail.value as any)}>*!/*/}
                            {/*        <IonRange dualKnobs={true} min={caloriesLower} max={caloriesUpper} step={5} snaps={true} color="secondary" pin={true} onIonChange={e => setCaloriesRange(e.detail.value as any)}>*/}

                            {/*            <IonLabel slot="start" >{caloriesLower}</IonLabel>*/}
                            {/*            <IonLabel slot="end">{caloriesUpper}</IonLabel>*/}
                            {/*        </IonRange>*/}
                            {/*    </IonItem>*/}

                            {/*    <IonItem>*/}
                            {/*        <IonLabel>Carbohydrates</IonLabel>*/}
                            {/*        <IonRange dualKnobs={true} min={carbohydratesLower} max={carbohydratesUpper} color="secondary" pin={true} onIonChange={e => setCarbohydratesRange(e.detail.value as any)}>*/}
                            {/*            <IonLabel slot="start" >{carbohydratesLower}</IonLabel>*/}
                            {/*            <IonLabel slot="end">{carbohydratesUpper}</IonLabel>*/}
                            {/*        </IonRange>*/}
                            {/*    </IonItem>*/}

                            {/*    <IonItem>*/}
                            {/*        <IonLabel>Protein</IonLabel>*/}
                            {/*        <IonRange dualKnobs={true} min={proteinLower} max={proteinUpper} color="secondary" pin={true} onIonChange={e => setProteinRange(e.detail.value as any)}>*/}
                            {/*            <IonLabel slot="start" >{proteinLower}</IonLabel>*/}
                            {/*            <IonLabel slot="end">{proteinUpper}</IonLabel>*/}
                            {/*        </IonRange>*/}
                            {/*    </IonItem>*/}

                            {/*    <IonItem>*/}
                            {/*        <IonLabel>Fat</IonLabel>*/}
                            {/*        <IonRange dualKnobs={true} min={fatLower} max={fatUpper} color="secondary" pin={true} onIonChange={e => setFatRange(e.detail.value as any)}>*/}
                            {/*            <IonLabel slot="start" >{fatLower}</IonLabel>*/}
                            {/*            <IonLabel slot="end">{fatUpper}</IonLabel>*/}
                            {/*        </IonRange>*/}
                            {/*    </IonItem>*/}

                            {/*    <IonItem>*/}
                            {/*        <IonLabel>Cost</IonLabel>*/}
                            {/*        <IonRange dualKnobs={true} min={costLower} max={costUpper} color="secondary" pin={true} onIonChange={e => setCostRange(e.detail.value as any)}>*/}
                            {/*            <IonLabel slot="start" >{costLower}</IonLabel>*/}
                            {/*            <IonLabel slot="end">{costUpper}</IonLabel>*/}
                            {/*        </IonRange>*/}
                            {/*    </IonItem>*/}

                            {/*    <IonItem>*/}
                            {/*        <IonLabel>Alcoholic</IonLabel>*/}
                            {/*        <IonToggle onIonChange={e => {setAlcohol(e.detail.checked); console.log(e.detail.checked)}}>Alcoholic</IonToggle>*/}
                            {/*    </IonItem>*/}

                            {/*</IonCard>*/}

                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonCard style={{marginTop:"30px", marginLeft:"10px", marginRight:"20px", padding:"25px"}}>
                                            <IonSearchbar placeholder="Search Ingredients" onIonChange={e => e.detail.value ? setName(e.detail.value!) : setName("")} debounce={0} inputmode="search" search-icon={searchOutline}/>
                                            {/*<IonSearchbar placeholder="Calories" onIonChange={e => e.detail.value ? setCalories(parseInt(e.detail.value!)) : setCalories(10000)} debounce={200} inputmode="numeric" search-icon={flameOutline}/>*/}

                                            <IonItem>
                                                <IonLabel>Calories</IonLabel>
                                                {/*<IonRange dualKnobs={true} min={caloriesLower} max={caloriesUpper} step={5} snaps={true} color="secondary" pin={true} onIonChange={e => caloriesRange.upper===1000 && caloriesRange.lower===0 ? setCaloriesRange({lower: caloriesLower, upper: caloriesUpper}) : setCaloriesRange(e.detail.value as any)}>*/}
                                                <IonRange dualKnobs={true} min={caloriesLower} max={caloriesUpper} step={5} snaps={true} color="secondary" pin={true} onIonChange={e => setCaloriesRange(e.detail.value as any)}>
                                                    <IonLabel slot="start" >{caloriesLower}</IonLabel>
                                                    <IonLabel slot="end">{caloriesUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Carbohydrates</IonLabel>
                                                <IonRange dualKnobs={true} min={carbohydratesLower} max={carbohydratesUpper} color="secondary" pin={true} onIonChange={e => setCarbohydratesRange(e.detail.value as any)}>
                                                    <IonLabel slot="start" >{carbohydratesLower}</IonLabel>
                                                    <IonLabel slot="end">{carbohydratesUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Protein</IonLabel>
                                                <IonRange dualKnobs={true} min={proteinLower} max={proteinUpper} color="secondary" pin={true} onIonChange={e => setProteinRange(e.detail.value as any)}>
                                                    <IonLabel slot="start" >{proteinLower}</IonLabel>
                                                    <IonLabel slot="end">{proteinUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Fat</IonLabel>
                                                <IonRange dualKnobs={true} min={fatLower} max={fatUpper} color="secondary" pin={true} onIonChange={e => setFatRange(e.detail.value as any)}>
                                                    <IonLabel slot="start" >{fatLower}</IonLabel>
                                                    <IonLabel slot="end">{fatUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            <IonItem>
                                                <IonLabel>Cost</IonLabel>
                                                <IonRange dualKnobs={true} min={costLower} max={costUpper} color="secondary" pin={true} onIonChange={e => setCostRange(e.detail.value as any)}>
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
                                                        {/*<img src={ingredient.imgSrc ? ingredient.imgSrc : "https://picsum.photos/1500/800"} style={{ width: '50%', height: "200px", objectFit: 'scale-down', float: "right"}} />*/}
                                                        <img src={"https://picsum.photos/1500/800"} style={{ width: '50%', height: "200px", objectFit: 'scale-down', float: "right"}} />
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
                                    {/*{ingredients.filter(ingredient => (*/}
                                    {/*    ingredient.name.toLowerCase().includes(name.toLowerCase()) &&*/}
                                    {/*    ingredient.calories <= caloriesRange.upper &&*/}
                                    {/*    ingredient.calories >= caloriesRange.lower &&*/}
                                    {/*    ingredient.carbohydrates <= carbohydratesRange.upper &&*/}
                                    {/*    ingredient.carbohydrates >= carbohydratesRange.lower &&*/}
                                    {/*    ingredient.protein <= proteinRange.upper &&*/}
                                    {/*    ingredient.protein >= proteinRange.lower &&*/}
                                    {/*    ingredient.fat <= fatRange.upper &&*/}
                                    {/*    ingredient.fat >= fatRange.lower &&*/}
                                    {/*    ingredient.cost <= costRange.upper &&*/}
                                    {/*    ingredient.cost >= costRange.lower &&*/}
                                    {/*    ingredient.alcohol === alcohol)).map(searchedIngredient => (*/}
                                    {/*    <IonCol sizeXs="12" sizeSm="6" key={searchedIngredient.id}>*/}
                                    {/*        <Link to={`/ingredient/${searchedIngredient.id}`}>*/}
                                    {/*            <IonCard>*/}
                                    {/*                /!*<img src={ingredient.imgSrc ? ingredient.imgSrc : "https://picsum.photos/1500/800"} style={{ width: '50%', height: "200px", objectFit: 'scale-down', float: "right"}} />*!/*/}
                                    {/*                <img src={"https://picsum.photos/1500/800"} style={{ width: '50%', height: "200px", objectFit: 'scale-down', float: "right"}} />*/}
                                    {/*                <IonCardHeader>*/}
                                    {/*                    <IonCardTitle>{searchedIngredient.name}</IonCardTitle>*/}
                                    {/*                    <IonCardSubtitle>{searchedIngredient.calories} kcal<br/></IonCardSubtitle>*/}
                                    {/*                </IonCardHeader>*/}
                                    {/*                <IonCardContent>*/}
                                    {/*                    <h3>{searchedIngredient.carbohydrates}g Carbohydrates<br/>{searchedIngredient.protein}g Protein<br/>{searchedIngredient.fat}g Fat</h3>*/}
                                    {/*                    <h3><br/>$ {String(searchedIngredient.cost.toFixed(2))}</h3>*/}
                                    {/*                </IonCardContent>*/}
                                    {/*            </IonCard>*/}
                                    {/*        </Link>*/}
                                    {/*    </IonCol>*/}
                                    {/*))}*/}

                                </IonRow>
                            </IonGrid>
                            <Link to="/ingredient/add">
                                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                                    <IonFabButton>
                                        <IonIcon icon={add} />
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