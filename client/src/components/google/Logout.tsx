import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
const Logout = () => {
  const {setUserProfile} = useContext(AppContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
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
