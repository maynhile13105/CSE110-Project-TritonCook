import React, { useState } from 'react';
import './SearchPage.css';

const SearchPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [historyItems, setHistoryItems] = useState<string[]>([
    'Example History Search 1',
  ]); // Start with an empty history list

  // Handle changes in the search input field
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    setDropdownVisible(event.target.value === ''); // Only show dropdown if the input is empty
  };

  // Clear the input when delete icon is clicked
  const handleClearInput = () => {
    setSearchInput('')
    setDropdownVisible(true); // Optionally show dropdown again when cleared
  };

  // Show dropdown when the search bar is clicked
  const handleSearchClick = () => {
    setDropdownVisible(true);
  };

  // Set clicked history item as the search input and hide dropdown
  const handleDropdownItemClick = (item: string) => {
    setSearchInput(item);
    setDropdownVisible(false);
  };

  // Handle Enter key to show pop-up
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchInput.trim() !== '') {
      setHistoryItems(prevItems => {
        // Check if the input already exists in the history
        const existingIndex = prevItems.indexOf(searchInput);
        // If it exists, remove it first to prevent duplication
        let updatedItems = existingIndex !== -1
          ? prevItems.filter(item => item !== searchInput)
          : prevItems;
        // Add the new search term to the top of the list
        updatedItems = [searchInput, ...updatedItems];
        // Limit the list to the latest 10 items
        return updatedItems.slice(0, 10);
      });
      setSearchInput('');
      setPopUpVisible(true); // Show the pop-up
      setDropdownVisible(false); // Hide dropdown if visible
    }
  };

  // Delete a history item by index
  const handleDeleteHistoryItem = (index: number) => {
    setHistoryItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className="search-page">
      {/* Wrapper for content that should be blurred */}
      <div className={isPopUpVisible ? 'blurred' : ''}>
        <div
          className={`search-bar ${
            isDropdownVisible && historyItems.length > 0 ? 'expanded' : ''
          }`}
          style={{
            height:
              isDropdownVisible && historyItems.length > 0
                ? `${Math.min(20 + historyItems.length * 8, 80)}vh`
                : '13vh', // Initial height
          }}
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
  
          {/* Delete Icon - appears only when input is not empty */}
          {searchInput && (
            <div className="delete-icon" onClick={handleClearInput}>
              <img src="/images/closeIcon.svg" alt="Clear Input" />
            </div>
          )}
  
          {/* Dropdown Menu for History Items */}
          {isDropdownVisible && (
            <div className="history-items">
              {historyItems.map((item, index) => (
                <div key={index} className="history-item">
                  <div onClick={() => handleDropdownItemClick(item)} className="history-item-content">
                    <img src="images/historyArrow.svg" alt="Arrow" />
                    {item}
                  </div>
                  {/* Delete Button for each history item */}
                  <button className="delete-history-item" onClick={() => handleDeleteHistoryItem(index)}>
                    x
                  </button>
                </div>
              ))}
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
