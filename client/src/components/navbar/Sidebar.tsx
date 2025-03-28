import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'
import UserIcon from '../google/UserIcon';
import { useFilterContext } from '../../context/FilterContext';
import ingredientsData from '../../data/ingredientsData.json'
import cuisinesData from '../../data/cuisinesData.json'
import { AppContext } from '../../context/AppContext';
import { fetchUserProfile } from '../../utils/userInfo-utils';
import { API_BASE_URL } from '../../constants/constants';

const Sidebar = () => {

  const {
    selectedIngredients,setSelectedIngredients, 
    selectedTime, setSelectedTime,
    selectedCuisine, setSelectedCuisine,
    setAppliedFilters,
  } = useFilterContext();

  const[dropdown, setDropdown] = useState(false);
  const[activePopup, setActivePopup] = useState<string | null>(null);
  const[ingredientSearch, setIngredientSearch] = useState('');
  const[cuisineSearch, setCuisineSearch] = useState('');
  const [recentIngredients, setRecentIngredients] = useState<string[]>([]);
  const [recentCuisines, setRecentCuisines] = useState<string[]>([]);
  const [showFriendsPopup, setShowFriendsPopup] = useState(false);

  const ingredientsList: string[] = ingredientsData;
  const cuisineList: string[] = cuisinesData;
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showDropdown) {
      setDropdown(true); // Open dropdown if the state is set
    }
  }, [location.state?.showDropdown]);

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
    
    setRecentIngredients((prev) => {
      const updated = [ingredient, ...prev.filter((item) => item !== ingredient)];
      return updated.slice(0, 5);
    });  
  }
  
  const removeSelectedIngredients = (ingredient:string) => {
    setSelectedIngredients(selectedIngredients.filter((ing:string) => ing !== ingredient));

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
    setRecentCuisines((prev) => {
      const updated = [cuisine, ...prev.filter((item) => item !== cuisine)];
      return updated.slice(0, 5); // Keep only the last 5
    });

    setActivePopup(null);
  }

  const removeSelectedCuisine = () => {
    setSelectedCuisine(null);
  }


  const handleApplyFilters = () => {
    console.log("Filters applied:", {
      selectedIngredients,
      selectedTime,
      selectedCuisine,
    });
    
    setAppliedFilters({
      ingredients: selectedIngredients,
      time: selectedTime,
      cuisine: selectedCuisine,
    });

    setActivePopup(null);
  }

  const {userProfile, setUserProfile} = useContext(AppContext);
  useEffect(() => {
    loadUserProfile();
  }, []);

  const [avatar, setAvatar] = useState<string>("");
  useEffect(() => {
    //console.log("Pic: ", ownerAccountPage.picture);
    if (userProfile.picture) {
      if(userProfile.picture.startsWith("/uploads/avatar/")){
        let path = `${API_BASE_URL}${userProfile.picture}`;
        console.log(path);
        setAvatar(path);
      } else{
        setAvatar(userProfile.picture);
      };      
    }
  }, [userProfile]); // Depend on ownerAccountPage.picture to update avatar


  const loadUserProfile = async () => {
    try {
      const profile = await fetchUserProfile(); // Fetch favorite recipes
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleFriendsClick = () => {
    setShowFriendsPopup(true);
    setTimeout(() => {
      setShowFriendsPopup(false);
    }, 3000); //popup will disappear after 3 seconds
  };
  
  return (
    <div>
      <div className='sidebar-container' role='button'>
        <div className='mainbuttons-container'>
        {userProfile?.isGuest ? (
          <Link to="/home/guest-profile" data-testid='profile'>
            <div className='profilebutton' data-testid='UserIcon'>
              <div className="profile-content">
                <img src="/images/profile.svg" alt="defaultprofile" style={{width:"100px"}} />
                <span style={{fontSize:"30px"}}>Profile</span>
              </div>
            </div>  
          </Link>
        ) : ( 
          <Link to={`/profile/${userProfile.name}`} data-testid='profileButton'>
            <div className='profilebutton' data-testid='UserIcon'>
              <div className="profile-content">{userProfile?.picture? 
                (<img className='profile' src={avatar} alt="user-avatar"/>)
                :
                (<img src="/images/profile.svg" alt="defaultprofile" className="defaultprofile" />)}
                <span style={{fontSize:"30px"}}>Profile</span>
              </div>
            </div>
          </Link>
        )}


        
        <Link to="/home/favorite"><div className='favoritebutton' data-testid='FavoriteButton'><img id="saved-icon" src='/images/favorite.svg' alt='favoriteIcon'/>Favorites</div></Link>
        <Link to = "#"><div className='friendsbutton' onClick={handleFriendsClick}><img id="friends-icon" src='/images/friends.svg' alt='friendsIcon'/>Friends</div></Link>
        <Link to="#"><div className='filterbutton' onClick={toggleDropdown} data-testid="filter-button"><img id="filter-icon" src='/images/filter.svg' alt='filterIcon'/>Filter</div></Link>
        
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
                  <div key={ingredient} className={`ingredientspopup ${selectedIngredients.includes(ingredient) ? 'selected' : ''}`} onClick={() => handleSelectedIngredients(ingredient)}> 
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
          <button className='insidefilterbutton' onClick={handleApplyFilters}>Filter</button>
        </div>
    )}
          {showFriendsPopup && (
            <div className='friends-popup'>
              Friends will be available soon!
            </div>
          )}

        </div>
      </div>
      
    </div>
  )
};

export default Sidebar;