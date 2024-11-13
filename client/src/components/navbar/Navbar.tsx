import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

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
            <img src='images/notif-bell.svg'
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
          <li className='search'><Link to='/home/recipes'>
            <img src='images/search.svg' alt='search' />
          </Link></li>
        </ul>
        <ul className='right'>
          <li className='logout'><Link to='/home'>
            <img src='images/logout.svg' alt='logout' />
          </Link></li>
          <li className='profile'><Link to='/account'>
            <img src='images/profile.svg' alt='profile' />
          </Link></li>
        </ul>
      </main>
    </div>
  );
};

export default Navbar;