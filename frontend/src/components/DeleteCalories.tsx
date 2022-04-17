/*
    This file contains part of the functionality for the calorie tracker. 
    It holds the functionality of having a delete all button so the user can delete all entries at once.
*/

import { IonButton } from '@ionic/react';
import React from 'react';

const DeleteCalories = ({deleteAllHandler}: any) => {
    return (
        <div>
            <IonButton onClick={()=>deleteAllHandler()}className="ion-margin-top, ion-float-right" color="dark" >
                Delete All
            </IonButton>
        </div>
    );
}
export default DeleteCalories;