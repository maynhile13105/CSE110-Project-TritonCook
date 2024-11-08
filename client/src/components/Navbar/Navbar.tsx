import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div>
      <main className='navbar'>
        <ul className='left'>
          <li className='logo'><a href='/'>
          <img src='/logo-round.svg'/>
          </a></li>
          <li className='notif'><a href='/'>
          <img src='/notif-bell.svg'/>
          </a></li>
        </ul>
        <ul className='middle'>
          <li className='post'><a href='/'>
          <img className='postImage' src='/addPost.svg'/>
          </a></li>
          <li className='home'><a href='/'>
          <img src='/home.svg'/>
          </a></li>
          <li className='search'><a href='/searchpage'>
          <img src='/search.svg'/>
          </a></li>
        </ul>
        <ul className='right'>
          <li className='logout'><a href='/'>
          <img src='/logout.svg'/>
          </a></li>
          <li className='profile'><a href='/'>
          <img src='/profile.svg'/>
          </a></li>

        </ul>
      </main>
    </div>
  );
};

export default Navbar;
