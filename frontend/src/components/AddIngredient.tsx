import './AddIngredient.css';
import React, {useContext, useState} from 'react';
import {NavContext, IonButton, IonCheckbox, IonContent, IonInput, IonItem, IonLabel, IonPage} from "@ionic/react";
import {useForm} from 'react-hook-form';
import {Link, Router, Switch} from 'react-router-dom';
import axios from 'axios';
import history from '../History';

const AddIngredient: React.FC = () => {
    const {navigate} = useContext(NavContext);
    const [checked, setChecked] = useState(false);
    const {
        control,
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: "",
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fat: 0,
            alcohol: false,
            cost: 0.0,
            imgSrc: ""
        }
    });

    console.log(errors);
    console.log(getValues());

    const onSubmit = async () => {
        console.log("Initial: " + getValues());
        try {
            const config = {
                headers: {
                    'Content-Type':'application/json',
                }
            };
            const body = JSON.stringify(getValues());
            const res = await axios.post(
                'http://localhost:8100/ingredient/',
                body,
                config
            ).then(res => {
                console.log("Final: " + res.data);
                if (res.status === 200) {
                    console.log("Status is " + res.status);
                    navigate("/ingredients");
                }
            });
            return res;
        } catch(e) {
            console.error(e);
        }
        return false;
    }

    return (
        <Router history={history}>
            {/*<Switch>*/}
                <IonPage className="ion-page">
                    <IonContent className="ion-padding">
                        <form onSubmit={async () => {await onSubmit();}}>
                            <IonItem>
                                <IonLabel position="floating">What is this ingredient called?</IonLabel>
                                <IonInput name="name" required onIonInput={(e: any) => setValue("name",e.target.value)}/>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="floating">How many <b>calories</b> per serving?</IonLabel>
                                <IonInput name="calories" required onIonInput={(e: any) => setValue("calories",e.target.value)}/>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="floating">How many grams of <b>carbohydrates</b> per serving?</IonLabel>
                                <IonInput name="carbohydrates" required onIonInput={(e: any) => setValue("carbohydrates",e.target.value)}/>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="floating">How many grams of <b>protein</b> per serving?</IonLabel>
                                <IonInput name="protein" required onIonInput={(e: any) => setValue("protein",e.target.value)}/>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="floating">How many grams of <b>fat</b> per serving?</IonLabel>
                                <IonInput name="fat" required onIonInput={(e: any) => setValue("fat",e.target.value)}/>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="floating">How much does this item cost per serving?</IonLabel>
                                <IonInput name="cost" onIonInput={(e: any) => setValue("cost",e.target.value)}/>
                            </IonItem>

                            <IonItem>
                                <IonLabel position="floating">Please provide a link to a picture of this new ingredient.</IonLabel>
                                <IonInput name="imgSrc" onIonInput={(e: any) => setValue("imgSrc",e.target.value)}/>
                            </IonItem>

                            <IonItem lines="none">
                                <IonLabel>Does this ingredient contain alcohol?</IonLabel>
                                <IonCheckbox color="secondary" name="alcohol" checked={getValues("alcohol")} slot="start" onIonChange={(e: any) => setValue('alcohol',e.detail.checked)}/>
                            </IonItem>

                            <IonItem lines="none">
                                <IonLabel>I agree that this ingredient follows the Terms of Service.</IonLabel>
                                <IonCheckbox color="secondary" slot="start" onIonChange={() => setChecked(!checked)}/>
                            </IonItem>

                            <Link to="/ingredients/">
                            {/*<IonButton className="ion-margin-top, ion-float-right" type="submit">Submit</IonButton>*/}
                            <IonButton
                                className="ion-margin-top, ion-float-right"
                                disabled={!checked}
                                color='primary'
                                type="submit"
                                slot="start"
                                onClick={async () => { await onSubmit(); }}>Submit</IonButton>


                                <IonButton
                                    className="ion-margin-top, ion-float-left"
                                    color="danger">Cancel</IonButton>
                            </Link>
                        </form>
                    </IonContent>
                </IonPage>
            {/*</Switch>*/}
        </Router>
    )
}
export default AddIngredient;
