import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "../google/LoginButton";



const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(username)
    console.log(password)

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // Save the token to local storage or context
      localStorage.setItem("token", data.token);

      // Redirect to /home after successful login
      navigate("/home");
    } catch (err) {
      console.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-box">
      <form onSubmit={handleLogin} className="loginForm">
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
            value={username}
            data-testid="username-intput-field"
            onChange={(e) => setUsername(e.target.value)}
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