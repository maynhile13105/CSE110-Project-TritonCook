import './App.css';
import {LoginProvider} from './context/LoginContext';
import { LoginHomepage } from './views/LoginHomepage';

function App() {
  return (
      <LoginProvider>
        <LoginHomepage />
      </LoginProvider>
    
  );
}

export default App;
