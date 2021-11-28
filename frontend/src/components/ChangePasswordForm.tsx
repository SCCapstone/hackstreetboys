import { IonItem, IonLabel, IonInput, IonButton, IonTitle } from "@ionic/react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import History from '../History';

export const ChangePasswordForm: React.FC = () => {
    const [ buttonClicked, setClicked ] = useState(false);

    return (
        <form>
            <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput type="email"/>
            </IonItem>
            <IonButton className="ion-margin-top" expand="block" onClick={() => {
                setClicked(true);
            }}>
                Request Password Reset
            </IonButton>
            {buttonClicked &&
                <IonItem>
                If your email is associated with an account, a password reset request has been sent.
                </IonItem>
            }
        </form>
    );
}
export default ChangePasswordForm;
