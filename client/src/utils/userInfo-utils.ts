import { API_BASE_URL } from "../constants/constants";

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
