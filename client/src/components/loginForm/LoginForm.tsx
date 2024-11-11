import React, { useEffect, useState } from "react";
import "../../css/LoginForm.css";
import { Link } from "react-router-dom";
import { GoogleCredentialResponse } from "../../types/types";

const LoginForm = () => {

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('googleButton'),
      { theme: 'filled_blue', size: 'large' } // Customize button options as needed
    );

    google.accounts.id.prompt();
  }, []);

  const handleCredentialResponse = async (response: GoogleCredentialResponse) => {
    const token = response.credential;
    console.log('Encoded JWT ID token:', token);

    try {
      const res = await fetch('http://localhost:8080/api/google-signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log('JWT from server:', data)
    } catch (error) {
      console.error('Failed to authenticate:', error);
    }
  };

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
        <button type="submit" className="create-account-button" onClick={() => window.location.href = '/create-account'}>
          Create New Account
        </button>
      </div>

      <div style={{ marginLeft: "45%", padding: "10px", fontSize: "35px" }}>Or</div>

      <div id="googleButton" data-testid="googleButton"></div>

    </div>
  );
};

export default LoginForm;