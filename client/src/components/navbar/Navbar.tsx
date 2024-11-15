import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';
import UserIcon from '../google/UserIcon';
import Logout from '../google/Logout';

const Navbar = () => {
  return (
    <div>
      <main className='navbar'>
        <ul className='left'>
          <li className='logo'><Link to='/home'>
            <img src='images/logo-round.svg'
              alt='logo' />
          </Link></li>
          <li className='notif'><Link to='/home'>
            <img className='notifImage' src='images/notif-bell.svg'
              alt='notif' />
          </Link></li>
        </ul>
        <ul className='middle'>
          <li className='post'><Link to='/home'>
            <img className='postImage' src='images/addPost.svg' alt='post' />
          </Link></li>
          <li className='home'><Link to='/home'>
            <img src='images/home.svg' alt='home' />
          </Link></li>
          <li className='search'><Link to='/home/search'>
            <img src='images/search.svg' alt='search'/>
          </Link></li>
        </ul>
        <ul className='right'>
          <Logout />
          <li className='profile'><Link to='/home'>
            <UserIcon />
          </Link></li>
        </ul>
      </main>
    </div>
  );
};

export default Navbar;