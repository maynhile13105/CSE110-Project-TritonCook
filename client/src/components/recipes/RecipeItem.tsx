import { useContext, useEffect, useState } from "react";
import { Recipe } from "../../types/types";
import './RecipeItem.css'
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";


const RecipeItem = (currentRecipe: Recipe) => {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(AppContext)
  
  //Save Favorite Button
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (id: string) => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if(isFavorite && !favoriteRecipes.includes(currentRecipe)){
      setFavoriteRecipes((prev) => [...prev, currentRecipe]);
    } else if(!isFavorite && favoriteRecipes.includes(currentRecipe)) {
      setFavoriteRecipes((prev) => prev.filter((recipe) => recipe != currentRecipe));
    }
  }, [isFavorite]);

  return (
    <div className="post-box">
      <div className="user-inf">
        <div className="close">
          <img src='/profile.svg' />
          Username
        </div>
        <button className='like-button' onClick={() => handleFavoriteClick(currentRecipe.id)}>
          <img src={!isFavorite ? "images/like-unliked.svg" : "images/Heart.svg"} alt="Button Image" />
        </button>
      </div>
      <br />
      <div className="post-name">{currentRecipe.title}</div>
      <br />
      <div className='post-est-ingr'>Estimate: {currentRecipe.estimate} minutes
        <br />Ingredients: {currentRecipe.ingredients}
      </div>

      <div className='post-see-details'><Link to={`/home/recipe/${currentRecipe.id}`}>...See Details</Link></div>
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