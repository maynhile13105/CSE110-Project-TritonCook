import { useContext, useEffect, useState } from "react";
import { Profile, Recipe } from "../../types/types";
import './RecipeItem.css';
import { Link } from "react-router-dom";
import { addFavoriteRecipe, deleteFavoriteRecipe } from "../../utils/favorite-utils";
import { AppContext } from "../../context/AppContext";
import { fetchUsername } from "../../utils/userInfo-utils";
import { addLike, fetchNumberOfLikes, removeLike } from "../../utils/like-utils";

interface RecipeItemProps {
  currentRecipe: Recipe;
};

const RecipeItem: React.FC<RecipeItemProps> = ({ currentRecipe }) => {
  // State for favorite recipes list
  const { favoriteRecipes, setFavoriteRecipes } = useContext(AppContext);

  // State for modal visibility
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  //Get token from localStorage to check if user is logged in
  const token = localStorage.getItem("token");


  //Get recipe owner's username
  const [ownerUsername, setownerUsername] = useState<string>(""); //state for handling recipe's owner username
  useEffect(()=>{
    loadOwnerUsername();
  }, [currentRecipe.userID]);

  const loadOwnerUsername = async () => {
    try {
        const ownername = await fetchUsername(currentRecipe.userID); // Fetch displayed recipes from backend
        //console.log("Fetched recipe's owner username in frontend:", ownername);  // Log the recipes
        setownerUsername(ownername);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
  };

  // State for handling favorite status
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const isFavoriteStatus = favoriteRecipes.some((fav) => fav.id === currentRecipe.id); //initial favorite status state
    setIsFavorite(isFavoriteStatus); //set initial status
  }, [favoriteRecipes, currentRecipe.id]);

  //Handle Favorite Button Click
  const handleFavoriteClick = () => {
    if (!token) {
      // Show the popup if the user is not logged in
      setIsModalVisible(true);
      return;
    }

    const newFavoriteStatus = !isFavorite; //Toggle favorite status state 
    setIsFavorite(newFavoriteStatus); //Set new state

    //if new favorite status state is true, add this recipe to the user's list of favorite recipes and also add data to database
    //else remove this recipe out of the user's list of favorite recipes and remove data out of database
    if (newFavoriteStatus) {
      addFavoriteRecipe(currentRecipe.id); //add into database
      setFavoriteRecipes((prev) => [currentRecipe, ...prev]); //add to the list
    } else {
      deleteFavoriteRecipe(currentRecipe.id); // remove out of database
      setFavoriteRecipes((prevFavorites) =>
        prevFavorites.filter((recipe) => recipe.id !== currentRecipe.id)
      );//remove out of list
    }
  };

  //like functionality
  const {likedRecipes ,setLikedRecipes} = useContext(AppContext); // All the recipes that user liked
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0); //Get the number of likes per recipe
  const [isLiked, setIsLiked] = useState<boolean>(false); // Status that the user liked this recipe or not

  useEffect(() => {
   loadNumberOfLikes(); 
  }, [currentRecipe.id]);
  console.log(`Liked Recipes in Recipe Item: ${likedRecipes}`);
  useEffect(() => {
    const isLikeStatus = likedRecipes.some((recipe) => recipe.id === currentRecipe.id);
    //console.log(`${currentRecipe.id}: ${isLikeStatus}`);
    setIsLiked(isLikeStatus);
  }, [likedRecipes, currentRecipe.id]);


  const loadNumberOfLikes = async () => {
   try {
     const count = await fetchNumberOfLikes(currentRecipe.id); // Fetch number of likes
     setNumberOfLikes(count);
   } catch (error) {
     console.error("Error fetching number of likes:", error);
   }
  };

  const handleLikeClick = () => {
    if (!token) {
      // Show the popup if the user is not logged in
      setIsModalVisible(true);
      return;
    }

    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    let newNumberOfLikes = numberOfLikes;
   
    if (newLikeStatus) {
      addLike(currentRecipe.id);
      newNumberOfLikes += 1;
      setNumberOfLikes(newNumberOfLikes);
      setLikedRecipes((prev) => [currentRecipe, ...prev]);
    } else {
      removeLike(currentRecipe.id);
      newNumberOfLikes -= 1;
      setNumberOfLikes(newNumberOfLikes);
      setLikedRecipes((prev) =>
      prev.filter((recipe) => recipe.id !== currentRecipe.id)
    );
   }
  };




  return (
    <div className="post-box">
      <div className="user-inf">
        <div className="close">
          <img src="/profile.svg" alt="Profile" />
          {ownerUsername}
        </div>
        <button className="fav-button" onClick={handleFavoriteClick}>
          <img
            src={isFavorite ? "images/Heart.svg" : "images/unfavorite.svg"}
            alt="Button Image"
          ></img>
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
        <div className="like-container">
          <button className="like-button" onClick={handleLikeClick}>
            <img
              src={isLiked ? "images/colored-thumbs-up.svg" : "images/uncolored-thumbs-up.svg"}
              alt={isLiked ? "Like button Image" : "Unlike button image"}
              style={{width : "40px"}}
            ></img>
          </button>
          <p style={{fontSize: "20px"}}>{numberOfLikes} {numberOfLikes>0? "likes" : "like"}</p>
        </div>
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
              <button>Sign in</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeItem;
