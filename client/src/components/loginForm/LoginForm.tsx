import React, { useContext, useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "../google/LoginButton";
import { AppContext } from "../../context/AppContext";
import { API_BASE_URL } from "../../constants/constants";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    if (!username || !password) {
      setLoginError("Username and password cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
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

      //Save the token to the app context
      setToken(data.token);
      console.log(token)

      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      setLoginError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-box">
      <form onSubmit={handleLogin} className="loginForm">
        {loginError && <div className="error-message">{loginError}</div>}
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
            data-testid="username-input-field"
            onChange={(e) => {
              setUsername(e.target.value);
              setLoginError("");
            }}
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
            data-testid="pass-input-field"
            onChange={(e) => {
              setPassword(e.target.value);
              setLoginError("");
            }}
          />
        </div>

        <div>
          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>

      <div className="ForgetPass">
        <Link to="/reset-pass" style={{ marginLeft: "10px", padding: "10px", fontSize: "35px" }}>
          Forgot Password?
        </Link>
      </div>

      <div style={{ marginLeft: "10px", padding: "10px", width: "90%", borderBottom: "2px solid #439BBD" }} />
      <div style={{ marginLeft: "10px", padding: "10px", fontSize: "35px" }}>
        New to TritonCook?
      </div>

      <div className="CreateAccount">
        <div className="create-account-button">
          <Link to="/create-account" className="create-account-link">
            <span>Create New Account</span>
          </Link>
        </div>
      </div>

      <div style={{ marginLeft: "10px", padding: "10px", fontSize: "35px" }}>
        Another way to login?
      </div>
      <LoginButton />
      <div className="or-divider">
        Or
      </div>

      <div className="guest">
        <div className="guest-account-button">
          <Link to="/home" className="guest-account-link">
            <span>Continue As Guest</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
