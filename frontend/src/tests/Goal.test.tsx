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
test('link goals login redirect', () => {
    render(<App />)
    //expect(screen.getByText(/You are on the home page/i)).toBeInTheDocument()
  
    // const goalshome = {button: 0}
    // userEvent.click(screen.getByTestId('loginGoals'), goalshome)
    //
    // expect(screen.getByText(/LOGIN/i)).toBeInTheDocument()
    //
    // const goalsmenu = {button: 0}
    // userEvent.click(screen.getByTestId('menuGoals'), goalsmenu)
    //
    // expect(screen.getByText(/LOGIN/i)).toBeInTheDocument()

    userEvent.click(screen.getByTestId('loginGoals'))

    expect(screen.getByTestId("login-button")).toBeInTheDocument()
})

test('menu goals login redirect', () => {
    render(<App />)
    //expect(screen.getByText(/You are on the home page/i)).toBeInTheDocument()

    // const goalshome = {button: 0}
    // userEvent.click(screen.getByTestId('loginGoals'), goalshome)
    //
    // expect(screen.getByText(/LOGIN/i)).toBeInTheDocument()
    //
    // const goalsmenu = {button: 0}
    // userEvent.click(screen.getByTestId('menuGoals'), goalsmenu)
    //
    // expect(screen.getByText(/LOGIN/i)).toBeInTheDocument()


    userEvent.click(screen.getByTestId('menuGoals'))

    expect(screen.getByTestId("login-button")).toBeInTheDocument()
})


  