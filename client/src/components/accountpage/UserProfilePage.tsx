import React from "react";
import { Link } from "react-router-dom";
import "./UserProfilePage.css";

// SVG for IconImage
const IconImage = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44 6H4L20 24.92V38L28 42V24.92L44 6Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  // SVG for IconEdit3
  const IconEdit3 = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44 6H4L20 24.92V38L28 42V24.92L44 6Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

const UserProfilePage = () => {
    return (
      <div className="page_style">
        <div className="profile-block">
            {/* Centered Icon */}
            <div className="pic_icon">
                <IconImage />
            </div>

            {/* Right Corner Edit Icon */}
            <div className="pen_icon">
                <IconEdit3 />
            </div>
        </div>

        {/* Second Block */}
        <div className="info-block">
            {/* Username */}
            <div className="username">UserName</div>

            {/* Title */}
            <div className="info-title">Title</div>

            {/* List Content */}
            <ul className="info-list">
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
            </ul>

            <button className="see-more-button">... see more</button>

            {/* Image Display Area */}
            <div className="image-display">
                <p>
                    image placeholder
                </p>
            </div>
        </div>

      </div>
    );
  };
  
  export default UserProfilePage;