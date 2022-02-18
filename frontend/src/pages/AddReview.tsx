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
    interface ReviewExample {
        review: Review,
      }

      /*
        function AddReview() {
            const [review, setReview] = React.useState<[Review]>([{
                id: 1,
                authorId: 1,
                recipeId: 1,
                rating: 4.5,
                review: "This was amazing!"
            }]);

    */
            const AddReview: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
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
                        recipeId: 0,
                        rating: 0,
                        review: "",
                    }
                });
                
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

                 
                //   const [recipes, setRecipes] = React.useState<[Recipe]>([{
                //     id: 1,
                //     title: "Biscuits and Jam",
                //     author: "Quinn Biscuit",
                //     description: "What do you think? It's biscuits dummy.",
                //     body: "Well, here's the sauce.",
                //     imgSrc: "",
                //     totalTime: 55,
                //     prepTime: 15,
                //     cookTime: 40,
                //     yield: 10,
                //     estimatedCost: 69.42,
                //     type: "food",
                //     tags: "test,string",
                //     ingredientIds: "2929, 29292",
                //     rating: 4.2
                //   }]);
                //   useEffect(() => {
                
                //  fetch("https://api.fridger.recipes/v1/recipe/")
                //       .then(response => response.json())
                //       .then(data => setRecipes(data))
                //   }, [])

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
                    <IonInput name="rating" required onIonInput={(e: any) => setValue("rating",e.target.value)} />
                </IonItem>
                
                <IonItem>
                    <IonLabel position="floating">Please write your review:</IonLabel>
                    <IonInput name="review" required onIonInput={(e: any) => setValue("review",e.target.value)} />
                </IonItem>
                  
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
                <Link to={"/recipes/"}>
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