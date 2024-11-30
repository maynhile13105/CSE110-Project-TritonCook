import { API_BASE_URL } from "../constants/constants";
import { Profile } from "../types/types";

//Function to get the username of the user from the backend. Method: GET
export const fetchUsername = async (id: string): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/userInfo/${id}`, {
        method: "GET",
    })
    if(!response.ok){
        throw new Error("Failed to fetch the username");
    }

    let  username = response.json().then((jsonResponse) => {
        return jsonResponse.data;
    });

    return username;
};

export const fetchUserProfile = async (): Promise<Profile> => {
    const response = await fetch(`${API_BASE_URL}/userProfile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch the user profile");
    }

    const jsonResponse = await response.json(); // Await the JSON parsing

    // Return the correct field from the response
    return jsonResponse.user; // Adjust based on backend structure
};
