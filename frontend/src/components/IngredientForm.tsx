import './IngredientForm.css';
import { IonHeader, IonToolbar, IonButtons, IonMenuToggle, IonButton, IonIcon, IonTitle, IonCheckbox, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { menuOutline } from "ionicons/icons";
import { Link } from 'react-router-dom';

export const IngredientForm: React.FC = () => {
    return (
        <form>
            <IonItem>
                <IonLabel position="floating">What is this ingredient called?</IonLabel>
                <IonInput />
            </IonItem>

            <IonItem>
                <IonLabel position="floating">How many calories per serving?</IonLabel>
                <IonInput />
            </IonItem>

            <IonItem>
                <IonLabel position="floating">How many grams of carbohydrates per serving?</IonLabel>
                <IonInput />
            </IonItem>

            <IonItem>
                <IonLabel position="floating">How many grams of protein per serving?</IonLabel>
                <IonInput />
            </IonItem>

            <IonItem>
                <IonLabel position="floating">How many grams of fat per serving?</IonLabel>
                <IonInput />
            </IonItem>

            <IonItem>
                <IonLabel position="floating">How much does this item cost per serving?</IonLabel>
                <IonInput />
            </IonItem>

            <IonItem lines="none">
                <IonLabel>Does this ingredient contain alcohol?</IonLabel>
                <IonCheckbox color="secondary" defaultChecked={false} slot="start"/>
            </IonItem>

            <IonItem lines="none">
                <IonLabel>I agree that this Ingredient follows the Terms of Service</IonLabel>
                <IonCheckbox defaultChecked={true} slot="start" />
            </IonItem>

            <Link to="/ingredients/">
                <IonButton className="ion-margin-top, ion-float-left" color="danger">Cancel</IonButton>
                <IonButton className="ion-margin-top, ion-float-right" type="submit">Submit Ingredient</IonButton>

            </Link>
        </form>
    )
}
export default IngredientForm;
