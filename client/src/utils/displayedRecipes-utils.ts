import { API_BASE_URL } from "../constants/constants";
import { Recipe } from "../types/types";

//Function to get all favorite recipes of the user from the backend. Method: GET
export const fetchDisplayedRecipes = async (): Promise<Recipe[]> => {
    const response = await fetch(`${API_BASE_URL}/displayedRecipes`, { method: "GET" });
    if(!response.ok){
        throw new Error("Failed to fetch the user's favorite recipes");
    }

    // Await the response and log it
    const jsonResponse = await response.json();
    console.log(jsonResponse.data); // Log to check the structure of the response
    return jsonResponse.data; // Return the data directly
}

