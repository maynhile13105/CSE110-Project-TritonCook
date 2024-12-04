import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import "./UserProfilePage.css";
import Navbar from "../../components/navbar/Navbar";
import { AppContext, initialState } from "../../context/AppContext";
import { fetchProfileUsingUsername, fetchUserProfile, } from "../../utils/userInfo-utils";
import { Profile } from "../../types/types";
import { API_BASE_URL } from "../../constants/constants";


const UserProfilePage = () => {
  const { username } = useParams(); //Get userID from the URL
  const {userProfile, setUserProfile} = useContext(AppContext); // the user's profile who is using the app.
  const [ownerAccountPage, setOwnerAccountPage] = useState<Profile>(initialState.userProfile);
  const [avatar, setAvatar] = useState<string>("");
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
    } catch (error) {
      console.error("Error fetching profile using username:", error);
    }
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    if(token)
    loadUserProfile();
  },[token])

  const loadUserProfile = async () => {
    try {
      const profile = await fetchUserProfile(); 
      setUserProfile(profile);
      //console.log("profile: ", profile);
    } catch (error) {
      console.error("Error fetching profile using username:", error);
    }
  };
  useEffect(() => {
    //console.log("Pic: ", ownerAccountPage.picture);
    if (ownerAccountPage.picture) {
      if(ownerAccountPage.picture.startsWith("/uploads/avatar/")){
        let path = `${API_BASE_URL}${ownerAccountPage.picture}`;
        console.log(path);
        setAvatar(path);
      } else{
        setAvatar(ownerAccountPage.picture);
      };      
    }
  }, [ownerAccountPage]); // Depend on ownerAccountPage.picture to update avatar

  //console.log("username from the path", [username])
  //console.log(" owner username: ", [ownerAccountPage.name]);
  return (
    <div>
      <div className="topbar">
        <Navbar />
      </div>
      <div className='under-navbar'>
        <div className='sidebar-profilePage'>
          <div className="information">
            {/* <span className="button-text">Information</span> */}
            <Link to={`/profile/${ownerAccountPage.name}/information`} className="accountPage-button-text">Information</Link>
            <img className="accountPage-icon" src="/images/information-icon.svg" />
          </div>
                
          <div className="posts">
            {/* <span className="button-text">Posts</span> */}
            <Link to={`/profile/${ownerAccountPage.name}`} className="accountPage-button-text">Posts</Link>
            <img className="accountPage-icon" src="/images/post-icon.svg"/>
          </div>
      
          <div className="friends">
            {/* <span className="button-text">Friends</span> */}
            <Link to="/home/friends" className="accountPage-button-text">Friends</Link>
            <img className="accountPage-icon" src="/images/friends-icon.svg" />
          </div>
        </div>

        <div className='userProfilePage-content' >
          <div className="profilePage-header">
            <div className="avatarImage-container">
              {avatar? 
                (<img id="avatar" src={avatar} alt="User Avatar" />)
                :
                (<img src="/images/profile.svg" alt="defaultprofile" className="defaultprofile" id="avatar" />)
              }
            </div>
            <button className="avatar-edit">
              <img src="/images/camera-icon.svg" style={{width:"40px"}}/>
            </button>

            {/* Right Corner Edit Icon */}
            <div className="username">
              {ownerAccountPage.name}
            </div>
          </div>
          <div className={userProfile.name !== ownerAccountPage.name? "visible":"hidden" }
            id="relation-buttons" >
              <div className="friendship-button" role="button">
                <img src="/images/add-friend-icon.svg" alt="add-friend-icon" 
                style={{width:'70px'}}/>
                Add friend
              </div>

              <div className="follow-button" role="button">
                <img src="/images/follow-icon.svg" alt="follow-me-icon"
                style={{width:'70px'}}/>
                Follow me
              </div>
              
          </div>
          <div className='page-content-container'>
            <Outlet />
          </div>
        </div>
      </div>  
    </div>  
    );
  };
  
  export default UserProfilePage;