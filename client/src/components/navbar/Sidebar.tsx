import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {
  const[dropdown, setDropdown] = useState(false);
  const[timePopup, setTimePopup] = useState(false);
  const[selectedTime, setSelectedTime] = useState<string | null>(null);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const toggleTimePopup = () => {
    setTimePopup(!timePopup);
  };

  const handleSelectedTime =(time : string) => {
    setSelectedTime(time);
    setTimePopup(!timePopup);
  };

  const removeSelectedTime = () => {
    setSelectedTime(null);
  }

  return (
    <div>
      <div className='sidebar-container' role='button'>
        <div className='mainbuttons-container'>
        <div className='profilebutton'><Link to="#"><img id="profile-icon" src='images/profile.svg' />Profile</Link></div>
        <div className='favoritebutton'><Link to="#"><img id="saved-icon" src='images/favorite.svg' />Favorites</Link></div>
        <div className='friendsbutton'><Link to="#"><img id="friends-icon" src='images/friends.svg' />Friends</Link></div>
        <div className='filterbutton' onClick={toggleDropdown}><Link to="#"><img id="filter-icon" src='images/filter.svg' />Filter</Link></div>
        
        {dropdown && (
        <div className='dropdown-container'>
          <div className='dropdown'><Link to="#"><img id="filterarrow" src='images/filterarrow.svg' />Ingredients</Link></div>
            <div className='ingredientsmenu'>
              <input className='ingredientssearch' placeholder='Search'></input>
            </div>
          <div className='dropdown' onClick={toggleTimePopup}><Link to="#"><img id="filterarrow" src='images/filterarrow.svg' />Estimated Time</Link></div>
          
          {selectedTime && (
            <div className='selectedtime'>
              <span className='selectedtime'>{selectedTime}</span>
              <button className='remove-time' onClick={removeSelectedTime}>×</button>
            </div>
          )}
          
          {timePopup && (
            <div className='timemenu'>
            <div className='timepopup' onClick={() => handleSelectedTime('<10 minutes')}><Link to="#">&lt;10 minutes</Link></div>
            <div className='timepopup' onClick={() => handleSelectedTime('<20 minutes')}><Link to="#">&lt;20 minutes</Link></div>
            <div className='timepopup' onClick={() => handleSelectedTime('<30 minutes')}><Link to="#">&lt;30 minutes</Link></div>
            <div className='timepopup' onClick={() => handleSelectedTime('<60 minutes')}><Link to="#">&lt;60 minutes</Link></div>
            </div>
            )}
          <div className='dropdown'><Link to="#"><img id="filterarrow" src='images/filterarrow.svg' />Cuisine</Link></div>
            <div className='cuisinesmenu'>
            <input className='dropdownsearch' placeholder='Search'></input>
            </div>
        </div>
    )}
        </div>
      </div>
    </div>
  )
};

export default Sidebar;
