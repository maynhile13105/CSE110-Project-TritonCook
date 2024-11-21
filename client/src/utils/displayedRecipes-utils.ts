import { API_BASE_URL } from "../constants/constants";
import { Recipe } from "../types/types";

//Function to get all favorite recipes of the user from the backend. Method: GET
export const fetchDisplayedRecipes = async (userID: string): Promise<Recipe[]> => {
    const response = await fetch(`${API_BASE_URL}/displayedRecipes`, {
        method: "GET",
    })
    if(!response.ok){
        throw new Error("Failed to fetch the user's favorite recipes");
    }

    let  displayedRecipeList = response.json().then((jsonResponse) => {
        return jsonResponse.data;
    });

    return displayedRecipeList;
}