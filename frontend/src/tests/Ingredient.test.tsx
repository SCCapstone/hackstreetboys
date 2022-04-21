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

test('going to individual ingredient view', () => {

    render(<Ingredients />);

    // Clicks through to registration
    userEvent.click(screen.getByText("Pasta Sauce"));

    // Checks for the login label at the top of the expected screen
    expect(screen.getByText("One serving of pasta sauce contains")).toBeInTheDocument()

});

