import React from 'react'

import { render, screen } from '@testing-library/react'
// import { ionFireEvent } from "@ionic/react-test-utils";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { useState } from 'react'
import App from "../App"
import { Recipe } from '../models/Recipe'

// Tests the navigation from the home page through to the login page,
// and then tries to log in with insufficient credentials.
test('favorite', () => {
    render(<App />);

    const [recipe, setRecipe] = React.useState<Recipe>({
        id: 23,
        title: "Eggs",
        author: 9,
        authorName: "cboo",
        description: "eggs are eggs",
        body: "more eggs",
        imgSrc: "",
        totalTime: 23,
        prepTime: 3,
        cookTime: 20,
        yield: 34,
        estimatedCost: 6,
        alcoholic: false,
        type: "American",
        tags: "1",
        ingredientIds: "1",
        rating: 3,
      });
    // Clicks through
    userEvent.click(screen.getByText("Eggs"));

    // Clicks through
    userEvent.click(screen.getByPlaceholderText("heart"));

    // Clicks through to login with unsatisfactory credentials
    userEvent.click(screen.getByText("Log In"));

    // console.log(screen.getAllByText(/log in/i))

    // Checks for the login label at the top of the expected screen
    expect(screen.getByText("Login")).toBeInTheDocument()

});