import LoginForm from "../../components/loginForm/LoginForm";
import "../../css/login/LoginHomepage.css";

export const LoginHomepage = () => {
  return (
    <div className="login-homepage-container">
      <div className="left-section">
        <div className="slogan-container">
          <h1 className="slogan">"Share, Discover, Savor"</h1>
          <h1 className="app-name">TritonCook</h1>
        </div>
        <div className="logo-container">
          <img src="/logo.png" className="logo" alt="TritonCook Logo" />
        </div>
      </div>

      <div className="right-section">
        <div className="login-form-container">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginHomepage;