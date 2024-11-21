import React from 'react';
import { useContext } from "react";
import { AppContext } from '../../context/AppContext';
import RecipeItem from '../recipes/RecipeItem';

const SavedFavoriteRecipeList = () => {
  const {favoriteRecipes} = useContext(AppContext); 
  const {account} = useContext(AppContext);

  console.log('userID: ', account.id);
  return (
    <div className='recipes-container'>
      {favoriteRecipes.map((recipe) => (
        <div className='post-item'>
          <RecipeItem key={recipe.id} id={recipe.id} title={recipe.title} estimate={recipe.estimate}
          ingredients={recipe.ingredients} result_img={recipe.result_img} userID={recipe.userID} cuisine={recipe.cuisine} time={recipe.time}></RecipeItem>
        </div>
      ))}
    </div>
  );
};

export default SavedFavoriteRecipeList;