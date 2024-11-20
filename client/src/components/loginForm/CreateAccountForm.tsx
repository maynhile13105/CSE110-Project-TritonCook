import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccountForm.css";

const CreateAccountForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();
  
  // Example condition - we haven't built the dataset for validation yet.
  const isEmailRegistered = email === "test@ucsd.edu";
  const isPasswordMismatch = password && confirmedPass && password !== confirmedPass;
  const isInvalidDob = dob && !/^\d{2}\/\d{2}\/\d{4}$/.test(dob);

  // Check if the form is valid
  const isFormValid = 
    userName && 
    password && 
    confirmedPass && 
    email && 
    dob && 
    !isPasswordMismatch && 
    !isInvalidDob;

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    // Prevents the default form submission behavior (which would reload the page)
    e.preventDefault();
    if (isFormValid) {
      // Navigate to SuccessfulRegister page
      navigate("/successful-register");
    }
  };

  return (
    <div className="create-account-box">
      <form action="" method="post" className="CreateAccountForm" onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
        </div>
        <div className="username-input">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
        </div>
        <div className="email-input">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter UCSD Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isEmailRegistered && (
            <div className="alert">
              <img src="/images/warning.svg" alt="Warning" className="alert-icon"/>
              Your email has been registered!
            </div>
          )}
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
          <label>Confirm Password</label>
        </div>
        <div className="confirmed-pass-input">
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Enter Confirm Password"
            required
            value={confirmedPass}
            onChange={(e) => setConfirmedPass(e.target.value)}
          />
          {isPasswordMismatch && (
            <div className="alert">
              <img src="/images/warning.svg" alt="Warning" className="alert-icon"/>
              Password and Confirmed Password are not matched!
            </div>
          )}
        </div>

        <div>
          <label>Date of Birth</label>
        </div>
        <div className="dob-input">
          <input
            type="text"
            name="dob"
            id="dob"
            placeholder="Enter DOB (mm/dd/yyyy)"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          {isInvalidDob && (
            <div className="alert">
              <img src="/images/warning.svg" alt="Warning" className="alert-icon"/>
              Invalid Date Of Birth! Please fill in by format mm/dd/yyyy
            </div>
          )}
        </div>

        <div>
          <button type="submit" name="register" id="register-button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountForm;

