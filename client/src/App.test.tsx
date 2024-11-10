import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchPage from './components/searchpage/SearchPage';

describe('SearchPage Component', () => {
  
  // Test that the component renders without crashing
  test('renders SearchPage component', () => {
    render(<SearchPage />);
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
  });

  // Test the popup visibility based on input value
  test('shows popup when search input has value and hides when empty', () => {
    render(<SearchPage />);
    const searchInput = screen.getByPlaceholderText('Search...');

    // Type in the search input to trigger the popup
    fireEvent.change(searchInput, { target: { value: 'Recipe' } });
    expect(screen.getByText('No Recipes Found!')).toBeInTheDocument();

    // Clear the search input to hide the popup
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.queryByText('No Recipes Found!')).not.toBeInTheDocument();
  });
});

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
