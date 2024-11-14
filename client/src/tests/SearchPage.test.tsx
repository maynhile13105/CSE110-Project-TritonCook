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

  // Test that the dropdown shows up when the input is clicked
  test('shows dropdown when input is clicked', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.click(searchInput);
    const dropdown = screen.getByText('Example History Search 1');
    expect(dropdown).toBeVisible();
  });

  // Test that clearing the input shows the dropdown again
  test('shows dropdown when input is cleared', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Test search' } });
    const deleteIcon = screen.getByRole('button', { name: /delete-icon/i });
    fireEvent.click(deleteIcon);
    const dropdown = screen.getByText('Example History Search 1');
    expect(dropdown).toBeVisible();
  });

  // Test adding a new history item on Enter key press
  test('adds new history item on Enter key press', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'New Search Term' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    const newHistoryItem = screen.getByText('New Search Term');
    expect(newHistoryItem).toBeInTheDocument();
  });

  // Test that clicking a dropdown item populates the search input
  test('populates input when dropdown item is clicked', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.click(searchInput);
    const dropdownItem = screen.getByText('Example History Search 1');
    fireEvent.click(dropdownItem);
    expect(searchInput).toHaveValue('Example History Search 1');
  });

  // Test that the "No Recipes Found" pop-up appears when Enter is pressed with input
  test('shows pop-up on Enter key with input', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Recipe Search' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    const popup = screen.getByText('No Recipes Found!');
    expect(popup).toBeVisible();
  });

  // Test that deleting a history item removes it from the list
  test('deletes history item when delete button is clicked', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Delete Test' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    const historyItem = screen.getByText('Delete Test');
    expect(historyItem).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /delete-history-item/i });
    fireEvent.click(deleteButton);
    expect(historyItem).not.toBeInTheDocument();
  });

  // Test that the try-again button in the pop-up closes the pop-up
  test('closes pop-up when try-again button is clicked', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Recipe Search' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    const tryAgainButton = screen.getByText('Try again');
    fireEvent.click(tryAgainButton);
    const popup = screen.queryByText('No Recipes Found!');
    expect(popup).not.toBeInTheDocument();
  });
});



