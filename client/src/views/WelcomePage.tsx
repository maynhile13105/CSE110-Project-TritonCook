import { LoginProvider } from "../context/LoginContext";
import "../css/WelcomePage.css"
import { Link } from 'react-router-dom';

export const WelcomePage = () => {
  return (
    <LoginProvider>
      <div className="welcome-container">
        <div className="welcome-header">
          <h1>WELCOME TO TRITON COOK</h1>
        </div>
        <div className="logo-container">
          <img src="/logo.png" className="logo" alt="TritonCook Logo" />
        </div>

        <div className="congrat-message">
          <p>
            Congratulations! <br />
            Your account has been created successfully!
          </p>
          <div>
            <Link to="/">
              <button type="button" className="login-button">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </LoginProvider>
  )
};
export default WelcomePage;