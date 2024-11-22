import React, { useContext, useEffect, useState } from "react";
import RecipeItem from "./RecipeItem";
import "./RecipeList.css";
import { fetchDisplayedRecipes } from "../../utils/displayedRecipes-utils"; // Import the function here
import { useLocation } from "react-router-dom";
import { Recipe } from "../../types/types";
import { useFilterContext } from "../../context/FilterContext";

const RecipeList = () => {
    const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
    const location = useLocation();
    const { appliedFilters } = useFilterContext();

    useEffect(() => {
      loadRecipes()
    }, []); 

    console.log("Initial displayedRecipes:", displayedRecipes);
    const loadRecipes = async () => {
        try {
            const recipesList = await fetchDisplayedRecipes();
            console.log("Fetched recipes in frontend:", recipesList);
             
            
             setDisplayedRecipes((prev) => {
              if (prev.length !== recipesList.length) {
                console.log("Setting new recipes...");
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
          loadRecipes(); 
      }
  }, [location]);

 const filteredRecipes = displayedRecipes.filter((recipe) => {
    const matchesIngredients =
        appliedFilters.ingredients.length === 0 ||
        appliedFilters.ingredients.every((ingredient: string) =>
        recipe.ingredients.toLowerCase().includes(ingredient.toLowerCase())
    );

    const matchesTime = (() => {
        if (!appliedFilters.time) return true;

        const timeThreshold = parseInt(appliedFilters.time.replace(/\D/g, ""));
        const recipeEstimate = parseInt(recipe.estimate.replace(/\D/g, "")); 

        if (appliedFilters.time.includes('<')) {
            return recipeEstimate <= timeThreshold;
        } else if (appliedFilters.time.includes('>')) {
            return recipeEstimate > timeThreshold;
        }
        return false;
      })();

      const matchesCuisine =
        !appliedFilters.cuisine ||
        recipe.cuisine.toLowerCase() === appliedFilters.cuisine.toLowerCase();
  
    return matchesIngredients && matchesTime && matchesCuisine;
  });

    return (
        <div className="recipes-container">
            {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                    <div className="post-item" key={recipe.id}>
                        <RecipeItem
                            id={recipe.id}
                            title={recipe.title}
                            estimate={recipe.estimate}
                            ingredients={recipe.ingredients}
                            result_img={recipe.result_img}
                            userID={recipe.userID}
                            cuisine={recipe.cuisine}
                            time = {recipe.time}
                        />
                    </div>
                ))
            ) : (
                <p style={{fontSize:'30px', fontWeight:'bold'}}>No recipes to display.</p>
            )}
        </div>
    );
};

export default RecipeList;
