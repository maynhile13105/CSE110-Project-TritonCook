import React, { useContext, useEffect } from "react";
import RecipeItem from "./RecipeItem";
import "./RecipeList.css";
import { AppContext } from "../../context/AppContext";
import { fetchDisplayedRecipes } from "../../utils/displayedRecipes-utils"; // Import the function here
import { useLocation } from "react-router-dom";

const RecipeList = () => {
    const { displayedRecipes, setDisplayedRecipes } = useContext(AppContext);
    const location = useLocation();

    useEffect(() => {
      loadRecipes()
    }, []); 

    console.log("Initial displayedRecipes:", displayedRecipes); // Check the initial value of displayedRecipes
    const loadRecipes = async () => {
        try {
            const recipesList = await fetchDisplayedRecipes(); // Fetch displayed recipes
            console.log("Fetched recipes in frontend:", recipesList);  // Log the recipes
             // Check for existing recipes and update the state correctly
             setDisplayedRecipes((prev) => {
              if (prev.length !== recipesList.length) {
                console.log("Setting new recipes...");
                return recipesList; // Directly update with new recipes if the length is different
              }
              return prev; // Keep the previous state if the recipes haven't changed
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



    return (
        <div className="recipes-container">
            {displayedRecipes.length > 0 ? (
                displayedRecipes.map((recipe) => (
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
