import { useContext } from "react";
import { Recipe } from "../../types/types";
import { RecipeContext } from "../../context/RecipeContext";

const RecipeItem = (currentRecipe: Recipe) => {
  // Exercise: Consume the AppContext here
  const {recipes, setRecipes} = useContext(RecipeContext);

  return (
    <li className="post-box d-flex justify-content-between align-items-center">
      <div>{currentRecipe.name}</div>
      <div>${currentRecipe.estimate}</div>
    </li>
  );
};

export default RecipeItem;