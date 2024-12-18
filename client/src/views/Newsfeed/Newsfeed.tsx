import React, { useContext, useEffect, useState } from 'react';
import './Newsfeed.css';
import Sidebar from '../../components/navbar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { fetchFavoriteRecipes } from '../../utils/favorite-utils';
import { AppContext } from '../../context/AppContext';
import { fetchLikedRecipes } from '../../utils/like-utils';
import { fetchUserProfile } from '../../utils/userInfo-utils';

const Newsfeed = () => {

  const token = localStorage.getItem("token");
  const {setFavoriteRecipes} = useContext(AppContext);
  const {setLikedRecipes} = useContext(AppContext);
  const {setUserProfile} = useContext(AppContext);

  useEffect(() => {
    loadFavorites();
    loadLikes();
    loadUserProfile();
  }, []);

  const loadFavorites = async () => {
    try {
      if(!token){
        setFavoriteRecipes([]);
      } else{
        const favoriteList = await fetchFavoriteRecipes(); // Fetch favorite recipes
        //console.log("Fetched fav recipes in frontend:", favoriteList);  // Log the recipes
        setFavoriteRecipes(favoriteList);
      } 
    }catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  };

  const loadUserProfile = async () => {
    try {
      const profile = await fetchUserProfile(); // Fetch user profile
      console.log("Fetched user profile in frontend:", profile);  // Log the recipes
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  
  const loadLikes = async () => {
    try {
      if(!token){
        setFavoriteRecipes([]);
      } else{
        const likedList = await fetchLikedRecipes(); // Fetch like recipes from backend
        //console.log("Fetched liked recipes in frontend:", likedList);  // Log the recipes
        setLikedRecipes(likedList);
      } 
    }catch (error) {
      console.error("Error fetching liked recipes:", error);
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