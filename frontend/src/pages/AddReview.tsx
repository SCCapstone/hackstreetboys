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
import {Review} from '../models/Review';
import {NavContext} from '@ionic/react';
import {IonicRatingModule} from 'ionic-rating';
import { useEffect } from 'react';
import { Recipe } from '../models/Recipe';    
import Context from '../components/Context';
import { User } from '../models/User';
    interface ReviewExample {
        review: Review,
      }
      export interface routePrams {
        id: string;
      }
            const AddReview: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
                const { id } = useParams<routePrams>();
                const [ loggedIn, setLoggedIn ] = useState(false);
                const [ user, setUser ] = useState<User>();
                const globals = {
                  loggedInState: loggedIn,
                  currentUser: user,
                  setLoggedIn,
                  setUser
                }
                // const [recipe, setRecipe] = React.useState<Recipe>({
                //     id: 1,
                //     title: "",
                //     author: "",
                //     description: "",
                //     body: "",
                //     imgSrc: "",
                //     totalTime: 0,
                //     prepTime: 0,
                //     cookTime: 0,
                //     yield: 0,
                //     estimatedCost: 0,
                //     type: "",
                //     tags: "",
                //     ingredientIds: "",
                //     rating: 0
                //   });
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
                        authorId: context.currentUser?.id,
                        recipeId: id,
                        rating: 0,
                        feedback: "",
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
                'https://api.fridger.recipes/v1/review/',
                //'https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/review/',
                body,
                config
            ).then( res =>{
                //console.log("Resulting data" + res.data);
                if (res.status === 200) {
                    console.log("Status is " + res.status);
                    //navigate(`/recipe/${recipe.id}`);
                    //navigate(`/recipes`);

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
                    <IonLabel position="floating" >What would you rate this recipe?</IonLabel>
                    <IonInput name="rating" placeholder="Please enter a whole number 1-5" required onIonInput={(e: any) => setValue("rating",e.target.value)} />
                </IonItem>
                
                <IonItem>
                    <IonLabel position="floating">Please write your review:</IonLabel>
                    <IonInput name="feedback" required onIonInput={(e: any) => setValue("feedback",e.target.value)} />
                </IonItem>
                {/* {(e: any) => setValue("authorId", e.context.currentUser?.id)} */}
                
                <IonButton className="ion-margin-top" disabled={checked} color='primary' type="submit" slot="start" >Submit Review</IonButton>
       
                {/* <IonButton className="ion-margin-top" disabled={!checked}
                        
                        color='primary' 
                        type="submit" 
                        onClick={async () =>{
                             await onSubmit();
                          }}
                        expand='full'>
                            Submit Review        
                </IonButton> */}
        
                {/* <Link to={`/recipe/${recipe.id}`}> */}
                <Link to={"/recipes"}>
                    {/* <IonButton className="ion-margin-top"
                        color='danger'
                        expand='full'>
                        Cancel
                    </IonButton> */}
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

export default AddReview;