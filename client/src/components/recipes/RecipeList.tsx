import React, { useContext, useEffect, useState } from "react";
import RecipeItem from "./RecipeItem";
import "./RecipeList.css";
import { fetchDisplayedRecipes } from "../../utils/displayedRecipes-utils"; // Import the function here
import { Recipe } from "../../types/types";

const RecipeList = () => {
    const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
    

    useEffect(() => {
      loadRecipes()
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


  return (
    <>
      {displayedRecipes.length > 0 ? (
        <div className="recipes-container">
          {displayedRecipes.map((recipe) => (
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
          No recipes to display.
        </h1>
      )}
    </>
  );  
};

export default RecipeList;
