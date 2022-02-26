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
import { routePrams } from './MyGoal';
import SideBar from '../components/SideBar';
import { Goal } from '../models/Goal';
import {NavContext} from '@ionic/react';
import Context from '../components/Context';

    
    const AddGoal: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const context = useContext(Context);
    const { navigate } = useContext(NavContext);
    const history = useHistory();
    const [checked, setChecked] = useState(false);
        // const { navigate } = useContext(NavContext);
        // const [checked, setChecked] = useState(false);
       // const { id } = useParams<routePrams>();
       const [goal, setGoal] = React.useState<Goal>({
            id: 1,
            endGoal: "",
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fat: 0,
            currentWeight: 0,
            goalWeight: 0,
            userId: Number(context.currentUser?.id)
           
        });

        const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        formState: { errors }
      } = useForm({
        defaultValues: {
            id: 1,
            endGoal: "",
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fat: 0,
            currentWeight: 0,
            goalWeight: 0,
            userId: context.currentUser?.id,
          
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
            console.log("User ID: " + context.currentUser?.id)
            goal.userId = Number(context.currentUser?.id);
            const body = JSON.stringify(getValues());

            const res = axios.post(
               // 'https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/user/goal/',
                //'https://api.fridger.recipes/v1/user/goal/',
               'https://api.fridger.recipes/v1/user/goal/',

                body,
                config
            ).then( res =>{
                console.log("Resulting data" + res.data);
                if (res.status === 200) {
                    console.log("Status is " + res.status);
                    //navigate("/mygoals");
                   // history.push('/mygoals');
                    //navigate("https://localhost:3000/mygoals/");
                    //<Link to="/mygoals/"></Link>

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
         <form onSubmit={async () =>{onSubmit(); props.history.push('/mygoals'); history.go(0)}} > 
        <IonItem>
                    <IonLabel>What is your end goal?</IonLabel>
                    <IonSelect name="endGoal" multiple={false} cancelText="Cancel" okText="Okay" onIonChange={e => setValue('endGoal',JSON.stringify(e.detail.value).replaceAll("[","").replaceAll("]","").replaceAll('\"',""))}>
                        <IonSelectOption value="Lose Weight">Lose Weight</IonSelectOption>
                        <IonSelectOption value="Maintain Current Weight">Maintain Current Weight</IonSelectOption>
                        <IonSelectOption value="Gain Weight">Gain Weight</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" >How many calories do you consume per day?</IonLabel>
                    <IonInput name="calories" required onIonInput={(e: any) => setValue("calories",e.target.value)} />
                </IonItem>
                
                <IonItem>
                    <IonLabel position="floating">How many carbohydrates do you consume per day?</IonLabel>
                    <IonInput name="carbohydrates" required onIonInput={(e: any) => setValue("carbohydrates",e.target.value)} />
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
                    <IonInput name="currentWeight" required onIonInput={(e: any) => setValue("currentWeight",e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">What is your goal weight?</IonLabel>
                    <IonInput name="goalWeight" required onIonInput={(e: any) => setValue("goalWeight",e.target.value)} />
                </IonItem>
                
                {/* <Link to ="/mygoals/"> */}
                {/* <IonButton className="ion-margin-top" disabled={checked}
                        
                        color='primary' 
                        type="submit" 
                     
                        onClick={async () =>{
                             await onSubmit();
                            // <Link to="/mygoals/"></Link>
                          }}
                       
                        expand='full'>
                          
                            Submit Goal
                         
                </IonButton> */}
                {/* </Link> */}

                 {/* <Link to="/mygoals/">
                    <IonButton className="ion-margin-top"
                        color='danger'
                        expand='full'>
                        Cancel
                    </IonButton>
                </Link> */}
                
                 <IonButton className="ion-margin-top" disabled={checked} color='primary' type="submit" >Submit</IonButton>
               
                                    <Link to="/mygoals/">
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

export default AddGoal;