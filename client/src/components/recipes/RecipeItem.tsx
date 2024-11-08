import { useContext } from "react";
import { Recipe } from "../../types/types";
import { RecipeContext } from "../../context/RecipeContext";
import './RecipeItem.css'

const RecipeItem = (currentRecipe: Recipe) => {
  const { recipes, setRecipes } = useContext(RecipeContext);

  return (
    <li className="post-box">
      <div className="user-inf">
        <div className="close">
        <img src='/profile.svg' />
        Username
        </div>
        <img src='/like-unliked.svg' />
      </div>
      <br />
      <div className="post-name">{currentRecipe.name}</div>
      <br />
      <div className='post-est-ingr'>Estimate: {currentRecipe.estimate} minutes
        <br />Ingredients: {currentRecipe.ingredients.join(', ')}
      </div>

      <div className='post-see-details'>...See Details</div>
      <div>
        <img src={currentRecipe.image} className="post-img" />
      </div>
      <div className="horizontal-line"></div>
      <div className="user-inf">
        <img src='/Like.svg' />
        <img src='/Comment.svg' />
        <img src='/Report.svg' />
      </div>
    </li>
  );
};

export default RecipeItem;