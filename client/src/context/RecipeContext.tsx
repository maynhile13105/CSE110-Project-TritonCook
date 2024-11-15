import { createContext, useState } from "react";
import { Recipe } from "../types/types";

interface RecipeContextType {
    recipes: Recipe[];
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
    favorites: Recipe[];
    setFavorites: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const initialState: RecipeContextType = {
    recipes: [
        { id: 1, name: 'Instant Ramen', estimate: 10 , ingredients: ['water', 'noodles', 'egg'], image: 'https://static01.nyt.com/images/2018/05/01/dining/01COOKING-PERFECTINSTANTRAMEN1/01COOKING-PERFECTINSTANTRAMEN1-googleFourByThree-v2.jpg'},
        { id: 2, name: 'Frozen Pizza', estimate: 20, ingredients: ['pizza'], image: 'https://cdn.apartmenttherapy.info/image/upload/v1557254295/k/Photo/Tips/2019-05-You-Should-Be-Grilling-Frozen-Pizza/GrillingFrozenPizzaOption3.jpg'},
        { id: 3, name: 'Spaghetti and meatballs', estimate: 40, ingredients: ['pasta', 'red sauce', 'meatballs'], image: 'https://www.allrecipes.com/thmb/ZO5edyo6JhS1ZFELyDepR0Y170w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21353-italian-spaghetti-sauce-with-meatballs-DDMFS-4x3-a9a1528b4f06483dbec38d0c2945c378.jpg' },
        { id: 4, name: 'Crispy Fried Chicken', estimate: 80, ingredients: ['flour', 'corn starch', 'chicken thighs'], image: 'https://www.allrecipes.com/thmb/s0mJbUaWhT4cvgMRK28grMkUXcU=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8805-CrispyFriedChicken-mfs-3x2-072-d55b8406d4ae45709fcdeb58a04143c2.jpg'},
        { id: 5, name: 'Healthy Salad', estimate: 15, ingredients: ['lettuce', 'eggs', 'avocado', 'salad dressing'], image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/04/Cobb-Salad-4-1.jpg'},
      ],
    setRecipes: () => { },
    favorites: [        
      { id: 1, name: 'Instant Ramen', estimate: 10 , ingredients: ['water', 'noodles', 'egg'], image: 'https://static01.nyt.com/images/2018/05/01/dining/01COOKING-PERFECTINSTANTRAMEN1/01COOKING-PERFECTINSTANTRAMEN1-googleFourByThree-v2.jpg'},
    ],
    setFavorites: () => {},
};

export const RecipeContext = createContext<RecipeContextType>(initialState);

export const RecipeProvider = (props: any) => {
    const [recipes, setRecipes] = useState<Recipe[]>(initialState.recipes);
    const [favorites, setFavorites] = useState<Recipe[]>(initialState.favorites);
  
    return (
      <RecipeContext.Provider
        value={{
          recipes: recipes,
          setRecipes: setRecipes,
          favorites: favorites,
          setFavorites: setFavorites,
        }}
      >
        {props.children}
      </RecipeContext.Provider>
    );
  };
