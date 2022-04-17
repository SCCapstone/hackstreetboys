import { resolve } from "dns";
import AddGoal from "../pages/AddGoal";
import GoalsPage from "../pages/GoalsPage";
import React, { useContext, useState } from 'react'
// app.test.js
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'

import '@testing-library/jest-dom'
import App from "../App"
import ReactDOM from "react-dom";
import Context from "../components/Context";

const [ email, setEmail ] = useState("cc");
const [ password, setPassword ] = useState("123");


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

     test('goals', () => {
      render(<App />);
  
      // Clicks through to registration
      userEvent.click(screen.getByText("Dashboard and Goals"));
  
      // Clicks through to login
      expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
  
      // Clicks through to login with unsatisfactory credentials
      userEvent.click(screen.getByText("Log In"));
  
      // console.log(screen.getAllByText(/log in/i))
  
      // Checks for the login label at the top of the expected screen
      //expect(screen.getByText("Login")).toBeInTheDocument()
  
  });
  

 
  
  