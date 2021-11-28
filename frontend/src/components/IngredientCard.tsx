import React from 'react';
import { IonCard, IonCardHeader, IonIcon, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonChip } from '@ionic/react';
import { Ingredient } from '../models/Ingredient';
import './IngredientCard.css';
import { Link } from 'react-router-dom';
import IngredientBanner from '../assets/fridger_banner.png'
import Header from '../components/Header';

interface ContainerProps {
    ingredient: Ingredient
}

var link = "https://picsum.photos/" + String() + "/" + String();

const IngredientCard: React.FC<ContainerProps> = ({ ingredient }) => {
    return (
        <Link to={`/ingredients/${ingredient.id}`}>
            <IonCard button routerDirection="forward">
                <IonCardContent>
                    <img src={IngredientBanner} alt="IngredientImage" style={{ width: '100%', objectFit: 'cover' }} />
                </IonCardContent>
                <IonCardHeader>
                    <IonCardTitle>{ingredient.name}</IonCardTitle>
                    <IonCardSubtitle>{ingredient.calories} kcal</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonLabel>{ingredient.carbohydrates} g</IonLabel>
                    <IonLabel>{ingredient.protein} g</IonLabel>
                    <IonLabel>{ingredient.fat} g</IonLabel>
                    <IonLabel>$ {ingredient.cost}</IonLabel>
                </IonCardContent>
            </IonCard>
        </Link>
    );
};

export default IngredientCard;
