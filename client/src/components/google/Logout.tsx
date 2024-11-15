import React from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('google-token');
  };

  return (
    <li className="logout">
      <Link to="/" onClick={handleLogout}>
        <img src="images/logout.svg" alt="logout" />
      </Link>
    </li>
  );
};

export default Logout;
