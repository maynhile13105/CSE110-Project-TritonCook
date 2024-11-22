import { useContext, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { RecipeContext } from '../../context/RecipeContext';
import { Recipe } from '../../types/types';
import RecipeItem from './RecipeItem';
import './RecipeExpand.css';

const RecipeExpand = () => {
    const params = useParams<{ id: string }>();
    const id = Number(params.id);

    const { recipes, setRecipes, favorites, setFavorites } = useContext(RecipeContext);

    const handleFavoriteClick = (id: number) => {
        const updatedRecipes = recipes.map((recipe) =>
            recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
        );

        setRecipes([...updatedRecipes]);
    }

    useEffect(() => {
        const updatedFavorites = recipes.filter(recipe => recipe.favorite);
        setFavorites(updatedFavorites);
    }, [recipes]);

    const recipe = recipes.filter((r) => r.id === id)[0];
    console.log(recipe);

    return (
        <div className="post-box">
            <div className="user-inf">
                <div className="close">
                    <img src='/profile.svg' />
                    Username
                </div>
                <button className='like-button' onClick={() => handleFavoriteClick(recipe.id)}>
                    <img src={!recipe.favorite ? "/like-unliked.svg" : "/Heart.svg"} alt="Button Image" />
                </button>
            </div>
            <br />
            <div className="post-name">{recipe.name}</div>
            <br />
            <div className='post-est-ingr'>Estimate: {recipe.estimate} minutes
                <br />Ingredients: {recipe.ingredients.join(', ')}
            </div>
            <br />
            <div>
                Instructions:
                {recipe.instructions.map((instr) => (
                    <div>
                        <img src={instr} className='post-img' />
                    </div>
                ))}
            </div>
            <br />
            <div>
                Results:
                <br/>
                <img src={recipe.result} className="post-img" />
            </div>
            <div className="horizontal-line"></div>
            <div className="user-inf">
                <img src='/Like.svg' />
                <img src='/Comment.svg' />
                <img src='/Report.svg' />
            </div>
        </div>
    );
};

export default RecipeExpand;