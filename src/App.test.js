import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders context', () => {
  render(<App />);
  const textElement = screen.getByText(/A better way to enjoy every day/i);
  expect(textElement).toBeInTheDocument();
  const buttonElement = screen.getByText(/Request an invite/i);
  expect(buttonElement).toBeInTheDocument();
});