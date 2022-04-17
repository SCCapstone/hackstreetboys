/*
    This file is the form used for the goals to be able to gather information from a user so that they can
    add a new goal! 
    
    Normally, users will only have one goal - we discourage users from changing as a way to encourage them 
    to stick with their main goal! However, users are able to add multiple goals and this is
    for people who may want to see more achievements in smaller intervals!
*/

import './RecipeForm.css';
import { IonHeader, IonToolbar, IonButtons, IonMenuToggle, IonButton, IonIcon, IonTitle, IonCheckbox, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { menuOutline } from "ionicons/icons";
import { Link } from 'react-router-dom';

export const GoalForm: React.FC = () => {
  return (
    <form>
     <IonItem>
        <IonLabel>What is your end goal?</IonLabel>
        <IonSelect multiple={true} cancelText="Cancel" okText="Okay">
          <IonSelectOption value="lose">Lose weight</IonSelectOption>
          <IonSelectOption value="maintain">Maintain current weight</IonSelectOption>
          <IonSelectOption value="gain">Gain weight</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">How many calories do you consume per day?</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">How many carbohydrates do you consume per day?</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">How much protein do you consume per day?</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">How much fat do you consume per day?</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">What is your current weight?</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">What is your goal weight?</IonLabel>
        <IonInput />
      </IonItem>

      <Link to="/mygoals/">
      <IonButton >
        Submit New Goal
      </IonButton>
      </Link>

      <Link to="/mygoals/">
      <IonButton >
        Cancel
      </IonButton>
      </Link>

    </form>
  )
}
export default GoalForm;