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
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonText,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
} from '@ionic/react';
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

interface IngredientProps {
    ingredient: Ingredient,
}
function Ingredients() {
    const context = useContext(Context);
    // console.log(context.currentUser?.email)

    const [ name, setName ] = useState("");
    const [ calories, setCalories ] = useState("10000");
    const [ carbohydrates, setCarbohydrates ] = useState("10000");
    const [ protein, setProtein ] = useState("10000");
    const [ fat, setFat ] = useState("10000");
    const [ alcohol, setAlcohol ] = useState(false);
    const [ cost, setCost ] = useState("1000.00");

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



    return (
        <Router history={history}>
            <Switch>
                <IonApp>
                    <SideBar />
                    <IonPage className="ion-page" id="main-content">
                        <Header />
                        <IonContent className="ion-padding">
                            <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Ingredients</h1></IonText>
                            <IonSearchbar placeholder="Search Ingredients" onIonChange={e => e.detail.value ? setName(e.detail.value!) : setName("")} debounce={0} inputmode="search" search-icon={searchOutline}/>
                            <IonSearchbar placeholder="Calories" onIonChange={e => e.detail.value ? setCalories(e.detail.value!) : setCalories("10000")} debounce={0} inputmode="numeric" search-icon={flameOutline}/>
                            <IonSearchbar placeholder="Carbohydrates" onIonChange={e => e.detail.value ? setCarbohydrates(e.detail.value!) : setCarbohydrates("10000")} debounce={0} inputmode="numeric" search-icon={addCircleOutline}/>
                            <IonSearchbar placeholder="Protein" onIonChange={e => e.detail.value ? setProtein(e.detail.value!) : setProtein("10000")} debounce={0} inputmode="numeric" search-icon={addCircleOutline}/>
                            <IonSearchbar placeholder="Fat" onIonChange={e => e.detail.value ? setFat(e.detail.value!) : setFat("10000")} debounce={0} inputmode="numeric" search-icon={addCircleOutline}/>
                            <IonSearchbar placeholder="Cost" onIonChange={e => e.detail.value ? setCost(e.detail.value!) : setCost("1000.0")} debounce={0}  inputmode="decimal" search-icon={cashOutline}/>

                            <IonToggle onIonChange={e => {setAlcohol(e.detail.checked); console.log(e.detail.checked)}}>Alcoholic</IonToggle>

                            <IonGrid>
                                <IonRow>
                                    {ingredients.filter(ingredient => (
                                        ingredient.name.toLowerCase().includes(name.toLowerCase()) &&
                                        ingredient.calories <= parseInt(calories) &&
                                        ingredient.carbohydrates <= parseInt(carbohydrates) &&
                                        ingredient.protein <= parseInt(protein) &&
                                        ingredient.fat <= parseInt(fat) &&
                                        ingredient.cost <= parseFloat(cost) &&
                                        ingredient.alcohol === alcohol)).map(searchedIngredient => (
                                        <IonCol sizeXs="12" sizeSm="6" key={searchedIngredient.id}>
                                            <Link to={`/ingredient/${searchedIngredient.id}`}>
                                                <IonCard>
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