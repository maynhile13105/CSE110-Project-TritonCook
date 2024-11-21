import { createContext, SetStateAction, useEffect, useState } from "react";
import { Profile, Recipe } from "../types/types";
import { fetchFavoriteRecipes } from "../utils/favorite-utils";

interface AppContextType {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;

    recipes: Recipe[];
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;

    favoriteRecipes: Recipe[];
    setFavoriteRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const initialState: AppContextType = {
    recipes: [],
    setRecipes: () => {},

    favoriteRecipes: [],
    setFavoriteRecipes: () => { },
    
    profile: {
        id: "",
        name: "",
        email: "",
        picture: ""
    },
    setProfile: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
    const [profile, setProfile] = useState<Profile>(initialState.profile);
    const [recipes, setRecipes] = useState<Recipe[]>(initialState.recipes);
    const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>(initialState.favoriteRecipes);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = "user1";  // You can replace this with a dynamic user ID
                const fetchedFavoriteRecipes = await fetchFavoriteRecipes(userID);
                setFavoriteRecipes(fetchedFavoriteRecipes);
            } catch (error) {
                console.error("Error fetching favorite recipes:", error);
            }
        };
        fetchData();

    }, []);

    return (
        <AppContext.Provider
            value = {{
                profile: profile,
                setProfile: setProfile,

                recipes: recipes,
                setRecipes: setRecipes,

                favoriteRecipes: favoriteRecipes,
                setFavoriteRecipes: setFavoriteRecipes,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}