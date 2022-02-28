import { IonButton, IonInput } from '@ionic/react';
import { values } from 'lodash';
import React from 'react';

const CalorieInput = ({addItemHandler, calories, mealName, setCalories, setItemName}: any) => {
    const onAddItemClick = () => {
        addItemHandler();
    }

    return (
        <div>
            <IonInput color = 'dark' type="text" placeholder="Food Item" value={mealName} onIonInput={(e: any) => setItemName(e.target.value)}/>
              <IonInput color='dark' type="number" placeholder='Calories'value={calories} onIonInput={(e: any) => setCalories(e.target.value)}/>
              <IonButton onClick={onAddItemClick} color="dark">Add Item</IonButton>
        </div>
    );
}
export default CalorieInput;