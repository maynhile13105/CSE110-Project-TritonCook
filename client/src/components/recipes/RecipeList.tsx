import React from 'react';
import { useContext } from "react";
import RecipeItem from './RecipeItem';
import './RecipeList.css';
import { AppContext } from '../../context/AppContext';

const RecipeList = () => {
  const {recipes} = useContext(AppContext); 
  return (
    <div className='recipes-container'>
      {recipes.map((recipe) => (
        <div className='post-item'>
          <RecipeItem key={recipe.id} id={recipe.id} title={recipe.title} estimate={recipe.estimate} ingredients={recipe.ingredients} result_image={recipe.result_image} userID={recipe.userID} cuisine={recipe.cuisine}></RecipeItem>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;