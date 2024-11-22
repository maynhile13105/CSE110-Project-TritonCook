import { Route, Routes } from "react-router-dom";
import LoginHomepage from "./views/Login/LoginHomepage";
import ResetPasswordPage from "./views/Login/ResetPasswordPage";
import WelcomePage from "./views/Login/WelcomePage";
import CreateAccountPage from "./views/Login/CreateAccountPage";
import Newsfeed from "./views/Newsfeed/Newsfeed";
import RecipeList from "./components/recipes/RecipeList";
import SearchPage from "./components/searchpage/SearchPage";
import SavedFavoriteRecipeList from "./components/savedFavoriteRecipeList/SavedFavoriteRecipeList";
import { AppProvider } from "./context/AppContext";


function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<LoginHomepage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/reset-pass" element={<ResetPasswordPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/home" element={<Newsfeed />} >
          <Route index element={<RecipeList />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="favorite" element={<SavedFavoriteRecipeList />} />
        </Route >
      </Routes>
    </AppProvider>

  );
}

export default App;
