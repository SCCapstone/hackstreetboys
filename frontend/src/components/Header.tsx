import { IonHeader, IonToolbar, IonButtons, IonMenuToggle, IonButton, IonIcon, IonTitle, IonBackButton } from "@ionic/react";
import { Link } from 'react-router-dom';
import menu from "../assets/menu.svg";

import LogInOrProfileLink from './LogInOrProfileLink';

export const Header: React.FC = () => {
    return (
<IonHeader>
<IonToolbar>
  <IonButtons slot="start">
    <IonMenuToggle>
      <IonButton>
        <IonIcon icon={menu} slot="start" alt-text="menu" />
      </IonButton>
    </IonMenuToggle>
    <IonBackButton/>
  </IonButtons>
  <Link to="/" style={{ textDecoration: 'inherit', color: 'inherit' }}><IonTitle><span style={{ color:"#1b79b7", fontWeight:"bold" }}>F</span>ridger</IonTitle></Link>
  <LogInOrProfileLink />
</IonToolbar>
</IonHeader>);
}
export default Header;
