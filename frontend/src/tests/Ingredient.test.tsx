import React, { Component, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import ContextProvider from '../components/Context';

import { render, screen } from '@testing-library/react'
// import { ionFireEvent } from "@ionic/react-test-utils";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from "../App"
import Ingredients from "../pages/Ingredients";
import Context, {useGlobalContext} from "../components/Context";

test('going to ingredient view', () => {

    render(<App />);
    userEvent.click(screen.getByTestId("menuIng"));
    expect(screen.getByTestId('carbs')).toBeInTheDocument();
  
});


