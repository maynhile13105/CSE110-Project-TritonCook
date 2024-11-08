import React, { useState } from "react";
import "../css/LoginForm.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="login-box">
      <form action="" method="post" className="loginForm">
        <div>
          <label>Username</label>
        </div>
        <div className="user-input">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
        </div>
        <div className="pass-input">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </div>
      </form>


      <div className="ForgetPass">
        <Link to="/login/reset" style={{ marginLeft: "10px", padding: "10px", fontSize: "35px" }}>
          Forgot Password?
        </Link>
      </div>

      <div style={{ marginLeft: "10px", padding: "10px", width: "90%", borderBottom: "2px solid #439BBD" }} />
      <div style={{ marginLeft: "10px", padding: "10px", fontSize: "35px" }}>New to TritonCook?</div>

      <div>
        <button type="submit" className="create-button"
          onClick={() => window.location.href = '#'}>
          Create New Account
        </button>
      </div>
      <div style={{ marginLeft: "45%", padding: "10px", fontSize: "35px" }}>Or</div>

      <div>
        <button type="button" className="google-button"
          onClick={() => window.location.href = '#'}>
          Sign in with Google <i className="bi bi-google"></i>
        </button>
      </div>



    </div>
  );
};

export default LoginForm;