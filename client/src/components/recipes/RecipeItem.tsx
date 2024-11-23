import { useContext, useEffect, useState } from "react";
import { Profile, Recipe } from "../../types/types";
import './RecipeItem.css'
import { Link } from "react-router-dom";
import { addFavoriteRecipe, deleteFavoriteRecipe } from "../../utils/favorite-utils";


interface RecipeItemProps {
  currentRecipe: Recipe;
  initialFavoriteStatus: boolean;
  onFavoriteToggle?: (recipeId: string) => void;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ currentRecipe, initialFavoriteStatus, onFavoriteToggle,}) => {

  // State for favorite status and initialization
  const [isFavorite, setIsFavorite] = useState<boolean>(initialFavoriteStatus);

  const handleFavoriteClick = () => {
  
    const newFavoriteStatus = !isFavorite;

    setIsFavorite(newFavoriteStatus); // Update state

    // Call appropriate API based on the new favorite status
    if (newFavoriteStatus) {
      addFavoriteRecipe(currentRecipe.id);
    } else {
      deleteFavoriteRecipe(currentRecipe.id);
      if (onFavoriteToggle) {
        onFavoriteToggle(currentRecipe.id); // Notify parent about the change
      }
    }
  };
  

  return (
    <div className="post-box">
      <div className="user-inf">
        <div className="close">
          <img src="/profile.svg" alt="Profile" />
          Username
        </div>
        <button className="like-button" onClick={handleFavoriteClick}>
          <img
            src={isFavorite ? "images/Heart.svg" : "images/like-unliked.svg"}
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