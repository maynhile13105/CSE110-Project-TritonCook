import './App.css';
import {LoginProvider} from './context/LoginContext';
import { LoginHomepage } from './views/LoginHomepage';
import ResetPasswordPage from './views/ResetPasswordPage';
import WelcomePage from './views/WelcomePage';
function App() {
  return (
      <LoginProvider>
        <WelcomePage />
      </LoginProvider>
    
  );
}

export default App;