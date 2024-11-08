import './App.css';
import { Route, Routes } from "react-router-dom";
import {LoginProvider} from './context/LoginContext';
import { LoginHomepage } from './views/LoginHomepage';
import ResetPasswordPage from './views/ResetPasswordPage';
import WelcomePage from './views/WelcomePage';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginHomepage />} />
        <Route path="/login/reset" element={<ResetPasswordPage />} />
      </Routes>
    </div>
    
  );
}

export default App;