import React from 'react';
import { useContext } from "react";
import { RecipeContext } from '../../context/RecipeContext';
import RecipeItem from './RecipeItem';
import './AddRecipe.css';

const AddRecipe = () => {
  const {recipes} = useContext(RecipeContext); 
  return (
    <div>
    </div>
  );
};

export default AddRecipe;