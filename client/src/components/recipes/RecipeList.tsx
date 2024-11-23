import React, { useContext, useEffect, useState } from "react";
import RecipeItem from "./RecipeItem";
import "./RecipeList.css";
import { fetchDisplayedRecipes } from "../../utils/displayedRecipes-utils"; // Import the function here
import { Recipe } from "../../types/types";
import { fetchFavoriteRecipes } from "../../utils/favorite-utils";

const RecipeList = () => {
    const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
    const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);


    useEffect(() => {
      loadRecipes();
      loadFavorites();
    }, []); 

    console.log("Initial displayedRecipes:", displayedRecipes); // Check the initial value of displayedRecipes
    const loadRecipes = async () => {
        try {
            const recipesList = await fetchDisplayedRecipes(); // Fetch displayed recipes
            console.log("Fetched recipes in frontend:", recipesList);  // Log the recipes
             
            
            // Check for existing recipes and update the state correctly
             setDisplayedRecipes(recipesList);

        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };


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
      {displayedRecipes.length > 0 ? (
        <div className="recipes-container">
          {displayedRecipes.map((recipe) => (
            <div className="post-item" key={recipe.id}>
              <RecipeItem
               currentRecipe={recipe}
               initialFavoriteStatus={favoriteRecipes.some((fav) => fav.id === recipe.id)}

              />
            </div>
          ))}
        </div>
      ) : (
        <h1 style={{ textAlign: "center", fontSize: "40px", fontWeight: "bold" }}>
          No recipes to display.
        </h1>
      )}
    </>
  );  
};

export default RecipeList;
