import "./WelcomePage.css"
import { Link } from 'react-router-dom';

export const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1>WELCOME TO TRITON COOK</h1>
      </div>

      <div className="logo-welcome-container">
        <img src="/logo.png" className="logo-welcome" alt="TritonCook Logo" />
      </div>

      <div className="congrat-message">
        <p>
          Congratulations! <br />
          Your account has been created successfully!
        </p>
        <div className="login-button-container" >
          <Link to="/" className="login-button-link">
            <button type="button" className="loginButton">Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
};
export default WelcomePage;