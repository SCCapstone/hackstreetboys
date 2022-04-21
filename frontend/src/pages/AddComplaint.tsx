/*
  This file contains the functionality of adding a complaint to a recipe.
  It follows most of the same format as a form, and posts that complaint to it's cooresponding recipe.
*/

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
      export interface routePrams {
        id: string;
      }
      export interface routePrams {
        id: string;
      }
            const AddComplaint: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
                const { id } = useParams<routePrams>();
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
                const {
                    control,
                    register,
                    handleSubmit,
                    getValues,
                    setValue,
                    formState: { errors }
                } = useForm({
                    defaultValues: {
                        authorId: context.currentUser?.id,
                        recipeId: 0,
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
                'https://api.fridger.recipes/v1/complaint/',
                //'https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/comlpaint/',
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
      useEffect(() => {
        document.title = "Add Complaint";
      }, []);
      
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
                    <IonLabel>Severity</IonLabel>
                    {/* <IonSelect name="type" multiple={true} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('ingredientIds',JSON.stringify(e.detail.value).replaceAll("[","").replaceAll("]","").replaceAll('\"',""))}> */}
                    <IonSelect name="type" multiple={false} aria-require={true} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('severity',e.detail.value)}>
                   {/* TODO: Add Searching Through Modal */}
                        <IonSelectOption value={1}>Low</IonSelectOption>
                        <IonSelectOption value={2}>Medium</IonSelectOption>
                        <IonSelectOption value={3}>High</IonSelectOption>
                    </IonSelect>
                </IonItem>
                {/* <IonItem>
                    <IonLabel position="floating" >Please rate the severity of your complaint.</IonLabel>
                    <IonInput name="rating" placeholder="Please enter a whole number" required onIonInput={(e: any) => setValue("severity",e.target.value)} />
                </IonItem> */}
                
                <IonItem>
                    <IonLabel position="floating">Please tell us your reasoning for this complaint:</IonLabel>
                    <IonInput name="feedback" required onIonInput={(e: any) => setValue("reason",e.target.value)} />
                </IonItem>
                
                <IonButton className="ion-margin-top" color='primary' type="submit" slot="start" >Submit Complaint</IonButton>

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