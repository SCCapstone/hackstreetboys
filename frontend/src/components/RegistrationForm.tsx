import { IonItem, IonLabel, IonInput, IonButton, IonDatetime } from "@ionic/react";
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const RegistrationForm: React.FC = () => {

    return (
        <form>
            <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Bio</IonLabel>
                <IonInput />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Date of Birth</IonLabel>
                <IonDatetime displayFormat="MMM DD YYYY" placeholder="Select Date"></IonDatetime>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Height</IonLabel>
                <IonInput />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Weight</IonLabel>
                <IonInput />
            </IonItem>
            <Link to="/">
            <IonButton className="ion-margin-top" type="submit" expand="block">
                Submit
            </IonButton>
            <IonButton className="ion-margin-top" color="danger" expand="block">
                Cancel
            </IonButton>
            </Link>
        </form>
    );
}
export default RegistrationForm;
