import './Ingredient.css';
import { Router, Switch, Route, useParams } from "react-router-dom";
import history from '../History';
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
    IonBadge,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { constructOutline, menuOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { Ingredient } from '../models/Ingredient';
import IngredientBanner from '../assets/fridger_banner.png'
import Header from '../components/Header';
interface IngredientProps {
    ingredient: Ingredient,
}
export interface routeParams {
    id: string;
}
function IngredientPage(this: any) {
    const [ingredient, setIngredient] = React.useState<Ingredient>({
        id: 99,
        name: "Biscuit",
        calories: 273,
        carbohydrates: 34,
        protein: 14,
        fat: 9,
        alcohol: false,
        cost: 9.69,
        imgSrc: ""
    });
    const { id } = useParams<routeParams>();
    useEffect(() => {
        fetch(`https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/ingredient/${id}`)
            .then(response => response.json())
            .then(data => setIngredient(data))
    }, [])
    console.log(ingredient);
    return (
        <Router history={history}>
            <Switch>
                <IonApp>
                    <SideBar />
                    <IonPage className="ion-page" id="main-content">
                        <Header />
                        <IonContent className="ion-padding">
                            <IonCard>
                                {/*<img src={IngredientBanner} alt="IngredientImage" style={{ width: '100%', objectFit: 'cover' }} />*/}
                                <img src="https://picsum.photos/2000/1000" style={{ width: '50%', height: "100%", objectFit: 'scale-down', float: "right"}} />
                                <IonCardContent>
                                    <h1>{ingredient.name} is about <b>{ingredient.calories}</b> kcal per serving.<br/></h1>
                                </IonCardContent>

                                <IonCardContent>
                                    <p>
                                        One serving of <b>{ingredient.name.toLowerCase()}</b> contains <br/>
                                        {ingredient.carbohydrates}g of carbohydrates,<br/>
                                        {ingredient.protein}g of protein, and<br/>
                                        {ingredient.fat}g of fat.<br/><br/>
                                    </p>
                                    <h3>The estimated cost of one serving of {ingredient.name.toLowerCase()} is about ${ingredient.cost.toFixed(2)}<br/></h3>
                                </IonCardContent>

                                <IonCardContent>
                                    <IonBadge color={ingredient.alcohol == true ? 'danger' : 'secondary'}>{ingredient.alcohol == true ? "Alcoholic" : ingredient.alcohol == false ? "Not Alcoholic" : ""}</IonBadge>
                                </IonCardContent>



                                <IonCardContent>
                                    <a href="/recipes/">Here a few recipes that use {ingredient.name.toLowerCase()}! Check them out!</a>
                                </IonCardContent>
                            </IonCard>

                        </IonContent>
                    </IonPage>
                </IonApp>
            </Switch>
        </Router>
    );
}

export default IngredientPage;