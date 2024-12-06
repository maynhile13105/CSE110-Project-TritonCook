import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logout from '../google/Logout';
import { AppContext } from '../../context/AppContext';
import { API_BASE_URL } from '../../constants/constants';

const Navbar = () => {
  const {userProfile} = useContext(AppContext);

  const [showNotifPopup, setShowNotifPopup] = useState(false);

  const handleNotifClick = () => {
    setShowNotifPopup(true);
    setTimeout(() => {
      setShowNotifPopup(false);
    }, 3000);
  };
  
  const [avatar, setAvatar] = useState<string>("");
  useEffect(() => {
    //console.log("Pic: ", ownerAccountPage.picture);
    if (userProfile.picture) {
      if(userProfile.picture.startsWith("/uploads/avatar/")){
        let path = `${API_BASE_URL}${userProfile.picture}`;
        console.log(path);
        setAvatar(path);
      } else{
        setAvatar(userProfile.picture);
      };      
    }
  }, [userProfile]); // Depend on ownerAccountPage.picture to update avatar

  return (
    <div>
      <main className='navbar'>
        <ul className='left'>
        <Link to='/home'><li className='logo' data-testid='logo'>
            <img src='/images/logo-round.svg'
              alt='logo' className='logo-nav'/>
          </li></Link>
          <Link to='#'><li className='notif' data-testid='notif' onClick={handleNotifClick}>
            <img className='notifImage' src='/images/notif-bell.svg'
              alt='notif' />
          </li></Link>
        </ul>
        <ul className='middle'>
          <Link to='/home/add-recipe'><li className='post' data-testid='post'>
            <img className='postImage' src='/images/addPost.svg' alt='post' />
          </li></Link>
          <Link to='/home'><li className='home' data-testid='home'>
            <img src='/images/home.svg' alt='home' className='home-icon'/>
          </li></Link>
          <Link to='/home/search'><li className='search' data-testid='search'>
            <img src='/images/search.svg' alt='search' className='search-icon-nav'/>
          </li></Link>
        </ul>
        <ul className='right'>
        {userProfile?.isGuest ? (
          <Link to="/" data-testid="login" style={{textDecoration:"none"}}>
            <button className="login-button" style={{display:"flex", flexDirection:"column"}}>
              <img src='/images/login-icon.svg' className='login-icon'/>
              <span style={{fontSize:"25px"}}>Log in</span>
            </button>
          </Link>
        ) : (
          <Logout data-testid="logout" />
        )}
        {userProfile?.isGuest ? (
          <Link to="/home/guest-profile" data-testid='profile'>
            <img src="/images/profile.svg" alt="defaultprofile" style={{width:"100px"}} />
          </Link>
        ) : ( 
          <Link to={`/profile/${userProfile.name}`} data-testid='profile'>
            {userProfile?.picture? 
            (<img className='profile' src={avatar} alt="user-avatar"/>) 
            :(<img src="/images/profile.svg" alt="defaultprofile" style={{width:"100px"}} />)}
          </Link>
        )}
        </ul>
      </main>

      {/* Notification Popup */}
      {showNotifPopup && (
        <div className='notif-popup'>
          Notification will be available soon!
        </div>
      )}
    </div>
  );
};

export default Navbar;