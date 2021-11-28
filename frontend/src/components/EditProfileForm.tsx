import { IonItem, IonLabel, IonInput, IonButton, IonDatetime } from "@ionic/react";
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useContext } from 'react';
import Context from './Context';

import History from '../History';

export const EditProfileForm: React.FC = () => {
    const context = useContext(Context);
    const user = context.currentUser;

    if (user === undefined) {
        History.push('/login');
        return null;
    }

    return (
        <form>
            <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput value={user!.name} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput value={user!.email} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Bio</IonLabel>
                <IonInput value={user!.bio} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Date of Birth</IonLabel>
                <IonDatetime displayFormat="MMM DD YYYY" value={user!.dob}></IonDatetime>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Height</IonLabel>
                <IonInput value={user!.height_in.toString()} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Weight</IonLabel>
                <IonInput value={user!.weight_lb.toString()} />
            </IonItem>
            <Link to="/">
            <IonButton className="ion-margin-top" expand="block">
                Submit
            </IonButton>
            <IonButton className="ion-margin-top" color="danger" expand="block">
                Cancel
            </IonButton>
            </Link>
        </form>
    );
}
export default EditProfileForm;
