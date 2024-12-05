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

  // // Test that clearing the input shows the dropdown again
  // test('shows dropdown when input is cleared', () => {
  //   render(
  //     <MemoryRouter>
  //       <SearchPage />
  //     </MemoryRouter>
  //   );
  //   const searchInput = screen.getByPlaceholderText('Search...');

  //   // Type into the search input to populate it
  //   fireEvent.change(searchInput, { target: { value: 'Test search' } });

  //   // Select the delete icon using a CSS selector
  //   const deleteIcon = screen.getByTestId('delete-icon'); // Ensure that the delete icon in SearchPage.tsx has data-testid="delete-icon"
  //   fireEvent.click(deleteIcon);

  //   // Check if the dropdown is now visible
  //   const dropdown = screen.getByText('Example History Search 1');
  //   expect(dropdown).toBeVisible();
  // });

  // Test adding a new history item on Enter key press
  test('adds new history item on Enter key press', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    
    // Type a new search term
    fireEvent.change(searchInput, { target: { value: 'New Search Term' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    
    // Open the dropdown to display updated history items
    fireEvent.click(searchInput);
    
    // Check that the new history item is now in the dropdown list
    const newHistoryItem = screen.getByText((content, element) => 
      element?.textContent === 'New Search Term'
    );
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
    fireEvent.click(searchInput); // Open the dropdown to display history items

    // Check that 'Example History Search 1' is initially present
    const historyItem = screen.getByText('Example History Search 1');
    expect(historyItem).toBeInTheDocument();

    // Find the delete button next to the history item and click it
    const deleteButton = screen.getAllByRole('button', { name: /x/i })[0];
    fireEvent.click(deleteButton);

    // Verify that 'Example History Search 1' is no longer present
    expect(screen.queryByText('Example History Search 1')).not.toBeInTheDocument();
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

   // Test that the blur effect works on the search input
   test('blur effect on input', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    
    // Simulate a focus and blur event
    fireEvent.focus(searchInput);
    fireEvent.blur(searchInput);

    // Check if the blur effect is applied correctly (you can verify this by checking a CSS class or style)
    expect(searchInput).toBeVisible();
  });

  test('shows dropdown when input is cleared', () => {
    // Render the SearchPage component
    render(<SearchPage />);
  
    // Find the input field and type text into it
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Test search' } });
  
    // Simulate clearing the input by clicking the delete icon
    const deleteIcon = screen.getByTestId('delete-icon');
    fireEvent.click(deleteIcon);
  
    // Assert that the input is cleared
    expect(input).toHaveValue('');
  
    // Assert that the dropdown becomes visible
    const dropdown = screen.getByTestId('history-items'); // Adjust if a different role is used
    expect(dropdown).toBeVisible();
  });
  

});







