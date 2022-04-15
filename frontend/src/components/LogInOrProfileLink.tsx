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
        context.setToken(undefined);
        context.setId(undefined)
        context.setAdmin(false);
        context.setEmail(undefined);
        localStorage.clear();
        History.push('/');
    };

    if(context.loggedInState){
        return <>
        <Link slot="end" to="/profile/">
            <IonItem><IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar></IonItem>
        </Link>
        <IonButton color='danger' onClick={() => LogOut()} slot="end">
            Log Out
        </IonButton>
        </>
    }

    return (
        <IonButton color='secondary' routerLink={`/login`} slot="end">
        Log In
    </IonButton>
    );
}
export default LogInOrProfileLink;