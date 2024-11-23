import { useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { RecipeContext } from '../../context/RecipeContext';
import { Recipe } from '../../types/types';
import RecipeItem from './RecipeItem';
import './RecipeExpand.css';

const RecipeExpand = () => {
    const params = useParams<{ id: string }>();
    const id = Number(params.id);

    const { recipes, setRecipes, favorites, setFavorites } = useContext(RecipeContext);
    const [currentStep, setCurrentStep] = useState(0);

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
     // Handlers for instruction navigation
    const goToNextStep = () => {
      if (currentStep < recipe.instructions.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    };

    const goToPreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

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
                <div className="instruction-step">
                    <div className="instruction-content">
                      <button onClick={goToPreviousStep} disabled={currentStep === 0} className="side-button right-button">
                        &lt;
                      </button>
                      {recipe.instructions[currentStep] && (
                        <img
                            src={recipe.instructions[currentStep]}
                            className="post-img"
                            alt={`Step ${currentStep + 1}`}
                        />
                        )}
                      <button onClick={goToNextStep} disabled={currentStep === recipe.instructions.length - 1}
                      className="side-button right-button">
                            &gt;
                        </button>
                    </div>
                </div>
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