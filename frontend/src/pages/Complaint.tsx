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
import { Complaint } from '../models/Complaint';
import { useEffect } from 'react';
import React from 'react';

//import Context from '../components/Context';
interface ComplaintExample {
  complaint: Complaint,
}
export interface routePrams {
    id: string;
  }
function ComplaintPage() {
  //const context = useContext(Context);
  const [complaints, setComplaint] = React.useState<[Complaint]>([{
    id: 1,
    severity: 0,
    reason: "",
    authorId: 0,
    complaintId: 0
  }]);

  
  const { id } = useParams<routePrams>();
  
  useEffect(() => {
    //fetch(`http://localhost:8080/v1/complaint/`)
    fetch('http://localhost:8080/v1/complaint/')
    .then(response => response.json())
    .then(data => setComplaint(data))
  }, [id])
  console.log(complaints);
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
      <IonText><h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Complaints</h1></IonText>
                  <IonGrid>
                  <Link to="/recipes">
            <IonButton >
              Return to Recipes 
            </IonButton>
            </Link>
                    <IonRow>
                      {complaints.map(complaint =>
                        <IonCol sizeXs="12" sizeSm="6" key={complaint.id}>
                            {/* maybe in future, for now - just filter */}
                         {/* <Link to={`/review/recipe/${complaint.id}`}> */}
                          <IonCard button routerDirection="forward">
                            <IonCardHeader>

                              <IonCardTitle>{complaint.id}</IonCardTitle>
                              <IonCardSubtitle>Reason: {complaint.reason}</IonCardSubtitle>
                              <IonCardSubtitle>Serverity: {complaint.severity}</IonCardSubtitle>

                            </IonCardHeader>
                          </IonCard>
                          {/* </Link> */}
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

export default ComplaintPage;