import React from 'react';
import './Newsfeed_NavBar.css'
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

// create a web pag formate only contain navbar
const Newsfeed_NavBar = () => {
  return (
    <div>
      <div className='topbar'>
        <Navbar />
      </div>
      <div className='under-navbar'>
        <div className='page-content'>
          <Outlet />
        </div>
      </div>
    </div>

  );
}

export default Newsfeed_NavBar;