import React, {useEffect, useState } from "react";
import RecipeItem from "../recipes/RecipeItem";
import "./SavedFavoriteRecipeList.css";
import { Recipe } from "../../types/types";
import { fetchFavoriteRecipes } from "../../utils/favorite-utils";

const SavedFavoriteRecipeList = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
      loadFavoriteRecipes()
    }, []); 

    console.log("Initial favoriteRecipes:", favoriteRecipes); // Check the initial value of displayedRecipes
    const loadFavoriteRecipes = async () => {
        try {
            const favoriteRecipesList = await fetchFavoriteRecipes(); // Fetch displayed recipes
            console.log("Fetched recipes in frontend:", favoriteRecipesList);  // Log the recipes
             
            
            // Check for existing recipes and update the state correctly
            setFavoriteRecipes(favoriteRecipesList);

        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };


  return (
    <>
      {favoriteRecipes.length > 0 ? (
        <div className="recipes-container">
          {favoriteRecipes.map((recipe) => (
            <div className="post-item" key={recipe.id}>
              <RecipeItem
                id={recipe.id}
                title={recipe.title}
                estimate={recipe.estimate}
                ingredients={recipe.ingredients}
                result_img={recipe.result_img}
                userID={recipe.userID}
                cuisine={recipe.cuisine}
                time={recipe.time}
              />
            </div>
          ))}
        </div>
      ) : (
        <h1 style={{ textAlign: "center", fontSize: "40px", fontWeight: "bold" }}>
          No favorite recipes to display.
        </h1>
      )}
    </>
  );  
};

export default SavedFavoriteRecipeList;
