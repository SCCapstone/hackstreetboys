
import {
    IonApp,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonLabel,
    IonPage,
    IonRow,
  } from '@ionic/react';
import { Link, Router, Switch } from "react-router-dom";
import userEvent from '@testing-library/user-event'
import history from '../History';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { useContext, useEffect, useState } from 'react';
import Context from '../components/Context';
import React from 'react';
import { Recipe } from '../models/Recipe';
import { Goal } from '../models/Goal';
import { Favorite } from '../models/Favorite';
import RecipeBanner from '../assets/fridger_banner.png'

import { render, screen, waitFor } from '@testing-library/react';
import App from '../App.tsx'

describe('Homepage', () => {
  test('it renders', () => {
    render(<App />);
    expect(screen.getByText('Welcome to Fridger!')).toBeInTheDocument();
  });
  test('loading recipe', () => {
    render(<App />);
    expect(screen.getByTestId("latest-recipe-title")).toBeInTheDocument();
    expect(screen.getByTestId("latest-recipe-title")).toHaveTextContent("Loading...");
  });
  test('loading goals', () => {
    render(<App />);
    expect(screen.getByTestId("goal-link")).toBeInTheDocument();
    expect(screen.getByTestId("goal-link")).toHaveTextContent("Login to see your goals!");
  });
  test('loading favorites', () => {
    render(<App />);
    expect(screen.getByTestId("favorite-link")).toBeInTheDocument();
    expect(screen.getByTestId("favorite-link")).toHaveTextContent("Login to see your favorites!");
  });
  test('latest recipe card click', async () => {
    render(<App/>);
    userEvent.click(screen.getByTestId("latest-recipe-author"));
  });
});

  

