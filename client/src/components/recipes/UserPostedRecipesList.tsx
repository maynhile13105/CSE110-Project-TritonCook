import React, { useContext, useEffect, useState } from "react";
import RecipeItem from "./RecipeItem";
import { fetchUserPostedRecipes } from "../../utils/displayedRecipes-utils";
import { Link, useLocation, useParams } from "react-router-dom";
import { Profile, Recipe } from "../../types/types";
import { AppContext, initialState } from "../../context/AppContext";
import { fetchProfileUsingUsername } from "../../utils/userInfo-utils";

const UserPostedRecipesList = () => {  
  const location = useLocation();
  const { username } = useParams();//Get username from the URL
  const {postedRecipes, setPostedRecipes} = useContext(AppContext);
  const [ownerAccountPage, setOwnerAccountPage] = useState<Profile>(initialState.userProfile);


  useEffect(() => {
    if(username)
    loadUserProfile(username);
  },[username])

  const loadUserProfile = async (username: string) => {
    try {
      const profile = await fetchProfileUsingUsername(username); // Fetch favorite recipes
      //console.log("Fetched fav recipes in frontend:", favoriteList);  // Log the recipes
      setOwnerAccountPage(profile);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  };

  useEffect(() => {
    if(ownerAccountPage)
    loadPostedRecipes(ownerAccountPage.id);
  }, [ownerAccountPage])

  const loadPostedRecipes = async (userID: string) => {
    try {
      const postList = await fetchUserPostedRecipes(userID); // Fetch favorite recipes
      //console.log("Fetched fav recipes in frontend:", favoriteList);  // Log the recipes
      setPostedRecipes(postList);
    } catch (error) {
      console.error("Error fetching user's posted recipes:", error);
    }
  };
  useEffect(() => {
    if (location.pathname === `/profile/${ownerAccountPage.name}`) {
      loadPostedRecipes(ownerAccountPage.id); // Refresh recipes when navigating to home
    }
  }, [location]); // Dependency on location to re-fetch when path changes


  return (
    <>
      {postedRecipes.length > 0 ? (
        <div className="account-recipes-container">
          {postedRecipes.map((recipe) => (
            <div className="post-item" key={recipe.id}>
              <RecipeItem
                currentRecipe={recipe}
              />
            </div>
          ))}
        </div>
      ) : (
        <div  className="Announcement">
            <h1 style={{ textAlign: "center", fontSize: "40px", fontWeight: "bold" }}>
              No posted recipes to display.
            </h1>
        </div>
        
      )}
    </>
  );
};

export default UserPostedRecipesList;