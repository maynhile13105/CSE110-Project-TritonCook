import React from 'react';
import './SearchDropdown.css';

interface SearchDropdownProps {
  searchHistory: string[];
  onClose: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ searchHistory, onClose }) => {
  return (
    <div className="search-dropdown">
      <div className="dropdown-close" onClick={onClose}>×</div>
      <ul className="dropdown-list">
        {searchHistory.map((item, index) => (
          <li key={index} className="dropdown-item">
            <span className="dropdown-icon">▶</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDropdown;
