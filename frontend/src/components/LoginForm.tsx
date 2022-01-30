import { IonItem, IonLabel, IonInput, IonButton, IonTitle } from "@ionic/react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useContext } from 'react';
import Context from './Context';

import History from '../History';

import axios from "axios";
import React from "react";

export const LoginForm: React.FC = () => {
    const context = useContext(Context);

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [error, setError ] = useState(false);

    const LogIn = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        }
        const user = { email, password }
        const response = await axios.post(
            // Public API
            `https://fridger-backend-dot-fridger-333016.ue.r.appspot.com/v1/auth/`,
            // Local API
            //`http://localhost:7999/v1/auth/`,
            user
        );

        const loggedInUser = response.data;

        if (loggedInUser) {
            localStorage.setItem('user', JSON.stringify(loggedInUser))
            context.setUser(loggedInUser)
            console.log(JSON.stringify(loggedInUser))
            context.setLoggedIn(true);
            History.push('/');
        } else {
            setError(true);
            return;
        }
        

        /*
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
        */
    }

    return (
        <form>
            <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                    value={email}
                    placeholder="Email"
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    type="email"
                />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                    value=""
                    placeholder="Password"
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    type="password"
                />
            </IonItem>
            <IonButton className="ion-margin-top" onClick={LogIn} expand="block">
                Log In
            </IonButton>
            <Link to='changepassword'><IonItem>Forgot Password?</IonItem></Link>
            {error === true && <IonTitle>Username or Password Incorrect</IonTitle>}
        </form>
    );
}
export default LoginForm;