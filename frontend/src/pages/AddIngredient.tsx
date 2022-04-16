import React, {useContext, useState, useCallback, useEffect} from 'react';

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
    IonText,
    IonCheckbox,
    IonInput,
    IonItem,
    IonLabel,
    NavContext
} from '@ionic/react';

/* Theme variables */
import '../theme/variables.css';
import { Router, Switch, RouteComponentProps, Link, useHistory } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { menuOutline } from 'ionicons/icons';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Context from '../components/Context';
import { userInfo } from 'os';

const AddIngredient: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const context = useContext(Context);
    const { navigate } = useContext(NavContext);
    const history = useHistory();
    const [checked, setChecked] = useState(false);
    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
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
    // console.log(errors);
    // console.log(getValues());

    const onSubmit = () => {
        // console.log("Initial: " + getValues());
        try {
            const config = {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${context.token}`
                }
            };
            const body = JSON.stringify(getValues());
            const response = axios.post(
                'https://api.fridger.recipes/v1/ingredient/',
                body,
                config
            ).then(response => {
                if (response.status == 200) {
                    console.log("Status is " + response.status);
                    // navigate("/ingredients");
                }
            });
            return response;
        } catch(e) {
            console.error(e);
        }
        return false;
        
    }
    useEffect(() => {
        document.title = "Add Recipe";
      }, []);

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
                            <IonContent className="ion-padding">
                                <form onSubmit={ async () =>{ onSubmit(); props.history.push('/ingredient'); history.go(0)}} >
                                    <IonItem>
                                        <IonLabel position="floating">What is this ingredient called?</IonLabel>
                                        <IonInput type="text" name="name" required onIonInput={(e: any) => setValue("name",e.target.value)}/>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">How many <b>calories</b> per serving?</IonLabel>
                                        <IonInput type="number" min="1" max="5000" name="calories" required onIonInput={(e: any) => setValue("calories",e.target.value)}/>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">How many grams of <b>carbohydrates</b> per serving?</IonLabel>
                                        <IonInput type="number" min="1" max="5000" name="carbohydrates" required onIonInput={(e: any) => setValue("carbohydrates",e.target.value)}/>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">How many grams of <b>protein</b> per serving?</IonLabel>
                                        <IonInput type="number" min="1" max="5000" name="protein" required onIonInput={(e: any) => setValue("protein",e.target.value)}/>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">How many grams of <b>fat</b> per serving?</IonLabel>
                                        <IonInput type="number" min="1" max="5000" name="fat" required onIonInput={(e: any) => setValue("fat",e.target.value)}/>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">How much does this item cost per serving?</IonLabel>
                                        <IonInput type="number" min="1" max="5000" name="cost" required onIonInput={(e: any) => setValue("cost",e.target.value)}/>
                                    </IonItem>
                                    <IonItem>
                    <p>For legal and technical constraints, we do not host images. Use a service like <a href="https://postimages.org/">To Upload</a></p>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Ingredient Image URL</IonLabel>
                    <IonInput type="url" name="imgSrc" required onIonInput={(e: any) => setValue("imgSrc",e.target.value)} />
                </IonItem>
                                    <IonItem lines="none">
                                        <IonLabel>Does this ingredient contain alcohol?</IonLabel>
                                        <IonCheckbox color="secondary" name="alcohol" checked={getValues("alcohol")} slot="start" onIonChange={(e: any) => setValue('alcohol',e.detail.checked)}/>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonLabel>I agree that this ingredient follows the Terms of Service</IonLabel>
                                        <IonCheckbox color="secondary" name="agree" slot="start" onIonChange={() => setChecked(!checked)}/>
                                    </IonItem>
                                    <IonButton className="ion-margin-top, ion-float-right" disabled={!checked} color='primary' type="submit" slot="start" >Submit</IonButton>
                                    <Link to="/ingredients/">
                                        <IonButton className="ion-margin-top, ion-float-left" color="danger">Cancel</IonButton>
                                    </Link>
                                </form>
                            </IonContent>
                        </IonContent>
                    </IonPage>
                </IonApp>
            </Switch>
        </Router >
    );


}

export default AddIngredient;