import './css/App.css';
import { Route, Routes } from "react-router-dom";
import { LoginHomepage } from './views/LoginHomepage';
import ResetPasswordPage from './views/ResetPasswordPage';
import WelcomePage from './views/WelcomePage';
import CreateAccountPage from './views/CreateAccountPage';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<LoginHomepage />} />
        <Route path="/reset-pass" element={<ResetPasswordPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
      </Routes>
    </div>

  );
}

export default App;