import { API_BASE_URL } from "../constants/constants";
import { Recipe } from "../types/types";

//Function to get the username of the user from the backend. Method: GET
export const fetchNumberOfLikes = async (recipeID: string): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/like/${recipeID}`, {
        method: "GET",
    })
    if(!response.ok){
        throw new Error("Failed to fetch the number of likes");
    }

    let  count = response.json().then((jsonResponse) => {
        return jsonResponse.data;
    });

    return count;
};

export const addLike = async (recipeID: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/like/add/${recipeID}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
        body: JSON.stringify({ recipeID }),
    });
    if(!response.ok){
        throw new Error("Failed to add like status!");
    }
    return response.json();
}

export const removeLike = async (recipeID: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/like/remove/${recipeID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
    });
    if(!response.ok){
        throw new Error ("Failed to remove like status!");
    }
}

export const fetchLikedRecipes = async (): Promise<Recipe[]> => {
    const response = await fetch(`${API_BASE_URL}/like`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
    });

    if(!response.ok){
        throw new Error("Failed to fetch the liked recipe");

    }

    let  likedRecipes = response.json().then((jsonResponse) => {
        return jsonResponse.data;
    });
    
    return likedRecipes;
}