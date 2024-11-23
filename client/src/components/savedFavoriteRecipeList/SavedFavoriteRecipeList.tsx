import React, { useEffect, useState } from "react";
import RecipeItem from "../recipes/RecipeItem";
import "./SavedFavoriteRecipeList.css";
import { Recipe } from "../../types/types";
import { fetchFavoriteRecipes } from "../../utils/favorite-utils";

const SavedFavoriteRecipeList = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    loadFavoriteRecipes();
  }, []);

  const loadFavoriteRecipes = async () => {
    try {
      const favoriteRecipesList = await fetchFavoriteRecipes(); // Fetch displayed recipes
      setFavoriteRecipes(favoriteRecipesList);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleFavoriteToggle = (recipeId: string) => {
    // Remove the unfavorited recipe from the list
    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.filter((recipe) => recipe.id !== recipeId)
    );
  };

  return (
    <>
      {favoriteRecipes.length > 0 ? (
        <div className="recipes-container">
          {favoriteRecipes.map((recipe) => (
            <div className="post-item" key={recipe.id}>
              <RecipeItem
                currentRecipe={recipe}
                initialFavoriteStatus={true}
                onFavoriteToggle={handleFavoriteToggle} // Pass the callback
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