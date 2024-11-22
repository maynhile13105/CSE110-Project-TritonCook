import React from 'react';
import { useContext } from "react";
import { RecipeContext } from '../../context/RecipeContext';
import RecipeItem from './RecipeItem';
import './RecipeList.css';

const RecipeList = () => {
  const {recipes} = useContext(RecipeContext); 
  return (
    <div className='recipes-container'>
      {recipes.map((recipe) => (
        <div className='post-item'>
          <RecipeItem key={recipe.id} id={recipe.id} title={recipe.title} 
          estimate={recipe.estimate} ingredients={recipe.ingredients} result_img={recipe.result_img}
          cuisine={recipe.cuisine}></RecipeItem>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;