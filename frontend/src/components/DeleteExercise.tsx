import { IonButton } from '@ionic/react';
import React from 'react';

const DeleteExercise = ({deleteAllHandler}: any) => {
    return (
        <div>
            <IonButton onClick={()=>deleteAllHandler()}className="ion-margin-top, ion-float-right" color="dark" >
                Delete All
            </IonButton>
        </div>
    );
}
export default DeleteExercise;