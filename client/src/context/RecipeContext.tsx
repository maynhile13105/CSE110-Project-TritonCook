import { createContext, useState } from "react";
import { Recipe } from "../types/types";

interface RecipeContextType {
    recipes: Recipe[];
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const initialState: RecipeContextType = {
    recipes: [
        { id: "1", title: 'Instant Ramen', estimate: "< 10 minutes" , ingredients: "water, noodles, egg", result_image: 'https://static01.nyt.com/images/2018/05/01/dining/01COOKING-PERFECTINSTANTRAMEN1/01COOKING-PERFECTINSTANTRAMEN1-googleFourByThree-v2.jpg', userID: "account1", cuisine: "None"},
        { id: "2", title: 'Frozen Pizza', estimate: "< 30 minutes", ingredients: "frozen pizza", result_image: 'https://cdn.apartmenttherapy.info/image/upload/v1557254295/k/Photo/Tips/2019-05-You-Should-Be-Grilling-Frozen-Pizza/GrillingFrozenPizzaOption3.jpg', userID: "account1", cuisine: "Italian"},
        { id: "3", title: 'Spaghetti and meatballs', estimate: "< 60 minutes", ingredients: "pasta, tomato sauce, meatballs", result_image: 'https://www.allrecipes.com/thmb/ZO5edyo6JhS1ZFELyDepR0Y170w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21353-italian-spaghetti-sauce-with-meatballs-DDMFS-4x3-a9a1528b4f06483dbec38d0c2945c378.jpg',  userID: "account2", cuisine: "Italian"},
        { id: "4", title: 'Crispy Fried Chicken', estimate: "> 60 minutes", ingredients: "flour, corn starch, chicken thighs", result_image: 'https://www.allrecipes.com/thmb/s0mJbUaWhT4cvgMRK28grMkUXcU=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8805-CrispyFriedChicken-mfs-3x2-072-d55b8406d4ae45709fcdeb58a04143c2.jpg', userID: "account3", cuisine: "Korean"},
        { id: "5", title: 'Healthy Salad', estimate: " < 20 minutes", ingredients: "lettuce, eggs, avocado, salad dressing", result_image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/04/Cobb-Salad-4-1.jpg', userID: "account2", cuisine: "None"},
      ],
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
