import React, { useState, useEffect, useRef } from 'react';
import './SearchPage.css';
import RecommendationSearch from './RecSearch';
import { fetchDisplayedRecipes } from "../../utils/displayedRecipes-utils"; // Import the function here
import { useNavigate, useLocation } from 'react-router-dom';
import { addSearchHistory, fetchSearchHistory, deleteSearchHistory } from "../../utils/history-utils";
import { useFilterContext } from "../../context/FilterContext";



const SearchPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [recommendationCount, setRecommendationCount] = useState(0);
  const [historyItems, setHistoryItems] = useState<string[]>([]);
  const [database, setDatabase] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedTime, setAppliedFilters } = useFilterContext();
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const exploreButtonRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log("useEffect triggered");
    const loadHistory = async () => {
      try {
        const history = await fetchSearchHistory();
        setHistoryItems(history); // Update state with fetched history
      } catch (error) {
        console.error("Error fetching search history:", error);
      }
    };
  
    loadHistory();
  }, []);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchDisplayedRecipes();
        setDatabase(fetchedRecipes.map((recipe) => recipe.title)); // Extract titles for the database
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    loadRecipes();
  }, []);

  useEffect(() => {
    if (location.state?.noMatchesFound) {
      setPopUpVisible(true); // Show the pop-up if no matches found
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node) && // Not in search bar
        exploreButtonRef.current &&
        !exploreButtonRef.current.contains(event.target as Node) // Not in explore button
      ) {
        setDropdownVisible(false); // Hide dropdown if clicked outside both
      }
    };
  
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
  
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  

  // Handle changes in the search input field
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchInput(input);

    // Ensure the dropdown remains visible as long as there is input
    if (input.trim()) {
      setDropdownVisible(true);
    } else if (historyItems.length > 0) {
      setDropdownVisible(true); // Show dropdown if history items exist
    } else {
      setDropdownVisible(false); // Hide dropdown only if no history items
    }
  }

  // Clear the input when delete icon is clicked
  const handleClearInput = () => {
    setSearchInput('');
    setDropdownVisible(true); // Optionally show dropdown again when cleared
  };

  // Show dropdown when the search bar is clicked
  const handleSearchClick = async () => {
    try {
      const history = await fetchSearchHistory(); // Fetch the latest history
      setHistoryItems(history); // Update state with the latest history
      if (history.length > 0) {
        setDropdownVisible(true); // Show the dropdown if history items exist
      } else {
        setDropdownVisible(false); // Hide the dropdown if no history items
      }
    } catch (error) {
      console.error("Error fetching search history:", error);
    }
  };
  
  
  // Inside handleKeyDown in SearchPage.tsx
  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput.trim() !== "") {
      const queryWords = searchInput.toLowerCase().split(/\s+/);

      const matches = database.filter((recipe) => {
        const recipeWords = recipe.toLowerCase().split(/\s+/);
        return queryWords.some((word) => recipeWords.includes(word));
      });

      if (matches.length === 0) {
        setPopUpVisible(true);
        setDropdownVisible(false);
      } else {
        navigate("/home/results", { state: { searchQuery: searchInput } });
      }

      try {
        await addSearchHistory(searchInput);
        const updatedHistory = await fetchSearchHistory();
        setHistoryItems(updatedHistory);
        setDropdownVisible(true);
      } catch (error) {
        console.error("Error saving search history:", error);
      }

      setSearchInput("");
    }
  };

  const handleHistoryItemClick = async (item: string) => {
    try {
      await addSearchHistory(item); // Save clicked item to the backend
      const updatedHistory = await fetchSearchHistory(); // Fetch the updated history
      setHistoryItems(updatedHistory); // Update the dropdown
    } catch (error) {
      console.error("Error saving search history:", error);
    }
    setSearchInput(item); // Set the clicked item in the input field
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
    setDropdownVisible(false); // Hide the dropdown
  };
  

  // Delete a history item by index
  const handleDeleteHistoryItem = async (index: number) => {
    const itemToDelete = historyItems[index]; // Find the item to delete
  
    try {
      await deleteSearchHistory(itemToDelete); // Call the backend to delete the history item
      console.log("Deleted item:", itemToDelete);
      setHistoryItems((prevItems) => {
        const updatedItems = prevItems.filter((_, i) => i !== index); // Remove the item from local state
        if (updatedItems.length === 0) {
          setDropdownVisible(false); // Hide dropdown when no history items remain
        }
        return updatedItems;
      });
    } catch (error) {
      console.error("Error deleting search history:", error);
    }
  };

  const handleExploreButtonClick = async () => {
    // Update the filter states
    setSelectedTime("<30 minutes");
    setAppliedFilters({
      ingredients: [],
      time: "<30 minutes",
      cuisine: null,
    });
  
    // Navigate to /home with instructions to trigger UI behavior
    navigate("/home", { state: { sortByLikes: true, showDropdown: true } });
  };

  // Calculate dynamic dropdown height
  const dropdownHeight = `${searchInput ? 
    Math.min(16 + recommendationCount * 7, 100) : // Use recommendationCount here
    Math.min(17 + Math.min(historyItems.length, 5) * 7, 100)   // For history search
  }vh`;
  
  if (isDropdownVisible) {
    console.log("History items:", historyItems); // Move the log outside the JSX
  }
  
  return (
    <div className="search-page">
      {/* Wrapper for content that should be blurred */}
      <div className={isPopUpVisible ? 'blurred' : ''} id="wrapper">
        <div
          className={`search-bar ${isDropdownVisible ? 'expanded' : ''}`}
          style={{ height: dropdownHeight }} 
          ref={searchBarRef}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchChange}
            onClick={handleSearchClick}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <div className="search-separator"></div>
          <div className="search-icon">
            <img src="/images/searchIcon.svg" alt="Search Icon" />
          </div>

          {/* Dropdown Menu for History or Recommendation Items */}
          {isDropdownVisible && (
            <div className="history-items">
              {searchInput ? (
                /* Show recommendation items when there's input */
                <RecommendationSearch
                  searchInput={searchInput}
                  database={database}
                  onRecommendationCount={(count: number) => setRecommendationCount(count)}
                />
              ) : (
                /* Show history items when input is empty */
                historyItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="history-item"
                    onClick={() => handleHistoryItemClick(item)}
                  >
                    <div className="history-item-content">
                      <img src="/images/historyArrow.svg" alt="Arrow" />
                      {item}
                    </div>
                    <button
                      className="delete-history-item"
                      onClick={(event) => {
                        event.stopPropagation(); // Prevent parent click event
                        handleDeleteHistoryItem(index); // Call delete handler
                      }}
                    >
                      x
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Delete Icon - appears only when input is not empty */}
          {searchInput && (
            <div className="delete-icon" onClick={handleClearInput}>
              <img src="/images/delete-icon.svg" alt="Clear Input" />
            </div>
          )}
        </div>

        <div className="info-text">
          <p>
            Busy today?<br />
            <span className="no-worries">
              No worries! Check out our quick recipes that'll have you cooking up a storm in{' '}
            </span>
            <span className="under-30">under 30 minutes.</span>
          </p>
          <div className="explore-button-container">
            <button 
              className="explore-button" 
              onClick={handleExploreButtonClick}
              ref={exploreButtonRef}
            >
              <span className="explore-text">EXPLORE</span>
              <div className="arrow">
                <div className="line-8"></div>
                <div className="line-9"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Pop-up Window */}
      {isPopUpVisible && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-icon">
              <img src="/images/warning.svg" alt="Warning" />
            </div>
            <div className="error-message">
              <p>No Recipes Found!</p>
            </div>
            <div className="try-again-button">
              <button onClick={() => setPopUpVisible(false)}>Try again</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;



