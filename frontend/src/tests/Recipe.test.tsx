import { resolve } from "dns";
import AddGoal from "../pages/AddGoal";
import GoalsPage from "../pages/GoalsPage";
import React from 'react'
// app.test.js
import {getByText, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'

import '@testing-library/jest-dom'
import App from "../App"
import Recipes from "../pages/Recipes";
import axios from "axios";

describe('Recipe Renders', () => {
    test('renders recipe', async () => {
      render(<App/>);
      userEvent.click(screen.getByTestId("recipe-link"));
    //   expect(screen.getByText('Recipes')).toBeInTheDocument();
      expect(screen.getByText('Total Time')).toBeInTheDocument();
      expect(screen.getByText('Cost')).toBeInTheDocument();
    });
  });
  jest.mock('axios');

const tempData =       [
    {
      id: 1,
      title: 'Biscuits and Jam',
      author: 0,
      authorName: 'Quinn Biscuit',
      description: "What do you think? It's biscuits dummy.",
      body: "Well, here's the sauce.",
      imgSrc: '',
      totalTime: 55,
      prepTime: 15,
      cookTime: 40,
      yield: 10,
      estimatedCost: 69.42,
      alcoholic: false,
      type: 'food',
      tags: 'test,string',
      ingredientIds: '2929, 29292',
      rating: 4.2
    }
  ];

test('individual recipe view', () => {

  render(<App />);
  userEvent.click(screen.getByTestId("recipe-link"));
  userEvent.click(screen.getByText(/rating:/i));

  expect(screen.getByText(/instructions/i)).toBeInTheDocument();
  expect(screen.getByText(/report this recipe/i)).toBeInTheDocument();

});

test('guest add recipe review redirect', () => {

  render(<App />);

  userEvent.click(screen.getByTestId("recipe-link"));
  userEvent.click(screen.getByText(/rating:/i));
  userEvent.click(screen.getByTestId("new-recipe"));

  expect(screen.getByText(/login/i)).toBeInTheDocument();

});

test('guest view recipe review', () => {

  render(<App />);

  userEvent.click(screen.getByTestId("recipe-link"));
  userEvent.click(screen.getByText(/rating:/i));
  userEvent.click(screen.getByText(/view more/i));

  expect(screen.getByText(/return to recipes/i)).toBeInTheDocument();

});

test('guest report recipe redirect', () => {

  render(<App />);

  userEvent.click(screen.getByTestId("recipe-link"));
  userEvent.click(screen.getByText(/rating:/i));
  userEvent.click(screen.getByText(/report this recipe/i));

  expect(screen.getByText(/login/i)).toBeInTheDocument();

});


test('guest favorite recipe redirect', () => {

  render(<App />);

  userEvent.click(screen.getByTestId("recipe-link"));
  userEvent.click(screen.getByText(/rating:/i));

  expect(screen.getByText(/report this/i)).toBeInTheDocument();

  userEvent.click(screen.getByTestId("add-favorite"));

  expect(screen.getByText(/register for/i)).toBeInTheDocument();

});
