import React from "react";
import { Link } from "react-router-dom";
import "./GuestAccount.css";

const GuestAccount = () => {
  return (
    <div className="guest-account">
      <div className="popup-window">
        <div className="message-block">
          <div className="message-text">
            Please login to see your account information!
          </div>
        </div>

        <div className="button-container">
            {/* Link to LoginForm */}
            <Link to="/" className="button-link-guest">
                <button className="button-guest">Sign in</button>
            </Link>
            {/* Link to CreateAccountForm */}
            <Link to="/create-account" className="button-link-guest">
                <button className="button-guest">Register</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default GuestAccount;
