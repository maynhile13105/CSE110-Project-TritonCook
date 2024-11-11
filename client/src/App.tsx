import { Route, Routes } from "react-router-dom";
import { LoginHomepage } from './views/LoginHomepage';
import ResetPasswordPage from './views/ResetPasswordPage';
import WelcomePage from './views/WelcomePage';
import CreateAccountPage from './views/CreateAccountPage';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/home/Home";
import RecipeList from "./components/recipes/RecipeList";
import RecipeDetail from "./components/recipes/RecipeDetail";
import Newsfeed from "./Newsfeed/Newsfeed";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginHomepage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/reset-pass" element={<ResetPasswordPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/home" element={<Newsfeed />} >
          <Route index element={<Home />} />
          <Route path="recipes" element={<RecipeList />} />
          <Route path="recipes/:id" element={<RecipeDetail />} />
        </Route>
      </Routes>
    </div>

  );
}

export default App;
