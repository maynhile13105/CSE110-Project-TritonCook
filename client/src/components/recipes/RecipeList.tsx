import React from 'react';
import { useContext } from "react";
import { RecipeContext } from '../../context/RecipeContext';
import RecipeItem from './RecipeItem';
const RecipeList = () => {
  const {recipes} = useContext(RecipeContext); 
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