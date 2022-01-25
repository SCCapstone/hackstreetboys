import { IonItem, IonLabel, IonInput, IonButton, IonDatetime } from "@ionic/react";
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const RegistrationForm: React.FC = () => {

    return (
        <form /*action="http://localhost:7999/v1/user/" method="post"*/>
            <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput name="email" />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" name="password" />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput name="name" />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Bio</IonLabel>
                <IonInput name="bio" />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Date of Birth</IonLabel>
                <IonDatetime displayFormat="MMM DD YYYY" placeholder="Select Date" name="dob"></IonDatetime>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Height</IonLabel>
                <IonInput name="height_in" />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Weight</IonLabel>
                <IonInput name="weight_lb" />
            </IonItem>
            <Link to="/">
            <IonButton className="ion-margin-top" /*type="submit"*/ expand="block">
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
