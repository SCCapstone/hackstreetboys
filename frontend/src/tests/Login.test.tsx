import React from 'react'

import { render, screen } from '@testing-library/react'
import { ionFireEvent } from "@ionic/react-test-utils";
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from "../App"

// test('login', () => {
//     render(<App />);
//
//     userEvent.click(screen.getByText("Register/Log In"));
//
//     userEvent.click(screen.getByText("Log in"));
//
//     const seonghoEmail = "seongho.park@gmail.com";
//     const seonghoPassword = "password";
//
//     const username = screen.getByPlaceholderText("Email");
//     const password = screen.getByPlaceholderText("Password");
//
//     // userEvent.type(username, seonghoEmail)
//     // userEvent.type(password, seonghoPassword)
//
//     ionFireEvent.ionChange(username, seonghoEmail)
//     ionFireEvent.ionChange(password, seonghoPassword)
//
//     // ADD USERNAME AND PASSWORD VERIFICATION
//     userEvent.click(screen.getByText("Log In"));
//
//     console.log(screen.getAllByText(/log in/i));
//
//     expect(screen.getByText(/welcome back,/i)).toBeInTheDocument();
//
// });

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

    // Clicks through to registration
    userEvent.click(screen.getByText("Register/Log In"));
    // Clicks through to login
    userEvent.click(screen.getByText("Log in"));
    // Indicates that user wants to reset password
    userEvent.click(screen.getByText("Forgot Password?"));

    // console.log(screen.getAllByText(/password reset/i))

    // Checks for the Password Reset label at the top of the expected screen
    expect(screen.getByText("Password Reset")).toBeInTheDocument();

});
