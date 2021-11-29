import './IngredientForm.css';
import { IonHeader, IonToolbar, IonButtons, IonMenuToggle, IonButton, IonIcon, IonTitle, IonCheckbox, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { menuOutline } from "ionicons/icons";
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export const IngredientForm: React.FC = () => {
    return (
        <form>
            <IonItem>
                <IonLabel position="floating">What is this ingredient called?</IonLabel>
                <IonInput />
            </IonItem>

            <IonItem>
                <IonLabel position="floating">How many <b>calories</b> per serving?</IonLabel>
                <IonInput />
            </IonItem>

            <IonItem>
                <IonLabel position="floating">How many grams of <b>carbohydrates</b> per serving?</IonLabel>
                <IonInput />
            </IonItem>

            <IonItem>
                <IonLabel position="floating">How many grams of <b>protein</b> per serving?</IonLabel>
                <IonInput />
            </IonItem>

            <IonItem>
                <IonLabel position="floating">How many grams of <b>fat</b> per serving?</IonLabel>
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
                <IonLabel>I agree that this ingredient follows the Terms of Service</IonLabel>
                <IonCheckbox defaultChecked={true} slot="start" />
            </IonItem>

            <Link to="/ingredients/">
                <IonButton className="ion-margin-top, ion-float-left" color="danger">Cancel</IonButton>
                <IonButton className="ion-margin-top, ion-float-right" type="submit">Submit</IonButton>

            </Link>
        </form>
    )
}
export default IngredientForm;
