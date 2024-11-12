import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { RecipeContext } from '../../context/RecipeContext';
import RecipeItem from './RecipeItem';
import '../../css/RecipeList.css';

const RecipeList = () => {
  const {recipes} = useContext(RecipeContext); 
  return (
    <div className='recipes-container'>
      {recipes.map((recipe) => (
        <div className='post-item'>
          <RecipeItem key={recipe.id} id={recipe.id} name={recipe.name} estimate={recipe.estimate} ingredients={recipe.ingredients} image={recipe.image}></RecipeItem>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;