/*
    This file contains part of the functionality for the calorie tracker. It takes in the item's name and calorie
    count for that item. It holds the functionality of entering values to the tracker. 
*/

import { IonButton, IonInput, IonLabel } from '@ionic/react';
import { values } from 'lodash';
import React from 'react';

const ExerciseInput = ({ addItemHandler, activity, time, setActivity, setTime }: any) => {
    const onAddItemClick = () => {
        addItemHandler();
    }

    return (
        <div>
            <br />
            <IonLabel position="floating">Activity</IonLabel>
            <IonInput type="text" placeholder="Enter Activity" value={activity} onIonInput={(e: any) => setActivity(e.target.value)} />
            <IonLabel position="floating">Time (min)</IonLabel>
            <IonInput type="number" placeholder='Enter Time' value={time} onIonInput={(e: any) => setTime(e.target.value)} />
            <IonButton onClick={onAddItemClick} color="dark">Add Exercise</IonButton>
        </div>
    );
}
export default ExerciseInput;