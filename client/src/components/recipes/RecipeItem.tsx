import { useContext, useState, useEffect } from "react";
import { Recipe } from "../../types/types";
import { RecipeContext } from "../../context/RecipeContext";
import './RecipeItem.css'
import { Link } from "react-router-dom";

const RecipeItem = (currentRecipe: Recipe) => {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const { favorites, setFavorites } = useContext(RecipeContext);

  const handleFavoriteClick = (id: number) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
    );

    setRecipes([...updatedRecipes]);
  }

  useEffect(() => {
    const updatedFavorites = recipes.filter(recipe => recipe.favorite);
    setFavorites(updatedFavorites);
  }, [recipes]);

  return (
    <div className="post-box">
      <div className="user-inf">
        <div className="close">
          <img src='/profile.svg' />
          Username
        </div>
        <button className='like-button' onClick={() => handleFavoriteClick(currentRecipe.id)}>
          <img src={!currentRecipe.favorite ? "/like-unliked.svg" : "/Heart.svg"} alt="Button Image" />
        </button>
      </div>
      <br />
      <div className="post-name">{currentRecipe.name}</div>
      <br />
      <div className='post-est-ingr'>Estimate: {currentRecipe.estimate} minutes
        <br />Ingredients: {currentRecipe.ingredients.join(', ')}
      </div>

      <div className='post-see-details'><Link to={`/home/recipe/${currentRecipe.id}`}>...See Details</Link></div>
      <div>
        <img src={currentRecipe.result} className="post-img" />
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