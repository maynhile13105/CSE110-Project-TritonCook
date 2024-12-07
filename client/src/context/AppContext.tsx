import { createContext, SetStateAction, useState } from "react";
import { Profile, Recipe } from "../types/types";
import Newsfeed from "../views/Newsfeed/Newsfeed";

interface AppContextType {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;

    userProfile: Profile;
    setUserProfile: React.Dispatch<React.SetStateAction<Profile>>;

    favoriteRecipes: Recipe[];
    setFavoriteRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;

    likedRecipes: Recipe[];
    setLikedRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;

    postedRecipes: Recipe[];
    setPostedRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;

    newsfeedRecipes: Recipe[];
    setNewsfeedRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
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
        picture: "",
        isGuest: false,
    },
    setUserProfile: () => {},

    postedRecipes: [],
    setPostedRecipes: () => {},

    newsfeedRecipes: [],
    setNewsfeedRecipes: () => {},
}

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
    const [userProfile, setUserProfile] = useState<Profile>(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const storedProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
          return { ...storedProfile, isGuest: false }; // Set isGuest to false for logged-in users
        }
        return {
          id: "",
          name: "",
          email: "",
          picture: "",
          isGuest: true,
        };
      });
    const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>(initialState.favoriteRecipes);
    const [likeRecipes, setLikeRecipes] = useState<Recipe[]>(initialState.likedRecipes);
    const [token, setToken] = useState<string>(initialState.token);
    const [postedRecipes, setPostedRecipes] = useState<Recipe[]>(initialState.postedRecipes);
    const [newsfeedRecipes, setNewsfeedRecipes] = useState<Recipe[]>(initialState.newsfeedRecipes);
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

                postedRecipes: postedRecipes,
                setPostedRecipes: setPostedRecipes,

                newsfeedRecipes: newsfeedRecipes,
                setNewsfeedRecipes: setNewsfeedRecipes,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}