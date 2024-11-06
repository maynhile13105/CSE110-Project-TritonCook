import { createContext, useState } from "react";
import { Recipe } from "../types/types";

interface AppContextType {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const initialState: AppContextType = {
  recipes: [],
  setRecipes: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialState.recipes);

  return (
    <AppContext.Provider
      value={{
        recipes: recipes,
        setRecipes: setRecipes,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
