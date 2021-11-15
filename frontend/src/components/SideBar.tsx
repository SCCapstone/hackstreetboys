import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonListHeader, IonMenuToggle, IonIcon } from "@ionic/react";
<<<<<<< HEAD
import { home, restaurantSharp, nutritionSharp, person, fastFoodSharp, folderOpenSharp, heartSharp, cogSharp } from "ionicons/icons";
=======
import { home, restaurantSharp, nutritionSharp, person, fastFoodSharp, folderOpenSharp, heartSharp, cogSharp, personCircleSharp } from "ionicons/icons";
>>>>>>> 432e6b5f621843637b7bd9a63701c6258b23fed0
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

<<<<<<< HEAD
          <IonItem button onClick={() => History.push('/Home')} >
=======
          <IonItem button onClick={() => History.push('/')} >
>>>>>>> 432e6b5f621843637b7bd9a63701c6258b23fed0
          <IonIcon icon={home} slot="start"/>
            <IonLabel>
              Home
            </IonLabel>
          </IonItem>
          
<<<<<<< HEAD
          <IonItem button onClick={() => History.push('/Recipes')} >
=======
          <IonItem button onClick={() => History.push('/recipes')} >
>>>>>>> 432e6b5f621843637b7bd9a63701c6258b23fed0
          <IonIcon icon={restaurantSharp} slot="start"/>
            <IonLabel>
              Recipes
            </IonLabel>
          </IonItem>

<<<<<<< HEAD
          <IonItem button onClick={() => History.push('/Ingredients')} >
=======
          <IonItem button onClick={() => History.push('/ingredients')} >
>>>>>>> 432e6b5f621843637b7bd9a63701c6258b23fed0
          <IonIcon icon={nutritionSharp} slot="start"/>
            <IonLabel>
              Ingredients
            </IonLabel>
          </IonItem>

<<<<<<< HEAD
          <IonItem button onClick={() => History.push('/GoalsPage')} >
=======
          <IonItem button onClick={() => History.push('/goals')} >
>>>>>>> 432e6b5f621843637b7bd9a63701c6258b23fed0
          <IonIcon icon={person} slot="start"/>
            <IonLabel>
              My Dashboard
            </IonLabel>
          </IonItem>

<<<<<<< HEAD
          <IonItem button onClick={() => History.push('/myPantry')} >
=======
          <IonItem button onClick={() => History.push('/mypantry')} >
>>>>>>> 432e6b5f621843637b7bd9a63701c6258b23fed0
          <IonIcon icon={fastFoodSharp} slot="start"/>
            <IonLabel>
              My Pantry
            </IonLabel>
          </IonItem>

<<<<<<< HEAD
          <IonItem button onClick={() => History.push('/myReviews')} >
=======
          <IonItem button onClick={() => History.push('/myreviews')} >
>>>>>>> 432e6b5f621843637b7bd9a63701c6258b23fed0
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

<<<<<<< HEAD
=======
          <IonItem button onClick={() => History.push('/profile')} >
          <IonIcon icon={personCircleSharp} slot="start"/>
            <IonLabel>
              Profile
            </IonLabel>
          </IonItem>

>>>>>>> 432e6b5f621843637b7bd9a63701c6258b23fed0
        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>);
}

export default SideBar;
