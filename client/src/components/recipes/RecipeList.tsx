import React from 'react';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { Recipe } from '../../types/types';
import { RecipeContext } from '../../context/RecipeContext';
import RecipeItem from './RecipeItem';
import './RecipeList.css'

const RecipeList = () => {
  const {recipes, setRecipes} = useContext(RecipeContext); 
  return (
    <div className='main-div'>
      <ul className='post-list'>
        {recipes.map((recipe) => (
          <li key={recipe.id} >
            <RecipeItem id={recipe.id} name={recipe.name} estimate={recipe.estimate} ingredients={recipe.ingredients} image={recipe.image}></RecipeItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;