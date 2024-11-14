import React from 'react';
import './Newsfeed.css';
import Sidebar from '../../components/navbar_/Sidebar';
import Navbar from '../../components/navbar_/Navbar';
import { Outlet } from 'react-router-dom';

const Newsfeed = () => {
  return (
    <div>
      <div className='topbar'>
        <Navbar />
      </div>
      <div className='under-navbar'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='page-content'>
          <Outlet />
        </div>
      </div>
    </div>

  );
}

export default Newsfeed;