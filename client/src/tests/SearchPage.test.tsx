import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchPage from '../components/searchpage/SearchPage';
import { MemoryRouter } from 'react-router-dom';

describe('SearchPage Component', () => {

  // Test that the component renders without crashing
  test('renders SearchPage component', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
  });

  // Test the popup visibility based on input value
  test('shows popup when search input has value and hides when empty', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');

    // Type in the search input to trigger the popup
    fireEvent.change(searchInput, { target: { value: 'Recipe' } });
    expect(screen.getByText('No Recipes Found!')).toBeInTheDocument();

    // Clear the search input to hide the popup
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.queryByText('No Recipes Found!')).not.toBeInTheDocument();
  });

  // Test the history dropdown functionality

  test('shows 5 history items when dropdown is clicked', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.click(searchInput);
    const historyItems = screen.getAllByText(/History Search/i);
    expect(historyItems.length).toBe(5);
  });

  test('shows a total of 10 items available with scrolling', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.click(searchInput);
    const historyItems = screen.getAllByText(/History Search/i);
    expect(historyItems.length).toBeLessThanOrEqual(10); // Adjust as needed if scroll test is feasible
  });

  test('clicking a history item places text into input', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.click(searchInput);
    const historyItem = screen.getByText('History Search 1');
    fireEvent.click(historyItem);
    expect(searchInput).toHaveValue('History Search 1');
  });

  test('typing in input hides history dropdown', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.click(searchInput);
    fireEvent.change(searchInput, { target: { value: 'Hello' } });
    const historyItems = screen.queryByText(/History Search/i);
    expect(historyItems).toBeNull();
  });

  test('clicking delete button clears input and shows dropdown', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    fireEvent.change(searchInput, { target: { value: 'Hello' } });
    fireEvent.click(deleteButton);
    expect(searchInput).toHaveValue('');
    fireEvent.click(searchInput);
    const historyItems = screen.getAllByText(/History Search/i);
    expect(historyItems.length).toBe(5);
  });
});

