import { API_BASE_URL } from "../constants/constants";
import { Recipe } from "../types/types";

// Function to add favorite recipe to the backend. Method: POST
export const addFavoriteRecipe = async (userID: string, recipeID: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/favorite`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({ userID, recipeID }),
    });
    if(!response.ok){
        throw new Error("Failed to add recipe to your favorite list!");
    }
    return response.json();
}

//Function to delete favorite recipe in the backend. Method: DELETE
export const deleteFavoriteRecipe = async (userID: string, recipeID: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/favorite/${userID}/${recipeID}`, {
        method: "DELETE",
    });
    if(!response.ok){
        throw new Error ("Failed to remove recipe out of your favorite list!");
    }
};

//Function to get all favorite recipes of the user from the backend. Method: GET
export const fetchFavoriteRecipes = async (userID: string): Promise<Recipe[]> => {
    const response = await fetch(`${API_BASE_URL}/favorite/${userID}`, {
        method: "GET",
    })
    if(!response.ok){
        throw new Error("Failed to fetch the user's favorite recipes");
    }

    let  favoriteRecipeList = response.json().then((jsonResponse) => {
        return jsonResponse.data;
    });

    return favoriteRecipeList;
};

//Function to check if the recipe is in the user's favorite list from backend. Method: GET
export const checkIsFavoriteRecipe = async(userID: string, recipeID: string): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/favorite/check/${userID}/${recipeID}`, {
        method: "GET",
    });

    if(!response.ok){
        throw new Error("Failed to check the user's favorite recipes");

    }

    let  isFavorite = response.json().then((jsonResponse) => {
        return jsonResponse.data;
    });
    
    return isFavorite;
}