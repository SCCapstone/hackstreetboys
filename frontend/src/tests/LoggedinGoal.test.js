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
import Login from "../pages/Login";


jest.mock("axios");

// app.test.js
//test('goal app rendering/navigating', () => {

    describe('login test', () => {
        describe('login function', () => {
            const email = 'test@test.com';
            const name = 'jane';
            const password = 'password';

            beforeEach(() => {
                axios.post.mockResolvedValue({});
            });

            it('should call endpoint with email and pw', async () => {
                await Login(email, password);
                expect(axios.post).toBeCalledWith(
                    "https://api.fridger.recipes/v1/auth/register",
                    {currentUser: {email, password}},
                );
            });
        });
      
        render(<GoalsPage />)
    });

    
  /*
    const goalshome = {button: 0}
    userEvent.click(screen.getByTestId('loginGoals'), goalshome)
  
    expect(screen.getByText(/LOGIN/i)).toBeInTheDocument()

    const goalsmenu = {button: 0}
    userEvent.click(screen.getByTestId('menuGoals'), goalsmenu)
  
    expect(screen.getByText(/LOGIN/i)).toBeInTheDocument()
    */
//})


  