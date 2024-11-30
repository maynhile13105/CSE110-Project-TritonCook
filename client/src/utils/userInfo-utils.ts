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
    })

    if(!response.ok){
        throw new Error("Failed to fetch the user profile");
    }

    // Parse the JSON response
    const jsonResponse = await response.json();
    console.log("Response from backend:", jsonResponse); // Add this log

        
    // Return the data from the response
    return jsonResponse.user;  // Assuming data is what you want (adjust if needed)
}

export const fetchProfileUsingUsername = async (name: string): Promise<Profile> => {
    const response = await fetch(`${API_BASE_URL}/userProfile/${name}`, {
        method: "GET"
    })

    if(!response.ok){
        throw new Error("Failed to fetch the user profile");
    }

    // Parse the JSON response
    const jsonResponse = await response.json();
    console.log("Response from backend:", jsonResponse); // Add this log

        
    // Return the data from the response
    return jsonResponse.user;  // Assuming data is what you want (adjust if needed)
}