import { API_BASE_URL } from "../constants/constants";
import { Recipe, recipeInstruction } from "../types/types";


//Function to delete recipe in the backend. Method: DELETE
export const deleteRecipe = async (recipeID: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/delete/${recipeID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
    });
    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete the recipe.");
    }
};

export const fetchRecipeInfo = async(recipeID: string) : Promise<Recipe> => {
    const response = await fetch(`${API_BASE_URL}/recipe-information/${recipeID}`, {
        method: "GET",
    });
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch the recipe.");
    }

    const jsonResponse = await response.json();

    // Return the data from the response
    return jsonResponse.data;
}

export const fetchRecipeInstructions = async(recipeID: string) : Promise<recipeInstruction[]> => {
    const response = await fetch(`${API_BASE_URL}/recipe-instructions/${recipeID}`, {
        method: "GET",
    });
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch the recipe's instructions.");
    }

    const jsonResponse = await response.json();

    // Return the data from the response
    return jsonResponse.data;
}