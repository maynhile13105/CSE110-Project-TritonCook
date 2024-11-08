import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipeList from './components/recipes/RecipeList';

// Currently testing dummy data for frontend
test('renders news feed', () => {
  render(<RecipeList />);
  
  const username = screen.getAllByText("Username");
  expect(username[0]).toBeInTheDocument();

  const item1 = screen.getByText('Instant Ramen');
  expect(item1).toBeInTheDocument();

  const item2 = screen.getByText('Frozen Pizza');
  expect(item2).toBeInTheDocument();

  const item3 = screen.getByText('Spaghetti and meatballs');
  expect(item3).toBeInTheDocument();
});
