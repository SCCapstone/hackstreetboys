import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('Application', () => {
  test('renders', () => {
    render(<App />);
  });
});