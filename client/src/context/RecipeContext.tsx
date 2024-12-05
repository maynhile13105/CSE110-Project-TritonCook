import { createContext, useState } from "react";
import { Recipe } from "../types/types";

interface RecipeContextType {
    recipes: Recipe[];
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const initialState: RecipeContextType = {
    recipes: [],
    setRecipes: () => { },
};

export const RecipeContext = createContext<RecipeContextType>(initialState);

export const RecipeProvider = (props: any) => {
    const [recipes, setRecipes] = useState<Recipe[]>(initialState.recipes);
  
    return (
      <RecipeContext.Provider
        value={{
          recipes: recipes,
          setRecipes: setRecipes,
        }}
      >
        {props.children}
      </RecipeContext.Provider>
    );
  };