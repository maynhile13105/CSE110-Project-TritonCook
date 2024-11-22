import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import { AppContext } from '../../context/AppContext';
import RecipeItem from '../recipes/RecipeItem';
import { fetchFavoriteRecipes } from '../../utils/favorite-utils';
import { Recipe } from '../../types/types';

const SavedFavoriteRecipeList = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]); 
  const {userProfile} = useContext(AppContext);

  useEffect(() => {
    loadFavoriteRecipes();
  }, []); 

  const loadFavoriteRecipes = async () => {
      try {
          const favRecipesList = await fetchFavoriteRecipes(userProfile.id); // Fetch displayed recipes
          
          setFavoriteRecipes(favRecipesList); //Set to favRecipesList

      } catch (error) {
          console.error("Error fetching recipes:", error);
      }
  };
  console.log("Fav List: ", favoriteRecipes);
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