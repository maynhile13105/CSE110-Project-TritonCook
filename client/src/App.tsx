import './css/App.css';
import { Route, Routes } from "react-router-dom";
import { LoginHomepage } from './views/LoginHomepage';
import ResetPasswordPage from './views/ResetPasswordPage';
import WelcomePage from './views/WelcomePage';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<LoginHomepage />} />
        <Route path="/reset-pass" element={<ResetPasswordPage />} />
        <Route path="/create-account" />
      </Routes>
    </div>
    
  );
}

export default App;