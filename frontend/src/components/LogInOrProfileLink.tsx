import { IonTitle, IonItem, IonAvatar, IonButton } from "@ionic/react";
import { Link } from 'react-router-dom';
import { menuOutline } from "ionicons/icons";

import { useContext } from 'react';
import Context from './Context';

import History from '../History'

export const LogInOrProfileLink: React.FC = () => {
    const context = useContext(Context);

    const LogOut = () => {
        context.setLoggedIn(false);
        context.setUser(undefined);
        History.push('/');
    };

    if(context.loggedInState){
        return <>
        <Link slot="end" to="/profile/">
            <IonItem><IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar></IonItem>
        </Link>
        <IonButton onClick={() => LogOut()} slot="end">
            Log Out
        </IonButton>
        </>
    }

    return (
        <Link slot="end" to="/register"><IonTitle>Register/Log In</IonTitle></Link>
    );
}
export default LogInOrProfileLink;