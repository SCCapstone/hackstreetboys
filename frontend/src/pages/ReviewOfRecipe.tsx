import { Router, Switch, Route, Link, useParams } from "react-router-dom";
import history from '../History';
import {
  IonApp,
  IonContent,
  IonPage,
  IonButton,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import '../theme/variables.css';
import SideBar from '../components/SideBar';
import React, { useEffect } from 'react';
import { Review } from '../models/Review'
import Header from "../components/Header";
import Context from '../components/Context';
import {useContext} from 'react';
import axios from "axios";

interface ReviewExample {
  review: Review,
}
export interface routePrams {
  id: string;
}
function SpecifiedRecipe(this: any) {
  const context = useContext(Context);
  const [review, setReview] = React.useState<Review>({
    id: 1,
    rating: 0,
    feedback: "",
    authorId: 0,
    authorName: "",
    recipeId: 0
  });
  useEffect(() => {
    document.title = "Review Recipe";
  }, []);
  const { id } = useParams<routePrams>();
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/review/${id}/`)
    //fetch(`https://api.fridger.recipes/v1/review/${id}`)
      .then(response => response.json())
      .then(data => setReview(data))
  }, [id])

  console.log(review);

  const onDelete = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${context.token}`
        },
      };
      // const body = {
      //   "userId":context.currentUser?.id,
      //   "recipeId":recipe.id
      // }
      const res = await axios.delete(
        `https://api.fridger.recipes/v1/recipe/review/${review.id}`,
        config
        ).then(res=> {
        console.log("Removed review by" + review.id);
        //if(res.status == 200){
        //  console.log("Status is "+res.status);
         // history.push('/recipes');
      //  }
    }).catch( e => {
      history.push('/login');
      });
      return res;
    }catch (e) {
      console.error(e);
  }
  return false;
  };
  

  const adminDelete = () => {
    if(context.isAdmin) {
       return <>
       <IonButton onClick={() =>
                onDelete()}
               color='danger' expand='full'>
       Delete Review
     </IonButton>
       </>
     }
     else {
       return <></>
     }
   }

  return (
    <Router history={history}>
      <Switch>
        <IonApp>
          <SideBar />
          <IonPage className="ion-page" id="main-content">
            <Header/>
            <IonContent className="ion-padding">
              <IonCard>
                <IonCardContent>
                <Link to="/recipes">
            <IonButton>
              Return to Recipes 
            </IonButton>
            </Link>
                    <h1>{review.id}</h1>
                    <h2>Rating:{review.rating}</h2>
                    <h2>Review:{review.feedback}</h2>
                    <h2>By: {review.authorId}</h2> 
                </IonCardContent>
              </IonCard>
              {adminDelete()}
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default SpecifiedRecipe;
