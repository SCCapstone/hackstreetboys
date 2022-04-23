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
    test('renders recipes page', async () => {
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