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

    console.log("Updated Recipes:", updatedRecipes);

    setRecipes([...updatedRecipes]);
    setFavorites([...favorites, currentRecipe]);
  }

  useEffect(() => {
    console.log("Rendering RecipeItem with recipe:", currentRecipe);
  }, [currentRecipe.favorite]); 

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
        {/* <img src='' /> */}
      </div>
      <br />
      <div className="post-name">{currentRecipe.name}</div>
      <br />
      <div className='post-est-ingr'>Estimate: {currentRecipe.estimate} minutes
        <br />Ingredients: {currentRecipe.ingredients.join(', ')}
      </div>

      <div className='post-see-details'><Link to={"#"}>...See Details</Link></div>
      <div>
        <img src={currentRecipe.image} className="post-img" />
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