import React, { useContext, useEffect, useState } from "react";
import RecipeItem from "./RecipeItem";
import "./RecipeList.css";
import { fetchDisplayedRecipes } from "../../utils/displayedRecipes-utils"; // Import the function here
import { Recipe } from "../../types/types";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const RecipeList = () => {
    const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
    //const {favoriteRecipes} = useContext(AppContext);
    //const {likedRecipes} = useContext(AppContext);

    const location = useLocation();
    
    useEffect(() => {
      loadRecipes();
    }, []); 

    //console.log("Initial displayedRecipes:", displayedRecipes); // Check the initial value of displayedRecipes
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

    useEffect(() => {
      if (location.pathname === "/home") {
          loadRecipes(); // Refresh recipes when navigating to home
      }
    }, [location]); // Dependency on location to re-fetch when path changes

   //console.log("Fav recipes in Item List", favoriteRecipes);
   //console.log("Liked recipes in Item List", likedRecipes);
    
  return (
    <>
      {displayedRecipes.length > 0 ? (
        <div className="recipes-container">
          {displayedRecipes.map((recipe) => (
            <div className="post-item" key={recipe.id}>
              <RecipeItem
               currentRecipe={recipe}
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