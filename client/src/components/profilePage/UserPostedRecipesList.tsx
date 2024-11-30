import React, { useContext, useEffect, useState } from "react";
import RecipeItem from "../recipes/RecipeItem";
import { fetchUserPostedRecipes } from "../../utils/displayedRecipes-utils";
import { AppContext } from "../../context/AppContext";
import { Link, useLocation } from "react-router-dom";
import { Recipe } from "../../types/types";

const UserPostedRecipesList = () => {  
  const location = useLocation();
  const {userProfile} = useContext(AppContext);
  const [postedRecipes, setPostedRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    if (location.pathname === "/profile") {
      loadPostedRecipes(); // Refresh recipes when navigating to home
    }
  }, [location]); // Dependency on location to re-fetch when path changes


  const loadPostedRecipes = async () => {
    try {
      const postList = await fetchUserPostedRecipes(userProfile.id); // Fetch favorite recipes
      //console.log("Fetched fav recipes in frontend:", favoriteList);  // Log the recipes
      setPostedRecipes(postList);
    } catch (error) {
      console.error("Error fetching user's posted recipes:", error);
    }
  };


  return (
    <>
      {postedRecipes.length > 0 ? (
        <div className="recipes-container">
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
              No favorite recipes to display.
            </h1>
        </div>
        
      )}
    </>
  );
};

export default UserPostedRecipesList;