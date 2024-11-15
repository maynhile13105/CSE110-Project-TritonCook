import React from 'react';
import { useContext } from "react";
import { RecipeContext } from '../../context/RecipeContext';
import RecipeItem from '../recipes/RecipeItem';

const SavedList = () => {
  const {favorites} = useContext(RecipeContext); 
  return (
    <div className='recipes-container'>
      {favorites.map((favorite) => (
        <div className='post-item'>
          <RecipeItem key={favorite.id} id={favorite.id} name={favorite.name} estimate={favorite.estimate} 
          ingredients={favorite.ingredients} result={favorite.result} favorite={favorite.favorite}></RecipeItem>
        </div>
      ))}
    </div>
  );
};

export default SavedList;