import { resolve } from "dns";
import AddGoal from "../pages/AddGoal";
import Home from "../pages/Home";
import React, { useContext, useState } from 'react'
// app.test.js
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import History from "../History";
import '@testing-library/jest-dom'
import App from "../App"
import ReactDOM from "react-dom";
import Context from "../components/Context";
import axios from "axios";

const Setup = () => {
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
            `https://api.fridger.recipes/v1/auth/login`,
            // Local API
            // `https://api.fridger.recipes/v1/auth/login`,
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
            `https://api.fridger.recipes/v1/user/${response.data.id}`
            // Local API
            // `https://api.fridger.recipes/v1/user/${response.data.id}`
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
}  

// app.test.js
/*
test('full app rendering/navigating', () => {
    render(<GoalsPage />) 
    expect(screen.getByText("Latest Recipes")).toBeInTheDocument()


  
    const register = {button: 0}
    userEvent.click(screen.getByText(/Register/i), register)
    expect(screen.getByText(/register/i)).toBeInTheDocument()
     })
    */

     test('page should have a title of Ionic React Todos', async () => {
         Setup();
        const { findByText } = render(<Home />);
        await findByText('Welcome to Fridger!');
      })

   
  