import { useContext, useEffect, useState } from "react";
import { Profile, Recipe, recipeInstruction } from "../../types/types";
import './RecipeItem.css';
import { Link, useParams } from "react-router-dom";
import { addFavoriteRecipe, deleteFavoriteRecipe } from "../../utils/favorite-utils";
import { AppContext, initialState } from "../../context/AppContext";
import { fetchProfileUsingID } from "../../utils/userInfo-utils";
import { addLike, fetchNumberOfLikes, removeLike } from "../../utils/like-utils";
import { deleteRecipe, fetchRecipeInfo, fetchRecipeInstructions } from "../../utils/post-utils";
import { API_BASE_URL } from "../../constants/constants";

const RecipeExpand = () => {

  const { recipeID } = useParams(); //Get userID from the URL
  const [currentStep, setCurrentStep] = useState(0);
  
  const [recipeInfo, setRecipeInfo] = useState<Recipe>({
    id: "",
    userID: "",
    title: "",
    ingredients: "",
    estimate: 0, // Default number
    cuisine: "",
    result_img: "",
    time: "",
  });
  const [recipeInstructions, setRecipeInstructions] = useState<recipeInstruction[]>([]);
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
  //Get recipe information
  useEffect(()=>{
    if(recipeID){
        loadRecipeInfo(recipeID);
        loadRecipeInstructions(recipeID);
    }
  }, [recipeID])
  
  const loadRecipeInfo = async (recipeID: string) => {
    try{
        const info = await fetchRecipeInfo(recipeID); //Fetch recipe from backend
        console.log("Fetched recipe informations: ", info);
        setRecipeInfo(info);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
  const loadRecipeInstructions = async (recipeID: string) => {
    try{
        const instructions = await fetchRecipeInstructions(recipeID); //Fetch recipe from backend
        console.log("Fetched recipe instructions: ", instructions);
        setRecipeInstructions(instructions);
    } catch (error) {
      console.error("Error fetching recipe's instructions:", error);
    }
  };

  //Get recipe owner's username
  const [recipeOwner, setRecipeOwner] = useState<Profile>(initialState.userProfile); //state for handling recipe's owner username - initial: null
  useEffect(()=>{
    loadOwnerProfile();
  }, [recipeInfo.userID]);

  const loadOwnerProfile = async () => {
    try {
        const ownerProfile = await fetchProfileUsingID(recipeInfo.userID); // Fetch displayed recipes from backend
        //console.log("Fetched recipe's owner username in frontend:", ownerProfile);  // Log the recipes
        setRecipeOwner(ownerProfile);
    } catch (error) {
        console.error("Error fetching owner reicpes's profile:", error);
    }
  };

  // State for handling favorite status
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const isFavoriteStatus = favoriteRecipes.some((fav) => fav.id === recipeInfo.id); //initial favorite status state
    setIsFavorite(isFavoriteStatus); //set initial status
  }, [favoriteRecipes, recipeInfo.id]);

  //Fetching owner's avatar
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    if (recipeOwner.picture) {
      if(recipeOwner.picture.startsWith("/uploads/avatar/")){
        let path = `${API_BASE_URL}${recipeOwner.picture}`;
        //console.log(path);
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
      addFavoriteRecipe(recipeInfo.id); //add into database
      setFavoriteRecipes((prev) => [recipeInfo, ...prev]); //add to the list
    } else {
      deleteFavoriteRecipe(recipeInfo.id); // remove out of database
      setFavoriteRecipes((prevFavorites) =>
        prevFavorites.filter((recipe) => recipe.id !== recipeInfo.id)
      );//remove out of list
    }
  };

  //like functionality
  const {likedRecipes ,setLikedRecipes} = useContext(AppContext); // All the recipes that user liked
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0); //Get the number of likes per recipe
  const [isLiked, setIsLiked] = useState<boolean>(false); // Status that the user liked this recipe or not

  useEffect(() => {
   loadNumberOfLikes(); 
  }, [recipeInfo.id]);
  //console.log(`Liked Recipes in Recipe Item: ${likedRecipes}`);
  useEffect(() => {
    const isLikeStatus = likedRecipes.some((recipe) => recipe.id === recipeInfo.id);
    //console.log(`${currentRecipe.id}: ${isLikeStatus}`);
    setIsLiked(isLikeStatus);
  }, [likedRecipes, recipeInfo.id]);


  const loadNumberOfLikes = async () => {
   try {
     const count = await fetchNumberOfLikes(recipeInfo.id); // Fetch number of likes
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
      addLike(recipeInfo.id);
      newNumberOfLikes += 1;
      setNumberOfLikes(newNumberOfLikes);
      setLikedRecipes((prev) => [recipeInfo, ...prev]);
    } else {
      removeLike(recipeInfo.id);
      newNumberOfLikes -= 1;
      setNumberOfLikes(newNumberOfLikes);
      setLikedRecipes((prev) =>
      prev.filter((recipe) => recipe.id !== recipeInfo.id)
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

  /*
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
  */

  // Handlers for instruction navigation
  const goToNextStep = () => {
    if (currentStep < recipeInstructions.length - 1) {
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
      <div className="post-name">{recipeInfo.title}</div>
      <br />
      <div className="post-est-ingr">
        Estimate: {recipeInfo.estimate} minutes
        <br />
        Ingredients: {recipeInfo.ingredients}
      </div>
      <div>
        Instructions:
        <div className="instruction-step">
          <div className="instruction-content">
            <button onClick={goToPreviousStep} disabled={currentStep === 0} className="side-button right-button">
              &lt;
            </button>
            {recipeInstructions[currentStep] && (
              <div className="img-and-ins">
                <div className="description">
                  <p>Step {currentStep}: {recipeInstructions[currentStep].description}</p>
                </div>

                <img
                src={recipeInstructions[currentStep].img||"/images/no-images.jpg"}
                className="post-img"
                alt={`Step ${currentStep + 1}`}
                />
              </div>
            )}
            {currentStep===recipeInstructions.length && (
              <div className="img-and-ins">
                <div className="description">
                  <p>Result</p>
                </div>

                <img
                src={recipeInfo.result_img||"/images/no-images.jpg"}
                className="post-img"
                alt={`Result Image`}
                />
              </div>
            )}

            <button onClick={goToNextStep} disabled={currentStep === recipeInstructions.length - 1}
              className="side-button right-button">
              &gt;
            </button>
          </div>
        </div>
      </div>
      
      <br />
        <div className="horizontal-line"></div>
            <div className="user-inf">
                <img src='/Like.svg' />
                <img src='/Comment.svg' />
                <img src='/Report.svg' />
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
          <a style={{fontSize: "20px"}}>{numberOfLikes}</a>
        </div>
        
        <img src="/Comment.svg" alt="Comment" onClick={() => handlePopup("Comments will be available soon!")}/>

        <button className={userProfile.name === recipeOwner.name ? 'visible' : "hidden"} 
          id="delete-button" 
          onClick={() => handleDeleteClick(recipeInfo)}
        >
          <img 
            src={"/images/trashcan-icon.svg"}
            alt="Delete Image"
            style={{width: "30px"}}
          />
        </button>

          <button 
            className={userProfile.name === recipeOwner.name ? 'hidden' : "visible"} 
            id="report-button" 
            onClick={() => handlePopup("Reports will be available soon!")}
          >
            <img 
              src="/Report.svg" 
              alt="Report"
              style={{width: "30px"}}
            />
          </button>
      </div>

        {showCommentOrReportPopup && (
          <div className="notif-popup">
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

export default RecipeExpand;


