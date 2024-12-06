import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import SearchPage from '../components/searchpage/SearchPage';
import RecommendationSearch from '../components/searchpage/RecSearch';
import ResultsPage from '../components/results/ResultsPage';
import { FilterProvider } from '../context/FilterContext';
import {
  addSearchHistory,
  fetchSearchHistory,
  deleteSearchHistory,
} from '../utils/history-utils';
import { fetchDisplayedRecipes } from '../utils/displayedRecipes-utils';

// Mocking utility functions
jest.mock('../utils/history-utils', () => ({
  addSearchHistory: jest.fn(),
  fetchSearchHistory: jest.fn(),
  deleteSearchHistory: jest.fn(),
}));

jest.mock('../utils/displayedRecipes-utils', () => ({
  fetchDisplayedRecipes: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockRecipes = [
  { id: 1, title: 'Pizza', ingredients: [], time: '30 mins' },
  { id: 2, title: 'Burger', ingredients: [], time: '15 mins' },
];

beforeEach(() => {
  global.fetch = jest.fn() as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('SearchPage, RecSearch, ResultsPage, and history-utils Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper for rendering SearchPage with providers
  const renderSearchPage = () =>
    render(
      <MemoryRouter>
        <FilterProvider>
          <SearchPage />
        </FilterProvider>
      </MemoryRouter>
    );

  // Tests for SearchPage.tsx
  describe('SearchPage Component', () => {
    test('renders SearchPage component', () => {
      renderSearchPage();
      const searchInput = screen.getByPlaceholderText('Search...');
      expect(searchInput).toBeInTheDocument();
    });

    test('handles input change and shows dropdown', () => {
      renderSearchPage();

      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.change(searchInput, { target: { value: 'pizza' } });

      expect(searchInput).toHaveValue('pizza');
    });

    test('fetches and displays history items', async () => {
      (fetchSearchHistory as jest.Mock).mockResolvedValue(['pizza', 'pasta']);
    
      renderSearchPage();
    
      // Simulate clicking the search bar to trigger dropdown visibility
      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.click(searchInput);
    
      // Wait for the history items to render
      await waitFor(() => {
        const historyItems = screen.getAllByText((content, element) => {
          return element?.textContent === 'pizza' || element?.textContent === 'pasta';
        });
        expect(historyItems).toHaveLength(2); // Expect both items to render
      });
    });
    
    

    test('adds a search input to history on Enter key press', async () => {
      (fetchSearchHistory as jest.Mock).mockResolvedValue(['pizza']);
      (addSearchHistory as jest.Mock).mockResolvedValue(undefined); // Mock successful addition
    
      renderSearchPage();
    
      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.change(searchInput, { target: { value: 'burger' } });
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    
      // Wait for the history update to reflect
      await waitFor(() => {
        expect(addSearchHistory).toHaveBeenCalledWith('burger');
        const updatedHistory = screen.getByText('pizza');
        expect(updatedHistory).toBeInTheDocument();
      });
    });
    

    test('deletes a history item', async () => {
      (fetchSearchHistory as jest.Mock).mockResolvedValue(['pizza', 'pasta']);
      (deleteSearchHistory as jest.Mock).mockResolvedValue(undefined); // Mock successful deletion
    
      renderSearchPage();
    
      // Simulate clicking the search bar to trigger dropdown visibility
      const searchInput = screen.getByPlaceholderText('Search...');
      fireEvent.click(searchInput);
    
      // Wait for history items to render
      await waitFor(() => {
        // Narrow down to delete buttons using class
        const deleteButtons = screen.getAllByRole('button', {
          name: /x/i,
        }).filter((btn) => btn.classList.contains('delete-history-item'));
    
        // Ensure only the delete buttons are selected
        expect(deleteButtons).toHaveLength(2);
    
        // Simulate clicking the first delete button
        fireEvent.click(deleteButtons[0]);
    
        // Verify that deleteSearchHistory is called with the correct item
        expect(deleteSearchHistory).toHaveBeenCalledWith('pizza');
      });
    });
    
    test('displays no recipes pop-up when navigated with noMatchesFound: true', () => {
      render(
        <MemoryRouter initialEntries={[{ pathname: '/home/search', state: { noMatchesFound: true } }]}>
          <FilterProvider> {/* Wrap SearchPage with FilterProvider */}
            <SearchPage />
          </FilterProvider>
        </MemoryRouter>
      );
    
      const popupMessage = screen.getByText('No Recipes Found!');
      expect(popupMessage).toBeInTheDocument();
    });
  });

  // Tests for RecSearch.tsx
  describe('RecSearch Component', () => {
    const database = ['pizza', 'burger', 'pasta'];
    const navigateMock = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      const { useNavigate } = jest.requireMock('react-router-dom'); // Access the mocked useNavigate
      useNavigate.mockReturnValue(navigateMock); // Return the mock implementation
    });

    test('renders recommendations based on input', () => {
      render(
        <MemoryRouter>
          <RecommendationSearch
            searchInput="pizza"
            database={database}
            onRecommendationCount={() => {}}
          />
        </MemoryRouter>
      );

      expect(screen.getByText('pizza')).toBeInTheDocument();
    });

    test('calls addSearchHistory when recommendation is clicked', async () => {
      render(
        <RecommendationSearch
          searchInput="pizza"
          database={database}
          onRecommendationCount={() => {}}
        />
      );
  
      fireEvent.click(screen.getByText('pizza')); // Simulate clicking on a recommendation
  
      await waitFor(() => {
        expect(addSearchHistory).toHaveBeenCalledWith('pizza'); // Ensure history is updated
        expect(navigateMock).toHaveBeenCalledWith('/home/results', { state: { searchQuery: 'pizza' } }); // Ensure navigation
      });
    });
  });

  // Tests for ResultsPage.tsx
  describe('ResultsPage Component', () => {
    const navigateMock = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      const { useNavigate } = jest.requireMock('react-router-dom'); // Access mocked useNavigate
      useNavigate.mockReturnValue(navigateMock); // Assign navigateMock
    });
    
    test('renders sorted recipes', async () => {
      (fetchDisplayedRecipes as jest.Mock).mockResolvedValue(mockRecipes);

      render(
        <MemoryRouter>
          <ResultsPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Pizza')).toBeInTheDocument();
        expect(screen.getByText('Burger')).toBeInTheDocument();
      });
    });

    test('navigates back to search when no recipes match', async () => {
      (fetchDisplayedRecipes as jest.Mock).mockResolvedValue([]); // Mock no matching recipes
  
      render(
        <MemoryRouter>
          <ResultsPage />
        </MemoryRouter>
      );
  
      await waitFor(() => {
        expect(navigateMock).toHaveBeenCalledWith('/home/search', { state: { noMatchesFound: true } });
      });
    });
  });
});
