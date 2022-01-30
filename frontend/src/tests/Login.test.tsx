import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import App from "../App";

test('login', () => {
    render(<App />);

    // expect(screen.getByText("You are on the home page")).toBeInTheDocument();

    userEvent.click(screen.getByText("Register/Log In"));
    userEvent.click(screen.getByText("Log in"));

    // expect(screen.getByText("Login")).toBeInTheDocument();

    const username = screen.getAllByRole("textbox")[0];
    const password = screen.getAllByRole("textbox")[1];

    const seonghoEmail = "seongho.park@gmail.com";
    const seonghoPassword = "password";

    fireEvent.change(username, {target: { value: seonghoEmail}})
    fireEvent.change(password, {target: { value: seonghoPassword}})

    // ADD USERNAME AND PASSWORD VERIFICATION
    userEvent.click(screen.getByText("Log in"));

    expect(screen.getByText("Welcome back,")).toBeInTheDocument()

});

test('password reset', () => {
    render(<App />);

    userEvent.click(screen.getByText("Register/Log In"));

    userEvent.click(screen.getByText("Log in"));

    userEvent.click(screen.getByText("Forgot Password?"));

    expect(screen.getByText("Password Reset")).toBeInTheDocument();

});

test('role', () => {
    render(<App />);

    

    expect(screen.getByText("You are on the home page")).toBeInTheDocument();



});