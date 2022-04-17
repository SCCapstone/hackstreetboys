/*
    This file contains part of the functionality for the exercise tracker. 
    It displays the items once they have been added and allows for a single entry to be deleted.
*/

import { IonButton, IonInput, IonCard, IonCardContent } from '@ionic/react';
import { medalSharp } from 'ionicons/icons';
import { values } from 'lodash';
import React from 'react';

const ExerciseList = ({exercise, deleteItemHandler}: any) => {
    
    return (
        <div>
            {exercise?.map((anExercise: any, index: any)=>(
                <div key={index}>
                    <IonCard>
                        <IonCardContent>{`${anExercise.activity}: ${anExercise.time}`}
                    <div>
                        <IonButton color="dark" size='small' onClick={()=>deleteItemHandler(anExercise.id)}>
                            Delete
                        </IonButton>
                    </div>
                    </IonCardContent>
                    </IonCard>
                </div>
            ))}
        </div>
    );
}
export default ExerciseList;