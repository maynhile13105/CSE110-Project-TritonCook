import { createContext, SetStateAction, useState } from "react";
import { Account, Recipe } from "../types/types";

interface AppContextType {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;

    account: Account;
    setAccount: React.Dispatch<React.SetStateAction<Account>>;

    displayedRecipes: Recipe[];
    setDisplayedRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;

    favoriteRecipes: Recipe[];
    setFavoriteRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const initialState: AppContextType = {
    token: "",
    setToken:() => {},

    displayedRecipes: [],
    setDisplayedRecipes: () => {},  
    favoriteRecipes: [],
    setFavoriteRecipes: () => { },
    
    account: {
        id: "",
        name: "",
        email: "",
        picture: ""
    },
    setAccount: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
    const [account, setAccount] = useState<Account>(initialState.account);
    const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>(initialState.displayedRecipes);
    const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>(initialState.favoriteRecipes);
    const [token, setToken] = useState<string>(initialState.token);
    return (
        <AppContext.Provider
            value = {{

                token: token,
                setToken: setToken,

                account: account,
                setAccount: setAccount,

                displayedRecipes: displayedRecipes,
                setDisplayedRecipes: setDisplayedRecipes,

                favoriteRecipes: favoriteRecipes,
                setFavoriteRecipes: setFavoriteRecipes,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}