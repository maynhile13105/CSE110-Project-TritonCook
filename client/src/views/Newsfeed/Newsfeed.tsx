import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import '../../css/Newsfeed.css'
import Sidebar from '../../components/Navbar/Sidebar';
import RecipeList from '../../components/recipes/RecipeList';

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
          <RecipeList />
        </div>
      </div>  
    </div>
    
  );
}

export default Newsfeed;