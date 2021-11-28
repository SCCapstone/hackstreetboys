import { IonHeader, IonToolbar, IonButtons, IonMenuToggle, IonButton, IonIcon, IonTitle } from "@ionic/react";
import { Link } from 'react-router-dom';
import { menuOutline } from "ionicons/icons";

import LogInOrProfileLink from './LogInOrProfileLink';

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
  <Link to="/" style={{ textDecoration: 'inherit', color: 'inherit' }}><IonTitle><span style={{ color:"#1b79b7", fontWeight:"bold" }}>F</span>ridger</IonTitle></Link>
  <LogInOrProfileLink />
</IonToolbar>
</IonHeader>);
}
export default Header;
