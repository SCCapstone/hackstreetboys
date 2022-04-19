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

    // let caloriesLower_init = Math.min.apply(Math, ingredients.map(function(i) { return i.calories;}));
    // let caloriesUpper_init = Math.max.apply(Math, ingredients.map(function(i) { return i.calories;}));
    // {console.log("caloriesLower_init " + caloriesLower_init + "\ncaloriesUpper_init " + caloriesUpper_init)}
    //
    // let carbohydratesLower_init = Math.min.apply(Math, ingredients.map(function(i) { return i.carbohydrates;}));
    // let carbohydratesUpper_init = Math.max.apply(Math, ingredients.map(function(i) { return i.carbohydrates;}));
    // {console.log("carbohydratesLower_init " + carbohydratesLower_init + "\ncarbohydratesUpper_init " + carbohydratesUpper_init)}
    //
    // let proteinLower_init = Math.min.apply(Math, ingredients.map(function(i) { return i.protein;}));
    // let proteinUpper_init = Math.max.apply(Math, ingredients.map(function(i) { return i.protein;}));
    // {console.log("proteinLower_init " + proteinLower_init + "\nproteinUpper_init " + proteinUpper_init)}
    //
    // let fatLower_init = Math.min.apply(Math, ingredients.map(function(i) { return i.fat;}));
    // let fatUpper_init = Math.max.apply(Math, ingredients.map(function(i) { return i.fat;}));
    // {console.log("fatLower_init " + fatLower_init + "\nfatUpper_init " + fatUpper_init)}
    //
    // let costLower = Math.min.apply(Math, ingredients.map(function(i) { return i.cost;}));
    // let costUpper = Math.max.apply(Math, ingredients.map(function(i) { return i.cost;}));
    // {console.log("caloriesLower_init " + caloriesLower_init + "\ncaloriesUpper_init " + caloriesUpper_init)}
    //
    //
    // const [caloriesLower, setCaloriesLower] = useState<{ lo: number }>({lo: 0});
    // const [caloriesUpper, setCaloriesUpper] = useState<{ hi: number }>({hi: 9999});
    //
    // const [carbohydratesLower, setCarbohydratesLower] = useState<{ lo: number }>({lo: 0});
    // const [carbohydratesUpper, setCarbohydratesUpper] = useState<{ hi: number }>({hi: 9999});
    //
    // const [proteinLower, setProteinLower] = useState<{ lo: number }>({lo: 0});
    // const [proteinUpper, setProteinUpper] = useState<{ hi: number }>({hi: 9999});
    //
    // const [fatLower, setFatLower] = useState<{ lo: number }>({lo: 0});
    // const [fatUpper, setFatUpper] = useState<{ hi: number }>({hi: 9999});
    //
    // const [costRange, setCostRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});

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


    // const [caloriesRange, setCaloriesRange] = useState<{ lower: number; upper: number;}>({lower: 0, upper: 9999});
    const [calories, setCalories] = useState(9999);
    // const [carbohydratesRange, setCarbohydratesRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [carbohydrates, setCarbohydrates] = useState(9999);
    // const [proteinRange, setProteinRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [protein, setProtein] = useState(9999);
    // const [fatRange, setFatRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [fat, setFat] = useState(9999);
    // const [costRange, setCostRange] = useState<{ lower: number; upper: number; }>({lower: 0, upper: 9999});
    const [cost, setCost] = useState(9999);

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
                                                {/*<IonRange dualKnobs={true} min={caloriesLower} max={caloriesUpper} value={caloriesRange} color="secondary" pin={true} onIonChange={e => setCaloriesRange(e.detail.value as any)}>*/}
                                                    <IonRange min={caloriesLower} max={caloriesUpper} value={calories} color="secondary" pin={true} onIonChange={e => setCalories(e.detail.value as number)}>
                                                    <IonLabel slot="start" >{caloriesLower}</IonLabel>
                                                    <IonLabel slot="end">{caloriesUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            {/*<IonRow>*/}
                                            {/*    <IonCol>*/}
                                            {/*        <IonItem>*/}
                                            {/*            <IonLabel position="stacked">Min <b>calories</b></IonLabel>*/}
                                            {/*            <IonInput type="number" min="0" max="5000" name="minCalories" placeholder={caloriesLower_init.toString()} required debounce={100} onIonChange={(e: any) => {setCaloriesLower(e.target.value); console.log("caloriesLower" + caloriesLower)}}/>*/}
                                            {/*        </IonItem>*/}
                                            {/*    </IonCol>*/}
                                            {/*    <IonCol>*/}
                                            {/*        <IonItem>*/}
                                            {/*            <IonLabel position="stacked">Max <b>calories</b></IonLabel>*/}
                                            {/*            <IonInput type="number" min="0" max="5000" name="maxCalories" placeholder={caloriesUpper_init.toString()} required onIonChange={(e: any) => {setCaloriesUpper(e.target.value); console.log("caloriesUpper " + caloriesUpper)}}/>*/}
                                            {/*        </IonItem>*/}
                                            {/*    </IonCol>*/}
                                            {/*</IonRow>*/}


                                            <IonItem>
                                                <IonLabel>Carbohydrates</IonLabel>
                                                <IonRange min={carbohydratesLower} max={carbohydratesUpper} value={carbohydrates} color="secondary" pin={true} onIonChange={e => setCarbohydrates(e.detail.value as number)}>
                                                    <IonLabel slot="start" >{carbohydratesLower}</IonLabel>
                                                    <IonLabel slot="end">{carbohydratesUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            {/*<IonRow>*/}
                                            {/*    <IonCol>*/}
                                            {/*        <IonItem>*/}
                                            {/*            <IonLabel position="stacked">Min <b>carbohydrates</b></IonLabel>*/}
                                            {/*            <IonInput type="number" min="0" max="5000" name="minCarbohydrates" placeholder={carbohydratesLower_init.toString()} required onIonChange={(e: any) => {setCarbohydratesLower(e.target.value); console.log("carbohydratesLower " + carbohydratesLower)}}/>*/}
                                            {/*        </IonItem>*/}
                                            {/*    </IonCol>*/}
                                            {/*    <IonCol>*/}
                                            {/*        <IonItem>*/}
                                            {/*            <IonLabel position="stacked">Max <b>carbohydrates</b></IonLabel>*/}
                                            {/*            <IonInput type="number" min="0" max="5000" name="maxCarbohydrates" placeholder={carbohydratesUpper_init.toString()} required onIonChange={(e: any) => {setCarbohydratesUpper(e.target.value); console.log("carbohydratesUpper " + carbohydratesUpper)}}/>*/}
                                            {/*        </IonItem>*/}
                                            {/*    </IonCol>*/}
                                            {/*</IonRow>*/}

                                            <IonItem>
                                                <IonLabel>Protein</IonLabel>
                                                {/*<IonRange dualKnobs={true} min={proteinLower} max={proteinUpper} value={proteinRange} color="secondary" pin={true} onIonChange={e => setProteinRange(e.detail.value as any)}>*/}
                                                <IonRange min={proteinLower} max={proteinUpper} value={protein} color="secondary" pin={true} onIonChange={e => setProtein(e.detail.value as number)}>
                                                    <IonLabel slot="start" >{proteinLower}</IonLabel>
                                                    <IonLabel slot="end">{proteinUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            {/*<IonRow>*/}
                                            {/*    <IonCol>*/}
                                            {/*        <IonItem>*/}
                                            {/*            <IonLabel position="stacked">Min <b>protein</b></IonLabel>*/}
                                            {/*            <IonInput type="number" min="0" max="5000" name="minProtein" placeholder={proteinLower_init.toString()} required onIonChange={(e: any) => {setProteinLower(e.target.value); console.log("proteinLower" + proteinLower)}}/>*/}
                                            {/*        </IonItem>*/}
                                            {/*    </IonCol>*/}
                                            {/*    <IonCol>*/}
                                            {/*        <IonItem>*/}
                                            {/*            <IonLabel position="stacked">Max <b>protein</b></IonLabel>*/}
                                            {/*            <IonInput type="number" min="0" max="5000" name="maxProtein" placeholder={proteinUpper_init.toString()} required onIonChange={(e: any) => {setProteinUpper(e.target.value); console.log("proteinUpper" +proteinUpper)}}/>*/}
                                            {/*        </IonItem>*/}
                                            {/*    </IonCol>*/}
                                            {/*</IonRow>*/}

                                            <IonItem>
                                                <IonLabel>Fat</IonLabel>
                                                {/*<IonRange dualKnobs={true} min={fatLower} max={fatUpper} value={fatRange} color="secondary" pin={true} onIonChange={e => setFatRange(e.detail.value as any)}>*/}
                                                <IonRange min={fatLower} max={fatUpper} value={fat} color="secondary" pin={true} onIonChange={e => setFat(e.detail.value as number)}>
                                                    <IonLabel slot="start" >{fatLower}</IonLabel>
                                                    <IonLabel slot="end">{fatUpper}</IonLabel>
                                                </IonRange>
                                            </IonItem>

                                            {/*<IonRow>*/}
                                            {/*    <IonCol>*/}
                                            {/*        <IonItem>*/}
                                            {/*            <IonLabel position="stacked">Min <b>fat</b></IonLabel>*/}
                                            {/*            <IonInput type="number" min="0" max="5000" name="minFat" placeholder={fatLower_init.toString()} required onIonChange={(e: any) => {setFatLower(e.target.value); console.log("fatLower" +fatLower)}}/>*/}
                                            {/*        </IonItem>*/}
                                            {/*    </IonCol>*/}
                                            {/*    <IonCol>*/}
                                            {/*        <IonItem>*/}
                                            {/*            <IonLabel position="stacked">Max <b>fat</b></IonLabel>*/}
                                            {/*            <IonInput type="number" min="0" max="5000" name="maxFat" placeholder={fatUpper_init.toString()} required onIonChange={(e: any) => {setFatUpper(e.target.value); console.log("fatUpper" +fatUpper)}}/>*/}
                                            {/*        </IonItem>*/}
                                            {/*    </IonCol>*/}
                                            {/*</IonRow>*/}

                                            <IonItem>
                                                <IonLabel>Cost</IonLabel>
                                                {/*<IonRange dualKnobs={true} min={costLower} max={costUpper} value={costRange} color="secondary" pin={true} onIonChange={e => setCostRange(e.detail.value as any)}>*/}
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
                                            // ingredient.calories <= caloriesRange.upper &&
                                            // ingredient.calories >= caloriesRange.lower &&
                                            ingredient.calories <= calories &&
                                            // ingredient.carbohydrates <= carbohydratesRange.upper &&
                                            // ingredient.carbohydrates >= carbohydratesRange.lower &&
                                            ingredient.carbohydrates <= carbohydrates &&
                                            // ingredient.protein <= proteinRange.upper &&
                                            // ingredient.protein >= proteinRange.lower &&
                                            ingredient.protein <= protein &&
                                            // ingredient.fat <= fatRange.upper &&
                                            // ingredient.fat >= fatRange.lower &&
                                            ingredient.fat <= fat &&
                                            // ingredient.cost <= costRange.upper &&
                                            // ingredient.cost >= costRange.lower &&
                                            ingredient.cost <= cost &&
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