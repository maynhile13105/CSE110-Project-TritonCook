import React, { useState } from "react";
import "./CreateAccountForm.css";
import { useNavigate } from "react-router-dom";
const CreateAccountForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateAccount = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      if (confirmedPass !== password) {
        throw new Error("Passwords don't match");
      }

      const isValidUCSDEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.endsWith('@ucsd.edu');
      if (!isValidUCSDEmail) {
        throw new Error("Not valid UCSD email")
      }

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      if (avatar) {
        formData.append("avatar", avatar); // Add the avatar file
      }

      const response = await fetch('http://localhost:8080/api/createAccount', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create account');
      }

      navigate("/welcome");
    } catch (err) {
      console.error("Creating account failed.", err);
    }
  };

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file)); // Create a preview
      }
    };

  return (
    <div className="create-account-box">
      <form onSubmit={handleCreateAccount} className="CreateAccountForm">
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        </div>
        <div className="upload-avatar">
          <label className='avatar-label'>Profile Avatar</label>
          <input
            type="file"
            name="image"
            id = "avatar-inpt"
            onChange={handleFileChange}
            required
          />
          {avatarPreview && (
            <div className="avatar-preview">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="avatar-preview-img"
              />
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