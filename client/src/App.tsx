import { Route, Routes } from "react-router-dom";
import LoginHomepage from "./views/Login/LoginHomepage";
import ResetPasswordPage from "./views/Login/ResetPasswordPage";
import WelcomePage from "./views/Login/WelcomePage";
import CreateAccountPage from "./views/Login/CreateAccountPage";
import Newsfeed from "./views/Newsfeed/Newsfeed";
import RecipeList from "./components/recipes/RecipeList";
import SearchPage from "./components/searchpage/SearchPage";
import SuccessfulRegister from "./components/loginForm/SuccessfulRegister";
import GuestAccount from "./components/accountpage/GuestAccount";
import UserProfilePage from "./components/accountpage/UserProfilePage";
import Newsfeed_NavBar from "./views/Newsfeed/Newsfeed_NavBar";
import UserInfoPage from "./components/accountpage/UserInfoPage";
import EditUserInfo from "./components/accountpage/EditUserInfo";
import FriendProfilePage from "./components/accountpage/FriendProfilePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginHomepage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/reset-pass" element={<ResetPasswordPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/successful-register" element={<SuccessfulRegister />} />
        <Route path="/guest-account" element={<GuestAccount />} />
        <Route path="/home" element={<Newsfeed />} >
          <Route index element={<RecipeList />} />
          <Route path="search" element={<SearchPage />} />
        </Route >
          <Route path="/home" element={<Newsfeed_NavBar />} >
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="info" element={<UserInfoPage />} />
          <Route path="edit" element={<EditUserInfo />} />
          <Route path="friends" element={<FriendProfilePage />} />
        </Route>
      </Routes>
    </div>

  );
}


export default App;
