import React, { useState } from 'react';
import './SearchPage.css';

const SearchPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [historyItems, setHistoryItems] = useState<string[]>([]); // Start with an empty history list

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
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
            <g>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M56.0771 27.0386C56.0771 13.2101 44.867 2 31.0386 2C17.2101 2 6 13.2101 6 27.0386C6 40.867 17.2101 52.0771 31.0386 52.0771C37.26 52.0771 42.9514 49.8081 47.3304 46.0524L62.712 61.4359L62.9281 61.6224C63.6821 62.1818 64.7521 62.1197 65.4359 61.4359C66.188 60.6837 66.188 59.4642 65.4359 58.712L50.0524 43.3304C53.8081 38.9514 56.0771 33.26 56.0771 27.0386ZM9.85208 27.0383C9.85208 15.3373 19.3376 5.85181 31.0386 5.85181C42.7395 5.85181 52.225 15.3373 52.225 27.0383C52.225 38.7393 42.7395 48.2248 31.0386 48.2248C19.3376 48.2248 9.85208 38.7393 9.85208 27.0383Z" fill="#B3B3B3"/>
              <path d="M47.3304 46.0524L48.3912 44.9918L47.4087 44.0092L46.3539 44.9138L47.3304 46.0524ZM62.712 61.4359L61.6513 62.4965L61.6902 62.5354L61.7318 62.5713L62.712 61.4359ZM62.9281 61.6224L61.9479 62.7578L61.9898 62.794L62.0343 62.827L62.9281 61.6224ZM65.4359 58.712L66.4965 57.6514L66.4965 57.6513L65.4359 58.712ZM50.0524 43.3304L48.9138 42.3539L48.0092 43.4087L48.9918 44.3912L50.0524 43.3304ZM31.0386 3.5C44.0386 3.5 54.5771 14.0386 54.5771 27.0386H57.5771C57.5771 12.3817 45.6954 0.5 31.0386 0.5V3.5ZM7.5 27.0386C7.5 14.0386 18.0386 3.5 31.0386 3.5V0.5C16.3817 0.5 4.5 12.3817 4.5 27.0386H7.5ZM31.0386 50.5771C18.0386 50.5771 7.5 40.0386 7.5 27.0386H4.5C4.5 41.6954 16.3817 53.5771 31.0386 53.5771V50.5771ZM46.3539 44.9138C42.2365 48.4451 36.8884 50.5771 31.0386 50.5771V53.5771C37.6315 53.5771 43.6663 51.1711 48.307 47.191L46.3539 44.9138ZM63.7728 60.3753L48.3912 44.9918L46.2697 47.113L61.6513 62.4965L63.7728 60.3753ZM63.9083 60.4869L63.6922 60.3004L61.7318 62.5713L61.9479 62.7578L63.9083 60.4869ZM64.3752 60.3752C64.2249 60.5255 63.9876 60.5407 63.8219 60.4177L62.0343 62.827C63.3766 63.823 65.2793 63.7138 66.4965 62.4965L64.3752 60.3752ZM64.3752 59.7727C64.5416 59.9391 64.5416 60.2088 64.3752 60.3752L66.4965 62.4965C67.8345 61.1586 67.8345 58.9893 66.4965 57.6514L64.3752 59.7727ZM48.9918 44.3912L64.3753 59.7728L66.4965 57.6513L51.113 42.2697L48.9918 44.3912ZM54.5771 27.0386C54.5771 32.8884 52.4451 38.2365 48.9138 42.3539L51.191 44.307C55.1711 39.6663 57.5771 33.6315 57.5771 27.0386H54.5771ZM31.0386 4.35181C18.5092 4.35181 8.35208 14.5089 8.35208 27.0383H11.3521C11.3521 16.1657 20.166 7.35181 31.0386 7.35181V4.35181ZM53.725 27.0383C53.725 14.5089 43.568 4.35181 31.0386 4.35181V7.35181C41.9111 7.35181 50.725 16.1657 50.725 27.0383H53.725ZM31.0386 49.7248C43.568 49.7248 53.725 39.5677 53.725 27.0383H50.725C50.725 37.9108 41.9111 46.7248 31.0386 46.7248V49.7248ZM8.35208 27.0383C8.35208 39.5677 18.5092 49.7248 31.0386 49.7248V46.7248C20.166 46.7248 11.3521 37.9108 11.3521 27.0383H8.35208Z" fill="#B3B3B3"/>
            </g>
            </svg>
          </div>

          {/* Delete Icon - appears only when input is not empty */}
          {searchInput && (
            <div className="delete-icon" onClick={handleClearInput}>
              <svg width="20" height="20" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_160_1524)">
                  <path d="M69 32.5C69 50.4493 54.4493 65 36.5 65C18.5507 65 4 50.4493 4 32.5C4 14.5507 18.5507 0 36.5 0C54.4493 0 69 14.5507 69 32.5Z" fill="#B3B3B3"/>
                  <path d="M20.3447 48.7256L52.7502 16.2496" stroke="white" stroke-width="8" stroke-linecap="round"/>
                  <path d="M52.6553 48.75L20.2498 16.274" stroke="white" stroke-width="8" stroke-linecap="round"/>
                </g>
                <defs>
                  <filter id="filter0_d_160_1524" x="0" y="0" width="73" height="73" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_160_1524"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_160_1524" result="shape"/>
                  </filter>
                </defs>
              </svg>
            </div>
          )}

          {/* Dropdown Menu for History Items */}
          {isDropdownVisible && (
            <div className="history-items">
              {historyItems.map((item, index) => (
                <div key={index} className="history-item">
                  <div onClick={() => handleDropdownItemClick(item)} className="history-item-content">
                    <svg width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M49.2129 22L0.303406 43.6506L0.303406 0.349365L49.2129 22Z" fill="#B5B5B3"/>
                    </svg>
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

