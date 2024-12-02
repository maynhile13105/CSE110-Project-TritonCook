import { API_BASE_URL } from "../constants/constants";
import { Recipe } from "../types/types";


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