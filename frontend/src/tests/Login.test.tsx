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
test('wrong login', () => {
    render(<App />);

    // Clicks through to registration
    userEvent.click(screen.getByText("Register/Log In"));

    // Clicks through to login
    userEvent.click(screen.getByText("Log in"));

    // Clicks through to login with unsatisfactory credentials
    userEvent.click(screen.getByText("Log In"));

    // console.log(screen.getAllByText(/log in/i))

    // Checks for the login label at the top of the expected screen
    expect(screen.getByText("Login")).toBeInTheDocument()

});

// Tests the navigation from the home page through to the login page,
// and then to the reset password page where the user may enter an email to receive a reset link.
test('password reset', () => {
    render(<App />);

    // Clicks through to login
    userEvent.click(screen.getByText('Log In'));
    // Indicates that user wants to reset password
    userEvent.click(screen.getByText('Forgot Password?'));

    // console.log(screen.getAllByText(/password reset/i))

    // Checks for the Password Reset label at the top of the expected screen
    expect(screen.getByText("Password Reset")).toBeInTheDocument();

});
