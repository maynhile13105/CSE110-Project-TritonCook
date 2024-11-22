import React from "react";
import { Link } from "react-router-dom";
import "./UserInfoPage.css";

const UserInfoPage = () => {
    return (
        <div className="page_style">
            {/* Center Top Button */}
            <button className="styled-button">Change Info</button>

            {/* Blocks Below Button */}
            <div className="blocks-container">
                {["Username", "Password", "Email", "DOB", "Ethic", "Phone"].map((text, index) => (
                    <div className="block" key={index}>
                        <div className="block-text-container">
                            <span className="block-text">{text}</span>
                        </div>
                        <div className="block-info-container">
                            <span className="block-info">{text}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
  };
  
  export default UserInfoPage;