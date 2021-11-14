import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonListHeader, IonMenuToggle, IonIcon } from "@ionic/react";
import { home, restaurantSharp, nutritionSharp, person, fastFoodSharp, folderOpenSharp, heartSharp, cogSharp, personCircleSharp } from "ionicons/icons";
//import { Link } from "react-router-dom";


import History from "../History";


const SideBar: React.FC = () => {
    return (
<IonMenu content-id="main-content">
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Fridger</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <IonList>
      <IonItem>
            <IonLabel>
              Welcome, Seongho!
            </IonLabel>
          </IonItem>
        <IonListHeader>
          Navigate
        </IonListHeader>
        <IonMenuToggle auto-hide="false">

          <IonItem button onClick={() => History.push('/Home')} >
          <IonIcon icon={home} slot="start"/>
            <IonLabel>
              Home
            </IonLabel>
          </IonItem>
          
          <IonItem button onClick={() => History.push('/Recipes')} >
          <IonIcon icon={restaurantSharp} slot="start"/>
            <IonLabel>
              Recipes
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => History.push('/Ingredients')} >
          <IonIcon icon={nutritionSharp} slot="start"/>
            <IonLabel>
              Ingredients
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => History.push('/GoalsPage')} >
          <IonIcon icon={person} slot="start"/>
            <IonLabel>
              My Dashboard
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => History.push('/myPantry')} >
          <IonIcon icon={fastFoodSharp} slot="start"/>
            <IonLabel>
              My Pantry
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => History.push('/myReviews')} >
          <IonIcon icon={folderOpenSharp} slot="start"/>
            <IonLabel>
              My Reviews
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => History.push('/favorites')} >
          <IonIcon icon={heartSharp} slot="start"/>
            <IonLabel>
              My Favorites
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => History.push('/preferences')} >
          <IonIcon icon={cogSharp} slot="start"/>
            <IonLabel>
              My Preferences
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => History.push('/profile')} >
          <IonIcon icon={personCircleSharp} slot="start"/>
            <IonLabel>
              Profile
            </IonLabel>
          </IonItem>

        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>);
}

export default SideBar;
