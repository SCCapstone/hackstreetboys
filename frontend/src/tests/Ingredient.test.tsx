import React, { Component, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import ContextProvider from '../components/Context';

import { render, screen } from '@testing-library/react'
// import { ionFireEvent } from "@ionic/react-test-utils";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from "../App"
// import Ingredient from "../pages/Ingredient";
import Context, {useGlobalContext} from "../components/Context";

test('going to ingredient view', () => {

    render(<App />);
    userEvent.click(screen.getByTestId("menuIng"));
    expect(screen.getByTestId('carbs')).toBeInTheDocument();
  
});

test('individual ingredient view', () => {

    render(<App />);
    userEvent.click(screen.getByTestId("menuIng"));
    userEvent.click(screen.getByText(/g protein/i));

    expect(screen.getByText(/estimated cost/i)).toBeInTheDocument();

});

test('related recipes', () => {

    render(<App />);
    userEvent.click(screen.getByTestId("menuIng"));
    userEvent.click(screen.getByText(/g protein/i));
    userEvent.click(screen.getByText(/by /i));

    expect(screen.getByText(/type: /i)).toBeInTheDocument();

});
