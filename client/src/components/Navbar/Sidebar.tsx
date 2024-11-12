import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Sidebar.css'
const Sidebar = () => {
  return (
    <div>
        <div className='sidebar-container' role='button'>
            <div><Link to="#"><img id="profile-icon" src='images/profile-icon.svg'/>Profile</Link></div>
            <div><Link to="#"><img id="saved-icon" src='images/saved-icon.svg'/>Saved Recipes</Link></div>
            <div><Link to="#"><img id="friends-icon" src='images/friends-icon.svg'/>Friends</Link></div>
            <div><Link to="#"><img id="filter-icon" src='images/filter-icon.svg'/>Filter</Link></div>
        </div>
    </div>
  );
};

export default Sidebar;
