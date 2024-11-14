import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import LoginButton from "../google/LoginButton";


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
            placeholder="Enter Username"
            required
            value={userName}
            data-testid="username-intput-field"
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
            data-testid="pass-intput-field"
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
        <Link to="/reset-pass" style={{ marginLeft: "10px", padding: "10px", fontSize: "35px" }}>
          Forgot Password?
        </Link>
      </div>

      <div style={{ marginLeft: "10px", padding: "10px", width: "90%", borderBottom: "2px solid #439BBD" }} />
      <div style={{ marginLeft: "10px", padding: "10px", fontSize: "35px" }}>New to TritonCook?</div>

      <div className="CreateAccount">
        <div className="create-account-button">
          <Link to="/create-account" className="create-account-link">
            <span>Create New Account</span>
          </Link>
        </div>

      </div>

      <div style={{ marginLeft: "45%", padding: "10px", fontSize: "35px" }}>Or</div>

      <LoginButton />

    </div>
  );
};

export default LoginForm;