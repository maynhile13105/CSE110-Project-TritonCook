import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';
import UserIcon from '../google/UserIcon';
import Logout from '../google/Logout';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
  const {userProfile} = useContext(AppContext);
  
  return (
    <div>
      <main className='navbar'>
        <ul className='left'>
        <Link to='/home'><li className='logo' data-testid='logo'>
            <img src='/images/logo-round.svg'
              alt='logo' />
          </li></Link>
          <Link to='/home'><li className='notif' data-testid='notif'>
            <img className='notifImage' src='/images/notif-bell.svg'
              alt='notif' />
          </li></Link>
        </ul>
        <ul className='middle'>
          <Link to='/home/add-recipe'><li className='post' data-testid='post'>
            <img className='postImage' src='/images/addPost.svg' alt='post' />
          </li></Link>
          <Link to='/home'><li className='home' data-testid='home'>
            <img src='/images/home.svg' alt='home' />
          </li></Link>
          <Link to='/home/search'><li className='search' data-testid='search'>
            <img src='/images/search.svg' alt='search'/>
          </li></Link>
        </ul>
        <ul className='right'>
          <Logout date-testid='logout'/>
          <Link to={`/profile/${userProfile.name}`}>
            {userProfile?.picture? 
            (<img className='profile' data-testid='profile' src={userProfile.picture} alt="user-avatar"/>) 
            :(<img src="/images/profile.svg" alt="defaultprofile" className="defaultprofile" />)}
          </Link>
        </ul>
      </main>
    </div>
  );
};

export default Navbar;