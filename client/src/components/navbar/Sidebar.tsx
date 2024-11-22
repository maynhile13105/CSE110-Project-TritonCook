import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'
import UserIcon from '../google/UserIcon';

const Sidebar = () => {
  const[dropdown, setDropdown] = useState(false);
  const[selectedTime, setSelectedTime] = useState<string | null>(null);
  const[selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const[selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const[activePopup, setActivePopup] = useState<string | null>(null);
  const[ingredientSearch, setIngredientSearch] = useState('');
  const[cuisineSearch, setCuisineSearch] = useState('');
  
  const ingredientsList = ['Tomato', 'Chicken', 'Lettuce', 'Beef', 'Fish', 'Onion'];
  const cuisineList = ['American', 'Chinese', 'Indian', 'Japanese', 'Korean', 'Mexican'];

  const toggleDropdown = () => {
    setDropdown(!dropdown);
    setActivePopup(null);
  };

  const togglePopup = (popupName: string) => {
    setActivePopup(activePopup === popupName ? null : popupName);
  }

  const handleSelectedIngredients = (ingredient:string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  }
  
  const removeSelectedIngredients = (ingredient:string) => {
    setSelectedIngredients(selectedIngredients.filter((ing) => ing !== ingredient));

  }

  const handleSelectedTime =(time : string) => {
    setSelectedTime(time);
    setActivePopup(null);
  };

  const removeSelectedTime = () => {
    setSelectedTime(null);
  }

  const handleSelectedCuisine =(cuisine :string) => {
    setSelectedCuisine(cuisine);
    setActivePopup(null);
  }

  const removeSelectedCuisine = () => {
    setSelectedCuisine(null);
  }

  
  return (
    <div>
      <div className='sidebar-container' role='button'>
        <div className='mainbuttons-container'>
        <div className='profilebutton'><Link to="#"><div className="profile-content"><UserIcon data-testid='UserIcon'/><span>Profile</span></div></Link></div>
        <div className='favoritebutton'><Link to="#"><img id="saved-icon" src='/images/favorite.svg' alt='favoriteIcon'/>Favorites</Link></div>
        <div className='friendsbutton'><Link to="#"><img id="friends-icon" src='/images/friends.svg' alt='friendsIcon'/>Friends</Link></div>
        <div className='filterbutton' onClick={toggleDropdown} data-testid="filter-button"><Link to="#"><img id="filter-icon" src='/images/filter.svg' alt='filterIcon'/>Filter</Link></div>
        
        {dropdown && (
        <div className='dropdown-container' data-testid="dropdown-container">
          <div className='dropdown' onClick={() => togglePopup('ingredients')}><Link to="#"><img id="filterarrow" src='/images/filterarrow.svg' />Ingredients</Link></div>
            
          {selectedIngredients.length > 0 && (
            <div className='selectedIngredients' data-testid="selected-ingredients">
              {selectedIngredients.map((ingredient) => (
                <div key={ingredient} className='selectedingredient'>
                  <span className='selectedingredienttext'>{ingredient}</span>
                  <button className='removeingredient' onClick={() => removeSelectedIngredients(ingredient)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

            {activePopup ==='ingredients' && (
            <div className='ingredientsmenu' data-testid="ingredients-popup">
              <input className='dropdownsearch' placeholder='Search' value={ingredientSearch} onChange={(e) => setIngredientSearch(e.target.value)}/>
              {ingredientsList.filter((ingredient) => ingredient.toLowerCase().includes(ingredientSearch.toLowerCase())).map((ingredient) => (
                  <div key={ingredient} className={`ingredientspopup ${selectedIngredients.includes(ingredient) ? 'selected' : ''}`}onClick={() => handleSelectedIngredients(ingredient)}>
                    {ingredient}
                  </div>
                ))}
            </div>
          )}  
          
          <div className='dropdown' onClick={() => togglePopup('time')}><Link to="#"><img id="filterarrow" src='/images/filterarrow.svg' />Estimated Time</Link></div>
          
          {selectedTime && (
            <div className='selectedtime'>
              <span className='selectedtimetext'>{selectedTime}</span>
              <button className='removetime' onClick={removeSelectedTime}>×</button>
            </div>
          )}
          
          {activePopup ==='time' && (
             <div className='timemenu' data-testid="time-popup">
             {['<10 minutes', '<20 minutes', '<30 minutes', '<60 minutes', '>60minutes'].map((time) => (
               <div key={time} className='timepopup' onClick={() => handleSelectedTime(time)}>
                 <Link to="#">{time}</Link>
               </div>
             ))}
       </div>
            )}


          <div className='dropdown' onClick={() => togglePopup('cuisine')}><Link to="#"><img id="filterarrow" src='/images/filterarrow.svg' />Cuisine</Link></div>
            {selectedCuisine && (
            <div className='selectedcuisine'>
            <span className='selectedcuisinetext'>{selectedCuisine}</span>
            <button className='removecuisine' onClick={removeSelectedCuisine}>×</button>
            </div>
          )}
          {activePopup ==='cuisine' && (
            <div className='cuisinesmenu' data-testid="cuisine-popup">
            <input className='dropdownsearch' placeholder='Search' value={cuisineSearch} onChange={(e) => setCuisineSearch(e.target.value)}/>
              {cuisineList .filter((cuisine) =>cuisine.toLowerCase().includes(cuisineSearch.toLowerCase())).map((cuisine) => (
                <div key={cuisine} className='cuisinepopup' onClick={() => handleSelectedCuisine(cuisine)}>
                  {cuisine}
                </div>
              ))}
            </div>
          )}
          <button className='insidefilterbutton'>Filter</button>
        </div>
    )}
        </div>
      </div>
      
    </div>
  )
};

export default Sidebar;
