import React, { useState } from 'react';
import './SearchPage.css';
import RecommendationSearch from './RecommendationSearch';

const SearchPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [recommendationCount, setRecommendationCount] = useState(0);
  const [historyItems, setHistoryItems] = useState<string[]>([
    'Example History Search 1',
  ]);
  const database = [
    'Mac and cheese',
    'Quick recipes',
    'Easy dinner ideas',
    'Baked pasta',
    'Cheesy lasagna',
    'Creamy chicken soup',
    'Healthy salads',
    'Vegetarian dishes',
  ];
  

  // Handle changes in the search input field
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchInput(input);
  
    // Show dropdown only if there are matching recommendations or history
    if (
      input.trim() !== "" &&
      database.some((item) => item.toLowerCase().includes(input.toLowerCase()))
    ) {
      setDropdownVisible(true);
    } else if (input.trim() === "" && historyItems.length > 0) {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false); // Hide dropdown when no match or input
    }
  };

  // Clear the input when delete icon is clicked
  const handleClearInput = () => {
    setSearchInput('');
    setDropdownVisible(true); // Optionally show dropdown again when cleared
  };

  // Show dropdown when the search bar is clicked
  const handleSearchClick = () => {
    if (historyItems.length > 0 || searchInput.trim() !== "") {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false); // Ensure dropdown is hidden
    }
  };

  // Handle Enter key to show pop-up
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchInput.trim() !== '') {
      setHistoryItems((prevItems) => {
        const existingIndex = prevItems.indexOf(searchInput);
        let updatedItems = existingIndex !== -1
          ? prevItems.filter((item) => item !== searchInput)
          : prevItems;
        updatedItems = [searchInput, ...updatedItems];
        return updatedItems.slice(0, 10);
      });
      setSearchInput('');
      setPopUpVisible(true);
      setDropdownVisible(false);
    }
  };

  // Delete a history item by index
  const handleDeleteHistoryItem = (index: number) => {
    setHistoryItems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index);
      if (updatedItems.length === 0) {
        setDropdownVisible(false); // Hide dropdown when no history items remain
      }
      return updatedItems;
    });
  };

  // Calculate dynamic dropdown height
  const dropdownHeight = `${searchInput ? 
    Math.min(14 + recommendationCount * 7.5, 50) : // Use recommendationCount here
    Math.min(15 + Math.min(historyItems.length, 5) * 7.5, 50)   // For history search
  }vh`;
  
  
  
  return (
    <div className="search-page">
      {/* Wrapper for content that should be blurred */}
      <div className={isPopUpVisible ? 'blurred' : ''}>
        <div
          className={`search-bar ${isDropdownVisible ? 'expanded' : ''}`}
          style={{ height: dropdownHeight }} 
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchChange}
            onClick={handleSearchClick}
            onKeyDown={handleKeyDown}
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
                  onRecommendationCount={(count) => setRecommendationCount(count)}
                />
              ) : (
                /* Show history items when input is empty */
                historyItems.map((item, index) => (
                  <div key={index} className="history-item">
                    <div
                      onClick={() => {
                        setSearchInput(item);
                        setDropdownVisible(false);
                      }}
                      className="history-item-content"
                    >
                      <img src="/images/historyArrow.svg" alt="Arrow" />
                      {item}
                    </div>
                    <button
                      className="delete-history-item"
                      onClick={() => handleDeleteHistoryItem(index)}
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
              <img src="/images/closeIcon.svg" alt="Clear Input" />
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
            <button className="explore-button">
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
