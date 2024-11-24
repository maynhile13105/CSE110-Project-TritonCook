import { useContext, useEffect, useState } from "react";
import { Profile, Recipe } from "../../types/types";
import './RecipeItem.css';
import { Link } from "react-router-dom";
import { addFavoriteRecipe, deleteFavoriteRecipe } from "../../utils/favorite-utils";
import { AppContext } from "../../context/AppContext";

interface RecipeItemProps {
  currentRecipe: Recipe;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ currentRecipe }) => {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(AppContext);

  // State for handling favorite status
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // State for modal visibility
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const isFavoriteStatus = favoriteRecipes.some((fav) => fav.id === currentRecipe.id);
    setIsFavorite(isFavoriteStatus);
  }, [favoriteRecipes, currentRecipe.id]);

  const handleFavoriteClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Show the popup if the user is not logged in
      setIsModalVisible(true);
      return;
    }

    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    if (newFavoriteStatus) {
      addFavoriteRecipe(currentRecipe.id);
      setFavoriteRecipes((prev) => [currentRecipe, ...prev]);
    } else {
      deleteFavoriteRecipe(currentRecipe.id);
      setFavoriteRecipes((prevFavorites) =>
        prevFavorites.filter((recipe) => recipe.id !== currentRecipe.id)
      );
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

      {/* Modal for not logged in */}
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Login Required</h2>
            <p>You must log in to use this feature.</p>
            <button onClick={() => setIsModalVisible(false)}>Close</button>
            <Link to="/">
              <button>Go to Login</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeItem;
