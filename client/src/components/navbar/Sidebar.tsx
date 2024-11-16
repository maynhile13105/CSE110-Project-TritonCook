import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {
  const[dropdown, setDropdown] = useState(false);
  const[timePopup, setTimePopup] = useState(false);
  const[ingredientsPopup, setIngredientsPopup] = useState(false);
  const[cuisinesPopup, setCuisinesPopup] = useState(false);
  const[selectedTime, setSelectedTime] = useState<string | null>(null);
  const[selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const toggleTimePopup = () => {
    setTimePopup(!timePopup);
  };

  const toggleIngredientsPopup = () => {
    setIngredientsPopup(!ingredientsPopup);
  }

  const toggleCuisinesPopup =() => {
    setCuisinesPopup(!cuisinesPopup)
  }

  const handleSelectedTime =(time : string) => {
    setSelectedTime(time);
    setTimePopup(!timePopup);
  };

  const removeSelectedTime = () => {
    setSelectedTime(null);
  }

  const handleSelectedCuisine =(cuisine :string) => {
    setSelectedCuisine(cuisine);
    setCuisinesPopup(!cuisinesPopup);
  }

  const removeSelectedCuisine = () => {
    setSelectedCuisine(null);
  }

  return (
    <div>
      <div className='sidebar-container' role='button'>
        <div className='mainbuttons-container'>
        <div className='profilebutton'><Link to="#"><img id="profile-icon" src='/images/profile.svg' />Profile</Link></div>
        <div className='favoritebutton'><Link to="#"><img id="saved-icon" src='/images/favorite.svg' />Favorites</Link></div>
        <div className='friendsbutton'><Link to="#"><img id="friends-icon" src='/images/friends.svg' />Friends</Link></div>
        <div className='filterbutton' onClick={toggleDropdown}><Link to="#"><img id="filter-icon" src='/images/filter.svg' />Filter</Link></div>
        
        {dropdown && (
        <div className='dropdown-container'>
          <div className='dropdown' onClick={toggleIngredientsPopup}><Link to="#"><img id="filterarrow" src='/images/filterarrow.svg' />Ingredients</Link></div>
            {ingredientsPopup && (
            <div className='ingredientsmenu'>
              <input className='dropdownsearch' placeholder='Search'></input>
              <div className='ingredientspopup'>Tomato</div>
              <div className='ingredientspopup'>Chicken</div>
              <div className='ingredientspopup'>Lettuce</div>
              <div className='ingredientspopup'>Beef</div>
              <div className='ingredientspopup'>Fish</div>
              <div className='ingredientspopup'>Onion</div>
            </div>
          )}  
          
          <div className='dropdown' onClick={toggleTimePopup}><Link to="#"><img id="filterarrow" src='/images/filterarrow.svg' />Estimated Time</Link></div>
          
          {selectedTime && (
            <div className='selectedtime'>
              <span className='selectedtimetext'>{selectedTime}</span>
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


          <div className='dropdown' onClick={toggleCuisinesPopup}><Link to="#"><img id="filterarrow" src='/images/filterarrow.svg' />Cuisine</Link></div>
          {cuisinesPopup && (
            <div className='cuisinesmenu'>
            <input className='dropdownsearch' placeholder='Search'></input>
            <div className='cuisinepopup'>American</div>
            <div className='cuisinepopup'>Chinese</div>
            <div className='cuisinepopup'>Indian</div>
            <div className='cuisinepopup'>Japanese</div>
            <div className='cuisinepopup'>Korean</div>
            <div className='cuisinepopup'>Mexican</div>
            </div>
          )}
        </div>
    )}
        </div>
      </div>
    </div>
  )
};

export default Sidebar;
