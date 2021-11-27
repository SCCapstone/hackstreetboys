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
    IonCheckbox,
} from '@ionic/react';
/* Theme variables */
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import { add, menuOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import IngredientForm from '../components/IngredientForm';
function AddIngredient() {
    return (
        <Router history={history}>
            <Switch>
                <IonApp>
                    <SideBar />
                    <IonPage className="ion-page" id="main-content">
                        <IonHeader>
                            <IonToolbar>
                                <IonButtons slot="start">
                                    <IonMenuToggle>
                                        <IonButton>
                                            <IonIcon icon={menuOutline} slot="start" />
                                        </IonButton>
                                    </IonMenuToggle>
                                </IonButtons>
                                <IonTitle>Fridger</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent className="ion-padding">
                            <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Create Ingredient</h1></IonText>
                            <IngredientForm/>
                        </IonContent>
                    </IonPage>
                </IonApp>
            </Switch>
        </Router >
    );
}

export default AddIngredient;