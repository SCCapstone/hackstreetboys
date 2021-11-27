import './RecipeForm.css';
import { IonHeader, IonToolbar, IonButtons, IonMenuToggle, IonButton, IonIcon, IonTitle, IonCheckbox, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { menuOutline } from "ionicons/icons";
import { Link } from 'react-router-dom';

export const RecipeForm: React.FC = () => {
  return (
    <form>
      <IonItem>
        <IonLabel position="floating">Title</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Description</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Instructions</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Prep Time</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Cook Time</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Yields</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Estimated Cost</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem lines="none">
        <IonLabel>Is it alcoholic (21+)</IonLabel>
        <IonCheckbox defaultChecked={false} slot="start" />
      </IonItem>
      <IonItem>
        <IonLabel>Type</IonLabel>
        <IonSelect multiple={true} cancelText="Cancel" okText="Okay">
          <IonSelectOption value="american">American</IonSelectOption>
          <IonSelectOption value="mexican">Mexican</IonSelectOption>
          <IonSelectOption value="chinese">Chinese</IonSelectOption>
          <IonSelectOption value="italian">Italian</IonSelectOption>
          <IonSelectOption value="spanish">Spanish</IonSelectOption>
          <IonSelectOption value="nigerian">Nigerian</IonSelectOption>
          <IonSelectOption value="lebanese">Lebanese</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Tags (seperated by commas)</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem lines="none">
        <IonLabel>I agree that this recipe follows our Terms of Service</IonLabel>
        <IonCheckbox defaultChecked={true} slot="start" />
      </IonItem>
      <Link to="/recipes/">
      <IonButton className="ion-margin-top" type="submit" expand="block">
        Submit Recipe
      </IonButton>
      <IonButton className="ion-margin-top" color="danger" expand="block">
        Cancel
      </IonButton>
      </Link>
    </form>
  )
}
export default RecipeForm;
