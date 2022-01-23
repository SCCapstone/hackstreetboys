import './Ingredients.css';
import { Router, Switch, Route, Link } from "react-router-dom";
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
    IonText,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { add, menuOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Ingredient } from '../models/Ingredient';
import { register } from '../serviceWorkerRegistration';
import IngredientCard from '../components/DashboardCard';
import Header from '../components/Header';
interface IngredientProps {
    ingredient: Ingredient,
}
function Ingredients() {
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
        fetch("https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/ingredient/")
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
                            <IonGrid>
                                <IonRow>
                                    {ingredients.map(ingredient =>
                                        <IonCol sizeXs="12" sizeSm="4" key={ingredient.id}>
                                            <Link to={`/ingredient/${ingredient.id}`}>
                                                <IonCard>
                                                    <img src="https://picsum.photos/500" style={{ width: '50%', height: "100%", objectFit: 'cover', float: "right"}} />
                                                    <IonCardHeader>
                                                        {/*<Link to={`/ingredient/${ingredient.id}`}>*/}
                                                            <IonCardTitle>{ingredient.name}</IonCardTitle>
                                                        {/*</Link>*/}
                                                        <IonCardSubtitle>{ingredient.calories} kcal<br/></IonCardSubtitle>
                                                    </IonCardHeader>
                                                    <IonCardContent>
                                                       <h3>{ingredient.carbohydrates}g Carbohydrates<br/>{ingredient.protein}g Protein<br/>{ingredient.fat}g Fat</h3>
                                                       <h3><br/>~$ {String(ingredient.cost.toFixed(2))}</h3>

                                                    </IonCardContent>
                                                </IonCard>
                                            </Link>
                                        </IonCol>
                                    )}
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