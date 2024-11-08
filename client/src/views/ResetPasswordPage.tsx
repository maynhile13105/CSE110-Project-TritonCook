import React from "react";
import "../css/ResetPasswordPage.css";
import { Link } from "react-router-dom";

export const ResetPasswordPage = () => {
  return (
    <div className="reset-pass-page">
      <div>
        <Link to="/">
          <button className="back-button">
            <i className="bi bi-box-arrow-in-left" style={{ fontSize: "80px" }}></i>
            Back
          </button>
        </Link>
      </div>

      <div className="grid-container">
        <div className="reset-form-container">
          <div className="title">
            <h1 className="recover-password-header">Recover Password</h1>
          </div>
          <div className="form-container">
            <form className="reset-form form-group">
              <p className="instruction">
                Enter your email address! <br />
                We will send you an email with instructions to reset your password
              </p>

              <div data-mdb-input-init className="form-outline">
                <label className="email-label">Email</label>
                <input type="email" placeholder="Enter Email" id="userEmail" className="form-control my-3" />
              </div>

              <div className="reset-button">
                <button type="submit" id="resetButton">RESET PASSWORD</button>
              </div>

            </form>
          </div>
        </div>
      </div>

    </div>
  );
};
export default ResetPasswordPage;