import { IonButton, IonInput } from '@ionic/react';
import { values } from 'lodash';
import React from 'react';

const ExerciseInput = ({addItemHandler, activity, time, setActivity, setTime}: any) => {
    const onAddItemClick = () => {
        addItemHandler();
    }

    return (
        <div>
            <IonInput color = 'dark' type="text" placeholder="Activity" value={activity} onIonInput={(e: any) => setActivity(e.target.value)}/>
              <IonInput color='dark' type="number" placeholder='Time (min)'value={time} onIonInput={(e: any) => setTime(e.target.value)}/>
              <IonButton onClick={onAddItemClick} color="dark">Add Exercise</IonButton>
        </div>
    );
}
export default ExerciseInput;