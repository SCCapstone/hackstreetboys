
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
test('home rendering by fridger', () => {
    render(<App />)
    //expect(screen.getByText(/You are on the home page/i)).toBeInTheDocument()
  
    const fridger = {button: 0}
    userEvent.click(screen.getByTestId('fridger-home-link'), fridger)
    expect(screen.getByText(/Latest Recipes/i)).toBeInTheDocument()

   
  
})

test('home rendering by menu', () => {
    render(<App />)
    //expect(screen.getByText(/You are on the home page/i)).toBeInTheDocument()

    const home = {button: 0}
    userEvent.click(screen.getByTestId('menuHome'), home)
    expect(screen.getByText(/Latest Recipes/i)).toBeInTheDocument()
  
})


  

