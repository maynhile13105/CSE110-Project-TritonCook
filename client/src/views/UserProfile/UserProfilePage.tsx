import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./UserProfilePage.css";
import Navbar from "../../components/navbar/Navbar";
import { AppContext } from "../../context/AppContext";
import { fetchUserProfile } from "../../utils/userInfo-utils";


const UserProfilePage = () => {
  const {userProfile, setUserProfile} = useContext(AppContext);
  const [avatar, setAvatar] = useState<string>("/images/no-image.jpg");

  useEffect(() => {
    loadUserProfile();
  },[])

  const loadUserProfile = async () => {
    try {
      const profile = await fetchUserProfile(); // Fetch favorite recipes
      //console.log("Fetched fav recipes in frontend:", favoriteList);  // Log the recipes
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  };

  useEffect(() => {
    if (userProfile.picture) {
      setAvatar(userProfile.picture);
    }
  }, [userProfile.picture]); // Depend on userProfile.picture to update avatar
  return (
    <div>
      <div className="topbar">
        <Navbar />
      </div>
      <div className='under-navbar'>
        <div className='sidebar-profilePage'>
          <div className="information">
            {/* <span className="button-text">Information</span> */}
            <Link to="/home/info" className="button-text">Information</Link>
            <img src="/images/information-icon.svg" style={{width:"40px"}}/>
          </div>
                
          <div className="posts">
            {/* <span className="button-text">Posts</span> */}
            <Link to="/home/profile" className="button-text">Posts</Link>
            <img src="/images/post-icon.svg" style={{width:"30px"}}/>
          </div>
      
          <div className="friends">
            {/* <span className="button-text">Friends</span> */}
            <Link to="/home/friends" className="button-text">Friends</Link>
            <img src="/images/friends-icon.svg" style={{width:"40px"}}/>
          </div>
        </div>

        <div className='userProfilePage-content' >
          <div className="profilePage-header">

            <button className="avatar-edit">
              <img src="/images/camera-icon.svg" style={{width:"40px"}}/>
            </button>

            <div className="avatarImage-container">
              <img className="avatar" src={avatar} alt="User Avatar" />
            </div>
            {/* Right Corner Edit Icon */}
            <div className="name">
              {userProfile.name}
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