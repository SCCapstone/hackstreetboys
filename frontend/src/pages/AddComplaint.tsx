import './MyGoals.css';
import React, { useCallback, useContext, useState } from 'react';
import history from '../History';
import {
  IonApp,
  IonLabel,
  IonButton,
  IonContent,
  IonPage,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea
} from '@ionic/react';
import '../theme/variables.css';
import { useForm, Controller } from 'react-hook-form';
import { Link, RouteComponentProps, Router, Switch, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import {Complaint} from '../models/Complaint';
import {NavContext} from '@ionic/react';
import {IonicRatingModule} from 'ionic-rating';
import { useEffect } from 'react';
import { Recipe } from '../models/Recipe';    
import Context from '../components/Context';
import { User } from '../models/User';
    interface ComplaintExample {
        complaint: Complaint,
      }
            const AddComplaint: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
                const [ loggedIn, setLoggedIn ] = useState(false);
                const [ user, setUser ] = useState<User>();
                const globals = {
                  loggedInState: loggedIn,
                  currentUser: user,
                  setLoggedIn,
                  setUser
                }
               
                const context = useContext(Context);
                const {navigate} = useContext(NavContext);
                const history = useHistory();
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
                        id: context.currentUser?.id,
                        authorId: 0,
                        complaintId: 0,
                        severity: 0,
                        reason: "",
                    }
                });

                console.log(errors);
                console.log(getValues());
                
        const onSubmit = () => {
       
        console.log("updatedValues" + getValues());
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = JSON.stringify(getValues());
            const res = axios.post(
                'http://localhost:8080/v1/review/',
                //'https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/review/',
                body,
                config
            ).then( res =>{
                if (res.status === 200) {
                    console.log("Status is " + res.status);
                }    
            });
            return res;
        } catch (e) {
            console.error(e);
        }
        return false;
      }

return (

    <Router history={history}>
        <Switch>
        <IonApp>
        <SideBar />
        <IonPage className="ion-page" id="main-content">
        <Header/>

       <IonContent className="ion-padding">
         <form onSubmit={async () =>{onSubmit(); props.history.push('/recipes'); history.go(0)}} > 
        <IonItem>
                    <IonLabel position="floating" >Please rate the severity of your complaint.</IonLabel>
                    <IonInput name="rating" placeholder="Please enter a whole number 1-5" required onIonInput={(e: any) => setValue("severity",e.target.value)} />
                </IonItem>
                
                <IonItem>
                    <IonLabel position="floating">Please tell us your reasoning for this complaint:</IonLabel>
                    <IonInput name="feedback" required onIonInput={(e: any) => setValue("reason",e.target.value)} />
                </IonItem>
                
                <IonButton className="ion-margin-top" disabled={checked} color='primary' type="submit" slot="start" >Submit Complaint</IonButton>

                <Link to={"/recipes"}>
                   
                    <IonButton className="ion-margin-top" color="danger">Cancel</IonButton>
                </Link>
            </form>
        </IonContent>
        </IonPage>
        </IonApp>
    </Switch>
    </Router >
  );
};

export default AddComplaint;