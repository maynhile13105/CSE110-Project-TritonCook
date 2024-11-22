import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Logout = () => {

  const { setToken } =useContext(AppContext);

  const handleLogout = () => {
    //localStorage.removeItem('token');
    setToken("");
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
