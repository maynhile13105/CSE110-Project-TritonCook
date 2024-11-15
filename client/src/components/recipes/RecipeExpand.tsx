import { useContext } from "react";
import { useParams } from 'react-router-dom';
import { RecipeContext } from '../../context/RecipeContext';
import { Recipe } from '../../types/types';
import RecipeItem from './RecipeItem';
import './RecipeList.css';

const RecipeExpand = () => {
    const params = useParams<{ id: string }>();
    const id = Number(params.id);

    const { recipes, setRecipes } = useContext(RecipeContext);

    const recipe = recipes.find((r) => r.id === id);  
    return (
    <div>
        Recipe
    </div>
    );
};

export default RecipeExpand;