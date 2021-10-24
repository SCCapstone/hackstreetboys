import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonAvatar, IonRow, IonCol, IonFooter } from '@ionic/react';
import { thumbsUp, time, megaphoneSharp} from 'ionicons/icons';

let name = "Sample Recipe"
let rating = 3.6
let description = "this is a test"
export const RecipeCard: React.FC = () => {
  return (
<IonCard>
  <IonItem>
    <IonAvatar slot="start">
    <img src="https://picsum.photos/200"/>
        </IonAvatar>
    <IonLabel>
      <h3>Quinn Biscuit</h3>
      <p>October 6, 2021</p>
    </IonLabel>
  </IonItem>

  <img src="https://picsum.photos/1500/500" alt="ion"/>
  <IonCardHeader>
    <IonCardTitle>{name}</IonCardTitle>
  </IonCardHeader>
  <IonCardContent>
    {description}
    <br/>
    Rating: {rating}/5 
  </IonCardContent>

  <IonFooter>
    <IonRow>
      <IonCol text-center>
        <IonButton>
          <IonIcon slot="start" icon={thumbsUp}></IonIcon>
          <IonLabel>
              1.5k Likes
            </IonLabel>
        </IonButton>
      </IonCol>
      <IonCol text-center>
        <IonButton>
          <IonIcon slot="start" icon={megaphoneSharp}></IonIcon>
          <IonLabel>
              422 Comments
            </IonLabel>        
            </IonButton>
      </IonCol>
      <IonCol text-center>
        <IonButton>
          <IonIcon slot="start" icon={time}></IonIcon>
          <IonLabel>
             5D ago
            </IonLabel></IonButton>
      </IonCol>
    </IonRow>
  </IonFooter>
</IonCard>
  );
};
export default RecipeCard;
