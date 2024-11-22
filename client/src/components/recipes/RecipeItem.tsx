import { useContext, useEffect, useState } from "react";
import { Profile, Recipe } from "../../types/types";
import './RecipeItem.css'
import { Link } from "react-router-dom";
import { addFavoriteRecipe, checkIsFavoriteRecipe, deleteFavoriteRecipe, fetchFavoriteRecipes } from "../../utils/favorite-utils";
import { AppContext } from "../../context/AppContext";


const RecipeItem = (currentRecipe: Recipe) => {
    
  const {userProfile} = useContext(AppContext);
  // State for favorite status and initialization
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isInitializedStatus, setIsInitializedStatus] = useState<boolean>(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
        const status = await checkIsFavoriteRecipe(currentRecipe.id); // Fetch displayed recipes
        console.log(`Status get from backend for ${currentRecipe.id} : ${status}`);
        setIsFavorite(status);
        setIsInitializedStatus(true); //Set to favRecipesList
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
};

  const handleFavoriteClick = () => {
    if (!isInitializedStatus){
      return; 
    }  //Skip if not initialized
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (isInitializedStatus){
      if(isFavorite ){
        addFavoriteRecipe(currentRecipe.id);
      } else if (!isFavorite){
        deleteFavoriteRecipe(currentRecipe.id);
      }
    }
  }, [isFavorite, isInitializedStatus]);


  return (
    <div className="post-box">
      <div className="user-inf">
        <div className="close">
          <img src="/profile.svg" alt="Profile" />
          Username
        </div>
        <button className="like-button" onClick={handleFavoriteClick}>
          <img
            src={!isFavorite ? "images/like-unliked.svg" : "images/Heart.svg"}
            alt="Button Image"
          />
        </button>
      </div>
      <br />
      <div className="post-name">{currentRecipe.title}</div>
      <br />
      <div className="post-est-ingr">
        Estimate: {currentRecipe.estimate} minutes
        <br />
        Ingredients: {currentRecipe.ingredients}
      </div>

      <div className="post-see-details">
        <Link to={`/home/recipe/${currentRecipe.id}`}>...See Details</Link>
      </div>
      <div>
        <img src={currentRecipe.result_img} className="post-img" alt="Recipe" />
      </div>
      <div className="horizontal-line"></div>
      <div className="user-inf">
        <img src="/Like.svg" alt="Like" />
        <img src="/Comment.svg" alt="Comment" />
        <img src="/Report.svg" alt="Report" />
      </div>
    </div>
  );
};


export default RecipeItem;