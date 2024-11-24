import React, { useContext, useEffect, useState } from "react";
import RecipeItem from "../recipes/RecipeItem";
import "./SavedFavoriteRecipeList.css";
import { fetchFavoriteRecipes } from "../../utils/favorite-utils";
import { AppContext } from "../../context/AppContext";
import { Link, useLocation } from "react-router-dom";

const SavedFavoriteRecipeList = () => {
  const token = localStorage.getItem("token");
  
  const {favoriteRecipes, setFavoriteRecipes} = useContext(AppContext);
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoriteList = await fetchFavoriteRecipes(); // Fetch favorite recipes
      console.log("Fetched fav recipes in frontend:", favoriteList);  // Log the recipes
      setFavoriteRecipes(favoriteList);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  };


  return (
    <>
      {favoriteRecipes.length > 0 ? (
        <div className="recipes-container">
          {favoriteRecipes.map((recipe) => (
            <div className="post-item" key={recipe.id}>
              <RecipeItem
                currentRecipe={recipe}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {token ? 
            (<h1 style={{ textAlign: "center", fontSize: "40px", fontWeight: "bold" }}>
              No favorite recipes to display.
            </h1>)
            
          :
            (
            <div  className="Announcement">
              <h2 style={{ textAlign: "center", fontSize: "40px", fontWeight: "bold" }}>
                <span>Please sign in to see your favorite recipes!</span>
              </h2>

              <Link to="/">
                <button>Sign In</button>
              </Link>
            </div>)
          }
        </div>
        
      )}
    </>
  );
};

export default SavedFavoriteRecipeList;