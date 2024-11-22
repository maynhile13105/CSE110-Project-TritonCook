import React from "react";
import { Link } from "react-router-dom";
import "./UserInfoPage.css";

const UserInfoPage = () => {
    const userInfoData = [
        { label: "Username", info: "Example1" },
        { label: "Password", info: "*****" },
        { label: "Email", info: "students@ucsd.edu" },
        { label: "DOB", info: "MM/DD/YYYY" },
        { label: "Ethic", info: "Asian/Asian American" },
        { label: "Phone", info: "+1(123)-456-7890" },
    ];

    return (
        <div className="page_style">
            {/* Center Top Button */}
            <button className="styled-button">Change Info</button>

            {/* Blocks Below Button */}
            <div className="blocks-container">
                {userInfoData.map((data, index) => (
                    <div className="block" key={index}>
                        <div className="block-text-container">
                            <span className="block-text">{data.label}</span>
                        </div>
                        <div className="block-info-container">
                            <span className="block-info">{data.info}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
  };
  
  export default UserInfoPage;