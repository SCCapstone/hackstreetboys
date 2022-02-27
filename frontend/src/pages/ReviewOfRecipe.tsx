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

interface ReviewExample {
  review: Review,
}
export interface routePrams {
  id: string;
}
function SpecifiedRecipe(this: any) {
  const [review, setReview] = React.useState<Review>({
    id: 1,
    rating: 0,
    feedback: "",
    authorId: 0,
    recipeId: 0
  });
  
  const { id } = useParams<routePrams>();
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/review/${id}/`)
    //fetch(`https://api.fridger.recipes/v1/review/${id}`)
      .then(response => response.json())
      .then(data => setReview(data))
  }, [id])

  console.log(review);

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
            </IonContent>
          </IonPage>
        </IonApp>
      </Switch>
    </Router>
  );
}

export default SpecifiedRecipe;