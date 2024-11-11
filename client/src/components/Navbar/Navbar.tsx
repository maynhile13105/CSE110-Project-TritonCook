import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import RecipeList from '../recipes/RecipeList';

const Navbar = () => {
  return (
    <div>
      <main className='navbar'>
        <ul className='left'>
          <li className='logo'><Link to='/'>
          <img src='/logo-round.svg'
          alt='logo'/>
          </Link></li>
          <li className='notif'><Link to='/'>
          <img src='/notif-bell.svg'
          alt='notif'/>
          </Link></li>
        </ul>
        <ul className='middle'>
          <li className='post'><Link to='/'>
          <img className='postImage' src='/addPost.svg' alt ='post' />
          </Link></li>
          <li className='home'><Link to='/'>
          <img src='/home.svg' alt='home' />
          </Link></li>
          <li className='search'><Link to='/recipes'>
          <img src='/search.svg' alt='search'/>
          </Link></li>
        </ul>
        <ul className='right'>
          <li className='logout'><Link to='/'>
          <img src='/logout.svg' alt='logout'/>
          </Link></li>
          <li className='profile'><Link to='/'>
          <img src='/profile.svg' alt='profile'/>
          </Link></li>
        </ul>
      </main>
    </div>
  );
};

export default Navbar;
