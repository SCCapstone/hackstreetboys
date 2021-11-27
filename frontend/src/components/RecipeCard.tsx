import React from 'react';
import { IonCard, IonCardHeader, IonIcon, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonChip } from '@ionic/react';
import { Recipe } from '../models/Recipe';
import './RecipeCard.css';
import { Link } from 'react-router-dom';

interface ContainerProps {
    recipe: Recipe,
}

const RecipeCard: React.FC<ContainerProps> = ({ recipe }) => {
    return (
        <Link to={`/recipes/${recipe.id}`}>
        <IonCard button routerDirection="forward">
            <IonCardHeader>
                <IonCardTitle></IonCardTitle>
                <IonCardSubtitle><IonChip  disabled></IonChip></IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                        <IonLabel>{recipe.title}</IonLabel>
                        <IonLabel>{recipe.author}</IonLabel>
            </IonCardContent>
        </IonCard>
        </Link>
    );
};

export default RecipeCard;
