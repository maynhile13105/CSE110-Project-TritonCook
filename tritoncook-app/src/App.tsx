import './App.css';
import {LoginProvider} from './context/LoginContext';
import { LoginHomepage } from './views/LoginHomepage';
import ResetPasswordPage from './views/ResetPasswordPage';

function App() {
  return (
      <LoginProvider>
        <ResetPasswordPage />
      </LoginProvider>
    
  );
}

export default App;
