import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import { render, screen } from '@testing-library/react'
// import { ionFireEvent } from "@ionic/react-test-utils";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from "../App"

// Tests the navigation from the home page through to the login page,
// and then tries to log in with insufficient credentials.
test('wrong login', async () =>  {
    render(<App />);
 
    // Clicks through to registration
    userEvent.click(screen.getByTestId("mainlogin"));

    // Clicks through to login
    // userEvent.click(screen.getByTestId("login-button"));
    // userEvent.click(screen.getByTestId("login-button"));

    // Checks for the login label at the top of the expected screen
    expect(screen.getByTestId("mainlogin")).toBeInTheDocument()

});
// test('password reset', () => {
//     render(<App />);

//     // Clicks through to login
//     userEvent.click(screen.getByTestId("mainlogin"));
//     // Indicates that user wants to reset password
//     userEvent.click(screen.getByTestId("forgot-password"));

//     // console.log(screen.getAllByText(/password reset/i))

//     // Checks for the Password Reset label at the top of the expected screen
//     expect(screen.getByText(/request password reset/i)).toBeInTheDocument();
// });