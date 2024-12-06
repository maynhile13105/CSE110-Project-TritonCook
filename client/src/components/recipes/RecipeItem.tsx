import { useContext, useEffect, useState } from "react";
import { Profile, Recipe } from "../../types/types";
import './RecipeItem.css';
import { Link } from "react-router-dom";
import { addFavoriteRecipe, deleteFavoriteRecipe } from "../../utils/favorite-utils";
import { AppContext, initialState } from "../../context/AppContext";
import { fetchProfileUsingID } from "../../utils/userInfo-utils";
import { addLike, fetchNumberOfLikes, removeLike } from "../../utils/like-utils";
import { deleteRecipe } from "../../utils/post-utils";
import { API_BASE_URL } from "../../constants/constants";

interface RecipeItemProps {
  currentRecipe: Recipe;
};

const RecipeItem: React.FC<RecipeItemProps> = ({ currentRecipe }) => {
  console.log("Recipe: ", currentRecipe);

  const [resultImg, setResultImg] = useState("");
  useEffect(() => {
    //load result image
    if (currentRecipe.result_img) {
      if(currentRecipe.result_img.startsWith("/uploads/recipes/results")){
        let path = `${API_BASE_URL}${currentRecipe.result_img}`;
        console.log("result img path:", path);
        setResultImg(path);
      } else{
        setResultImg(currentRecipe.result_img);
      };      
    }
  }, [])
  //State for user's profile
  const {userProfile} = useContext(AppContext);

  // State for favorite recipes list
  const { favoriteRecipes, setFavoriteRecipes } = useContext(AppContext);

  //State for recipes list on news feed
  const { setNewsfeedRecipes } = useContext(AppContext);

  //State for recipes list that the user posted
  const { setPostedRecipes} = useContext(AppContext);
  // State for modal visibility
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  //Get token from localStorage to check if user is logged in
  const token = localStorage.getItem("token");

  const [showCommentOrReportPopup, setShowCommentOrReportPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  //Get recipe owner's username
  const [recipeOwner, setRecipeOwner] = useState<Profile>(initialState.userProfile); //state for handling recipe's owner username - initial: null
  useEffect(()=>{
    loadOwnerProfile();
  }, [currentRecipe.userID]);

  const loadOwnerProfile = async () => {
    try {
        const ownerProfile = await fetchProfileUsingID(currentRecipe.userID); // Fetch displayed recipes from backend
        console.log("Fetched recipe's owner username in frontend:", ownerProfile);  // Log the recipes
        setRecipeOwner(ownerProfile);
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

  //Fetching owner's avatar
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    if (recipeOwner.picture) {
      if(recipeOwner.picture.startsWith("/uploads/avatar/")){
        let path = `${API_BASE_URL}${recipeOwner.picture}`;
        console.log("Result: ", path);
        setAvatar(path);
      } else{
        setAvatar(recipeOwner.picture);
      };      
    };      
  }, [recipeOwner]); // Depend on recipeOwner.picture to update avatar


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
  //console.log(`Liked Recipes in Recipe Item: ${likedRecipes}`);
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
  //Delete functionality

  //visibility of the delete confirmation modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  
  //state stores which recipe is being considered for deletion
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);
  const handleDeleteClick = (recipe:Recipe) => {
    setRecipeToDelete(recipe); // Store the recipe to be deleted
    setIsDeleteModalVisible(true); // Show the delete confirmation modal
  };

  //Delete Confirmation Modal
  const handleDeleteConfirmation = async () => {
    if (recipeToDelete) {
      // Perform the delete operation (you can call an API to delete from the database)
      // Delete from the database
      await deleteRecipe(recipeToDelete.id); 
      setPostedRecipes(prev => prev.filter(recipe => recipe.id !== recipeToDelete.id)); // Update local state
      setFavoriteRecipes(prev => prev.filter(recipe => recipe.id !== recipeToDelete.id)); // Update local state
      setNewsfeedRecipes(prev => prev.filter(recipe => recipe.id !== recipeToDelete.id)); // Update local state
    }
    setIsDeleteModalVisible(false); // Close the modal
    setRecipeToDelete(null); // Clear the recipe to delete
  };
  
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false); // Close the modal without doing anything
    setRecipeToDelete(null); // Clear the recipe to delete
  };

  const handlePopup = (message: string) => {
    setPopupMessage(message);
    setShowCommentOrReportPopup(true);
    setTimeout(() => {
      setShowCommentOrReportPopup(false); // Hide after 3 seconds
    }, 3000);
  };
  return (
    <div className="post-box">
      <div className="user-inf">
        <div className="close">
          {avatar? 
            (<img className="avatar-on-recipe" src={avatar} alt="owner-avatar" />)
            :
            (<img src="/images/profile.svg" alt="defaultprofile" className="defaultprofile"  id="default-avatar-on-recipe" />)
          }
          <Link to={`/profile/${recipeOwner.name}`} className="recipe-owner">{recipeOwner.name}</Link>
        </div>
        <button className="fav-button" onClick={handleFavoriteClick}>
          <img
            src={isFavorite ? "/images/Heart.svg" : "/images/unfavorite.svg"}
            alt="Button Image"
          />
        </button>
      </div>
      <br />
      <div className="post-name">{currentRecipe.title}</div>
      <br />
      <div className="post-est-ingr">
        Estimate: {currentRecipe.estimate}
        <br />
        Ingredients: {currentRecipe.ingredients}
        <br />
        Cuisine: {currentRecipe.cuisine}
      </div>

      <div className="post-see-details">
        <Link to={`/home/recipe/${currentRecipe.id}`}>...See Details</Link>
      </div>
      <div>
        <img src={resultImg} className="post-img" alt="Recipe" />
      </div>
      <div className="horizontal-line"></div>
      <div className="user-inf">
        <div className="like-container">
          <button className="like-button" onClick={handleLikeClick}>
            <img
              src={isLiked ? "/images/colored-thumbs-up.svg" : "/images/uncolored-thumbs-up.svg"}
              alt={isLiked ? "Like button Image" : "Unlike button image"}
              style={{width : "40px"}}
            />
          </button>
          <a style={{fontSize: "25px"}}>{numberOfLikes}</a>
        </div>
        
        <div className="comment-button" role="button" onClick={() => handlePopup("Comments will be available soon!")}>
          <img src="/Comment.svg" alt="Comment" style={{width : "40px"}}/>
        </div>

        <button className={userProfile.name === recipeOwner.name ? 'visible' : "hidden"} 
          id="delete-button" 
          onClick={() => handleDeleteClick(currentRecipe)}
        >
          <img src={"/images/trashcan-icon.svg"} alt="Delete Image" style={{width: "35px"}} />
        </button>

          <button 
            className={userProfile.name === recipeOwner.name ? 'hidden' : "visible"} 
            id="report-button" 
            onClick={() => handlePopup("Reports will be available soon!")}
          >
            <img src="/Report.svg" alt="Report" style={{width: "40px"}} />
          </button>
      </div>

        {showCommentOrReportPopup && (
          <div className="recipe-notif-popup">
            {popupMessage}
          </div>
        )}


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

      {/* Delete Confirmation Modal */}
      {isDeleteModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Are you sure you want to delete this recipe?</h2>
            <p>This action cannot be undone.</p>
            <button onClick={handleDeleteCancel}>Cancel</button>
            <button onClick={handleDeleteConfirmation}>Yes, Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeItem;


