
import { resolve } from "dns";
import AddGoal from "../pages/AddGoal";
import GoalsPage from "../pages/GoalsPage";
import React from 'react'
import Header from "../components/Header";
// app.test.js
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'

import '@testing-library/jest-dom'
import App from "../App"

import axios from "axios";

import { BASE_URL, fetchUsers } from "./utils";

jest.mock("axios");

// app.test.js
test('join renders', () => {
    render(<App />)
    //expect(screen.getByText(/You are on the home page/i)).toBeInTheDocument()

    // const join = {button: 0}
    // userEvent.click(screen.getByTestId('join-link'), join)
    // //expect(screen.getByTestId('register')).toBeInTheDocument()
    // expect(screen.getByText('REGISTER FOR A NEW ACCOUNT')).toBeInTheDocument()

    userEvent.click(screen.getByText(/today/i))
    //expect(screen.getByTestId('register')).toBeInTheDocument()
    expect(screen.getByText(/submit/i)).toBeInTheDocument()
    
    //expect(screen.getByTestId('header')).toBeInTheDocument()
    //expect(screen.getByText(/Cancel/i)).toBeInTheDocument()
   
  
})

