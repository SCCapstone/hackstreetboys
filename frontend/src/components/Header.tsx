import { IonHeader, IonToolbar, IonButtons, IonMenuToggle, IonButton, IonIcon, IonTitle } from "@ionic/react";
import { menuOutline } from "ionicons/icons";

export const Header: React.FC = () => {
    return (
<IonHeader>
<IonToolbar>
  <IonButtons slot="start">
    <IonMenuToggle>
      <IonButton>
        <IonIcon icon={menuOutline} slot="start" />
      </IonButton>
    </IonMenuToggle>
  </IonButtons>
  <IonTitle><span style={{ color:"#1b79b7", fontWeight:"bold" }}>F</span>ridger</IonTitle>
</IonToolbar>
</IonHeader>);
}
export default Header;
