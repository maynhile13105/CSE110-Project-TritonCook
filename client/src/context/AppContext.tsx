import { createContext, SetStateAction, useState } from "react";
import { Profile, Recipe } from "../types/types";

interface AppContextType {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;

    userProfile: Profile;
    setUserProfile: React.Dispatch<React.SetStateAction<Profile>>;

    favoriteRecipes: Recipe[];
    setFavoriteRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;

    likedRecipes: Recipe[];
    setLikedRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

export const initialState: AppContextType = {
    token: "",
    setToken:() => {},

    favoriteRecipes: [],
    setFavoriteRecipes: () => { },

    likedRecipes: [], //Store the list of recipes that user liked
    setLikedRecipes: () => {},
    
    userProfile: {
        id: "",
        name: "",
        email: "",
        picture: ""
    },
    setUserProfile: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
    const [userProfile, setUserProfile] = useState<Profile>(initialState.userProfile);
    const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>(initialState.favoriteRecipes);
    const [likeRecipes, setLikeRecipes] = useState<Recipe[]>(initialState.likedRecipes);
    const [token, setToken] = useState<string>(initialState.token);
    return (
        <AppContext.Provider
            value = {{

                token: token,
                setToken: setToken,

                userProfile: userProfile,
                setUserProfile: setUserProfile,

                favoriteRecipes: favoriteRecipes,
                setFavoriteRecipes: setFavoriteRecipes,

                likedRecipes: likeRecipes,
                setLikedRecipes: setLikeRecipes,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}