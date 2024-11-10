import React, { useEffect, useState } from "react";
import "../../css/CreateAccountForm.css";
const CreateAccountForm = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="create-account-box">
      <form action="" method="post" className="CreateAccountForm">
        <div>
          <label>Username</label>
        </div>
        <div className="username-input">
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
          <label>Email</label>
        </div>
        <div className="email-input">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter UCSD email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <label>Confirm Password</label>
        </div>
        <div className="confirmed-pass-input">
          <input
            type="password"
            name="confirmed-password"
            id="confirmed-password"
            placeholder="Enter Password"
            required
            value={confirmedPass}
            onChange={(e) => setConfirmedPass(e.target.value)}
          />
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