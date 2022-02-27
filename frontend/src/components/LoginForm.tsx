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
        await axios.post(
            // Public API
            // `https://api.fridger.recipes/v1/auth/login`,
            // Local API
            `http://localhost:8080/v1/auth/login`,
            user
        ).then(function (response)  {
            console.log(response.data);
            console.log(response.data.token);

            context.setLoggedIn(true);
            context.setEmail(response.data.email);
            localStorage.setItem('email', response.data.email)
            context.setId(response.data.id);
            localStorage.setItem('id', response.data.id)
            context.setToken(response.data.token);
            localStorage.setItem('token', response.data.token)
            context.setAdmin(response.data.roles.includes("ROLE_ADMIN"))
            localStorage.setItem('admin', response.data.roles.includes("ROLE_ADMIN"))

            axios.get(
            // Public API
            // `http://localhost:8080/v1/user/${context.id}`
            // Local API
            `http://localhost:8080/v1/user/${response.data.id}`
            ).then(function (response) {
                const user = response.data;
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    context.setUser(user);
                    console.log(JSON.stringify(user));
                    History.push('/');
                } else {
                    setError(true);
                    return;
                }
            })
        })
        // If an authorization error occurred display error message
        .catch(function (response) {
            setError(true);
            console.log(response);
        })
    }

    return (
        <form>
            <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                    value={email}
                    // placeholder="Email"
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    type="email"
                />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                    value={password}
                    // placeholder="Password"
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