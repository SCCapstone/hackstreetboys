import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonListHeader, IonMenuToggle, IonIcon } from "@ionic/react";
import { home, restaurantSharp, nutritionSharp, person, fastFoodSharp, folderOpenSharp, heartSharp, cogSharp, personCircleSharp } from "ionicons/icons";
//import { Link } from "react-router-dom";

import { useContext } from 'react';
import Context from './Context';

import History from "../History";


const SideBar: React.FC = () => {
  const context = useContext(Context);

    return (
<IonMenu content-id="main-content" data-testid='hamburgermenu'>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Fridger</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <IonList>
      <IonItem>
            <IonLabel>
              Welcome{context.currentUser && ', ' + context.currentUser.name}!
            </IonLabel>
          </IonItem>
        <IonListHeader>
          Navigate
        </IonListHeader>
        <IonMenuToggle auto-hide="false">

          <IonItem button onClick={() => History.push('/')} data-testid='menuHome'>
          <IonIcon icon={home} slot="start"/>
            <IonLabel>
              Home
            </IonLabel>
          </IonItem>
          
          <IonItem data-testid="recipe-link" button onClick={() => History.push('/recipes')} >
          <IonIcon icon={restaurantSharp} slot="start"/>
            <IonLabel>
              Recipes
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => History.push('/ingredients')} data-testid='menuIng' >
          <IonIcon icon={nutritionSharp} slot="start"/>
            <IonLabel>
              Ingredients
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => History.push('/goals')} data-testid='menuGoals'>
          <IonIcon icon={person} slot="start"/>
            <IonLabel>
              Dashboard and Goals
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => History.push('/mypantry')} data-testid='menuPan'>
          <IonIcon icon={fastFoodSharp} slot="start"/>
            <IonLabel>
              My Pantry
            </IonLabel>
          </IonItem>

          {/* <IonItem button onClick={() => History.push('/myreviews')} >
          <IonIcon icon={folderOpenSharp} slot="start"/>
            <IonLabel>
              My Reviews
            </IonLabel>
          </IonItem> */}

          <IonItem button onClick={() => History.push('/favorites')} data-testid='menuFavs'>
          <IonIcon icon={heartSharp} slot="start"/>
            <IonLabel>
              My Favorites
            </IonLabel>
          </IonItem>

          {/* <IonItem button onClick={() => History.push('/preferences')} >
          <IonIcon icon={cogSharp} slot="start"/>
            <IonLabel>
              My Preferences
            </IonLabel>
          </IonItem> */}

          {context.loggedInState &&
          <IonItem button onClick={() => History.push('/editprofile')} >
          <IonIcon icon={personCircleSharp} slot="start"/>
            <IonLabel>
              Edit Profile
            </IonLabel>
          </IonItem>
          }

        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>);
}

export default SideBar;
