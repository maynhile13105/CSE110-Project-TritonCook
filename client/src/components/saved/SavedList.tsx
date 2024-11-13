import React from 'react';
import { useContext } from "react";
import { RecipeContext } from '../../context/RecipeContext';

const SavedList = () => {
  const {recipes} = useContext(RecipeContext); 
  return (
    <div className='recipes-container'>
      {recipes.map((recipe) => (
        <div className='post-item'>
            Test
        </div>
      ))}
    </div>
  );
};

export default SavedList;