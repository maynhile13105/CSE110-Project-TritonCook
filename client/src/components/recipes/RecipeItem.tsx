import { useContext, useEffect, useState } from "react";
import { Account, Recipe } from "../../types/types";
import './RecipeItem.css'
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { addFavoriteRecipe, checkIsFavoriteRecipe, deleteFavoriteRecipe } from "../../utils/favorite-utils";


const RecipeItem = (currentRecipe: Recipe) => {
  const { userProfile } = useContext(AppContext);

  console.log("userID: ", userProfile.id);
  console.log("recipeID: ", currentRecipe.id);

  // State for favorite status and initialization
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteInitialized, setIsFavoriteInitialized] = useState(false);

  const fetchFavoriteRecipes = async () => {
    try {
      const favoriteStatus = await checkIsFavoriteRecipe(userProfile.id, currentRecipe.id);
      setIsFavorite(favoriteStatus);
      setIsFavoriteInitialized(true); // Mark initialization complete
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  useEffect(() => {
    fetchFavoriteRecipes();
  }, [userProfile.id, currentRecipe.id]);

  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    if (!isFavoriteInitialized) return; // Skip until initialized

    if (isFavorite) {
      addFavoriteRecipe(userProfile.id, currentRecipe.id).catch((error) => {
        console.error("Failed to add recipe to favorite list!", error);
      });
    } else {
      deleteFavoriteRecipe(userProfile.id, currentRecipe.id).catch((error) => {
        console.error("Failed to remove recipe from favorite list!", error);
      });
    }
  }, [isFavorite, isFavoriteInitialized]);

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