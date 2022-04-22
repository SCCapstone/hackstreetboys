import { resolve } from "dns";
import React from 'react'
// app.test.js
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from "../App"

// app.test.js
test('menu bar naviagting', () => {
    render(<App />)
  
    const menu = {button: 0}
    userEvent.click(screen.getByTestId('hamburgermenu'), menu)
    expect(screen.getByText(/Navigate/i)).toBeInTheDocument()

  })

  test('dashboard rendering by menu', () => {
    render(<App />)
    //expect(screen.getByText(/You are on the home page/i)).toBeInTheDocument()

    const dash = {button: 0}
    userEvent.click(screen.getByTestId('menuGoals'), dash)
    expect(screen.getByText(/LOGIN/i)).toBeInTheDocument()
  
})
  

test('pantry rendering by menu', () => {
    render(<App />)
    //expect(screen.getByText(/You are on the home page/i)).toBeInTheDocument()

    const pan = {button: 0}
    userEvent.click(screen.getByTestId('menuPan'), pan)
    expect(screen.getByText(/LOGIN/i)).toBeInTheDocument()
  
})

test('favs rendering by menu', () => {
    render(<App />)
    //expect(screen.getByText(/You are on the home page/i)).toBeInTheDocument()

    const fav = {button: 0}
    userEvent.click(screen.getByTestId('menuFavs'), fav)
    expect(screen.getByText(/LOGIN/i)).toBeInTheDocument()
  
})

test('ings rendering by menu', () => {
    render(<App />)
    //expect(screen.getByText(/You are on the home page/i)).toBeInTheDocument()

    const ing = {button: 0}
    userEvent.click(screen.getByTestId('menuIng'), ing)
    expect(screen.getByTestId('ingsTitle')).toBeInTheDocument()
  
})

test('home rendering by menu', () => {
    render(<App />)
    //expect(screen.getByText(/You are on the home page/i)).toBeInTheDocument()

    const home = {button: 0}
    userEvent.click(screen.getByTestId('menuHome'), home)
    expect(screen.getByText(/Latest Recipes/i)).toBeInTheDocument()
  
})
  

test('recipe rendering by menu', () => {
    render(<App />)
    //expect(screen.getByText(/You are on the home page/i)).toBeInTheDocument()

    const recipe = {button: 0}
    userEvent.click(screen.getByTestId('recipe-link'), recipe)
    expect(screen.getByTestId('recipesTitle')).toBeInTheDocument()

  
})