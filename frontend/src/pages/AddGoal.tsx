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
import { Link, Router, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

import SideBar from '../components/SideBar';


    import {NavContext} from '@ionic/react';


    const AddGoal: React.FunctionComponent = () => {
        const { navigate } = useContext(NavContext);
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
            endGoal: "",
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0,
            currWeight: 0,
            goalWeight: 0,
            goalID: "",
        }
      });
    
      console.log(errors);
      console.log(getValues());
    
     
      const onSubmit = async () => {
       
        console.log("updatedValues" + getValues());
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = JSON.stringify(getValues());
            const res = await axios.post(
                 'https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/user/goal/',
                //'http://localhost:7999/v1/user/goal/',
                body,
                config
            ).then( res =>{
                console.log("Resulting data" + res.data);
                if(res.status == 200){
                    console.log("Status is " + res.status);
                 navigate("/mygoals");
                 //or goal?
            }
            });
            return res;
        } catch (e) {
            console.error(e);
        }
    
        return false;
      };
    
      return (


    <Router history={history}>
        <Switch>
        <IonApp>
        <SideBar />
        <IonPage className="ion-page" id="main-content">
        <Header/>

       <IonContent className="ion-padding">
        <form onSubmit={async () =>{await onSubmit();}} >
        <IonItem>
                    <IonLabel>What is your end goal?</IonLabel>
                    <IonSelect name="endGoal" multiple={false} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('goalID',JSON.stringify(e.detail.value))}>
                        <IonSelectOption value="1">Lose Weight</IonSelectOption>
                        <IonSelectOption value="2">Maintain Current Weight</IonSelectOption>
                        <IonSelectOption value="3">Gain Weight</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" >How many calories do you consume per day?</IonLabel>
                    <IonInput type="text" name="calories" required onIonInput={(e: any) => setValue("calories",e.target.value)} />
                </IonItem>
                
                <IonItem>
                    <IonLabel position="floating">How many carbohydrates do you consume per day?</IonLabel>
                    <IonTextarea name="carbs" required onIonInput={(e: any) => setValue("carbs",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">How much protein do you consume per day?</IonLabel>
                    <IonInput name="protein" required onIonInput={(e: any) => setValue("protein",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">How much fat do you consume per day?</IonLabel>
                    <IonInput name="fat" required onIonInput={(e: any) => setValue("fat",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">What is your current weight?</IonLabel>
                    <IonInput name="currWeight" required onIonInput={(e: any) => setValue("currWeight",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">What is your goal weight?</IonLabel>
                    <IonInput name="goalWeight" required onIonInput={(e: any) => setValue("goalWeight",e.target.value)} />
                </IonItem>
                
               
                <IonButton className="ion-margin-top" disabled={checked}
                        color='primary' type="submit" 
                        onClick={async () =>{
                            await onSubmit();
                            <Link to="/mygoals/"></Link>
                         }}
                        expand='full'>
                            Submit Goal
                </IonButton>
                
                <Link to="/mygoals/">
                    <IonButton className="ion-margin-top"
                        color='danger'
                        expand='full'>
                        Cancel
                    </IonButton>
                </Link>
            </form>
        </IonContent>
        </IonPage>
        </IonApp>
    </Switch>
    </Router >
  );
};

export default AddGoal;