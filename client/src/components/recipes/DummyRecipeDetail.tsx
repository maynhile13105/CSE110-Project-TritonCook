import React from 'react';
import { useParams } from 'react-router-dom';

interface Recipe {
  name: string;
  description: string;
}

const recipes: { [key: number]: Recipe } = {
  1: { name: 'Instant Ramen', description: 'Most nutritious meal.' },
  2: { name: 'Frozen Pizza', description: 'Fancy delicacy from Italy.' },
  3: { name: 'Apple', description: 'Keeps the doctor away.' },
};

const DummyRecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes[Number(id)];

  return (
    <div>
      {recipe ? (
        <>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
        </>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
};

export default DummyRecipeDetail;
