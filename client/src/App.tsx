import { Route, Routes } from "react-router-dom";
import LoginHomepage from "./views/Login/LoginHomepage";
import ResetPasswordPage from "./views/Login/ResetPasswordPage";
import WelcomePage from "./views/Login/WelcomePage";
import CreateAccountPage from "./views/Login/CreateAccountPage";
import Newsfeed from "./views/Newsfeed/Newsfeed";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginHomepage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/reset-pass" element={<ResetPasswordPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/home" element={<Newsfeed />} />
      </Routes>
    </div>

  );
}

export default App;
