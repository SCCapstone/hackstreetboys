import { IonButton, IonInput, IonLabel } from '@ionic/react';
import { values } from 'lodash';
import React from 'react';

const CalorieInput = ({ addItemHandler, calories, mealName, setCalories, setItemName }: any) => {
    const onAddItemClick = () => {
        addItemHandler();
    }

    return (
        <div>
            <br />
            <IonLabel position="floating">Food Item</IonLabel>
            <IonInput type="text" placeholder="Enter Food Item" value={mealName} onIonInput={(e: any) => setItemName(e.target.value)} />
            <IonLabel position="floating">Calories</IonLabel>
            <IonInput type="number" placeholder='Enter Calories' value={calories} onIonInput={(e: any) => setCalories(e.target.value)} />
            <IonButton onClick={onAddItemClick} color="dark">Add Item</IonButton>
        </div>
    );
}
// style={{ maxHeight:'250px', width:'100%', objectFit: 'cover'}}
export default CalorieInput;