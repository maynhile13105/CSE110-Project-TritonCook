import { Route, Routes } from "react-router-dom";
import LoginHomepage from "./views/Login/LoginHomepage";
import ResetPasswordPage from "./views/Login/ResetPasswordPage";
import WelcomePage from "./views/Login/WelcomePage";
import CreateAccountPage from "./views/Login/CreateAccountPage";
import Newsfeed from "./views/Newsfeed/Newsfeed";
import RecipeList from "./components/recipes/RecipeList";
import SearchPage from "./components/searchpage/SearchPage";
import SavedFavoriteRecipeList from "./components/recipes/SavedFavoriteRecipeList";
import { AppProvider } from "./context/AppContext";
import { FilterProvider } from "./context/FilterContext";
import UserProfilePage from "./views/UserProfile/UserProfilePage";
import UserPostedRecipesList from "./components/recipes/UserPostedRecipesList";
import AddRecipe from "./components/recipes/AddRecipe";
import UserInfoPage from "./components/profilePage/UserInfoPage";
import FullViewRecipe from "./components/recipes/FullViewRecipe";
import FriendsPage from "./components/friendsPage/FriendsPage";
import ResultsPage from "./components/results/ResultsPage";
import GuestAccount from "./components/profilePage/GuestAccount";


function App() {
  return (
    <AppProvider>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<LoginHomepage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/reset-pass" element={<ResetPasswordPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/home" element={<Newsfeed />} >
            <Route index element={<RecipeList />} />
            <Route path="favorite" element={<SavedFavoriteRecipeList />} />
            <Route path='add-recipe' element={<AddRecipe />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="friends" element={<FriendsPage />} />
            <Route path="recipe/:recipeID" element={<FullViewRecipe />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="guest-profile" element={<GuestAccount />} />
        </Route >

          <Route path="/profile/:username" element={<UserProfilePage />}>
            <Route index element={<UserPostedRecipesList />} />
            <Route path = "information" element={<UserInfoPage />}></Route>
          </Route>
        </Routes>
      </FilterProvider>
    </AppProvider>
  );
}


export default App;
