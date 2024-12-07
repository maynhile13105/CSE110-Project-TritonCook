import { API_BASE_URL } from "../constants/constants";

// Function to add a search input to the backend. Method: POST
export const addSearchHistory = async (searchInput: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/history/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
        body: JSON.stringify({ searchInput }),
    });
    if (!response.ok) {
        throw new Error("Failed to add search input to history!");
    }
    return response.json();
};

// Function to fetch the search history from the backend. Method: GET
export const fetchSearchHistory = async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch the search history!");
    }

    // Parse and return the search history
    const history_string = await response.json();
    const history = history_string.data.map((entry: { searchInput: string }) => entry.searchInput);
    return history;
};

// Function to delete a specific search input from the backend. Method: DELETE
export const deleteSearchHistory = async (searchInput: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/history/${searchInput}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete the search input from history!");
    }
};
