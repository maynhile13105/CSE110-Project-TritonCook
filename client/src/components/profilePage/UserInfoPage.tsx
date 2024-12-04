import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./UserInfoPage.css";
import { AppContext, initialState } from "../../context/AppContext";
import { Profile } from "../../types/types";
import { fetchProfileUsingUsername } from "../../utils/userInfo-utils";

const UserInfoPage = () => {
    const userInfoData = [
        { label: "Username", info: "Example1" },
        { label: "Password", info: "*****" },
        { label: "Email", info: "students@ucsd.edu" },
        { label: "DOB", info: "MM/DD/YYYY" },
        { label: "Ethic", info: "Asian/Asian American" },
        { label: "Phone", info: "+1(123)-456-7890" },
    ];

    const { username } = useParams(); //Get userID from the URL
    console.log("username: ", username);
    const {userProfile, setUserProfile} = useContext(AppContext); // the user's profile who is using the app.
    const [ownerAccountPage, setOwnerAccountPage] = useState<Profile>(initialState.userProfile);
    const [isUserAccountPage, setIsUserAccountPage] = useState<boolean>(false);
    const [password, setPassword] = useState("");
    const [ownerAccountPageInfo, setOwnerAccountPageInfo] = useState({
        id : "",
        dob: "",
        ethics: "",
        phone: ""
    })
    useEffect(() => {
      if(username){
        loadOwnerProfilePage(username);
      }
    },[username])
  
    const loadOwnerProfilePage = async (username: string) => {
      try {
        const profile = await fetchProfileUsingUsername(username); 
        //console.log("Profile:", profile);
        setOwnerAccountPage(profile);
        const isOwner = username === userProfile.name;
        setIsUserAccountPage(isOwner);
        console.log("Profile loaded:", profile.name);
        console.log("valid?", isOwner);
      } catch (error) {
        console.error("Error fetching profile using username:", error);
      }
    };

    
    
    return (
      <div className="page_style">
        {/* Center Top Button */}
        <div className={isUserAccountPage? "visible":"hidden" } id="relation-buttons" >
          <div className="edit-button" role="button">
            <img className="edit-button-icon" src="/images/edit-icon.svg"/>
            Change Information
          </div>    
        </div>

        <div className="page-container">
          <div className="blocks-container">                                       
            <div className={isUserAccountPage? "visible":"hidden" } id="block" >
              <div className="block-text-container">
                <span className="block-text">Username</span>
              </div>
              <div className="block-info-container">
                <span className="block-info">{ownerAccountPage.name}</span>
              </div>
            </div>

            <div className={isUserAccountPage? "visible":"hidden" } id="block" >
              <div className="block-text-container">
                <span className="block-text">Password</span>
              </div>
              <div className="block-info-container">
                <span className="block-info">{password||"N/A"}</span>
              </div>
            </div>

            <div className={isUserAccountPage? "visible":"hidden" } id="block" >
              <div className="block-text-container">
                <span className="block-text">Email</span>
              </div>
              <div className="block-info-container">
                <span className="block-info">{ownerAccountPage.email}</span>
              </div>
            </div>

            <div className={isUserAccountPage? "visible":"hidden" } id="block" >
              <div className="block-text-container">
                <span className="block-text">D.O.B</span>
              </div>
              <div className="block-info-container">
                <span className="block-info">N/A</span>
              </div>
            </div>

            <div className={isUserAccountPage? "visible":"hidden" } id="block" >
              <div className="block-text-container">
                <span className="block-text">Ethics</span>
              </div>
              <div className="block-info-container">
                <span className="block-info">{ownerAccountPageInfo.ethics||"N/A"}</span>
              </div>
            </div>

            <div className={isUserAccountPage? "visible":"hidden" } id="block" >
              <div className="block-text-container">
                <span className="block-text">Phone</span>
              </div>
              <div className="block-info-container">
                <span className="block-info">{ownerAccountPageInfo.phone||"N/A"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };
  
  export default UserInfoPage;