import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./UserProfilePage.css";
import Navbar from "../../components/navbar/Navbar";

// SVG for IconImage
const IconImage = () => (
  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>
  );
  

const UserProfilePage = () => {
  return (
    <div>
      <div className="topbar">
        <Navbar />
      </div>
      <div className='under-navbar'>
        <div className='sidebar-profilePage'>
          <div className="option-container">
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
          </div>
          <div className='page-content'>
            <div className="profile-block">
              {/* Centered Icon */}
              <div className="pic_icon">
                <IconImage />
              </div>

              {/* Right Corner Edit Icon */}
              <div className="pen_icon">
                <img src="/images/edit-icon.svg" style={{width:"40px"}}/>
              </div>


              {/* Bottom Left Profile Image */}
              <div className="profileImage">
                <span>DP</span>
                <div className="avatar-edit">
                  <img src="/images/camera-icon.svg" style={{width:"40px"}}/>
                </div>
              </div>
            </div>
            <div className='page-content'>
              <Outlet />
            </div>
          </div>
        </div>  
      </div>  
    );
  };
  
  export default UserProfilePage;