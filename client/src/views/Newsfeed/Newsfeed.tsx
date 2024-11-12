import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import '../../css/Newsfeed.css'
import Sidebar from '../../components/Navbar/Sidebar';
import RecipeList from '../../components/recipes/RecipeList';
import { Outlet } from 'react-router-dom';

const Newsfeed = () => {
  return (
    <div>
      <div className='topbar'>
        <Navbar />
      </div>
      <div className='under-navbar'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='page-content'>
          <Outlet />
        </div>
      </div>  
    </div>
    
  );
}

export default Newsfeed;