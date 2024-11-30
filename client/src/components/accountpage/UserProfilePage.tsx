import React from "react";
import { Link } from "react-router-dom";
import "./UserProfilePage.css";
import Navbar from "../navbar/Navbar";

// SVG for IconImage
const IconImage = () => (
  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>
  );
  
  // SVG for IconEdit3
  const IconEdit3 = () => (
    <svg fill="#000000" width="30px" height="30px" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin"><path d='M5.72 14.456l1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z'/></svg>
  );

  // SVG for IconCamera
  const IconCamera = () => (
    <svg enable-background="new 0 0 32 32" height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg"><g id="camera"><path clip-rule="evenodd" d="M16,10.001c-4.419,0-8,3.581-8,8c0,4.418,3.581,8,8,8   c4.418,0,8-3.582,8-8C24,13.583,20.418,10.001,16,10.001z M20.555,21.906c-2.156,2.516-5.943,2.807-8.459,0.65   c-2.517-2.156-2.807-5.944-0.65-8.459c2.155-2.517,5.943-2.807,8.459-0.65C22.42,15.602,22.711,19.391,20.555,21.906z" fill="#333333" fill-rule="evenodd"/><path clip-rule="evenodd" d="M16,14.001c-2.209,0-3.999,1.791-4,3.999v0.002   c0,0.275,0.224,0.5,0.5,0.5s0.5-0.225,0.5-0.5V18c0.001-1.656,1.343-2.999,3-2.999c0.276,0,0.5-0.224,0.5-0.5   S16.276,14.001,16,14.001z" fill="#333333" fill-rule="evenodd"/><path clip-rule="evenodd" d="M29.492,9.042l-4.334-0.723l-1.373-3.434   C23.326,3.74,22.232,3,21,3H11C9.768,3,8.674,3.74,8.214,4.886L6.842,8.319L2.509,9.042C1.055,9.283,0,10.527,0,12v15   c0,1.654,1.346,3,3,3h26c1.654,0,3-1.346,3-3V12C32,10.527,30.945,9.283,29.492,9.042z M30,27c0,0.553-0.447,1-1,1H3   c-0.553,0-1-0.447-1-1V12c0-0.489,0.354-0.906,0.836-0.986l5.444-0.907l1.791-4.478C10.224,5.25,10.591,5,11,5h10   c0.408,0,0.775,0.249,0.928,0.629l1.791,4.478l5.445,0.907C29.646,11.094,30,11.511,30,12V27z" fill="#333333" fill-rule="evenodd"/></g></svg>
  );

  // SVG for IconPicEdit
  const IconPicEdit = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="41" viewBox="0 0 60 41" fill="none">
      <path d="M59.5 20.5C59.5 25.9475 56.2691 30.9352 50.9311 34.5829C45.5956 38.2288 38.1968 40.5 30 40.5C21.8032 40.5 14.4044 38.2288 9.06889 34.5829C3.73089 30.9352 0.5 25.9475 0.5 20.5C0.5 15.0525 3.73089 10.0648 9.06889 6.41713C14.4044 2.77117 21.8032 0.5 30 0.5C38.1968 0.5 45.5956 2.77117 50.9311 6.41713C56.2691 10.0648 59.5 15.0525 59.5 20.5Z" fill="#D9D9D9" stroke="black"/>
    </svg>
  );

const UserProfilePage = () => {
    return (
      <div>
        <div className="topbar">
          <Navbar />
        </div>
        <div className="page_style">
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

          <div className="profilePage-container">
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

            <div className="posts-container">
                
            </div>
          </div>

        </div>
      </div>  
    );
  };
  
  export default UserProfilePage;