import React, { useContext, useEffect, useState } from "react";
import RecipeItem from "./RecipeItem";
import "./RecipeList.css";
import { fetchDisplayedRecipes } from "../../utils/displayedRecipes-utils"; // Import the function here
import { Recipe } from "../../types/types";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useFilterContext } from "../../context/FilterContext";
import { fetchNumberOfLikes } from "../../utils/like-utils";

const RecipeList = () => {
    const {newsfeedRecipes, setNewsfeedRecipes} = useContext(AppContext);
    const { appliedFilters } = useFilterContext();
    //const {favoriteRecipes} = useContext(AppContext);
    //const {likedRecipes} = useContext(AppContext);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

    const location = useLocation();
    
    useEffect(() => {
      loadRecipes();
    }, []); 

    //console.log("Initial displayedRecipes:", displayedRecipes); // Check the initial value of displayedRecipes
    const loadRecipes = async () => {
        try {
            const recipesList = await fetchDisplayedRecipes(); // Fetch displayed recipes
            //console.log("Fetched recipes in frontend:", recipesList);  // Log the recipes
             
            
            // Check for existing recipes and update the state correctly
            setNewsfeedRecipes((prev) => {
              if (prev.length !== recipesList.length) {
                //console.log("Updating recipe list...");
                return recipesList;
              }
              return prev;
            });

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
    
  useEffect(() => {
    const applyFiltersAndSorting = async () => {
      // Filter recipes based on applied filters
      const filtered = filterRecipes(newsfeedRecipes);

      // If sortByLikes is true, sort the filtered recipes by likes
      if (location.state?.sortByLikes) {
        const sorted = await sortRecipesByLikes(filtered);
        setFilteredRecipes(sorted);
      } else {
        setFilteredRecipes(filtered); // Only apply filtering
      }
    };
    applyFiltersAndSorting();
  }, [newsfeedRecipes, appliedFilters, location.state?.sortByLikes]);

  const filterRecipes = (recipes: Recipe[]): Recipe[] => {
    return recipes.filter((recipe) => {
      const matchesIngredients =
        appliedFilters.ingredients.length === 0 ||
        appliedFilters.ingredients.every((ingredient: string) =>
          recipe.ingredients.toLowerCase().includes(ingredient.toLowerCase())
        );

      const matchesTime = (() => {
        if (!appliedFilters.time) return true;

        const timeThreshold = parseInt(appliedFilters.time.replace(/\D/g, ""));
        const recipeEstimate = recipe.estimate;

        if (appliedFilters.time.includes("<")) {
          return recipeEstimate <= timeThreshold;
        } else if (appliedFilters.time.includes(">")) {
          return recipeEstimate > timeThreshold;
        }
        return false;
      })();

      const matchesCuisine =
        !appliedFilters.cuisine ||
        recipe.cuisine.toLowerCase() === appliedFilters.cuisine.toLowerCase();

      return matchesIngredients && matchesTime && matchesCuisine;
    });
  };

  const sortRecipesByLikes = async (recipes: Recipe[]): Promise<Recipe[]> => {
    const recipesWithLikes = await Promise.all(
      recipes.map(async (recipe) => {
        const likes = await fetchNumberOfLikes(recipe.id); // Fetch likes dynamically
        return { ...recipe, likes }; // Add likes to each recipe
      })
    );

    return recipesWithLikes.sort((a, b) => b.likes - a.likes); // Sort by likes in descending order
  };

  return (
    <div className="recipes-container-list">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id}>
            <RecipeItem currentRecipe={recipe} />
          </div>
        ))
      ) : (
        <h1 style={{ textAlign: "center", fontSize: "40px", fontWeight: "bold" }}>
          No recipes to display.
        </h1>
      )}
     </div>
  );  
};

export default RecipeList;