import { IonItem, IonLabel, IonInput, IonButton, IonTitle } from "@ionic/react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useContext } from 'react';
import Context from './Context';

import History from '../History';

export const LoginForm: React.FC = () => {
    const context = useContext(Context);

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [error, setError ] = useState(false);

    const LogIn = () => {
            fetch(`http://localhost:7999/v1/user/authenticate?email=${email}&password=${password}`)
                .then(response => response.json())
                .then(data => context.setUser(data))
                .then(() => {
                    if (context.currentUser === undefined){
                        setError(true);
                        return;
                    }
                }).then(() =>{
                    context.setLoggedIn(true);
                    History.push('/');
                });
    }

    return (
        <form>
            <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput onIonChange={(e) => setEmail(e.detail.value!)} type="email"/>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput onIonChange={(e) => setPassword(e.detail.value!)} type="password" />
            </IonItem>
            <IonButton className="ion-margin-top" onClick={() => LogIn()} expand="block">
                Log In
            </IonButton>
            <Link to='changepassword'><IonItem>Forgot Password?</IonItem></Link>
            {error === true && <IonTitle>Username or Password Incorrect</IonTitle>}
        </form>
    );
}
export default LoginForm;
