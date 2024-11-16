import React, { useState } from 'react';
import './SearchPage.css';

const SearchPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [historyItems, setHistoryItems] = useState<string[]>([
    'Example History Search 1'
  ]); // Start with an empty history list

  // Handle changes in the search input field
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    setDropdownVisible(event.target.value === ''); // Only show dropdown if the input is empty
  };

  // Clear the input when delete icon is clicked
  const handleClearInput = () => {
    setSearchInput('');
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
        <div className={`search-bar ${isDropdownVisible && historyItems.length > 0 ? 'expanded' : ''}`}
          style={{
            height: isDropdownVisible && historyItems.length > 0
              ? `${Math.min(20 + historyItems.length * 8, 80)}vh` // Increment height by 6vh per item up to max 60vh
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
            <img src='/images/searchIcon.svg'></img>
          </div>

          {/* Delete Icon - appears only when input is not empty */}
          {searchInput && (
            <div className="delete-icon" onClick={handleClearInput} data-testid="delete-icon">
              <img src='/images/closeIcon.svg'></img>
            </div>
          )}

          {/* Dropdown Menu for History Items */}
          {isDropdownVisible && (
            <div className="history-items">
              {historyItems.map((item, index) => (
                <div key={index} className="history-item">
                  <div onClick={() => handleDropdownItemClick(item)} className="history-item-content">
                    <img src='/images/historyArrow.svg' alt="Dropdown Icon" />
                    {item}
                </div>
                {/* Delete Button for each history item */}
                <button 
                  className="delete-history-item" 
                  onClick={() => handleDeleteHistoryItem(index)}
                >
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
          <span className="no-worries">No worries! Check out our quick recipes that'll have you cooking up a storm in </span> <span className="under-30">under 30 minutes.</span>
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

      {/* Pop-up Window */}
      {isPopUpVisible && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="94" height="99" viewBox="0 0 94 99" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M38.1081 16.9478C42.385 10.4458 51.6158 10.4458 55.8927 16.9478L57.5844 19.5197C68.183 35.6325 77.2891 52.7522 84.7806 70.6494L85.134 71.4935C87.774 77.8006 83.7854 84.9621 77.2072 85.726C57.1318 88.0574 36.8689 88.0574 16.7935 85.726C10.2153 84.9621 6.22674 77.8006 8.86679 71.4935L9.22013 70.6494C16.7117 52.7522 25.8178 35.6325 36.4164 19.5196L38.1081 16.9478ZM50.9171 37.3263C50.9171 39.5739 49.1636 41.396 47.0005 41.396C44.8373 41.396 43.0838 39.5739 43.0838 37.3263C43.0838 35.0787 44.8373 33.2566 47.0005 33.2566C49.1636 33.2566 50.9171 35.0787 50.9171 37.3263ZM47.0005 48.518C48.6228 48.518 49.938 49.8845 49.938 51.5703V71.9188C49.938 73.6045 48.6228 74.9711 47.0005 74.9711C45.3781 74.9711 44.063 73.6045 44.063 71.9188V51.5703C44.063 49.8845 45.3781 48.518 47.0005 48.518Z" fill="#FF0000"/>
            </svg>
            </div>
            <div className="error-message">
              <p>
                No Recipes Found!
              </p>
            </div>
            <div className="try-again-button">
              <button
                onClick={() => setPopUpVisible(false)} // Close pop-up
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;



