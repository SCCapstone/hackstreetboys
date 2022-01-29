import { resolve } from "dns";
import AddGoal from "../pages/AddGoal";
import GoalsPage from "../pages/GoalsPage";
import React from 'react'
// app.test.js
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'

import '@testing-library/jest-dom'
import App from "../App"

// app.test.js
test('full app rendering/navigating', () => {
    render(<App />)
    expect(screen.getByText(/You are on the home page/i)).toBeInTheDocument()
  
    const register = {button: 0}
    userEvent.click(screen.getByText(/Register/i), register)
  
    expect(screen.getByText(/register for a new account/i)).toBeInTheDocument()
  })
  
  