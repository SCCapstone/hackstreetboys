import './myReviews.css';
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
    IonCard,
    IonCardContent,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
  } from '@ionic/react';

import { Router, Switch, Route, useParams, Link } from "react-router-dom";
import history from '../History';
import SideBar from '../components/SideBar';
import { menuOutline } from 'ionicons/icons';
import { Review } from '../models/Review';
import { useEffect } from 'react';
import React from 'react';
//import Context from '../components/Context';
interface ReviewExample {
  review: Review,
}

function RecipeReviews() {
  //const context = useContext(Context);
  const [reviews, setReview] = React.useState<[Review]>([{
    id: 1,
    rating: 0,
    review: "",
    authorId: 0,
    recipeId: 0
  }]);
  //const { id } = useParams<routePrams>();
  useEffect(() => {
    fetch(`https://api.fridger.recipes/v1/review/`)
    .then(response => response.json())
    .then(data => setReview(data))
  }, [])
  console.log(reviews);
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
      <IonCard>
      <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Reviews</h1></IonText>
                  <IonGrid>
                    <IonRow>
                      {reviews.map(review =>
                        <IonCol sizeXs="12" sizeSm="6" key={review.id}>
                         <Link to={`/review/${review.id}`}>
                          <IonCard button routerDirection="forward">
                            <IonCardHeader>

                              <IonCardTitle>{review.id}</IonCardTitle>
                              <IonCardSubtitle>Rating: {review.rating}</IonCardSubtitle>
                            </IonCardHeader>
                          </IonCard>
                          </Link>
                        </IonCol>
                      )}
                    </IonRow>
                  </IonGrid>
              </IonCard>
      </IonContent>
    </IonPage>
  </IonApp>
  </Switch>
  </Router>
    );
}

export default RecipeReviews;