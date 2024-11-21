import { useContext } from "react";
import { Recipe } from "../../types/types";
import { RecipeContext } from "../../context/RecipeContext";
import './RecipeItem.css'
import { Link } from "react-router-dom";

const RecipeItem = (currentRecipe: Recipe) => {
  const { recipes, setRecipes } = useContext(RecipeContext);

  return (
    <div className="post-box">
      <div className="user-inf">
        <div className="close">
          <img src='/profile.svg' />
          Username
        </div>
        <img src='/like-unliked.svg' />
      </div>
      <br />
      <div className="post-name">{currentRecipe.title}</div>
      <br />
      <div className='post-est-ingr'>Estimate: {currentRecipe.estimate} minutes
        <br />Ingredients: {currentRecipe.ingredients}
      </div>

      <div className='post-see-details'><Link to={"#"}>...See Details</Link></div>
      <div>
        <img src={currentRecipe.result_image} className="post-img" />
      </div>
      <div className="horizontal-line"></div>
      <div className="user-inf">
        <img src='/Like.svg' />
        <img src='/Comment.svg' />
        <img src='/Report.svg' />
      </div>
    </div>
  );
};

export default RecipeItem;