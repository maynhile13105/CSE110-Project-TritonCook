import React from 'react';
import { Link } from 'react-router-dom';

const recipes = [
  { id: 1, name: 'Instant Ramen' },
  { id: 2, name: 'Frozen Pizza' },
  { id: 3, name: 'Apple' },
];

const RecipeList = () => {
  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;