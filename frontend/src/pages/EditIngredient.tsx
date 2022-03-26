import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonDatetime,
    IonBackButton,
    IonButtons,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonRange,
    IonItem,
    IonInput,
    IonRadioGroup,
    IonListHeader,
    IonRadio,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonText,
    IonTextarea,
    IonModal,
    IonAlert
} from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Link, RouteComponentProps, Router, Switch, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import history from '../History';
import {NavContext} from '@ionic/react';
import { Ingredient } from '../models/Ingredient';
import Context from '../components/Context';
export interface routePrams {
    id: string;
}

const EditIngredient: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

    const { navigate } = useContext(NavContext);
    const history = useHistory()
    const context = useContext(Context);
    const [checked, setChecked] = useState(false);

    const [ingredient, setIngredient] = React.useState<Ingredient>({
        id: 1,
        name: "",
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        alcohol: false,
        cost: 0.0,
        imgSrc: ""
    });
    useEffect(() => {
        document.title = "Edit Ingredient";
      }, []);
    const { id } = useParams<routePrams>();
    useEffect(() => {
        // if(!context.currentUser){
        //     props.history.push('/login');
        // }
        fetch(`https://api.fridger.recipes/v1/ingredient/${id}`)
            .then(response => response.json())
            .then(data => setIngredient(data))
    }, [])

        const {
            handleSubmit,
            control,
            setValue,
            register,
            getValues,
            formState: { errors }
        } = useForm({
            defaultValues: {
                ...ingredient
            }
    });

    const onSubmit = async () => {
        // preventDefault()
        console.log("updatedValues" + ingredient.imgSrc);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${context.token}`
                },
            };
            setValue("id", ingredient.id);
            const body = JSON.stringify(getValues());
            console.log("Body" + body)
            const response = await axios.put(
                `https://api.fridger.recipes/v1/ingredient/`,
                body,
                config
            ).then( response =>{
                console.log("Resulting data" + response.data);
            });
            return response;
        } catch (e) {
            console.error(e);
        }

        return false;
    };

    const onDelete = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            const response = await axios.delete(
                `https://api.fridger.recipes/v1/ingredient/${ingredient.id}`,
                config
            ).then( response =>{
                console.log("DELETED"+ingredient.name)
            });
            return response;
        } catch (e) {
            console.error(e);
        }
        return false;
    };

    const [showAlert, setShowAlert] = useState(false);

    return (
        <Router history={history}>
            <Switch>
                <IonApp>
                    <SideBar />
                    <IonPage className="ion-page" id="main-content">
                        <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Edit {ingredient.name}</h1></IonText>
                        <Header/>
                        <IonContent>
                            <form onSubmit={ async () =>{ onSubmit(); props.history.push('/ingredient/'+id); history.go(0)}} >
                                <IonItem>
                                    <IonLabel position="floating">What is this ingredient called?</IonLabel>
                                    <IonInput name="name" value={ingredient.name} onIonInput={(e: any) => setValue("name",e.target.value)}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">How many <b>calories</b> per serving?</IonLabel>
                                    <IonInput name="calories" value={ingredient.calories} onIonInput={(e: any) => setValue("calories",e.target.value)}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">How many grams of <b>carbohydrates</b> per serving?</IonLabel>
                                    <IonInput name="carbohydrates" value={ingredient.carbohydrates} onIonInput={(e: any) => setValue("carbohydrates",e.target.value)}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">How many grams of <b>protein</b> per serving?</IonLabel>
                                    <IonInput name="protein" value={ingredient.protein} onIonInput={(e: any) => setValue("protein",e.target.value)}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">How many grams of <b>fat</b> per serving?</IonLabel>
                                    <IonInput name="fat" value={ingredient.fat} onIonInput={(e: any) => setValue("fat",e.target.value)}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">How much does this item cost per serving?</IonLabel>
                                    <IonInput name="cost" value={ingredient.cost} onIonInput={(e: any) => setValue("cost",e.target.value)}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Please provide a link to a picture of this new ingredient.</IonLabel>
                                    <IonInput name="imgSrc" value={ingredient.imgSrc} onIonInput={(e: any) => setValue("imgSrc",e.target.value)}/>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonLabel>Does this ingredient contain alcohol?</IonLabel>
                                    <IonCheckbox color="secondary" name="alcohol" checked={getValues("alcohol")} slot="start" onIonChange={(e: any) => setValue("alcohol",e.detail.checked)}/>
                                </IonItem>
                                {/*<IonItem>*/}
                                {/*    <IonLabel>I agree that the updates to this ingredient follow the Terms of Service</IonLabel>*/}
                                {/*    <IonCheckbox color="secondary" name="agree" slot="start" onIonChange={() => setChecked(!checked)}/>*/}
                                {/*</IonItem>*/}

                                <IonButton  className="ion-margin-top, ion-float-right" /*disabled={!checked}*/ color='primary' type="submit" slot="start">Update Ingredient</IonButton>

                                <IonButton  color="danger" type="button" className="ion-margin-top, ion-float-right" onClick={() => setShowAlert(true)}>Delete Ingredient</IonButton>
                                <IonAlert
                                    isOpen={showAlert}
                                    onDidDismiss={() => setShowAlert(false)}
                                    cssClass='my-custom-class'
                                    header={'Delete ' + ingredient.name +' permanently?'}
                                    message={'Are you sure you want to delete the ingredient?'}
                                    buttons={[
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            cssClass: 'secondary',
                                        },
                                        {
                                            text: 'Okay',
                                            handler: () => {
                                                onDelete();
                                                props.history.push(`/ingredients`);
                                                history.go(0)
                                            }
                                        }
                                    ]}
                                />
                                <IonButton onClick={() => props.history.push('/ingredient/'+id)} type="button" className="ion-margin-top" color='danger'>Cancel</IonButton>
                            </form>

                        </IonContent>
                    </IonPage>
                </IonApp>
            </Switch>
        </Router>
    );
};

export default EditIngredient;
