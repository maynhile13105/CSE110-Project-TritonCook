import React, { useContext, useEffect, useState } from 'react';
import './Newsfeed.css';
import Sidebar from '../../components/Navbar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { fetchFavoriteRecipes } from '../../utils/favorite-utils';
import { AppContext } from '../../context/AppContext';

const Newsfeed = () => {

  const token = localStorage.getItem("token");
  const {setFavoriteRecipes} = useContext(AppContext);
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      if(!token){
        setFavoriteRecipes([]);
      } else{
        const favoriteList = await fetchFavoriteRecipes(); // Fetch favorite recipes
        console.log("Fetched fav recipes in frontend:", favoriteList);  // Log the recipes
        setFavoriteRecipes(favoriteList);
      } 
    }catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  };


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